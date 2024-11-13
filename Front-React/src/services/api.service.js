// asumimos que si no nos especifica el method, el mismo sea GET y que además, los datos se van a pasar por el body
export async function call( {uri, method = 'GET', body = undefined} ){
    return fetch(`http://localhost:3333/api/${uri}`,{
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
    .then( async(response) => {
        if( !response.ok ){
            if( response.status == 401 ){
                localStorage.removeItem('token')
            }
            throw await response.json()
        }
        return response.json()
    })
}