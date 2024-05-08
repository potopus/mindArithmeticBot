const telegramApi = require('node-telegram-bot-api');
const token = '6477860383:AAFb3vE-TWOJ9r06m8hRSKsKJvULh6TNj-o';

const bot = new telegramApi(token, { polling: true });

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Играть еще?', callback_data: '/game' }]
        ]
    })
}


const start = () => {

    bot.setMyCommands([
        { command: "/start", description: 'Приветсвие игрока' },
        { command: "/info", description: "Информация об игроке и статистика" },
        { command: "/game", description: "Игра на вычисление " }
    ])


    // Объект для хранения состояния игры для каждого пользователя
    const gameStates = {};

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg);
    
        if (text === '/start') {
            await bot.sendPhoto(chatId, 'https://tlgrm.ru/_/stickers/850/9bd/8509bd70-31cf-44a2-af0a-006f46ebc5c8/12.jpg');
            return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}, что бы узнать какие команды иcпользутся, нажми "Menu"`);
        }
        if (text === '/info') {
            await bot.sendPhoto(chatId, "https://tgrm.su/img/stickers/cat_teftel/1.jpg");
            return bot.sendMessage(chatId, ` ${msg.from.first_name}, здесь будет общая информация и статистика по игре`);
        }
    
        if (text === '/game') {
            // Устанавливаем состояние игры для данного пользователя
            gameStates[chatId] = {
                correctAnswer: 0,
                waitingForAnswer: true
            };
    
            await bot.sendPhoto(chatId, "https://tlgrm.ru/_/stickers/850/9bd/8509bd70-31cf-44a2-af0a-006f46ebc5c8/1.jpg");
            await bot.sendMessage(chatId, `${msg.from.first_name}, давай поиграем`);
            
            let randomOne = Math.floor(Math.random() * 100);
            let randomTwo = Math.floor(Math.random() * 100);
            
            while (randomOne > 20 || randomOne < 2) {
                randomOne = Math.floor(Math.random() * 100);
            };
            
            while (randomTwo < 20) {
                randomTwo = Math.floor(Math.random() * 100);
            };
    
            gameStates[chatId].correctAnswer = randomOne * randomTwo;
            await bot.sendMessage(chatId, `${msg.from.first_name}, умножь в уме ${randomOne} на ${randomTwo} и напиши ответ мне`);
        } else if (gameStates[chatId] && gameStates[chatId].waitingForAnswer) {
            const answer = parseInt(text);
            
            if (answer === gameStates[chatId].correctAnswer) {
                
                await bot.sendPhoto(chatId, "https://tlgrm.ru/_/stickers/850/9bd/8509bd70-31cf-44a2-af0a-006f46ebc5c8/2.webp");
                await bot.sendMessage(chatId, `Правильно!`);
            } else {
    
                await bot.sendMessage(chatId, `Неверно. Попробуй еще раз`);
            }
        } else {
            return bot.sendMessage(chatId, `${msg.from.first_name}, вы набрали неверную команду`);
        }
    });

}


start();
//     bot.on('message', async msg => {

//         console.log(msg);

//         const text = msg.text;

//         const chatId = msg.chat.id;
//         if (text === '/start') {
//             await bot.sendPhoto(chatId, 'https://tlgrm.ru/_/stickers/850/9bd/8509bd70-31cf-44a2-af0a-006f46ebc5c8/12.jpg');
//             return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}, что бы узнать какие команды иcпользутся, нажми "Menu"`);
//         }
//         if (text === '/info') {
//             await bot.sendPhoto(chatId, "https://tgrm.su/img/stickers/cat_teftel/1.jpg");
//             return bot.sendMessage(chatId, ` ${msg.from.first_name}, здесь будет общая информация и статистика по игре`);
//         }
//         if (text === '/game') {
//             await bot.sendPhoto(chatId, "https://tlgrm.ru/_/stickers/850/9bd/8509bd70-31cf-44a2-af0a-006f46ebc5c8/1.jpg");
//             await bot.sendMessage(chatId, ` ${msg.from.first_name}, давай поиграем`);
//             let randomOne = Math.floor(Math.random() * 100);
//             let randomTwo = Math.floor(Math.random() * 100);

//             //    console.log(randomOne);
//             while (randomOne > 20 || randomOne < 2) {
//                 randomOne = Math.floor(Math.random() * 100);
//                 //    console.log(randomOne);
//                 //    console.log(msg);
//             };
//             // console.log(randomOne);

//             while (randomTwo < 20) {
//                 randomTwo = Math.floor(Math.random() * 100);
//             };

//             let accaunt = randomOne * randomTwo;
//             await bot.sendMessage(chatId, ` ${msg.from.first_name}, давай поиграем.\nУмножь в уме ${randomOne} на ${randomTwo} и напиши ответ мне`);


//             // Ждем ответа пользователя
//             bot.once('message', async answer => {
//                 if (parseInt(answer.text) === correctAnswer) {
//                     await bot.sendMessage(chatId, `Правильно!`);
//                 } else {
//                     await bot.sendMessage(chatId, `Неверно. Правильный ответ: ${correctAnswer}`);
//                 }
//             });

//             return await bot.sendMessage(chatId, `Мой ответ: ${accaunt}`, gameOptions);
//         }

//         // console.log(msg);
//         return bot.sendMessage(chatId, ` ${msg.from.first_name}, вы набрали неверную команду`);
//     });

//     bot.on("callback_query", msg => {
//         console.log(msg);
//         // ! как получить сообщение от пользоавтеля с числом?
//         // делаю по видео https://youtu.be/slcqnHIFrj8
//     })

// };
