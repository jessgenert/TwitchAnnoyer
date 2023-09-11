
const fs = require('fs');
window.addEventListener('DOMContentLoaded', () => {


  
  const imageGroupName = window.name;

  const imageGroup = document.getElementById('imageGroup');

  fs.readdir(`./images/${imageGroupName}/`, (err, files) => {
    files.forEach(file => {
      imageGroup.insertAdjacentHTML('beforeend', `<img src="./images/${imageGroupName}/${file}" class="img" id="${file}" height="50" height="50"
       style="border:1px solid black;margin:2px">`);
       
      })
    
      let images = document.querySelectorAll('img')
      for (i of images) {
       i.addEventListener('click', function() {
         console.log(this.id);
         document.getElementById('imageName').value = this.id
       });
     }
 
       
      });

  document.getElementById('imageGroupName').value = imageGroupName;

})