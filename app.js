const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Калькулятор коммунальных платежей';
container.appendChild(title);

//функция для создания секции для тарифа
function createSection (titleText) {
    const section = document.createElement('div');
    section.className = 'section';
    container.appendChild(section);

    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = titleText;
    section.appendChild(sectionTitle);

    return section;
}

//функция для создания графы для подсчета
function createInput (labelText, id, type, defaultValue = '') {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = id;
    group.appendChild(label);

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.value = defaultValue;
    group.appendChild(input);

    return group;
}

//функция для создания кнопок
function createButton (buttonText) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = buttonText;
    container.appendChild(button);

    return button;
}

//тарифы
const electricPower = createSection('Электроэнергия');
electricPower.appendChild(createInput('Тариф Т1 (кВт·ч):', 'electricity-t1', 'number'));
electricPower.appendChild(createInput('Тариф Т2 (кВт·ч):', 'electricity-t2', 'number'));

const waterSupply = createSection('Водоснабжение');
waterSupply.appendChild(createInput('Холодная вода (м3):', 'cold-water', 'number'));
waterSupply.appendChild(createInput('Горячая вода (м3):', 'hot-water', 'number'));
waterSupply.appendChild(createInput('Водоотведение (м3):', 'water-disposal', 'number'));

const heating = createSection('Отопление');
heating.appendChild(createInput('Отопление (абон. плата):', 'heating', 'number'));

const intercomSystem = createSection('Домофон');
intercomSystem.appendChild(createInput('Домофон (абон. плата):', 'intercom', 'number'));

const debt = createSection('Долг за прошлый месяц');
debt.appendChild(createInput('Долг за прошлый месяц:', 'debt', 'number'));

//кнопка для расчета
const calculate = createButton('Рассчитать');

//тарифы
const tariffs = {
    electro: {
        t1: 7.45,
        t2: 3.02
    },
    water: {
        cold: 59.80,
        hot: 272.14,
        disposal: 45.71
    },
    heating: 1878.19,
    intercom: 68.54,
    debt: 0
};

function calculator () {
    const electricCalculationT1 = tariffs.electro.t1 * parseFloat(document.getElementById('electricity-t1').value);
    const electricCalculationT2 = tariffs.electro.t2 * parseFloat(document.getElementById('electricity-t2').value);
}







