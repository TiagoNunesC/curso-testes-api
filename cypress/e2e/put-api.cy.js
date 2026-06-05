/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {
    const payload_cadastro_sucesso = require('../fixtures/cadastrar_device_sucesso.json');

    const payload_update_sucesso = require('../fixtures/update_device_sucesso.json');

    it('Alterar um dispositivo', () => {
        const dataAtual = new Date().toISOString().slice(0, 16);

        cy.cadastrarDevice(payload_cadastro_sucesso).then((response_post) => {
            expect(response_post.status).equal(200);
            expect(response_post.body.name).equal(payload_cadastro_sucesso.name);

            cy.atualizarDevice(response_post.body.id, payload_update_sucesso).then((response_put) => {
                expect(response_put.status).equal(200);
                expect(response_put.body.name).equal(payload_update_sucesso.name);
                expect(response_put.body.data.year).equal(payload_update_sucesso.data.year);
                expect(response_put.body.data.price).equal(payload_update_sucesso.data.price);
                expect(response_put.body.data['CPU model']).equal(payload_update_sucesso.data['CPU model']);
                expect(response_put.body.data['Hard disk size']).equal(payload_update_sucesso.data['Hard disk size']);
                expect(response_put.body.data.color).equal(payload_update_sucesso.data.color);
                const updatedAt = new Date(response_put.body.updatedAt).toISOString();
                expect(updatedAt.slice(0, 16)).equal(dataAtual);
            });
        });
    });
});
