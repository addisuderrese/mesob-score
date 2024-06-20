const { Telegraf } = require('telegraf');
const fetch = require('node-fetch'); // Assuming you are using node-fetch for fetching data

const bot = new Telegraf("6434134865:AAFU9pV6ipPESFTGKWv5XjBciOXFggce2t8");

const url = 'https://sportapi7.p.rapidapi.com/api/v1/sport/football/events/live';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2081d5dea5msh07ffe21f55a7429p1e1dcfjsncee1124b4d4d',
        'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
    }
};

// Define an async function to use await
async function fetchDataAndProcess() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        let AwayTeamName = result.events[0].awayTeam.name
        let HomeTeamName = result.events[0].homeTeam.name
        let ScoreI = result.events[0].awayScore.current
        let ScoreII = result.events[0].homeScore.current
        console.log(result)
        // Assuming you want to send the fetched data to a chat in Telegram
        bot.command('hi', (ctx) => {
            ctx.sendMessage(AwayTeamName + " " + ScoreI+" - " + ScoreII + " " +HomeTeamName, {
                chat_id : "@mesobscore"
            }); // Sending the fetched result to the chat
        });

        bot.launch(); // Launch the bot after setting up the command
    } catch (error) {
        console.error(error);
    }
}

// Call the async function to start fetching data and setting up the bot
fetchDataAndProcess();