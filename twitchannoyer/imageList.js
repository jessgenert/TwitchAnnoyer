
const fs = require('fs');

window.addEventListener('DOMContentLoaded', () => {
const imageGroupName = window.name;

const imageGroup = document.getElementById('imageGroup');


fs.readdir(`./images/${imageGroupName}/`, (err, files) => {
    files.forEach(file => {
      imageGroup.insertAdjacentHTML('beforeend',`<img src="./images/${imageGroupName}/${file}" height="50" height="50" style="border:1px solid black;margin:2px">`);
    });
  });

document.getElementById('imageGroupName').value = imageGroupName;
})