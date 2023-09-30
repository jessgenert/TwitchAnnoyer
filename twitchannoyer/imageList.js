
const fs = require('fs');
const fsPromises = require('fs').promises
window.addEventListener('DOMContentLoaded', () => {


  let imageName
  const imageGroupName = window.name;

  const imageGroup = document.getElementById('imageGroup');

  fs.readdir(`./images/${imageGroupName}/`, (err, files) => {
    files.forEach(file => {
      imageGroup.insertAdjacentHTML('beforeend', `<img src="./images/${imageGroupName}/${file}" class="img" id="${file}" height="50" height="50"
       style="border:1px solid black;margin:2px">`);

    })

    let images = document.querySelectorAll('img')
    for (i of images) {
      i.addEventListener('click', function () {
        document.getElementById('imageName').value = this.id.slice(0, this.id.length - 4)
        imageName = document.getElementById('imageName').value
      });
    }


  });


  let newImageName;
  const imageNameChange = document.getElementById('imageName')
  imageNameChange.addEventListener('change', () => {
    newImageName = document.getElementById('imageName').value
  })

  const renameImages = document.getElementById('renameImages')
  renameImages.addEventListener('click', () => {
    fsPromises.rename(`./images/${imageGroupName}/${imageName}.png`, `./images/${imageGroupName}/${newImageName}.png`, fs.constants.COPYFILE_EXCL)
    imageGroup.innerHTML = ""
    setTimeout(() => {
      fs.readdir(`./images/${imageGroupName}/`, (err, files) => {

        files.forEach(file => {
          imageGroup.insertAdjacentHTML('beforeend', `<img src="./images/${imageGroupName}/${file}" class="img" id="${file}" height="50" height="50" style="border:1px solid black;margin:2px">`);
        })
        let images = document.querySelectorAll('img')
        for (i of images) {
          i.addEventListener('click', function () {
            document.getElementById('imageName').value = this.id.slice(0, this.id.length - 4)
            imageName = document.getElementById('imageName').value
          });
        }
      });

    }, 100)

  })

  document.getElementById('imageGroupName').value = imageGroupName;

})