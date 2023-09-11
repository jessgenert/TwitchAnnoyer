
const { unlinkSync } = require('node:fs');


window.addEventListener('DOMContentLoaded', () => {




  const imageGroupName = window.name
    
  const imageGroup = document.getElementById('imageGroup');
 const imageName = document.getElementById('imageName');
      const deleteImage = document.getElementById('deleteImages')

      deleteImage.addEventListener('click', () => {
        unlinkSync(`./images/${imageGroupName}/${imageName.value}`)
        
        imageGroup.innerHTML = "";
        fs.readdir(`./images/${imageGroupName}/`, (err, files) => {
          files.forEach(file => {
            imageGroup.insertAdjacentHTML('beforeend', `<img src="./images/${imageGroupName}/${file}" id="${file}" height="50" height="50"
             style="border:1px solid black;margin:2px">`);
          });
          let images = document.querySelectorAll('img')
          for (i of images) {
           i.addEventListener('click', function() {
             console.log(this.id);
             document.getElementById('imageName').value = this.id
           });
         }
        });
      })
    

   



    })


