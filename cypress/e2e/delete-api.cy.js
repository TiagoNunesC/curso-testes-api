/// <reference types="cypress"/>

describe('Deletar dispositivos', () => {
    it('Deletar um dispositivo', () => {
        const body = {
            name: 'Celular da QAZANDO',
            data: {
                year: 2029,
                price: 4849.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB',
            },
        };
        const dataAtual = new Date().toISOString().slice(0, 10);

        cy.cadastrarDevice(body).then((response) => {
            expect(response.status).equal(200);

            cy.request({
                method: 'DELETE',
                url: `/objects/${response.body.id}`,
                failOnStatusCode: false,
            }).as('deleteDeviceResult');

            cy.get('@deleteDeviceResult').then((response_delete) => {
                expect(response_delete.status).equal(200);
                expect(response_delete.body.message).equal(
                    `Object with id = ${response.body.id} has been deleted.`,
                );
            });
        });
    });

    it('Deletar dispositivo não existente', () => {
        const id_inexistente = 'id_inexistente';

        cy.deletarDevice(id_inexistente).then((response_delete) => {
            expect(response_delete.status).equal(404);
            expect(response_delete.body.error).equal(
                `Object with id = ${id_inexistente} doesn't exist.`,
            );
        });
    });

    it('Deletar dispositivo que não pode ser deletado', () => {
        const id = '7';

        cy.deletarDevice(id).then((response_delete) => {
            expect(response_delete.status).equal(405);
            expect(response_delete.body.error).equal(
                `${id} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`,
            );
        });
    });
});
