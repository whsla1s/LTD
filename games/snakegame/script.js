const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

document.querySelectorAll(".dot").forEach(dot => {
  dot.style.top = Math.random() * window.innerHeight + "px";
  dot.style.left = Math.random() * window.innerWidth + "px";
});

const Score = document.querySelector(".Score-Value");
const FinalScore = document.querySelector(".Final-Score > span");
const Menu = document.querySelector(".Menu-Screen");
const buttonPlay = document.querySelector(".btn-play");
const buttonHard = document.querySelector(".btn-hard");
const modeButtons = document.querySelector(".mode-buttons");

const audio = new Audio('assets/assets_audio.mp3');

const size = 30;
const initialPosition = { x: 240, y: 240 };
const SPRITES_COUNT = 5;
const MIN_FOODS_ON_SCREEN = 5;

let isHardMode = false;
let speed = 200;

let snake = [{ ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) }];
let foods = [];

const snakeHeadSprites = [];
const snakeBodySprites = [];
const foodSprites = [];

const background = new Image();
background.src = 'sprites/background.png';

const loadSprite = (src) => {
    const img = new Image();
    img.src = src;
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

const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / size) * size;
};

const createFood = (existingTypes = []) => {
    let x, y, type;
    const availableTypes = [...Array(SPRITES_COUNT).keys()].filter(t => !existingTypes.includes(t));
    if (availableTypes.length === 0) return null;
    type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

    do {
        x = randomPosition();
        y = randomPosition();
    } while (snake.some(p => p.x === x && p.y === y) || foods.some(f => f.x === x && f.y === y));

    return { x, y, type };
};

const generateFoods = () => {
    foods = [];
    for (let i = 0; i < MIN_FOODS_ON_SCREEN; i++) {
        const typesOnScreen = foods.map(f => f.type);
        const food = createFood(typesOnScreen);
        if (food) foods.push(food);
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
    foods.forEach(food => {
        const sprite = foodSprites[food.type];
        if (sprite.complete) {
            ctx.drawImage(sprite, food.x, food.y, size, size);
        }
    });
};

const drawSnake = () => {
    snake.forEach((segment, index) => {
        const sprite = index === snake.length - 1
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
                const typesOnScreen = foods.map(f => f.type);
                const food = createFood(typesOnScreen);
                if (food) foods.push(food);
            }

            let newType;
            do {
                newType = Math.floor(Math.random() * SPRITES_COUNT);
            } while (newType === head.type);

            snake = snake.map(segment => ({ ...segment, type: newType }));
            break;
        }
    }
};

const GameOver = () => {
    direction = undefined;
    Menu.style.display = "flex";
    FinalScore.innerText = Score.innerText;
    canvas.style.filter = "blur(4px)";
    modeButtons.style.display = "none";
};

const checkCollision = () => {
    const head = snake[snake.length - 1];

    const wallCollision = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
    const selfCollision = snake.slice(0, -1).some(pos => pos.x === head.x && pos.y === head.y);

    if (wallCollision || selfCollision) {
        clearTimeout(loopid);
        GameOver();
    }
};

const gameLoop = () => {
    clearTimeout(loopid);
    drawBackground();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();
    loopid = setTimeout(gameLoop, speed);
};

document.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowRight" && direction !== "left") direction = "right";
    if (key === "ArrowLeft" && direction !== "right") direction = "left";
    if (key === "ArrowDown" && direction !== "up") direction = "down";
    if (key === "ArrowUp" && direction !== "down") direction = "up";
});

const restartGame = () => {
    Score.innerText = "0";
    Menu.style.display = "none";
    canvas.style.filter = "none";
    direction = undefined;
    modeButtons.style.display = "flex";

    if (isHardMode) {
        canvas.width = 300;
        canvas.height = 300;
        snake = [{ x: 150, y: 150, type: Math.floor(Math.random() * SPRITES_COUNT) }];
        speed = 100;
    } else {
        canvas.width = 450;
        canvas.height = 450;
        snake = [{ ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) }];
        speed = 200;
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

buttonHardFixed.addEventListener("click", () => {
    isHardMode = true;
    restartGame();
});

buttonNormalFixed.addEventListener("click", () => {
    isHardMode = false;
    restartGame();
});

const initGame = () => {
    canvas.width = 450;
    canvas.height = 450;
    isHardMode = false;
    speed = 200;

    modeButtons.style.display = "flex";

    snake = [{ ...initialPosition, type: Math.floor(Math.random() * SPRITES_COUNT) }];
    generateFoods();
    gameLoop();
};

initGame();
