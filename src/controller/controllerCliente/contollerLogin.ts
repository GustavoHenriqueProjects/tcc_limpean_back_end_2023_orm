import * as message from "../../modulo/config"
import * as validate from "./validate/validateRegister"
import * as cliente from "../../model/dbLogin"


interface RegisterCliente {
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    gender: number,
    cpf: string
}

const registerCliente = async function (body: RegisterCliente) { 
        
    let statusRegisterCliente 

    if (
        !body.email    || !body.password           || body.password.length < 6 ||
        !body.nameUser || body.nameUser.length < 2 || !body.photoUser          ||
        !body.phone    || !body.birthDate          || !body.gender             ||
        !body.cpf      || !body.ddd
    ) {
        statusRegisterCliente =  message.ERRO_REQUIRED_DATA_CLIENTE 
    }else if(body.ddd.length != 2 || !validate.validatePhoneWithDDD(body.ddd, body.phone)){
        statusRegisterCliente = message.ERRO_NUMBER_PHONE
    }else if (!validate.validateEmail(body.email)){
        statusRegisterCliente = message.ERRO_REGISTER_EMAIL 
    }else if(!validate.validateCPF(body.cpf, body.birthDate)){
        statusRegisterCliente = message.ERRO_CPF_BIRTHDATE 
    } else {

            let status = await cliente.registerUser(body)

            if(status){
    
                statusRegisterCliente = message.CREATED_REGISTER
            }else{
                statusRegisterCliente = message.ERRO_REGISTER_USER
            }
        
    }

    return statusRegisterCliente
}

// interface AuthenticatorUser {
//     email: string,
//     password: string
// }

// const autenticarUser = async function (dataBody: AuthenticatorUser) {

//     if (
//         dataBody.email == '' || dataBody.email == null ||
//         dataBody.password == '' || dataBody.password == null
//     ) {
//         return false
//     } else {
//         try {
//             // Import do arquivo de funções
//             const jwt = require('../middleware/controllerJWT');

//             const dataUser = await login.verifyAccountUser(dataBody);

//             if (dataUser) {
//                 const token = await jwt.createJWT(dataUser[0]);
//                 let statusJson = {
//                     id: dataUser[0].id,
//                     name: dataUser[0].nome,
//                     token: token
//                 }
//                 console.log(statusJson)
//                 return statusJson;
//             } else {
//                 return false;
//             }
//         } catch (error) {
//             console.error('Erro durante autenticação:', error);
//             return false;
//         }
//     }

// }


export {
    registerCliente
    //autenticarUser
}