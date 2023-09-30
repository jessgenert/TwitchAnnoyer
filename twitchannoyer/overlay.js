var { ipcRenderer } = require('electron')
const querystring = require('querystring');
window.addEventListener('DOMContentLoaded', () => {
    function loadOverlay() {

        let query = querystring.parse(global.location.search)
        let data = JSON.parse(query['?data'])
        data.displays.forEach(display => {
            let newOption = document.createElement('option')
            newOption.text = display.label
            document.getElementById('selectScreen').add(newOption)
        })



        let loadDisplay = document.getElementById('load')
        loadDisplay.addEventListener('click', () => {

            let selectDisplay = document.getElementById('selectScreen').value
            let currentDisplay = data.displays.filter(display => { return display.label === selectDisplay })[0]
            window.localStorage.setItem('twitchChannel', `#${document.getElementById('twitchChannel').value}`)
            window.localStorage.setItem('imageGroupName', document.getElementById('newImageGroup').value)
            ipcRenderer.send('main:add', currentDisplay);

        })

    }

    loadOverlay()
})