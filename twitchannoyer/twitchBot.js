const fs = require('fs');
require('dotenv').config();
const tmi = require('tmi.js');

const channel = `#jessthanthree`;
const username = `annoyancebot2`;
const token = `${localStorage.getItem('access_token')}`;

let images = []
let imageGroupName = window.localStorage.getItem('imageGroupName')

fs.readdir(`./images/${imageGroupName}/`, (err, files) => {

    files.forEach(file => {
        images.push(file.slice(0, file.length - 4))
    })
})


const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: username,
		password: `oauth:${token}`
	},
	channels: [ channel ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	
	if(self) return;

	if(message.toLowerCase() === 'test') {
		
	}
});