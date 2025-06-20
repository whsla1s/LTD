<?php
session_start();

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');

    if (isset($_SESSION['usuario'])) {
        echo json_encode(['success' => true, 'usuario' => $_SESSION['usuario']]);
    } else {
        echo json_encode(['success' => false, 'usuario' => null, 'message' => 'Usuário não está logado']);
    }
    exit; 
}

$logado = (isset($_SESSION['usuario']) ? $_SESSION['usuario'] : null);
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wght@400;700&display=swap" />
  <title>Snake Game</title>
</head>

<body class="notranslate">
  <?php if (isset($_GET['mensagem'])): ?>
    <div class="mensagem"><?php echo htmlspecialchars($_GET['mensagem']); ?></div>
  <?php endif; ?>

  <div class="LTD">
    <h1>LTD</h1>
    <?php if ($logado): ?>
      <span>Bem-vindo, <?php echo htmlspecialchars($logado['nome']); ?>
      <?php endif; ?>
  </div>

  <div class="neon-background">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>

  <?php if (!$logado): ?>
    <div class="auth-modal-content">
      <h3>Entrar ou Cadastrar</h3>
      <p>Preencha os campos para continuar</p>
      <div class="auth-form">
        <form action="../../backend/cadastro.php" method="post" id="authForm">
          <input type="text" placeholder="Nome" id="nome" name="nome" required />
          <input type="number" placeholder="Idade" id="idade" name="idade" required />
          <input type="email" placeholder="Email" id="email" name="email" required />
          <button id="confirm">Continuar</button>
          <button id="cancel">Pular</button>
        </form>
      </div>
    </div>
  <?php endif; ?>

  <div class=" Score">Score: <span class="Score-Value">00</span></div>

  <div class="Menu-Screen">
    <span class="Game-Over">Game-Over</span>
    <span class="Final-Score">Score <span>00</span></span>

    <button class="btn-play">
      <span class="material-symbols-outlined">play_arrow</span>
      Jogar Normal
    </button>

    <button class="btn-hard">
      <span class="material-symbols-outlined">play_arrow</span>
      Modo Difícil
    </button>

    <button class="btn-menu">
      <span class="material-symbols-outlined">play_arrow</span>
      Menu Principal
    </button>
  </div>

  <!-- MODIFICAÇÃO: Atributos de tamanho removidos para que o canvas seja responsivo. -->
  <canvas></canvas>

  <div class="mode-buttons">
    <button class="btn-mode btn-normal">Modo Normal</button>
    <button class="btn-mode btn-hard-fixed">Modo Difícil</button>
    <button class="btn-mode btn-menu-fixed">Menu Principal</button>
  </div>

  <div class="ranking-container">
    <h2>Ranking</h2>
    <div class="ranking-tabs">
      <button class="ranking-tab active" data-mode="normal">Normal</button>
      <button class="ranking-tab" data-mode="hard">Difícil</button>
    </div>
    <div class="ranking-list"></div>
  </div>

  <div class="eatsnake">
    <div class="texto">
      <div class="objeto">
        <img src="../snakegame/sprites/food_0.png" alt="food 0">
        <p>= AZUL</p>
      </div>
      <div class="objeto">
        <img src="../snakegame/sprites/food_1.png" alt="food 1">
        <p>= VERMELHO</p>
      </div>
      <div class="objeto">
        <img src="../snakegame/sprites/food_2.png" alt="food 2">
        <p>= VERDE</p>
      </div>
      <div class="objeto">
        <img src="../snakegame/sprites/food_3.png" alt="food 3">
        <p>= AMARELO</p>
      </div>
      <div class="objeto">
        <img src="../snakegame/sprites/food_4.png" alt="food 4">
        <p>= MARROM</p>
      </div>
    </div>
  </div>

  <div class="touch-controls">
    <button id="btn-up"><span class="material-symbols-outlined">arrow_upward</span></button>
    <div class="center-row">
      <button id="btn-left"><span class="material-symbols-outlined">arrow_back</span></button>
      <button id="btn-right"><span class="material-symbols-outlined">arrow_forward</span></button>
    </div>
    <button id="btn-down"><span class="material-symbols-outlined">arrow_downward</span></button>
  </div>

  <script src="./script.js"></script>

</body>

</html>