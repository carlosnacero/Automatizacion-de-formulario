import LoginPage from '../pages/LoginPage';

describe('Formulario de Cotización - Derco Blend', () => {
  beforeEach(() => {
    cy.visit('https://derco-blend.dercochile.soho.cl/') // Sitio QA 
  });

  it('Debe seleccionar modelo y versión Alto', () => {
    cy.contains('Alto').click();
    cy.contains('Siguiente').click();
    cy.get('.error').should('not.exist'); // Verifica que no haya error
  });

  it('Debe seleccionar ubicación válida', () => {
    cy.contains('Alto').click();
    cy.contains('Siguiente').click();

    cy.get('select[name="region"]').select('RM Región Metropolitana');
    cy.get('select[name="comuna"]').select('Santiago'); // Ajustar según opciones reales
    cy.get('select[name="concesionario"]').select(/.+/); // Selecciona el primer valor disponible
    
    cy.contains('Siguiente').click();
    cy.get('.error').should('not.exist'); // No errores
  });

  it('Debe permitir ingresar datos personales y enviar cotización', () => {
    cy.contains('Alto').click();
    cy.contains('Siguiente').click();
    cy.get('select[name="region"]').select('RM Región Metropolitana');
    cy.get('select[name="comuna"]').select('Santiago'); // Ajustar si necesario
    cy.get('select[name="concesionario"]').select(/.+/);
    cy.contains('Siguiente').click();

    // Datos personales
    cy.get('input[name="firstName"]').type('Carlos Alberto'); // Nombre
    cy.get('input[name="lastName"]').type('usuario@ejemplo.com');// Apellido
    cy.get('input[name="email"]').type('usuario@ejemplo.com'); // Email
    cy.get('input[name="telefono"]').type('912345678'); // Teléfono
    cy.get('input[name="rut"]').type('26840984-k'); // RUT válido
   
  
    // Preferencias
    cy.get('input[name="testDrive"][value="Sí"]').check();
    cy.get('input[name="financiamiento"][value="No"]').check();
    cy.get('input[name="contacto"][value="Email"]').check();

    cy.contains('Enviar cotización').click();
    cy.contains('Gracias por cotizar').should('exist'); // Mensaje de éxito esperado
  });

  it('Debe mostrar errores si faltan datos', () => {
    cy.contains('Alto').click();
    cy.contains('Siguiente').click();
    cy.get('select[name="region"]').select('RM Región Metropolitana');
    cy.get('select[name="comuna"]').select('Santiago');
    cy.get('select[name="concesionario"]').select(/.+/);
    cy.contains('Siguiente').click();

    // Sin ingresar datos
    cy.contains('Enviar cotización').click();

    // Validaciones HTML5
    cy.get('input:invalid').should('have.length.at.least', 1);
  });
});