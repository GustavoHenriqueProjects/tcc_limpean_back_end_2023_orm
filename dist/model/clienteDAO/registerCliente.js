"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegisterCliente = exports.registerUser = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async function (dataBody) {
    console.log(dataBody);
    try {
        const statusEmail = await prisma.tbl_contratante.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
            },
        });
        const statusCPF = await prisma.tbl_dados_pessoais_contratante.findFirst({
            where: {
                cpf: dataBody.cpf,
            },
        });
        if (!statusEmail && !statusCPF) {
            const birthDate = new Date(dataBody.birthDate);
            birthDate.setHours(0, 0, 0, 0);
            const contratante = await prisma.tbl_contratante.create({
                data: {
                    email: dataBody.email.toLowerCase(),
                    senha: dataBody.password,
                },
            });
            const dadosPessoais = await prisma.tbl_dados_pessoais_contratante.create({
                data: {
                    nome: dataBody.nameUser,
                    cpf: dataBody.cpf,
                    data_nascimento: birthDate,
                    foto_perfil: dataBody.photoUser,
                    id_contratante: contratante.id,
                    id_genero: dataBody.idGender,
                },
            });
            await prisma.tbl_telefone_contratante.create({
                data: {
                    numero_telefone: dataBody.phone,
                    ddd: dataBody.ddd,
                    id_dados_pessoais_contratante: dadosPessoais.id,
                },
            });
            const estado = await prisma.tbl_estado.create({
                data: {
                    sigla: dataBody.dataResidence.address.stateAcronym.toUpperCase(),
                    nome: dataBody.dataResidence.address.state,
                },
            });
            const cidade = await prisma.tbl_cidade.create({
                data: {
                    nome: dataBody.dataResidence.address.city,
                    id_estado: estado.id,
                },
            });
            const endereco = await prisma.tbl_endereco.create({
                data: {
                    logradouro: dataBody.dataResidence.address.publicPlace?.toLowerCase(),
                    bairro: dataBody.dataResidence.address.district.toLowerCase(),
                    cep: dataBody.dataResidence.address.cep,
                    numero_residencial: dataBody.dataResidence.address.houseNumber,
                    complemento: dataBody.dataResidence.address.complement?.toLowerCase(),
                    id_cidade: cidade.id,
                },
            });
            await prisma.tbl_perfil_casa.create({
                data: {
                    quantidade_comodos: dataBody.dataResidence.numberRooms,
                    status_crianca: dataBody.dataResidence.haveChildren,
                    status_animal: dataBody.dataResidence.haveAnimal,
                    tipo_propriedade: dataBody.dataResidence.typeResidence.toLowerCase(),
                    informacao_adicional: dataBody.dataResidence.extraInformation,
                    id_endereco: endereco.id,
                    id_contratante: contratante.id,
                },
            });
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.registerUser = registerUser;
const deleteRegisterCliente = async function (dataBody) {
    let statusRegister = false;
    let deleteCliente = `delete from tbl_contratante where id = ${dataBody.id} and email = '${dataBody.email}'`;
    let status = await prisma.$executeRawUnsafe(deleteCliente);
    if (status) {
        statusRegister = true;
    }
    return statusRegister;
};
exports.deleteRegisterCliente = deleteRegisterCliente;
