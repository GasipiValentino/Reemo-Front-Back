import { call } from './api.service'

export async function login(nombre, password){
    return call( {
        uri: 'usuario/login',
        method: 'POST',
        body: {nombre: nombre, password:password}
    } )
}