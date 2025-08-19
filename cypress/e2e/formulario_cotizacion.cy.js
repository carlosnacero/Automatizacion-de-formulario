import LoginPage from '../pages/LoginPage';

describe('Formulario de Cotización - Derco Blend', () => {
  beforeEach(() => {
    cy.visit('https://derco-blend.dercochile.soho.cl/') // Sitio QA 
  });

  // Espera a que aparezca y haz clic en el botón "Entendido"
cy.contains('button', 'Entendido').click();

  it('Debe seleccionar modelo y versión Alto', () => {
    cy.contains('Alto').click();
    cy.contains('Cotizar').click();
    cy.get('.error').should('not.exist'); // Verifica que no haya error
  });

  it('Debe seleccionar ubicación válida', () => {


    cy.get('select[name="select-region"]').select('RM Región Metropolitana');
    cy.get('select[name="selectComuna"]').select('Santiago'); // Ajustar según opciones reales
    cy.get('select[name="selectSubsidiary"]').select(/.+/); // Selecciona el primer valor disponible
    
    cy.contains('Siguiente').click();
    cy.get('.error').should('not.exist'); // No errores
  });

  it('Debe permitir ingresar datos personales y enviar cotización', () => {

    // Datos personales
    cy.get('input[name="firstName"]').type('Carlos Alberto'); // Nombre
    cy.get('input[name="lastName"]').type('usuario@ejemplo.com');// Apellido
    cy.get('input[name="email"]').type('usuario@ejemplo.com'); // Email
    cy.get('input[name="telefono"]').type('912345678'); // Teléfono
    cy.get('input[name="rut"]').type('26840984-k'); // RUT válido
   
  
    // Preferencias
    cy.get('input[name="checkConditions"]').check();
    cy.get('input[name="checkContactDerco"]').check();
    cy.contains('Siguiente').click();

    // Paso 3

    cy.contains('Realizar cotización').click();
    cy.contains('Tu solicitud ha sido recibida con éxito').should('exist'); // Mensaje de éxito esperado
  });
});
