import LoginPage from '../pages/LoginPage';

describe('Formulario de Cotización - Derco Blend', () => {
  it('Llena y envía el formulario correctamente', () => {
    cy.visit('https://derco-blend.dercochile.soho.cl/');

    // Espera que cargue el formulario o sección de interés
    cy.contains('Cotiza', { timeout: 10000 }).should('be.visible');

    // Scroll o click si es necesario para mostrar el formulario
    cy.get('button').contains('Cotiza').click();

    // Completar los campos del formulario (ajustar los selectores según el DOM real)
    cy.get('input[name="nombre"]').type('Carlos Nacero');
    cy.get('input[name="email"]').type('carlosnacero@soho.cl');
    cy.get('input[name="telefono"]').type('987654321');

    // Si hay selects o dropdowns
    cy.get('select[name="modelo"]').select('Sail');
    cy.get('select[name="ciudad"]').select('Santiago');

    // Aceptar términos si es necesario
    cy.get('input[type="checkbox"]').check();

    // Enviar el formulario
    cy.get('button').contains('Enviar').click();

    // Verificar mensaje de éxito o comportamiento esperado
    cy.contains('Gracias por tu cotización').should('be.visible');
  });
});
