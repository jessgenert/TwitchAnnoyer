const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');


window.addEventListener('DOMContentLoaded', () => {
    let imageGroupNameDefault = document.getElementById('selectImages').value
    document.getElementById('newImageGroup').value = imageGroupNameDefault
    let selectImages = document.getElementById('selectImages');
    selectImages.addEventListener('change', () => {

        let imageGroupNameChange = document.getElementById('selectImages').value
        document.getElementById('newImageGroup').value = imageGroupNameChange

    });

    const newImages = document.getElementById('newImages');
    newImages.addEventListener('click', () => {

        let groupsSelected = document.getElementById('selectImages')
        let imageGroupName = document.getElementById('newImageGroup').value

        if (groupsSelected.innerHTML.includes(imageGroupName)) { return }


        const makeNewDir = async () => {
            try {
                const projectFolder = join(__dirname, 'images', imageGroupName);
                const createDir = await mkdir(projectFolder, { recursive: true });

                console.log(`created ${createDir}`);
            } catch (err) {
                console.error(err.message);
            }
        }

        makeNewDir()
        let newOption = document.createElement('option')
        newOption.text = imageGroupName
        document.getElementById('selectImages').add(newOption)
        window.open('imagesPage.html', imageGroupName, 'top=500,left=200,frame=true,contextIsolation=false, nodeIntegration=yes')

    });

    let editImages = document.getElementById('edit');
    editImages.addEventListener('click', () => {

        let imageGroupNameEdit = document.getElementById('newImageGroup').value
        window.open('imagesPage.html', imageGroupNameEdit, 'top=500,left=200,frame=true,contextIsolation=false, nodeIntegration=yes')

    });


});