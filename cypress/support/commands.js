Cypress.Commands.add('buscarDeviceEspecifico', (device_id) => {
    cy.request({
        method: 'GET',
        url: `/objects/${device_id}`,
        failOnStatusCode: false,
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('cadastrarDevice', (payload) => {
    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: payload,
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('deletarDevice', (id) => {
    cy.request({
        method: 'DELETE',
        url: `/objects/${response.body.id}`,
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('atualizarDevice', (id, body_update) => {
    cy.request({
        method: 'PUT',
        url: `/objects/${id}`,
        body: body_update,
    }).then((response) => {
        return response;
    });
});
