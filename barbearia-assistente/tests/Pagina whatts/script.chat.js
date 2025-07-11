// === Funções principais ===
function enviarMensagem() {  }
function simularRespostaBot() {  }
function simularRespostaHTML() {  }
function responderOpcao() {  }

// === Fluxos de conversa ===
function iniciarAgendamento() { }
function finalizarAgendamento() { }

// === Captura de respostas ===
function aguardarRespostaUsuario() {  }



function enviarMensagem() {
  const input = document.getElementById('mensagemInput');
  const mensagem = input.value.trim();
  const chatBody = document.getElementById('chatBody');
  const notificacao = document.getElementById('notificacao');

  if (mensagem !== '') {
    if (notificacao) notificacao.remove();

    const div = document.createElement('div');
    div.classList.add('message', 'user');
    div.innerText = mensagem;
    chatBody.appendChild(div);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Primeira mensagem automática
    simularRespostaBot("Olá, sou Gael, o assistente virtual da Barbearia Almeida 💈. É um prazer recebê-lo! Estou aqui para guiá-lo nas opções de atendimento e garantir que sua experiência conosco seja impecável. Vamos começar com as opções de atendimento disponíveis.");

    // Segunda mensagem com botões (após 3 segundos no total)
    setTimeout(() => {
      simularRespostaHTML(`
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button onclick="responderOpcao('Agendar um horário')" class="botao-opcao">✅ Agendar um horário</button>
          <button onclick="responderOpcao('Consultar preços e serviços')" class="botao-opcao">💲 Consultar preços e serviços</button>
          <button onclick="responderOpcao('Falar com um atendente')" class="botao-opcao">📞 Falar com um atendente</button>
          <button onclick="responderOpcao('Cancelar horário')" class="botao-opcao">⚠️ Cancelar horário</button>
        </div>
      `);
    }, 3000);
  }
}

// Função normal (para textos simples)
function simularRespostaBot(respostaTexto) {
  const chatBody = document.getElementById('chatBody');

  const typing = document.createElement('div');
  typing.classList.add('message', 'bot');
  typing.id = 'typing';
  typing.innerText = 'digitando...';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    typing.remove();

    const resposta = document.createElement('div');
    resposta.classList.add('message', 'bot');
    resposta.innerText = respostaTexto;
    chatBody.appendChild(resposta);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1500);
}

// Função nova (para mensagens com HTML, como botões)
function simularRespostaHTML(conteudoHTML) {
  const chatBody = document.getElementById('chatBody');

  const typing = document.createElement('div');
  typing.classList.add('message', 'bot');
  typing.id = 'typing';
  typing.innerText = 'digitando...';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    typing.remove();

    const resposta = document.createElement('div');
    resposta.classList.add('message', 'bot');
    resposta.innerHTML = conteudoHTML;
    chatBody.appendChild(resposta);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1500);
}

// Clique em uma das opções
function responderOpcao(opcaoTexto) {
  const chatBody = document.getElementById('chatBody');

  const div = document.createElement('div');
  div.classList.add('message', 'user');
  div.innerText = opcaoTexto;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;

  if (opcaoTexto === 'Agendar um horário') {
    iniciarAgendamento(); // chama o fluxo específico
  } else if (opcaoTexto === 'Consultar preços e serviços') {
    simularRespostaBot("Claro! Aqui estão nossos serviços e preços:");
  } else if (opcaoTexto === 'Falar com um atendente') {
    simularRespostaBot("Certo, vou encaminhá-lo para um atendente. Aguarde um momento...");
  } else if (opcaoTexto === 'Cancelar horário') {
    simularRespostaBot("Entendido. Por favor, informe o nome ou horário da reserva que deseja cancelar.");
  }
}



function aguardarRespostaUsuario(callback) {
  const input = document.getElementById('mensagemInput');
  const botao = document.querySelector('button');

  const listener = () => {
    const valor = input.value.trim();
    if (valor !== '') {
      botao.removeEventListener('click', listener); // remove pra evitar múltiplas execuções
      callback(valor);

      const chatBody = document.getElementById('chatBody');
      const div = document.createElement('div');
      div.classList.add('message', 'user');
      div.innerText = valor;
      chatBody.appendChild(div);

      input.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  botao.addEventListener('click', listener);
}


// ==========================
// Fluxo: Agendar um Horário
// ==========================

function iniciarAgendamento() {
  simularRespostaBot("Me conte, qual o melhor dia e horário para você agendar conosco?");
  
  aguardarRespostaUsuario((respostaCliente) => {
    const horarioEscolhido = respostaCliente;

    simularRespostaBot(`Opa, perfeito! Temos um horário disponível para ${horarioEscolhido}. Vou deixar agendado pra você.`);

    setTimeout(() => {
      simularRespostaBot("Agora, antes de encerrar, preciso de mais uma informação: qual o serviço que você deseja?");
      
      setTimeout(() => {
        simularRespostaHTML(`
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button onclick="finalizarAgendamento('${horarioEscolhido}', 'Corte de cabelo')" class="botao-opcao">💇‍♂️ Corte de cabelo</button>
            <button onclick="finalizarAgendamento('${horarioEscolhido}', 'Barba')" class="botao-opcao">🧔 Barba</button>
            <button onclick="finalizarAgendamento('${horarioEscolhido}', 'Sobrancelha')" class="botao-opcao">👁️ Sobrancelha</button>
            <button onclick="finalizarAgendamento('${horarioEscolhido}', 'Combo completo')" class="botao-opcao">💈 Combo completo</button>
          </div>
        `);
      }, 1500);
    }, 1500);
  });
}

// ==========================
// Finalização do Agendamento
// ==========================

function finalizarAgendamento(dataHora, servico) {
  const chatBody = document.getElementById('chatBody');

  const div = document.createElement('div');
  div.classList.add('message', 'user');
  div.innerText = servico;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;

  simularRespostaBot(`Fechou! Seu corte está marcado para ${dataHora} com o serviço: ${servico}.`);
  
  setTimeout(() => {
    simularRespostaBot("Muito obrigado pela atenção e até mais! ✂️💈");
  }, 1500);
}
