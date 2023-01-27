const getData = async(url, data = {}) => {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        redirect: 'follow'
    })
    return response.json()
}