// asumimos que si no nos especifica el method, el mismo sea GET y que además, los datos se van a pasar por el body
export async function call({ uri, method = 'GET', body = undefined, params = {} }) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `http://localhost:3333/api/${uri}${queryString ? `?${queryString}` : ''}`;
    console.log('URL completa:', fullUrl);

    return fetch(fullUrl, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
        },
    })
    .then(async (response) => {
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
            }
            throw await response.json().catch(() => ({
                message: 'Error desconocido',
            })); 
        }

        if (response.status === 204) {
            return null; 
        }

        return response.json(); 
    });
}
