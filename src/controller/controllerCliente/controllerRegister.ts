import * as message from "../../modulo/config"
import * as validate from "./validate/validateRegister"
import * as cliente from "../../model/clienteDAO/registerCliente"

interface Cliente {
    id: number,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    dataResidence: {
        numberRooms: number,
        haveChildren: boolean,
        haveAnimal: boolean,
        typeResidence: string,
        extraInformation: string | null,
        address: {
            state: string,              // Estado
            stateAcronym: string,       // Sigla estado
            city: string,               // Cidade
            cep: string,                // CEP
            publicPlace: string | null, // Logradouro
            complement: string | null,  // Complemento
            district: string,           // Bairro
            road: string,               // Rua
            houseNumber: number         // Numero da casa
        }
    }
}

const registerCliente = async function (body: Cliente) {
    
    let statusRegisterCliente
    
    if (
        !body.email || !body.password || body.password.length < 6 ||
        !body.nameUser || body.nameUser.length < 2 || !body.photoUser ||
        !body.phone || !body.birthDate || !body.idGender ||
        !body.cpf || !body.ddd || (body.biography !== null && typeof body.biography !== 'string')
    ) {
        statusRegisterCliente = message.ERRO_REQUIRED_DATA_CLIENTE
    } else if (body.ddd.length != 2 || !validate.validatePhoneWithDDD(body.ddd, body.phone)) {
        statusRegisterCliente = message.ERRO_NUMBER_PHONE
    } else if (!validate.validateEmail(body.email)) {
        statusRegisterCliente = message.ERRO_REGISTER_EMAIL
    } else if (!validate.validateCPF(body.cpf, body.birthDate)) {
        statusRegisterCliente = message.ERRO_CPF_BIRTHDATE
    } else if (!validate.validadeAddress(body.dataResidence.address)){
        statusRegisterCliente = message.ERRO_ADDRESS
    }else {

        let status = await cliente.registerUser(body)

        if (status) {

            statusRegisterCliente = message.CREATED_REGISTER
        } else {

            statusRegisterCliente = message.ERRO_REGISTER_USER
        }

    }

    return statusRegisterCliente
}

const deleteRegisterCliente = async function (body: Cliente) {
    let statusDeleteCliente

    if (typeof body.id != "number" || !validate.validateEmail(body.email)) {
        statusDeleteCliente = message.ERRO_DELETE_USER
    } else {

        let status = await cliente.deleteRegisterCliente(body)

        if (status) {

            statusDeleteCliente = message.DELETE_CLIENTE
        } else {
            statusDeleteCliente = message.ERRO_DELETE_USER
        }

    }

    return statusDeleteCliente
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
    registerCliente,
    deleteRegisterCliente
    //autenticarUser
}