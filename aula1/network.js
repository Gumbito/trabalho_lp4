// ============================================================
// network.js — a camada de REDE do jogo (Aula 1: versão "de mentirinha")
// ------------------------------------------------------------
// SEPARAÇÃO DE RESPONSABILIDADES (em linguagem simples):
//   - game.js cuida da LÓGICA do jogo (cobra, comida, colisão).
//   - ui.js cuida da TELA (mostrar score, telas, game over).
//   - network.js cuida da COMUNICAÇÃO (salvar score, falar com o servidor).
// Cada arquivo tem UM trabalho. Assim, quando a Aula 2 trocar o jeito de
// guardar os scores (de localStorage para servidor de verdade), só este
// arquivo muda — game.js e ui.js continuam iguais.
// ============================================================

// Na Aula 1 ainda não existe servidor. Estas funções "fingem" a rede
// usando o próprio browser (localStorage). Na Aula 2 elas viram reais.

// ------------------------------------------------------------
// Envia um evento para o servidor.
// Aula 1: só imprime no console. Aula 2: vai mandar pelo WebSocket.
// ------------------------------------------------------------
function enviarParaServidor(tipo, dados) {
  console.log("[rede] enviarParaServidor:", tipo, dados);
}

// ------------------------------------------------------------
// Salva um score. Aula 1: guarda no localStorage (top-10, maior primeiro).
// Aula 2: vai fazer um POST para /api/score no servidor C#.
// ------------------------------------------------------------
function salvarScore(nome, score) {
  var lista = JSON.parse(localStorage.getItem("scores") || "[]");
  lista.push({ nome: nome, score: score });
  // Ordena do maior score para o menor.
  lista.sort(function (a, b) { return b.score - a.score; });
  // Mantém só os 10 melhores.
  lista = lista.slice(0, 10);
  localStorage.setItem("scores", JSON.stringify(lista));
}

// ------------------------------------------------------------
// Busca o leaderboard e entrega para quem pediu via callback.
// Aula 1: lê do localStorage. Aula 2: vai fazer GET /api/leaderboard.
// ------------------------------------------------------------
function buscarLeaderboard(callback) {
  var lista = JSON.parse(localStorage.getItem("scores") || "[]");
  callback(lista);
}

// ------------------------------------------------------------
// Conecta ao servidor multiplayer.
// Aula 1: não faz nada (não existe servidor ainda).
// Aula 2: vai abrir o WebSocket e entrar no jogo de todo mundo.
// ------------------------------------------------------------
function conectar(nome, perfil) {
  // (vazio de propósito na Aula 1)
}

// Retorna o maior score já salvo localmente (o "recorde local").
function recordeLocal() {
  var lista = JSON.parse(localStorage.getItem("scores") || "[]");
  return lista.length > 0 ? lista[0].score : 0;
}

// Pronto para a Aula 1 — versão completa
