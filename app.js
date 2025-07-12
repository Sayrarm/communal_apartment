const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const modalTariffs = createModal('Тарифы');

//кнопка для открытия модального окна с тарифами
const tariffsModalWindowButton = createButton('Тарифы');
tariffsModalWindowButton.id = 'tariffs-Modal-Window-Button';
document.getElementById("tariffs-Modal-Window-Button").onclick = () => {
    modalTariffs.showModal();
    disableScroll();
};


const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Калькулятор коммунальных платежей';
container.appendChild(title);

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
const calculateButton = createButton('Рассчитать');



