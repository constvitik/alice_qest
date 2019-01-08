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
            userState = commandDefinitions["New"];
        } else {
            userState = commandDefinitions["Old"];
        }
    }
    else {
    userState = readReq({ command: req.body.request.original_utterance, userState });
    res.json(writeResp(req, userState));
    userStates[req.body.session.user_id] = userState;
}});

const
    commandDefinitions = {
        "New": { message: "Привет я квет по городу Туле. Для начала квеста скажи где ты находишься?", commands: ["Кремль", "Набережная", "Все варианты"] },
        "Old": { message: "Привет рад твоему возврашению. Ты можешь продолжить квест или начать с новой точки.", commands: ["Продолжить", "Кремль", "Все варианты"] },
        "Продолжить": { button: { title: "Продолжить" },message: "Возобновление сессии", continue: true },
        "Все варианты": { button: { title: "Все варианты" }, message: "Карта", commands: [], },
        "Кремль": { button: { title: "Кремль" }, message: "История кремля. Задание 1. Варианты ответов", commands: ["A1", "B1", "C1", "Подсказка1"] },
        "A1": { message: "Неправильно", commands: ["B1", "C1", "Подсказка1"], button: { title: "Вариант 1" } },
        "B1": { message: "Неправильно", commands: ["A1", "C1", "Подсказка1"], button: { title: "Вариант 2" } },
        "C1": { message: "Правильно.Нажми на кнопку чтобы получить новое задание.", commands: ["Следsующий шаг2"], button: { title: "Вариант 3" } },
        "Подсказка1": { message: "Более детальное описание", commands: ["А1", "B1", "C1", "Следующий шаг2"], button: { title: "Подсказка" } },
        "Следующий шаг2": {button: { title: "Следующие задание" }, message: "Задание 2. Варианты ответов", commands: ["А2", "B2", "C2", "Подсказка"] },
        "Подсказка2": { message: "Более детальное описание", commands: ["А", "B", "C", "Следующий шаг2"] },
    }

function readReq({ command, userState }) {
    console.log("command, userState", command, userState);
    const
        { commands } = userState,
        result = commands
            .map((commandId) => commandDefinitions[commandId])
            .filter((сommandDef) => { return сommandDef && сommandDef.button && command === сommandDef.button.title })[0];
    console.log("result", result);
    if (!result || result.continue === true) {
        return userState;
    }
    return result;
}

function writeResp(req, { message, commands }) {
    console.log("message, commands", message, commands);
    const
        buttons = commands
            .map((commandId) => {
                return commandDefinitions[commandId]
            })
            .filter(commandDefinition => commandDefinition && commandDefinition.button)
            .map((commandDefinition) => {
                console.log("commandDefinition:", commandDefinition);
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
    res.send("test6");
})

app.use('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});