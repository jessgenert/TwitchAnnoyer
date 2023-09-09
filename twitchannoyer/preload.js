
window.addEventListener('DOMContentLoaded', () => {
    const newImages = document.getElementById('newImages');
    newImages.addEventListener('click', () => {
        const imageGroupName =  document.getElementById('newImageGroup').value
        window.open('imagesPage.html', imageGroupName, 'top=500,left=200,frame=true,contextIsolation=false, nodeIntegration=yes')
       
    });
    
   
})