const { ipcRenderer } = require('electron');


const querystring = require('querystring');


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


    let query = querystring.parse(global.location.search)
    let data = JSON.parse(query['?data'])
    console.log(data.displays[0].label)
    data.displays.forEach(display => {
        console.log(display)
        let newOption = document.createElement('option')
        newOption.text = display.label
        document.getElementById('selectScreen').add(newOption)
    })


    let loadDisplay = document.getElementById('load')
    loadDisplay.addEventListener('click', () => {

        let selectDisplay = document.getElementById('selectScreen').value
        let currentDisplay = data.displays.filter(display => { return display.label === selectDisplay })[0]

        ipcRenderer.send('main:add', currentDisplay);

    })

});