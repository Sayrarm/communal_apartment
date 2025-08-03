//контейнер для всего приложения
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

//контейнер для верхних кнопок
const containerButtons = document.createElement('div');
containerButtons.className = 'container-buttons';
container.appendChild(containerButtons);

//модальное окно с тарифами
const modalTariffs = createModal('Действующие тарифы', ['save', 'close']);
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

const clearInputButton = createButton('Очистить');
clearInputButton.onclick = () => {
    document.getElementById('container-with-input').reset();
}
containerButtons.appendChild(clearInputButton);

//кнопка для открытия модального окна с тарифами
const modalTariffsButton = createButton('Тарифы');
modalTariffsButton.id = 'modal-tariffs-button';
modalTariffsButton.onclick = () => {
    modalTariffs.showModal();

    // 1. Загружаем сохранённые значения из localStorage
    loadFromLocalStorageTariffs();

    // Теперь сохраняем initialValue
    const inputs = modalTariffs.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.dataset.initialValue = input.value;
    });
    disableScroll();
};
containerButtons.appendChild(modalTariffsButton);

//модальное окно с историей расчетов
const modalHistory = createModal('История расчетов', ['csv', 'clear', 'close']);
modalHistory.className = 'modal-container';

//контейнер для таблицы с сохраненной историей в модальном окне
const modalHistoryWithoutButtons = document.createElement('div');
modalHistory.appendChild(modalHistoryWithoutButtons);

/*
кнопка для перехода к истории расчетов
createTableHistory(); - открывает таблицу с сохраненной историей
 */
const modalHistoryButton = createButton('История');
modalHistoryButton.id = 'modal-history-button';
modalHistoryButton.onclick = () => {
    modalHistory.showModal();
    disableScroll();
    createTableHistory();
};
containerButtons.appendChild(modalHistoryButton);

//Заголовок - название приложения
const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Калькулятор коммуналки';
container.appendChild(title);

//строки для ввода данных для расчета:
const containerWithInput = document.createElement('form');
containerWithInput.autocomplete = 'on';
containerWithInput.id = 'container-with-input'
containerWithInput.className = 'container-with-input';
container.appendChild(containerWithInput);

//секция с input-сроками для данных прошлого месяца
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

//секция с input-сроками для данных текущего месяца
const tariffsForThisMonth = createSection('Текущий месяц');
tariffsForThisMonth.className = 'tariffs-for-thisMonth';
tariffsForThisMonth.appendChild(createTariffsWindow(
    't1-current',
    't2-current',
    'cold-current',
    'hot-current',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
));
containerWithInput.appendChild(tariffsForThisMonth);

/*
кнопка для расчета
важно: после каждого нажатия кнопки "Рассчитать" расчеты сохраняются в localstorage
и отображаются в таблице истории расчетов (для этого вызываем saveCalculationToHistory())
 */
const calculateButton = createButton('Рассчитать');
calculateButton.id = 'calculate-button';
calculateButton.onclick = () => {
    calculator();
    saveCalculationToHistory();
}

//контейнер с результатами расчета
const resultSection = document.createElement('div');
resultSection.className = 'result';
resultSection.style.display = 'none';
container.appendChild(resultSection);

//заголовок для контейнера с результатами расчета
const resultTitle = document.createElement('h3');
resultTitle.textContent = 'Результаты расчета';
resultSection.appendChild(resultTitle);

//контейнер, где непосредственно расчеты лежат (сделано для красивости-полосок)
const resultsContainer = document.createElement('div');
resultsContainer.className = 'results-container';
resultSection.appendChild(resultsContainer);


