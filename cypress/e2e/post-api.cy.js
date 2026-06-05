/// <reference types="cypress"/>

describe('Cadastro de  dispositivos', () => {
    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json');

    it('Cadastrar um dispositivo', () => {
        const dataAtual = new Date().toISOString().slice(0, 16);

        cy.cadastrarDevice(payload_cadastro_device).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.id).not.empty;
            expect(response.body.name).equal(payload_cadastro_device.name);
            expect(response.body.data.year).equal(payload_cadastro_device.data.year);
            expect(response.body.data.price).equal(payload_cadastro_device.data.price);
            expect(response.body.data['CPU model']).equal('Intel Core i9');
            expect(response.body.data['Hard disk size']).equal('1 TB');
            const dadoAlterado = new Date(response.body.createdAt).toISOString();
            expect(dadoAlterado.slice(0, 16)).equal(dataAtual);
        });
    });

    it('Cadastrar dispositivo sem mandar dados', () => {
        cy.cadastrarDevice('').then((response) => {
            expect(response.status).equal(400);
            expect(response.body.error).equal('Request body is missing');
        });
    });
});
