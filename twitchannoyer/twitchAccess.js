var { ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
    function getAccess() {

        const auth = document.getElementById('auth')
        auth.addEventListener('click', () => {
            ipcRenderer.send('redirect:add');

        })

    }

    getAccess()
})