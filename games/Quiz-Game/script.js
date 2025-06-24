document.addEventListener('DOMContentLoaded', () => {
    // --- BANCO DE 20 PERGUNTAS ---
    const allQuestions = [
        {
            question: "Qual a cor da lixeira para descarte de Papel?",
            answers: [
                { text: "Vermelho", correct: false },
                { text: "Azul", correct: true },
                { text: "Verde", correct: false },
                { text: "Amarelo", correct: false }
            ]
        },
        {
            question: "Qual material NÃO é reciclável na coleta seletiva comum?",
            answers: [
                { text: "Garrafa PET", correct: false },
                { text: "Lata de alumínio", correct: false },
                { text: "Espelho quebrado", correct: true },
                { text: "Jornal", correct: false }
            ]
        },
        {
            question: "A COP30, importante conferência do clima, será realizada em qual cidade da Amazônia?",
            answers: [
                { text: "Manaus", correct: false },
                { text: "Rio Branco", correct: false },
                { text: "Santarém", correct: false },
                { text: "Belém", correct: true }
            ]
        },
        {
            question: "O que significa o 'R' de 'Reutilizar' nos 3Rs da sustentabilidade?",
            answers: [
                { text: "Dar um novo uso a um objeto", correct: true },
                { text: "Transformar o material em algo novo", correct: false },
                { text: "Comprar menos coisas", correct: false },
                { text: "Separar o lixo", correct: false }
            ]
        },
        {
            question: "Qual a cor da lixeira para descarte de Plástico?",
            answers: [
                { text: "Vermelho", correct: true },
                { text: "Azul", correct: false },
                { text: "Verde", correct: false },
                { text: "Amarelo", correct: false }
            ]
        },
        {
            question: "Qual destes itens demora mais tempo para se decompor na natureza?",
            answers: [
                { text: "Casca de banana", correct: false },
                { text: "Papel", correct: false },
                { text: "Garrafa de vidro", correct: true },
                { text: "Chiclete", correct: false }
            ]
        },
        {
            question: "A compostagem é um processo que transforma resíduos orgânicos em:",
            answers: [
                { text: "Gás natural", correct: false },
                { text: "Plástico reciclado", correct: false },
                { text: "Adubo", correct: true },
                { text: "Energia elétrica", correct: false }
            ]
        },
        {
            question: "Qual a cor da lixeira para descarte de Vidro?",
            answers: [
                { text: "Vermelho", correct: false },
                { text: "Azul", correct: false },
                { text: "Verde", correct: true },
                { text: "Amarelo", correct: false }
            ]
        },
        {
            question: "O que é 'economia circular'?",
            answers: [
                { text: "Um modelo que prioriza o lucro", correct: false },
                { text: "Um modelo de produção e consumo que envolve reutilizar, reparar e reciclar", correct: true },
                { text: "Vender produtos em formato de círculo", correct: false },
                { text: "Um tipo de mercado de ações", correct: false }
            ]
        },
        {
            question: "Por que o óleo de cozinha não deve ser jogado na pia?",
            answers: [
                { text: "Porque entope o encanamento e polui a água", correct: true },
                { text: "Porque pode ser vendido", correct: false },
                { text: "Porque enferruja os canos", correct: false },
                { text: "Porque atrai insetos para a cozinha", correct: false }
            ]
        },
        {
            question: "Qual a cor da lixeira para descarte de Metal?",
            answers: [
                { text: "Vermelho", correct: false },
                { text: "Azul", correct: false },
                { text: "Verde", correct: false },
                { text: "Amarelo", correct: true }
            ]
        },
        {
            question: "Lâmpadas fluorescentes devem ser descartadas em:",
            answers: [
                { text: "Lixo comum", correct: false },
                { text: "Coleta de vidro", correct: false },
                { text: "Pontos de coleta específicos", correct: true },
                { text: "Lixo orgânico", correct: false }
            ]
        },
        {
            question: "Qual o principal gás do efeito estufa intensificado pela ação humana?",
            answers: [
                { text: "Oxigênio", correct: false },
                { text: "Dióxido de Carbono (CO2)", correct:true },
                { text: "Nitrogênio", correct: false },
                { text: "Hélio", correct: false }
            ]
        },
        {
            question: "O que o 'R' de 'Reduzir' nos 3Rs da sustentabilidade incentiva?",
            answers: [
                { text: "Reduzir a velocidade do carro", correct: false },
                { text: "Diminuir o consumo de novos produtos", correct: true },
                { text: "Reduzir o tamanho das embalagens", correct: false },
                { text: "Diminuir o volume da música", correct: false }
            ]
        },
        {
            question: "Qual destes é um exemplo de energia renovável?",
            answers: [
                { text: "Carvão", correct: false },
                { text: "Gás Natural", correct: false },
                { text: "Energia Solar", correct: true },
                { text: "Petróleo", correct: false }
            ]
        },
        {
            question: "Isopor é reciclável?",
            answers: [
                { text: "Sim, e deve ser descartado no plástico", correct: true },
                { text: "Não, deve ir para o lixo comum", correct: false },
                { text: "Sim, e deve ser descartado no papel", correct: false },
                { text: "Apenas se estiver limpo", correct: false }
            ]
        },
        {
            question: "Qual a importância de lavar as embalagens recicláveis antes do descarte?",
            answers: [
                { text: "Nenhuma, elas são lavadas na usina", correct: false },
                { text: "Evita mau cheiro e a atração de animais", correct: true },
                { text: "Aumenta o peso do material para venda", correct: false },
                { text: "É uma regra da prefeitura", correct: false }
            ]
        },
        {
            question: "Pilhas e baterias devem ser descartadas...",
            answers: [
                { text: "No lixo comum", correct: false },
                { text: "Na lixeira de metais", correct: false },
                { text: "Em pontos de coleta especiais para não contaminar o solo", correct: true },
                { text: "Na lixeira de resíduos orgânicos", correct: false }
            ]
        },
        {
            question: "Qual o nome do acordo global que estabeleceu metas para reduzir o aquecimento do planeta?",
            answers: [
                { text: "Acordo de Belém", correct: false },
                { text: "Protocolo de Kyoto", correct: false },
                { text: "Acordo de Paris", correct: true },
                { text: "Tratado da Amazônia", correct: false }
            ]
        },
        {
            question: "Qual a lixeira correta para resíduos orgânicos, como restos de comida?",
            answers: [
                { text: "Cinza (Não reciclável)", correct: false },
                { text: "Preta (Madeira)", correct: false },
                { text: "Marrom", correct: true },
                { text: "Laranja (Resíduos perigosos)", correct: false }
            ]
        }
    ];

    // --- ELEMENTOS DO DOM ---
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const endScreen = document.getElementById('end-screen');
    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const questionCounter = document.getElementById('question-counter');
    const scoreDisplay = document.getElementById('score');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const scoreText = document.getElementById('score-text');

    // --- VARIÁVEIS DO QUIZ ---
    let shuffledQuestions, currentQuestionIndex, score;

    // --- EVENT LISTENERS ---
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    // --- FUNÇÕES ---
    function startGame() {
        startScreen.classList.add('hide');
        endScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        // Embaralha as perguntas e pega as 10 primeiras
        shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        scoreDisplay.innerText = score;
        
        showNextQuestion();
    }

    function showNextQuestion() {
        resetState();
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;
        questionCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}`;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const correct = selectedBtn.dataset.correct === 'true';

        if (correct) {
            score++;
            scoreDisplay.innerText = score;
        }

        // Feedback visual para o usuário
        Array.from(answerButtons.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        
        // Pausa para o usuário ver o feedback, depois avança
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                showNextQuestion();
            } else {
                endGame();
            }
        }, 1200); // 1.2 segundos de pausa
    }

    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }

    function endGame() {
        quizScreen.classList.add('hide');
        endScreen.classList.remove('hide');
        scoreText.innerText = `Sua pontuação final foi ${score} de 10. Parabéns!`;
    }
});