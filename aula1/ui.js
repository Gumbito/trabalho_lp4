// ============================================================
// ui.js — tudo que mexe na TELA (telas, score, game over, leaderboard)
// Este arquivo está completo. Você não precisa editar nada aqui.
// ============================================================

// Variável global com o nome do jogador (preenchida ao clicar em Jogar).
var nomeJogador = "";

// ------------------------------------------------------------
// 1) Aplica a APARÊNCIA do CONFIG (cores, fontes, layout) nas variáveis CSS.
// Assim, mudar qualquer detalhe visual no config.js muda o CSS automaticamente.
// ------------------------------------------------------------
(function aplicarAparenciaDoConfig() {
  var raiz = document.documentElement.style;

  // Cores principais
  raiz.setProperty("--cor-fundo", CONFIG.cor_fundo);
  raiz.setProperty("--cor-cobra-cabeca", CONFIG.cor_cobra_cabeca);
  raiz.setProperty("--cor-comida", CONFIG.cor_comida);
  raiz.setProperty("--cor-texto", CONFIG.cor_texto);

  // Layout e fontes (seção "Layout e aparência" do config.js)
  raiz.setProperty("--fonte-jogo", CONFIG.fonte_jogo);
  raiz.setProperty("--fonte-score", CONFIG.fonte_score);
  raiz.setProperty("--cor-texto-score", CONFIG.cor_texto_score);
  raiz.setProperty("--cor-painel", CONFIG.cor_painel);
  raiz.setProperty("--cor-botao", CONFIG.cor_botao);
  raiz.setProperty("--cor-borda-canvas", CONFIG.cor_borda_canvas);
  raiz.setProperty("--largura-borda-canvas", CONFIG.largura_borda_canvas + "px");
  raiz.setProperty("--raio-borda-canvas", CONFIG.raio_borda_canvas + "px");

  // Título da tela de início
  var titulo = document.querySelector("#tela-inicio h1");
  if (titulo) titulo.textContent = CONFIG.titulo_jogo;

  // Lado do painel: "direita" (padrão) ou "esquerda" (inverte a ordem na tela)
  var telaJogo = document.getElementById("tela-jogo");
  if (telaJogo) {
    telaJogo.style.flexDirection = (CONFIG.posicao_painel === "esquerda") ? "row-reverse" : "row";
  }
})();

// ------------------------------------------------------------
// 2) Configura o tamanho do canvas a partir do CONFIG.
// Largura = colunas * tamanho da célula. Altura = linhas * tamanho da célula.
// ------------------------------------------------------------
(function configurarCanvas() {
  var canvas = document.getElementById("canvas");
  canvas.width = CONFIG.colunas * CONFIG.tamanho_celula;
  canvas.height = CONFIG.linhas * CONFIG.tamanho_celula;
})();

// ------------------------------------------------------------
// 3) Pré-preenche o campo de nome se o CONFIG tiver um nome padrão.
// ------------------------------------------------------------
(function preencherNomePadrao() {
  if (CONFIG.nomepadrao && CONFIG.nomepadrao.length > 0) {
    document.getElementById("campo-nome").value = CONFIG.nomepadrao;
  }
})();

// ------------------------------------------------------------
// Mostra apenas a tela indicada e esconde as outras.
// ------------------------------------------------------------
function mostrarTela(id) {
  var telas = document.getElementsByClassName("tela");
  for (var i = 0; i < telas.length; i++) {
    telas[i].classList.add("escondido");
  }
  document.getElementById(id).classList.remove("escondido");
}

// ------------------------------------------------------------
// Atualiza o score e o nível de velocidade no painel.
// ------------------------------------------------------------
function atualizarScore(valor, nivel) {
  document.getElementById("texto-score").textContent = valor;
  document.getElementById("texto-nivel").textContent = nivel;
}

// ------------------------------------------------------------
// Preenche e mostra a tela de game over usando os textos do CONFIG.
// ------------------------------------------------------------
function mostrarGameOver(score, recordeLocal) {
  document.getElementById("emoji-morte").textContent = CONFIG.emoji_morte;
  document.getElementById("texto-game-over").textContent = CONFIG.mensagem_game_over;
  document.getElementById("texto-score-final").textContent = score;
  document.getElementById("texto-recorde").textContent = recordeLocal;
  mostrarTela("tela-game-over");
}

// ------------------------------------------------------------
// Renderiza o leaderboard no painel lateral.
// Na Aula 1 a lista chega vazia; na Aula 2 vem do servidor.
// ------------------------------------------------------------
function atualizarLeaderboard(lista) {
  var ul = document.getElementById("lista-leaderboard");
  ul.innerHTML = "";
  if (!lista) return;
  for (var i = 0; i < lista.length; i++) {
    var item = lista[i];
    var li = document.createElement("li");
    var esquerda = (i + 1) + ". " + item.nome;
    li.innerHTML = "<span>" + esquerda + "</span><span>" + item.score + "</span>";
    ul.appendChild(li);
  }
}

// ------------------------------------------------------------
// Botão JOGAR: valida o nome, guarda em nomeJogador e inicia o jogo.
// ------------------------------------------------------------
document.getElementById("btn-jogar").addEventListener("click", function () {
  var nome = document.getElementById("campo-nome").value.trim();
  if (nome.length === 0) {
    alert("Digite um nome para jogar!");
    return;
  }
  nomeJogador = nome;
  document.getElementById("texto-nome").textContent = nome;
  iniciarJogo();   // definida em game.js
});

// ------------------------------------------------------------
// Botão REINICIAR: começa um novo jogo.
// ------------------------------------------------------------
document.getElementById("btn-reiniciar").addEventListener("click", function () {
  iniciarJogo();
});

// Pronto para a Aula 1 — versão completa
