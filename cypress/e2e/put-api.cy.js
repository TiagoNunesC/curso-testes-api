/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {
    it('Alterar um dispositivo', () => {
        const body_cadastro = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2019,
                price: 2049.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB',
                color: 'silver',
            },
        };

        const body_update = {
            name: 'Apple Iphone Pro 17',
            data: {
                year: 2026,
                price: 8049.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB',
                color: 'gray',
            },
        };

        const dataAtual = new Date().toISOString().slice(0, 16);

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro,
        }).as('postDeviceResult');

        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200);
            expect(response_post.body.name).equal(body_cadastro.name);

            cy.atualizarDevice(response_post.body.id, body_update).then(
                (response_put) => {
                    expect(response_put.status).equal(200);
                    expect(response_put.body.name).equal(body_update.name);
                    expect(response_put.body.data.year).equal(
                        body_update.data.year,
                    );
                    expect(response_put.body.data.price).equal(
                        body_update.data.price,
                    );
                    expect(response_put.body.data['CPU model']).equal(
                        body_update.data['CPU model'],
                    );
                    expect(response_put.body.data['Hard disk size']).equal(
                        body_update.data['Hard disk size'],
                    );
                    expect(response_put.body.data.color).equal(
                        body_update.data.color,
                    );
                    const updatedAt = new Date(
                        response_put.body.updatedAt,
                    ).toISOString();
                    expect(updatedAt.slice(0, 16)).equal(dataAtual);
                },
            );
        });
    });
});
