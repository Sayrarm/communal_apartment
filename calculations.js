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
    rent: 55000,
    debt: 0
};


//LOCALSTORAGE

// Функция для сохранения данных
function saveToLocalStorage() {
    // 1. Создаём массив tariffIDs, в котором хранятся ID всех полей ввода
    const tariffIDs = [
        't1-tariff', 't2-tariff', 'cold-tariff',
        'hot-tariff', 'disposal-tariff', 'heating-tariff',
        'intercom-tariff', 'rent-tariff'
    ];

    // 2. Перебираем каждый ID из массива tariffIDs
    tariffIDs.forEach(id => {
        // 3. Для каждого ID:
        //    - getInputValue(id) получает числовое значение из поля ввода
        //    - .toString() преобразует число в строку (localStorage хранит только строки)
        //    - localStorage.setItem(id, ...) сохраняет значение под ключом = ID поля
        localStorage.setItem(id, getInputValue(id).toString());
    });
}

//функция для загрузки данных
function loadFromLocalStorage() {
    // 1. Создаём массив tariffIDs
    const tariffIDs = [
        't1-tariff', 't2-tariff', 'cold-tariff',
        'hot-tariff', 'disposal-tariff', 'heating-tariff',
        'intercom-tariff', 'rent-tariff'
    ];

    // 2. Перебираем каждый ID из массива tariffIDs
    tariffIDs.forEach(id => {
        // 3. Пытаемся получить сохранённое значение из localStorage
        const savedValue = localStorage.getItem(id);
        // 4. Если значение найдено (не null)
        if (savedValue !== null) {
            // 5. Находим поле ввода на странице по ID
            const element = document.getElementById(id);
            // 6. Если поле существует, вставляем в него сохранённое значение
            if (element) {
                element.value = savedValue;
            }
        }
    });
}

//загружаем сохраненные в модальном окне тарифы
window.addEventListener('load', loadFromLocalStorage);

// 1. Функция для получения тарифа из localStorage или значения по умолчанию
function getSavedTariff(tariffKey, defaultValue) {
    const savedValue = localStorage.getItem(tariffKey);
    // Если значение есть в localStorage - возвращаем его (преобразуя в число)
    // Если нет - возвращаем значение по умолчанию
    return savedValue !== null ? parseFloat(savedValue) : defaultValue;
}

//функция для получения данных из ввода
function getInputValue(id) {
    const element = document.getElementById(id);

    if (!element) { // Если элемента нет
        return 0;
    }

    const number = parseFloat(element.value);

    if (isNaN(number)) { // Если не число
        return 0;
    }

    return number;
}

//основной калькулятор для подсчета коммуналки
function calculator () {

    // 1. Очищаем контейнер перед добавлением новых результатов
    resultsContainer.textContent = '';

    //переменные для использования введенных данных (если данных нет, то по умолчанию применяется 0)
    const inputT1Last = getInputValue('t1-last');
    const inputT1Current = getInputValue('t1-current');
    const inputT2Last = getInputValue('t2-last');
    const inputT2Current = getInputValue('t2-current');

    const inputColdWaterLast = getInputValue('cold-last');
    const inputColdWaterCurrent = getInputValue('cold-current');
    const inputHotWaterLast = getInputValue('hot-last');
    const inputHotWaterCurrent = getInputValue('hot-current');

    const inputDebtLast = getInputValue('debt-last');

    const inputRentCurrent = getSavedTariff('rent-tariff', tariffs.rent);

    //подсчеты данных
    const electricCalculationT1 = (inputT1Current - inputT1Last) * getSavedTariff('t1-tariff', tariffs.electro.t1);
    const electricCalculationT2 = (inputT2Current - inputT2Last) * getSavedTariff('t2-tariff', tariffs.electro.t2);

    const totalElectricCalculation = electricCalculationT1 + electricCalculationT2;

    const coldWater = (inputColdWaterCurrent - inputColdWaterLast);
    const coldWaterCalculation = coldWater * getSavedTariff('cold-tariff', tariffs.water.cold);
    const hotWater = (inputHotWaterCurrent - inputHotWaterLast);
    const hotWaterCalculation = hotWater * getSavedTariff('hot-tariff', tariffs.water.hot);
    const disposalWaterCalculation = (coldWater + hotWater) * getSavedTariff('disposal-tariff', tariffs.water.disposal);
    const totalWaterCalculation = coldWaterCalculation + hotWaterCalculation + disposalWaterCalculation;

    const totalCalculation = totalElectricCalculation + totalWaterCalculation + getSavedTariff('heating-tariff', tariffs.heating) + getSavedTariff('intercom-tariff', tariffs.intercom) + inputDebtLast;
    const totalCalculationWithRent = totalCalculation + inputRentCurrent;

    //выводим в интерфейс результат подсчета
    const electricCalc = addCalculationSection();
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т1', electricCalculationT1.toFixed(2)));
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т2', electricCalculationT2.toFixed(2)));
    electricCalc.appendChild(addCalculationLine('Электроэнергия ИТОГ', totalElectricCalculation.toFixed(2)));

    const waterCalc = addCalculationSection()
    waterCalc.appendChild(addCalculationLine('Холодная вода', coldWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Горячая вода', hotWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Водоотведение', disposalWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Водоснабжение ИТОГ', totalWaterCalculation.toFixed(2)));

    const heatingCalc = addCalculationSection();
    heatingCalc.appendChild(addCalculationLine('Отопление', getSavedTariff('heating-tariff', tariffs.heating)));

    const intercomCalc = addCalculationSection();
    intercomCalc.appendChild(addCalculationLine('Домофон', getSavedTariff('intercom-tariff', tariffs.intercom)));

    const debtCalc = addCalculationSection();
    debtCalc.appendChild(addCalculationLine('Долг за прошлый месяц', inputDebtLast));

    const total = document.createElement('div');
    total.className = 'result-item-total';
    resultsContainer.appendChild(total);

    total.appendChild(addCalculationLine('Всего к оплате', totalCalculation.toFixed(1)));
    total.appendChild(addCalculationLine('Вместе с арендой', totalCalculationWithRent.toFixed(1)));

    //показ контейнера с результатами расчета
    resultSection.style.display = 'flex';
    return total;
}