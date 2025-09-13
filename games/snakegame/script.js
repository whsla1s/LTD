const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const Score = document.querySelector(".Score-Value");
const FinalScore = document.querySelector(".Final-Score > span");
const Menu = document.querySelector(".Menu-Screen");
const buttonPlay = document.querySelector(".btn-play");
const buttonHard = document.querySelector(".btn-hard");
const modeButtons = document.querySelector(".mode-buttons");
const touchControls = document.querySelector(".touch-controls");

const audio = new Audio("assets/assets_audio.mp3");
let gameOverAudio = null;
try {
  gameOverAudio = new Audio("assets/wrong-buzzer-6268.mp3");
  gameOverAudio.volume = 0.16;
} catch (e) {
  console.warn("Áudio de Game Over não encontrado. Continuando sem som.");
}

let currentGameMode = "normal";
const RANK_LIMIT = 1000;
const BYPASS_LOGIN_FOR_TESTING = false;

document.querySelectorAll(".dot").forEach((dot) => {
  dot.style.top = Math.random() * window.innerHeight + "px";
  dot.style.left = Math.random() * window.innerWidth + "px";
});

// --- SISTEMA DE AUTENTICAÇÃO E RANKING ---

/**
 * Simula um sistema de autenticação de usuários, com integração ao backend.
 */
const AuthSystem = {
  currentUser: null, // Use 'currentUser' for consistency with previous code

  // Fetch session data from the server
  getSession: async function () {
    try {
      const response = await fetch("index.php", {
        method: "GET",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      const data = await response.json();
      if (data.success) {
        this.currentUser = data.usuario; // Match the key from index.php
      }
      return data;
    } catch (error) {
      console.error("Erro ao obter sessão:", error);
      return { success: false, usuario: null };
    }
  },

  // Check if the user is authenticated
  isAuthenticated: function () {
    return this.currentUser !== null;
  },

  // Login or register a new user
  loginOrRegister: async function (nome, idade, email) {
    console.log("Tentando login/cadastro:", nome, idade, email);
    const response = await fetch("../../backend/cadastro.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nome=${encodeURIComponent(nome)}&idade=${encodeURIComponent(
        idade
      )}&email=${encodeURIComponent(email)}`,
    });
    const data = await response.json();
    console.log("Resposta do backend:", data);
    if (data.success) {
      this.currentUser = data.user; // Assume cadastro.php returns 'user'
      if (data.message) alert(data.message);
    }
    return data.user;
  },

  // Get the current user
  getUser: function () {
    return this.currentUser;
  },
};

// Initialize session on page load
document.addEventListener("DOMContentLoaded", async () => {
  await AuthSystem.getSession();
  console.log("Sessão inicial:", AuthSystem.currentUser);
});

/**
 * Obtém o ranking do backend para o modo especificado.
 * @param {string} mode - Modo de jogo ('normal' ou 'hard').
 * @returns {Promise<Array>} Lista de rankings.
 */

/**
 * Salva o ranking no localStorage do navegador.
 * @param {string} mode - O modo de jogo ('normal' ou 'hard').
 * @param {Array} ranking - O array com os dados do ranking.
 */
const saveRanking = (mode, ranking) => {
  localStorage.setItem(`snakeRanking_${mode}`, JSON.stringify(ranking));
};

let modalCounter = 0; // Contador para gerar IDs únicos

const showLoginModal = () => {
  const modal = document.querySelector(".auth-modal-content");
  if (!modal) {
    console.error("Modal de autenticação não encontrado");
    return;
  }

  // Show the modal
  modal.style.display = "block";

  const confirmButton = document.getElementById("confirm");
  const cancelButton = document.getElementById("cancel");

  // Clear previous event listeners by cloning the buttons
  const newConfirmButton = confirmButton.cloneNode(true);
  const newCancelButton = cancelButton.cloneNode(true);
  confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
  cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

  // Add event listener for cancel button
  newCancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none"; // Hide the modal
  });
};

const displayRanking = async (mode) => {
  const container = document.querySelector(".ranking-container");
  if (!container) return console.error("Container de ranking não encontrado");
  const list = container.querySelector(".ranking-list");
  if (!list) return console.error("Elemento .ranking-list não encontrado");

  // Atualiza aba ativa
  document.querySelectorAll(".ranking-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });

  const ranking = await getRanking(mode);
  const user = AuthSystem.getUser();

  list.innerHTML = ""; // Limpa ranking anterior

  if (ranking.length === 0) {
    list.innerHTML = "<p>Nenhum recorde ainda!</p>";
    return;
  }

  ranking.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "ranking-item";
    if (user && item.email === user.email) {
      el.classList.add("user-highlight");
    }

    const spanPos = document.createElement("span");
    spanPos.textContent = `${index + 1}º`;

    if (index === 0) spanPos.classList.add("first-position");
    if (index === 1) spanPos.classList.add("second-position");
    if (index === 2) spanPos.classList.add("third-position");
    if (index >= 3) spanPos.classList.add("position");

    const spanName = document.createElement("span");
    spanName.className = "name";
    spanName.textContent = item.name;

    const spanScore = document.createElement("span");
    spanScore.className = "score";
    spanScore.textContent = item.score;

    el.appendChild(spanPos);
    el.appendChild(spanName);
    el.appendChild(spanScore);

    list.appendChild(el);
  });
};

/**
 * Configura a interface inicial do ranking.
 */
const setupRankingSystem = () => {
  displayRanking("normal");
  document.querySelectorAll(".ranking-tab").forEach((tab) => {
    tab.addEventListener("click", () => displayRanking(tab.dataset.mode));
  });
};

// --- JOGO PRINCIPAL ---
const size = 30;
const initialPosition = { x: 240, y: 240 };
const SPRITES_COUNT = 5;
const MIN_FOODS_ON_SCREEN = 5;

let isHardMode = false;
let speed = 200;

let snake = [
  { ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) },
];
let foods = [];

const snakeHeadSprites = [];
const snakeBodySprites = [];
const foodSprites = [];

const background = new Image();
background.src = "sprites/background.png";

const loadSprite = (src) => {
  const img = new Image();
  img.src = src;
  img.onload = () => console.log(`Sprite carregado: ${src}`);
  img.onerror = () => console.error(`Erro ao carregar sprite: ${src}`);
  return img;
};

for (let i = 0; i < SPRITES_COUNT; i++) {
  snakeHeadSprites[i] = loadSprite(`sprites/snake_head_${i}.png`);
  snakeBodySprites[i] = loadSprite(`sprites/snake_body_${i}.png`);
  foodSprites[i] = loadSprite(`sprites/food_${i}.png`);
}

const incrementScore = () => {
  const currentScore = parseInt(Score.innerText, 10) || 0;
  Score.innerText = currentScore + 10;
};

const randomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const randomPosition = () => {
  const number = randomNumber(0, canvas.width - size);
  return Math.round(number / size) * size;
};

const createFood = (existingTypes = []) => {
  let x, y, type;
  const availableTypes = [...Array(SPRITES_COUNT).keys()].filter(
    (t) => !existingTypes.includes(t)
  );
  if (availableTypes.length === 0) return null;
  type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  do {
    x = randomPosition();
    y = randomPosition();
  } while (
    snake.some((p) => p.x === x && p.y === y) ||
    foods.some((f) => f.x === x && f.y === y)
  );
  return { x, y, type };
};

const generateFoods = () => {
  foods = [];
  for (let i = 0; i < MIN_FOODS_ON_SCREEN; i++) {
    const typesOnScreen = foods.map((f) => f.type);
    const newFood = createFood(typesOnScreen);
    if (newFood) foods.push(newFood);
  }
};

let direction;
let loopid;
let grow = false;

const drawBackground = () => {
  if (background.complete) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const drawFood = () => {
  foods.forEach((food) => {
    const sprite = foodSprites[food.type];
    if (sprite.complete) {
      ctx.drawImage(sprite, food.x, food.y, size, size);
    }
  });
};

const drawSnake = () => {
  snake.forEach((segment, index) => {
    const sprite =
      index === snake.length - 1
        ? snakeHeadSprites[segment.type]
        : snakeBodySprites[segment.type];
    if (sprite.complete) {
      ctx.drawImage(sprite, segment.x, segment.y, size, size);
    }
  });
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake[snake.length - 1];
  const newHead = { x: head.x, y: head.y, type: head.type };

  if (direction === "right") newHead.x += size;
  if (direction === "left") newHead.x -= size;
  if (direction === "down") newHead.y += size;
  if (direction === "up") newHead.y -= size;

  snake.push(newHead);

  if (!grow) {
    snake.shift();
  } else {
    grow = false;
  }
};

const checkEat = () => {
  const head = snake[snake.length - 1];
  for (let i = 0; i < foods.length; i++) {
    const food = foods[i];
    if (head.x === food.x && head.y === food.y && head.type === food.type) {
      grow = true;
      audio.play();
      incrementScore();
      foods.splice(i, 1);
      while (foods.length < MIN_FOODS_ON_SCREEN) {
        const newFood = createFood(foods.map((f) => f.type));
        if (newFood) foods.push(newFood);
      }
      let newType;
      do {
        newType = Math.floor(Math.random() * SPRITES_COUNT);
      } while (newType === head.type);
      snake = snake.map((segment) => ({ ...segment, type: newType }));
      break;
    }
  }
};

function updateRanking(score, mode) {
  const user = AuthSystem.getUser();
  console.log("Atualizando ranking com:", { score, mode });
  if (!user || !user.id) {
    console.error("Usuário não autenticado ou ID não encontrado.", user);
    return;
  }

  console.log("Enviando ranking com:", {
    user_id: user.id,
    score,
    mode,
  });

  fetch("../../backend/update_ranking.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `user_id=${encodeURIComponent(user.id)}&score=${encodeURIComponent(
      score
    )}&mode=${encodeURIComponent(mode)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta do update_ranking:", data);
      if (!data.success) {
        console.warn("Erro ao atualizar ranking:", data.error);
      }
    })
    .catch((error) => {
      console.error("Erro na requisição para update_ranking:", error);
    });
}

async function getRanking(mode) {
  try {
    const response = await fetch(
      `../../backend/mostrar_ranking.php?mode=${encodeURIComponent(mode)}`
    );
    if (!response.ok) throw new Error("Erro ao buscar ranking");
    return await response.json();
  } catch (e) {
    console.error("Erro ao buscar ranking:", e);
    return [];
  }
}

let isGameOver = false; // Variável de controle para o estado do jogo

const GameOver = () => {
  isGameOver = true;
  direction = undefined;
  Menu.style.display = "flex";
  FinalScore.innerText = Score.innerText;
  canvas.style.filter = "blur(4px)";
  modeButtons.style.display = "none";
  if (touchControls) touchControls.style.display = "none";

  if (!AuthSystem.isAuthenticated()) {
    showLoginModal(Score.innerText, currentGameMode);
  } else {
    updateRanking(Score.innerText, currentGameMode);
  }
  if (gameOverAudio) gameOverAudio.play();
};

const checkCollision = () => {
  const head = snake[snake.length - 1];
  const wallCollision =
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height;
  const selfCollision =
    snake.length > 1 &&
    snake.slice(0, -1).some((pos) => pos.x === head.x && pos.y === head.y);
  if (wallCollision || selfCollision) {
    clearTimeout(loopid); // Limpa o timeout atual
    GameOver(); // Chama o Game Over
  }
};

const gameLoop = () => {
  if (isGameOver) return; // Sai da função se o jogo terminou
  console.log("Executando gameLoop...");
  clearTimeout(loopid); // Limpa qualquer timeout pendente
  drawBackground();
  drawFood();
  moveSnake();
  drawSnake();
  checkEat();
  checkCollision();
  if (!isGameOver) {
    // Só agenda o próximo loop se o jogo não terminou
    loopid = setTimeout(gameLoop, speed);
  }
};

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowRight" && direction !== "left") direction = "right";
  if (key === "ArrowLeft" && direction !== "right") direction = "left";
  if (key === "ArrowDown" && direction !== "up") direction = "down";
  if (key === "ArrowUp" && direction !== "down") direction = "up";
});

const restartGame = () => {
  isGameOver = false;
  Score.innerText = "0";
  Menu.style.display = "none";
  canvas.style.filter = "none";
  direction = undefined;
  // MODIFICAÇÃO: Lógica de controle de visibilidade simplificada e movida para cá.
  if (window.innerWidth <= 1024) {
    touchControls.style.display = "flex";
    modeButtons.style.display = "none";
  } else {
    touchControls.style.display = "none";
    modeButtons.style.display = "flex";
  }

  if (isHardMode) {
    canvas.width = 300;
    canvas.height = 300;
    snake = [
      { x: 150, y: 150, type: Math.floor(Math.random() * SPRITES_COUNT) },
    ];
    speed = 100;
    // Define o modo de jogo atual para o ranking
    currentGameMode = "hard";
  } else {
    canvas.width = 390;
    canvas.height = 390;
    snake = [
      { ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) },
    ];
    speed = 200;
    // Define o modo de jogo atual para o ranking
    currentGameMode = "normal";
  }
  generateFoods();
  gameLoop();
};

buttonPlay.addEventListener("click", () => {
  isHardMode = false;
  restartGame();
});

buttonHard.addEventListener("click", () => {
  isHardMode = true;
  restartGame();
});

const buttonHardFixed = document.querySelector(".btn-hard-fixed");
const buttonNormalFixed = document.querySelector(".btn-normal");
const buttonMenu = document.querySelector(".btn-menu");
const buttonMenuFixed = document.querySelector(".btn-menu-fixed");

buttonHardFixed.addEventListener("click", () => {
  isHardMode = true;
  restartGame();
});

buttonNormalFixed.addEventListener("click", () => {
  isHardMode = false;
  restartGame();
});

buttonMenu.addEventListener("click", () => {
  window.location.href = "..";
});

buttonMenuFixed.addEventListener("click", () => {
  window.location.href = "..";
});

const initGame = () => {
  console.log("Inicializando jogo...");
  canvas.width = 390;
  canvas.height = 390;
  console.log("Canvas size:", canvas.width, canvas.height);
  isHardMode = false;
  speed = 200;
  if (window.innerWidth <= 1024) {
    touchControls.style.display = "flex";
    modeButtons.style.display = "none";
  } else {
    touchControls.style.display = "none";
    modeButtons.style.display = "flex";
  }
  const initialPosition = { x: 120, y: 120 };
  snake = [
    { ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) },
  ];
  console.log("Snake inicializado:", snake);
  generateFoods();
  console.log("Comidas geradas:", foods);
  isGameOver = false; // Reseta o estado ao iniciar
  gameLoop();
  currentGameMode = "normal";
  setupRankingSystem();
};

if (touchControls) {
  document.getElementById("btn-up").addEventListener("click", () => {
    if (direction !== "down") direction = "up";
  });
  document.getElementById("btn-down").addEventListener("click", () => {
    if (direction !== "up") direction = "down";
  });
  document.getElementById("btn-left").addEventListener("click", () => {
    if (direction !== "right") direction = "left";
  });
  document.getElementById("btn-right").addEventListener("click", () => {
    if (direction !== "left") direction = "right";
  });
}

initGame();
