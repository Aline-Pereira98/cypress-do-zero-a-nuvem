describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatorios e envia o formulario', () => {
    const longText = Cypress._.repeat('abcacbacbacbaacacbacbacbacab', 20)
    cy.get('#firstName').should('be.visible').type('Aline')
    cy.get('#lastName').should('be.visible').type('Rocha')
    cy.get('#email').should('be.visible').type('email@email.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  //exercise 2
  it('exibe mensagem de erro ao submeter ao formulario com um email com formatacao invalida', () => {
    cy.get('#firstName').should('be.visible').type('Aline')
    cy.get('#lastName').should('be.visible').type('Rocha')
    cy.get('#email').should('be.visible').type('email@email@.com')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  // exercise 3
  it('campo telefone continua vazio quando preenchido com um valor nao-numerico', () => {
    cy.get('#phone')
      .should('be.visible')
      .type('dasdsa')
      .should('have.value', '')
  });

  // exercise 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').should('be.visible').type('Aline')
    cy.get('#lastName').should('be.visible').type('Rocha')
    cy.get('#email').should('be.visible').type('email@email.com')
    cy.get('#open-text-area').should('be.visible').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  // exercise 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Aline').should('have.value', 'Aline').clear().should('have.value', '')
    cy.get('#lastName').type('Rocha').should('have.value', 'Rocha').clear().should('have.value', '')
    cy.get('#email').type('email@email.com').should('have.value', 'email@email.com').clear().should('have.value', '')
    cy.get('#phone').type('31313131').should('have.value', '31313131').clear().should('have.value', '')
  });

  // exercise 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  // exercise 7
  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Carolina',
      lastName: 'Menezes',
      email: 'carolina@email.com',
      text: 'Teste'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })
  });

   it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  });
})