"use strict"

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

let
    userStates = {};

app.post('/', function (req, res) {
    let
        userState = userStates[req.body.session.user_id];
    if (req.body.session.new === true) {
        if (!userState) {
            userStates[req.body.session.user_id] = { commands: ["Кремль", "Набережная", "Шлем", "Все Варианты"] };
            res.json({
                version: req.body.version,
                session: req.body.session,
                response: {
                    text: 'Привет я квет по городу Туле. Если ты что то прослушал я всегда могу повторить. Для начала квеста скажи где ты находишься?',
                    buttons: [{ title: "Кремль" }, { title: "Набережная" }, { title: "Все варианты" }],
                    end_session: false,
                },
            });
        } else {
            res.json({
                version: req.body.version,
                session: req.body.session,
                response: {
                    text: 'Привет рад твоему возврашению. Ты можешь продолжить квест или начать с новой точки.',
                    buttons: [{ title: "Продолжить" }, { title: "Кремль" }, { title: "Все варианты" }],
                    end_session: false,
                }
            });
            userState = { ...userState, commands: ["Продолжить", "Кремль", "Набережная", "Шлем", "Все Варианты"] }
        }
    }
    else {
        userState = readReq({ command: req.body.request.original_utterance, userState });
        res.json(writeResp(req, userState));
        userStates[req.body.session.user_id] = userState;
    }
});

const
    commandDefinitions = {
        "Продолжить": { message: "Возобновление сессии", commands: ["А1", "B1", "C1"] },
        "Все варианты": { message: "Карта", commands: [], },
        "Кремль": { command: "Кремль", message: "История кремля. Задание 1. Варианты ответов", commands: ["A1", "B1", "C1"] },
        "A1": { command: "A", message: "Неправильно", commands: ["B1", "C1", "Подсказка1"], button: { title: "Вариант 1" } },
        "B1": { command: "B", message: "Неправильно", commands: ["A1", "C1", "Подсказка1"], button: { title: "Вариант 2" } },
        "C1": { command: "C", message: "Правильно.", commands: ["Следующий шаг1"], button: { title: "Вариант 3" } },
        "Подсказка1": { command: "Подсказка про Кремль шаг 1", message: "Более детальное описание", commands: ["А1", "B1", "C1", "Следующий шаг2"] },
        "Следующий шаг1": { command: "Следующий шаг", message: "", commands: [] },
        "Следующий шаг2": { message: "Задание 2. Варианты ответов", commands: [{ id: "A2", text: "Вариант А" }, "B2", "C2", "Подсказка"], place: 1, step: 0 },
        "Подсказка2": { command: "Подсказка про Кремль шаг 2", message: "Более детальное описание", commands: ["А", "B", "C", "Следующий шаг2"] },
    }

function readReq({ command, userState }) {
    console.log(command, userState);
    const
        { commands } = userState,
        result = commands
            .map((commandId) => commandDefinitions[commandId])
            .filter((сommandDef) => {console.log(сommandDef ); return сommandDef && command === сommandDef.command})[0];
    return result;
}

function writeResp(req, { message, commands }) {
    console.log(message, commands);
    const
        buttons = commands
            .map((commandId) => { console.log(commandId,commandDefinitions[commandId], commandDefinitions);
                 return commandDefinitions[commandId] 
                })
            .map((commandDefinition) => { 
                console.log(commandDefinition);
                return commandDefinition.button; 
            })
    return {
        version: req.body.version,
        session: req.body.session,
        response: {
            text: message,
            buttons,
            end_session: false
        }
    };
}

app.get('/hello', function (req, res) {
    res.send("test4");
})

app.use('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});