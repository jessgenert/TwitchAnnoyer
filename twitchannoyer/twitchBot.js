const fs = require('fs');
require('dotenv').config();
const tmi = require('tmi.js');

const channel = localStorage.getItem('twitchChannel');
const username = `annoyancebot`;
const token = localStorage.getItem('access_token');

let images = []
let imageList = ""
let imageGroupName = localStorage.getItem('imageGroupName')

fs.readdir(`./images/${imageGroupName}/`, (err, files) => {

	files.forEach(file => {
		images.push(file.slice(0, file.length - 4).toLowerCase())
	})
	images.forEach(image => {
		imageList += `${image}\n`
	})
})


const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: username,
		password: `oauth:${token}`
	},
	channels: [channel]
});

client.connect();

client.on('message', (channel, tags, message, self) => {


	let command = message.toLowerCase().split(' ');

	if (self) return;

	if (message === "!help") {
		client.say(channel, `@${tags.username}, Type in the command: "!images" to view list of images. Usage: <img_name> <lg, md, sm>`);
	}

	if (message === "!images") {
		client.say(channel, imageList)
	}

	if (images.includes(command[0])) {



		function show_image(src, width, height, alt) {
			let img = document.createElement("img");
			img.src = src;
			img.width = width;
			img.height = height;
			img.alt = alt;


			img.style.position = 'absolute';
			img.style.top = document.body.clientHeight * Math.random() + 'px';
			img.style.left = document.body.clientWidth * Math.random() + 'px';

			document.body.appendChild(img);

			setTimeout(() => {
				document.body.removeChild(img);
			}, 10000)
		}

		if (command[1] === 'sm') {
			show_image(`./images/${imageGroupName}/${command[0]}.png`, 50, 50, "error")
		}
		else if (command[1] === 'md') {
			show_image(`./images/${imageGroupName}/${command[0]}.png`, 100, 100, "error")
		}
		else if (command[1] === 'lg') {
			show_image(`./images/${imageGroupName}/${command[0]}.png`, 200, 200, "error")
		}
	}
});