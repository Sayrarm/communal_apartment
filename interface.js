//контейнер для всего приложения
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

//контейнер для кнопок
const containerButtons = document.createElement('div');
containerButtons.className = 'container-buttons';
container.appendChild(containerButtons);

//модальное окно с тарифами
const modalTariffs = createModal('Действующие тарифы');
modalTariffs.className = 'modal-container';
modalTariffs.appendChild(createTariffsWindow(
    't1-tariff',
    't2-tariff',
    'cold-tariff',
    'hot-tariff',
    'disposal-tariff',
    undefined,
    'heating-tariff',
    'intercom-tariff',
    'rent-tariff'
));

//кнопка для открытия модального окна с тарифами
const modalTariffsButton = createButton('Тарифы');
modalTariffsButton.id = 'modal-tariffs-button';
modalTariffsButton.onclick = () => {
    modalTariffs.showModal();
    disableScroll();
};
containerButtons.appendChild(modalTariffsButton);

//модальное окно с историей расчетов
const modalHistory = createModal('История расчетов');
modalHistory.className = 'modal-container';
modalHistory.appendChild(createTableHistory());

const modalHistoryButton = createButton('История');
modalHistoryButton.id = 'modal-history-button';
modalHistoryButton.onclick = () => {
    modalHistory.showModal();
    disableScroll();
};
containerButtons.appendChild(modalHistoryButton);

//название приложения
const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Калькулятор коммуналки';
container.appendChild(title);

//строки для ввода данных для расчета:
const containerWithInput = document.createElement('form');
containerWithInput.autocomplete = 'on';
containerWithInput.className = 'container-with-input';
container.appendChild(containerWithInput);

const tariffsForLastMonth = createSection('Прошлый месяц');
tariffsForLastMonth.className = 'tariffs-for-lastMonth';
tariffsForLastMonth.appendChild(createTariffsWindow(
    't1-last',
    't2-last',
    'cold-last',
    'hot-last',
    undefined,
    'debt-last',
    undefined,
    undefined,
    undefined
));
containerWithInput.appendChild(tariffsForLastMonth);

const tariffsForThisMonth = createSection('Текущий месяц');
tariffsForThisMonth.className = 'tariffs-for-thisMonth';
tariffsForThisMonth.appendChild(createTariffsWindow(
    't1-current',
    't2-current',
    'cold-current',
    'hot-current',
    undefined,
    'debt-current',
    undefined,
    undefined,
    undefined
));
containerWithInput.appendChild(tariffsForThisMonth);

//кнопка для расчета
const calculateButton = createButton('Рассчитать');
calculateButton.id = 'calculate-button';
calculateButton.onclick = () => calculator();

//контейнер с результатами расчета
const resultSection = document.createElement('div');
resultSection.className = 'result';
resultSection.style.display = 'none';
container.appendChild(resultSection);

const resultTitle = document.createElement('h3');
resultTitle.textContent = 'Результаты расчета';
resultSection.appendChild(resultTitle);

const resultsContainer = document.createElement('div');
resultsContainer.className = 'results-container';
resultSection.appendChild(resultsContainer);


