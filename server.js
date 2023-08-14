const express = require("express");
require('dotenv').config();
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
})

async function getAnswer(question){
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
    });

    return chat_completion.data.choices[0].message.content;
}

app.use(express.json());

app.post('/askgpt',(req, res)=>{
    getAnswer(req.body.question).then(answer=>{
        res.json({answer: answer});

    });
    // res.json({answer: "how are you"});
})

app.listen(process.env.PORT, ()=>{
    console.log("server is listening at "+process.env.PORT);
});