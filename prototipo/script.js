// Pegando elementos do HTML
const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

// Etapas da conversa com o usuário
let etapa = 0;
let nome = "";

// Função que adiciona uma mensagem no chat (de usuário ou bot)
function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`; // Define se é 'user' ou 'bot'
  msg.innerText = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight; // Rola para a última mensagem
}

// Quando clica no botão 'Enviar' ou digita algo
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, "user"); // Mostra a mensagem do usuário
  input.value = "";

  // Simula o bot respondendo depois de meio segundo
  setTimeout(() => responder(text.toLowerCase()), 500);
}

// Lógica da resposta do bot, de acordo com a etapa
function responder(msg) {
  if (etapa === 0) {
    appendMessage("Olá, bem-vindo ao chat da barbearia. No que posso ajudar hoje?", "bot");
    appendMessage("(1) Marcar horário\n(2) Tirar dúvidas de preços\n(3) Falar com um atendente", "bot");
    etapa = 1;
  } else if (etapa === 1) {
    if (msg.includes("1")) {
      appendMessage("Perfeito! Qual o seu nome?", "bot");
      etapa = 2;
    } else if (msg.includes("2")) {
      appendMessage("Os cortes custam R$30, barba R$20, combo R$45. Deseja marcar um horário?", "bot");
    } else if (msg.includes("3")) {
      appendMessage("Um atendente entrará em contato em breve. Obrigado!", "bot");
    } else {
      appendMessage("Opção inválida. Por favor, digite 1, 2 ou 3.", "bot");
    }
  } else if (etapa === 2) {
    nome = msg;
    appendMessage(`Muito bem, ${nome}. Temos os horários: 14h, 15h ou 17h. Qual prefere?`, "bot");
    etapa = 3;
  } else if (etapa === 3) {
    let slot = "";

    // Verifica qual horário o usuário escolheu
    if (msg.includes("14")) slot = "slot1";
    else if (msg.includes("15")) slot = "slot2";
    else if (msg.includes("17")) slot = "slot3";

    if (slot) {
      // Marca o horário na agenda da página
      document.getElementById(slot).innerText = `${nome} - Corte`;
      document.getElementById(slot).classList.add("booked");

      // Confirmação
      appendMessage(`Horário marcado para ${nome} às ${document.getElementById(slot).innerText.split(" - ")[0]}. Até breve!`, "bot");

      // Reinicia o fluxo
      etapa = 0;
    } else {
      appendMessage("Horário inválido. Digite 14h, 15h ou 17h.", "bot");
    }
  }
}
