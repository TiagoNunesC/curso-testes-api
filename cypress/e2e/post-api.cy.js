/// <reference types="cypress"/>

describe('Cadastro de  dispositivos', () => {
    it('Cadastrar um dispositivo', () => {
        const body = {
            name: 'Celular da QAZANDO',
            data: {
                year: 2026,
                price: 5849.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB',
            },
        };
        const dataAtual = new Date().toISOString().slice(0, 16);

        cy.cadastrarDevice(body).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.id).not.empty;
            expect(response.body.name).equal(body.name);
            expect(response.body.data.year).equal(body.data.year);
            expect(response.body.data.price).equal(body.data.price);
            expect(response.body.data['CPU model']).equal('Intel Core i9');
            expect(response.body.data['Hard disk size']).equal('1 TB');
            const dadoAlterado = new Date(
                response.body.createdAt,
            ).toISOString();
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
