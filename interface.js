//контейнер для всего приложения
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

//модальное окно с тарифами
const modalTariffs = createModal('Действующие тарифы');
modalTariffs.className = 'modal-container';
modalTariffs.appendChild(createTariffsWindow('t1-tariff', 't2-tariff', 'cold-tariff', 'hot-tariff', 'disposal-tariff', undefined, 'heating-tariff', 'intercom-tariff'));

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
const containerWithInput = createSection('');
containerWithInput.className = 'container-with-input';
container.appendChild(containerWithInput);

const tariffsForLastMonth = createSection('Прошлый месяц');
tariffsForLastMonth.className = 'tariffs-for-lastMonth';
tariffsForLastMonth.appendChild(createTariffsWindow('t1-last', 't2-last', 'cold-last', 'hot-last', 'disposal-last', 'debt-last', undefined, undefined));
containerWithInput.appendChild(tariffsForLastMonth);

const tariffsForThisMonth = createSection('Текущий месяц');
tariffsForThisMonth.className = 'tariffs-for-thisMonth';
tariffsForThisMonth.appendChild(createTariffsWindow('t1-current', 't2-current', 'cold-current', 'hot-current', 'disposal-current', 'debt-current', 'heat-current', 'intercom-current'));
containerWithInput.appendChild(tariffsForThisMonth);

//кнопка для расчета
const calculateButton = createButton('Рассчитать');
calculateButton.id = 'calculate-button';
document.getElementById('calculate-button').onclick = () => {
    addResult();
    calculator();
};

//контейнер с результатами расчета
const resultSection = document.createElement('div');
resultSection.className = 'result';
resultSection.style.display = 'none';

const resultTitle = document.createElement('h3');
resultTitle.textContent = 'Результаты расчета';
resultSection.appendChild(resultTitle);

const resultsContainer = document.createElement('div');
resultSection.appendChild(resultsContainer);

container.appendChild(resultSection);

