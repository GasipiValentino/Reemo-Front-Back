import { call } from './api.service'

export async function edit(id, vehiculo) {
    return call({
        uri: `car/edit/${id}`,
        method: 'PATCH',
        body: vehiculo
    });
}


// export async function register(email, password) {
//   return call( {
//     uri: 'usuarios',
//     method: 'POST',
//     body: {email: email, password:password}
//   } )
// }