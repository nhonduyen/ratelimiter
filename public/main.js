const initApp = async () => {
    const btnGet = document.getElementById('btnGet')
    const lblResult = document.getElementById('lblResult')

    btnGet.addEventListener('click', async() => {
        lblResult.innerHTML = ''
        try {
            const url = '/api'
            const data = await getData(url);
            lblResult.innerHTML = JSON.stringify(data)
        } catch (exception) {
            console.log(exception) 
            lblResult.innerHTML = `Message: ${exception.message}; Stack: ${exception.stack}`
        }
    })

   
}

document.addEventListener('DOMContentLoaded', initApp())