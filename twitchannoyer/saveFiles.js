
const { copyFileSync } = require('node:fs');

window.addEventListener('DOMContentLoaded', () => {
let selectedFile
    const fileInput = document.getElementById('formFile');
    fileInput.addEventListener('change', () => {
      selectedFile = fileInput.files[0];
    })
    const addImages = document.getElementById('addImages')
    const imageGroupName = window.name
    addImages.addEventListener('click', () => {
    
        
         copyFileSync(`${selectedFile.path}`, `./images/${imageGroupName}/${selectedFile.name}`, fs.constants.COPYFILE_EXCL)
        

         const imageGroup = document.getElementById('imageGroup');
         imageGroup.innerHTML = "";
         
         fs.readdir(`./images/${imageGroupName}/`, (err, files) => {
             files.forEach(file => {
               imageGroup.insertAdjacentHTML('beforeend',`<img src="./images/${imageGroupName}/${file}" class="img" id="${file}" height="50" height="50" style="border:1px solid black;margin:2px">`);
             });
           });
    
  })

})