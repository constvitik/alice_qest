export const commandDefinitions = {
  "New": { message: "Привет я квет по городу Туле. Для начала квеста скажи где ты находишься?", commands: ["Кремль", "Набережная", "Все варианты"] },
  "Old": { message: "Привет рад твоему возврашению. Ты можешь продолжить квест или начать с новой точки.", commands: ["Продолжить", "Кремль", "Все варианты"] },
  "Продолжить": { button: { title: "Продолжить" }, message: "Возобновление сессии", continue: true },
  "Все варианты": { button: { title: "Все варианты" }, message: "Карта", commands: [], },
  "Кремль": { button: { title: "Кремль" }, message: "История кремля. Задание 1. Варианты ответов", commands: ["A1", "B1", "C1", "Подсказка1"] },
  "A1": { message: "Неправильно", commands: ["B1", "C1", "Подсказка1"], button: { title: "Вариант 1" } },
  "B1": { message: "Неправильно", commands: ["A1", "C1", "Подсказка1"], button: { title: "Вариант 2" } },
  "C1": { message: "Правильно.Нажми на кнопку чтобы получить новое задание.", commands: ["Следsующий шаг2"], button: { title: "Вариант 3" } },
  "Подсказка1": { message: "Более детальное описание", commands: ["А1", "B1", "C1", "Следующий шаг2"], button: { title: "Подсказка" } },
  "Следующий шаг2": { button: { title: "Следующие задание" }, message: "Задание 2. Варианты ответов", commands: ["А2", "B2", "C2", "Подсказка"] },
  "Подсказка2": { message: "Более детальное описание", commands: ["А", "B", "C", "Следующий шаг2"] },
};

export function getStep(stepId: keyof typeof commandDefinitions) {
  return commandDefinitions[stepId];
}
