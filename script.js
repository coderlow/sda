// Список вопросов
const questions = [
    {
        question: "Не достаточно перерыва?",
        description: "Иногда нужно времени, чтобы понять друг друга. Я думаю уже достаточно, хочу знать, что ты чувствуешь.",
        answers: [
            { text: "Думаю достаточно", next: 1 },
            { text: "Нет, недостаточно", next: 2 }
        ]
    },
    {
        question: "Я рад это слышать!",
        description: "Я скучаю по нашим разговорам. А ты?",
        answers: [
            { text: "Я тоже скучаю", customMessage: "Если нажала на эту кнопку, значит надо мне ответить." }, // Ваше сообщение
            { text: "Мне всё ещё немного трудно", next: 4 }
        ]
    },
    {
        question: "Если все еще не ответила мне, значит - не хочешь общаться.",
        description: "Может ещё подумаешь?",
        answers: [
            { text: "Хорошо, я подумаю", next: 4 }
        ]
    },
    {
        question: "Я рад(а), что мы это обсудили!",
        description: "Пожалуйста, напиши мне, когда захочешь.",
        answers: []
    },
    {
        question: "Я с пониманием отношусь.",
        description: "Спасибо, что уделила время!",
        answers: []
    }
];

let currentIndex = 0;

const questionElement = document.getElementById("question");
const descriptionElement = document.getElementById("description");
const buttonsContainer = document.getElementById("buttons");

// Функция для отображения текущего вопроса
function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionElement.textContent = currentQuestion.question;
    descriptionElement.textContent = currentQuestion.description;

    // Очистить кнопки
    buttonsContainer.innerHTML = "";

    // Добавить новые кнопки
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("animated-button");
        button.textContent = answer.text;

        // Добавить действие на кнопку
        if (answer.customMessage) {
            button.addEventListener("click", () => {
                // Удалить кнопку и показать ваше сообщение
                buttonsContainer.innerHTML = "";  // Удаляем все кнопки
                const messageElement = document.createElement("div");
                messageElement.classList.add("custom-message");
                messageElement.textContent = answer.customMessage; // Ваше сообщение
                descriptionElement.appendChild(messageElement);
            });
        } else if (answer.next !== undefined) {
            button.addEventListener("click", () => {
                displayQuestion(answer.next);
            });
        }

        buttonsContainer.appendChild(button);
    });

    // Скрыть кнопки, если они отсутствуют
    if (currentQuestion.answers.length === 0) {
        buttonsContainer.classList.add("hidden");
    }
}

// Показать первый вопрос
displayQuestion(currentIndex);

