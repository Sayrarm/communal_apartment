//контейнер для всего приложения
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

//модальное окно с тарифами
const modalTariffs = createModal('Действующие тарифы');
modalTariffs.className = 'container';
modalTariffs.appendChild(createTariffsWindow());

//кнопка для открытия модального окна с тарифами
const tariffsModalWindowButton = createButton('Тарифы');
tariffsModalWindowButton.id = 'tariffs-Modal-Window-Button';
document.getElementById("tariffs-Modal-Window-Button").onclick = () => {
    modalTariffs.showModal();
    disableScroll();
};

//название приложения
const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Калькулятор коммунальных платежей';
container.appendChild(title);

//строки для ввода данных для расчета:
container.appendChild(createTariffsWindow());

//строка для ввода долга за прошлый месяц
const debt = createSection('Долг за прошлый месяц');
debt.appendChild(createInput('Долг за прошлый месяц:', 'debt', 'number'));
container.appendChild(debt);

//кнопка для расчета
const calculateButton = createButton('Рассчитать');



