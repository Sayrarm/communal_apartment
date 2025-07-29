//глобально объявляем переменные - тарифы по умолчанию
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

//глобально объявляем переменные из функции calculator()
const calcData = {
    inputs: {},
    results: {}
};

//LOCALSTORAGE для тарифов

// Функция для сохранения тарифов
function saveToLocalStorageTariffs() {
    // 1. Создаём массив tariffIDs, в котором хранятся ID всех полей ввода
    const tariffIDs = [
        't1-tariff',
        't2-tariff',
        'cold-tariff',
        'hot-tariff',
        'disposal-tariff',
        'heating-tariff',
        'intercom-tariff',
        'rent-tariff'
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
function loadFromLocalStorageTariffs() {
    // 1. Создаём массив tariffIDs
    const tariffIDs = [
        't1-tariff',
        't2-tariff',
        'cold-tariff',
        'hot-tariff',
        'disposal-tariff',
        'heating-tariff',
        'intercom-tariff',
        'rent-tariff'
    ];

    // 2. Перебираем каждый ID из массива tariffIDs
    tariffIDs.forEach(id => {
        // 3. Пытаемся получить сохранённое значение из localStorage
        const savedValue = localStorage.getItem(id);
        // 4. Если значение найдено (не null)
        const element = document.getElementById(id);
            // 6. Если поле существует, вставляем в него сохранённое значение
            if (element) {
                element.value = savedValue !== null ? savedValue : '';
            }
    });

    // Затем применяем значения по умолчанию для пустых полей
    inputTariffs();
}

//загружаем сохраненные в модальном окне тарифы
window.addEventListener('load', loadFromLocalStorageTariffs);

// 1. Функция для получения тарифа из localStorage или значения по умолчанию
function getSavedTariff(tariffKey, defaultValue) {
    const savedValue = localStorage.getItem(tariffKey);
    // Если значение есть в localStorage - возвращаем его (преобразуя в число)
    // Если нет - возвращаем значение по умолчанию
    return savedValue !== null ? parseFloat(savedValue) : defaultValue;
}

//LOCALSTORAGE для истории расчетов

// Глобальная переменная для хранения истории расчетов
let calculationHistory = [];

// Функция для сохранения текущего расчета в историю
function saveCalculationToHistory() {
    // Получаем текущую дату, когда мы производим расчет и сохраняем в localstorage инфо
    const currentDate = new Date().toLocaleDateString();

    // Создаем объект с данными для сохранения
    const calculationEntry = {
        date: currentDate,
        inputs: {
            t1Current: calcData.inputs.inputT1Current,
            t2Current: calcData.inputs.inputT2Current,
            coldWaterCurrent: calcData.inputs.inputColdWaterCurrent,
            hotWaterCurrent: calcData.inputs.inputHotWaterCurrent,
            debtLast: calcData.inputs.inputDebtLast,
            rentCurrent: calcData.inputs.inputRentCurrent
        },
        results: {
            electricT1: calcData.results.electricCalculationT1,
            electricT2: calcData.results.electricCalculationT2,
            totalElectric: calcData.results.totalElectricCalculation,
            coldWater: calcData.results.coldWaterCalculation,
            hotWater: calcData.results.hotWaterCalculation,
            disposal: calcData.results.disposal,
            disposalCalc: calcData.results.disposalWaterCalculation,
            totalWater: calcData.results.totalWaterCalculation,
            heating: getSavedTariff('heating-tariff', tariffs.heating),
            intercom: getSavedTariff('intercom-tariff', tariffs.intercom),
            total: calcData.results.totalCalculation,
            totalWithRent: calcData.results.totalCalculationWithRent
        }
    };

    // Получаем существующую историю из localStorage или создаем новый массив
    const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    // Добавляем новый расчет в массив
    history.push(calculationEntry);

    // Сохраняем обновленную историю в localStorage
    localStorage.setItem('calculationHistory', JSON.stringify(history));

    // Обновляем глобальную переменную
    calculationHistory = history;
}

// Функция для конвертации истории расчетов в CSV формат
function convertHistoryToCSV() {
    if (calculationHistory.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'message-without-table';
        showAnimatedMessage(emptyMessage, 'нет данных для выгрузки!')
        modalHistoryWithoutButtons.appendChild(emptyMessage);

        return null;
    }

    // Заголовки CSV
    const headers = [
        'Дата',
        'Т1',
        'Т2',
        'Хол.вода',
        'Гор.вода',
        'Водоотведение',
        'Отопление',
        'Домофон',
        'Т1 итог',
        'Т2 итог',
        'Электроэнергия итог',
        'Хол.вода итог',
        'Гор.вода итог',
        'Водоотведение итог',
        'Вода итог',
        'Всего',
        'Всего с арендой'
    ];

    // Функция для форматирования чисел (замена точки на запятую)
    const formatNumber = (num) => {
        if (typeof num === 'number') {
            return num.toFixed(2).replace('.', ',');
        }
        // Если значение не число, возвращаем как есть (например, для даты)
        return num;
    };

    // Строки данных
    const rows = calculationHistory.map(entry => [
        entry.date,
        formatNumber(entry.inputs.t1Current),
        formatNumber(entry.inputs.t2Current),
        formatNumber(entry.inputs.coldWaterCurrent),
        formatNumber(entry.inputs.hotWaterCurrent),
        formatNumber(entry.results.disposal),
        formatNumber(entry.results.heating),
        formatNumber(entry.results.intercom),
        formatNumber(entry.results.electricT1),
        formatNumber(entry.results.electricT2),
        formatNumber(entry.results.totalElectric),
        formatNumber(entry.results.coldWater),
        formatNumber(entry.results.hotWater),
        formatNumber(entry.results.disposalCalc),
        formatNumber(entry.results.totalWater),
        formatNumber(entry.results.total),
        formatNumber(entry.results.totalWithRent)
    ]);

    // Добавляем BOM (Byte Order Mark) для правильной кодировки UTF-8
    const BOM = "\uFEFF";

    // Объединяем заголовки и данные с разделителем ";" (стандарт для Excel)
    return BOM + [
        headers.join(';'),
        ...rows.map(row => row.join(';'))
    ].join('\r\n'); // Используем \r\n для совместимости с Windows

}

// Функция для скачивания CSV файла
function downloadCSV() {
    const csvData = convertHistoryToCSV();
    if (!csvData) return;

    // Создаем blob и ссылку для скачивания
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `history_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Функция для очистки истории
function clearHistory() {
    // Показываем подтверждение перед очисткой
    if (confirm('Вы действительно хотите очистить всю историю расчетов?')) {
        // Очищаем localStorage
        localStorage.removeItem('calculationHistory');

        // Очищаем массив в памяти
        calculationHistory = [];

        // Обновляем отображение
        createTableHistory();

        //уведомление об успешной очистке
        const successMessage = document.createElement('div');
        successMessage.className = 'message';
        modalHistory.appendChild(successMessage);

        showAnimatedMessage(successMessage, 'История очищена!')
    }
}

//функция для получения данных из input-ввода
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
    calcData.inputs.inputT1Last = getInputValue('t1-last');
    calcData.inputs.inputT1Current = getInputValue('t1-current');
    calcData.inputs.inputT2Last = getInputValue('t2-last');
    calcData.inputs.inputT2Current = getInputValue('t2-current');

    calcData.inputs.inputColdWaterLast = getInputValue('cold-last');
    calcData.inputs.inputColdWaterCurrent = getInputValue('cold-current');
    calcData.inputs.inputHotWaterLast = getInputValue('hot-last');
    calcData.inputs.inputHotWaterCurrent = getInputValue('hot-current');

    calcData.inputs.inputDebtLast = getInputValue('debt-last');

    calcData.inputs.inputRentCurrent = getSavedTariff('rent-tariff', tariffs.rent);

//подсчеты данных

    //считаем электроэнергию
    calcData.results.electricCalculationT1 = (calcData.inputs.inputT1Current - calcData.inputs.inputT1Last) * getSavedTariff('t1-tariff', tariffs.electro.t1);
    calcData.results.electricCalculationT2 = (calcData.inputs.inputT2Current - calcData.inputs.inputT2Last) * getSavedTariff('t2-tariff', tariffs.electro.t2);

    calcData.results.totalElectricCalculation = calcData.results.electricCalculationT1 + calcData.results.electricCalculationT2;

    //считаем водоснабжение
    calcData.results.coldWater = (calcData.inputs.inputColdWaterCurrent - calcData.inputs.inputColdWaterLast);
    calcData.results.coldWaterCalculation = calcData.results.coldWater * getSavedTariff('cold-tariff', tariffs.water.cold);
    calcData.results.hotWater = (calcData.inputs.inputHotWaterCurrent - calcData.inputs.inputHotWaterLast);
    calcData.results.hotWaterCalculation = calcData.results.hotWater * getSavedTariff('hot-tariff', tariffs.water.hot);
    calcData.results.disposal = (calcData.results.coldWater + calcData.results.hotWater);
    calcData.results.disposalWaterCalculation = calcData.results.disposal * getSavedTariff('disposal-tariff', tariffs.water.disposal);
    calcData.results.totalWaterCalculation = calcData.results.coldWaterCalculation + calcData.results.hotWaterCalculation + calcData.results.disposalWaterCalculation;

    //считаем итого (электроэнергия + вода + отопление + домофон) + итого с арендой жилья
    calcData.results.totalCalculation = calcData.results.totalElectricCalculation + calcData.results.totalWaterCalculation + getSavedTariff('heating-tariff', tariffs.heating) + getSavedTariff('intercom-tariff', tariffs.intercom) + calcData.inputs.inputDebtLast;
    calcData.results.totalCalculationWithRent = calcData.results.totalCalculation + calcData.inputs.inputRentCurrent;

    //выводим в интерфейс результат подсчета
    const electricCalc = addCalculationSection();
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т1', calcData.results.electricCalculationT1.toFixed(2)));
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т2', calcData.results.electricCalculationT2.toFixed(2)));
    electricCalc.appendChild(addCalculationLine('Электроэнергия ИТОГ', calcData.results.totalElectricCalculation.toFixed(2)));

    const waterCalc = addCalculationSection();
    waterCalc.appendChild(addCalculationLine('Холодная вода', calcData.results.coldWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Горячая вода', calcData.results.hotWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Водоотведение', calcData.results.disposalWaterCalculation.toFixed(2)));
    waterCalc.appendChild(addCalculationLine('Водоснабжение ИТОГ', calcData.results.totalWaterCalculation.toFixed(2)));

    const heatingCalc = addCalculationSection();
    heatingCalc.appendChild(addCalculationLine('Отопление', getSavedTariff('heating-tariff', tariffs.heating)));

    const intercomCalc = addCalculationSection();
    intercomCalc.appendChild(addCalculationLine('Домофон', getSavedTariff('intercom-tariff', tariffs.intercom)));

    const debtCalc = addCalculationSection();
    debtCalc.appendChild(addCalculationLine('Долг за прошлый месяц', calcData.inputs.inputDebtLast));

    const total = document.createElement('div');
    total.className = 'result-item-total';
    resultsContainer.appendChild(total);

    total.appendChild(addCalculationLine('Всего к оплате', calcData.results.totalCalculation.toFixed(2)));
    total.appendChild(addCalculationLine('Вместе с арендой', calcData.results.totalCalculationWithRent.toFixed(2)));

    //показ контейнера с результатами расчета
    resultSection.style.display = 'flex';
}