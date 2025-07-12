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
const containerWithTariffs = createSection('');
containerWithTariffs.className = 'container-with-tariffs';
container.appendChild(containerWithTariffs);

const tariffsForLastMonth = createSection('Прошлый месяц');
tariffsForLastMonth.className = 'tariffs-for-lastMonth';
tariffsForLastMonth.appendChild(createTariffsWindow());
containerWithTariffs.appendChild(tariffsForLastMonth);

const tariffsForThisMonth = createSection('Текущий месяц');
tariffsForThisMonth.className = 'tariffs-for-thisMonth';
tariffsForThisMonth.appendChild(createTariffsWindow());
containerWithTariffs.appendChild(tariffsForThisMonth);

//строка для ввода долга за прошлый месяц
const deptContainer = document.createElement('div');
deptContainer.className = 'dept-container';
container.appendChild(deptContainer);

const debt = createSection('Долг за прошлый месяц');
debt.appendChild(createInput('Долг за прошлый месяц:', 'debt', 'number'));
deptContainer.appendChild(debt);

//кнопка для расчета
const calculateButton = createButton('Рассчитать');



