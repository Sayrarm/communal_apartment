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

/*
parseFloat(document.getElementById('t1-tariff').value)
parseFloat(document.getElementById('t2-tariff').value)
parseFloat(document.getElementById('hot-tariff').value)
parseFloat(document.getElementById('cold-tariff').value)
parseFloat(document.getElementById('disposal-tariff').value)
parseFloat(document.getElementById('heating-tariff').value)
parseFloat(document.getElementById('intercom-tariff').value)
*/

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

    //подсчеты данных
    const electricCalculationT1 = (inputT1Current - inputT1Last) * tariffs.electro.t1;
    const electricCalculationT2 = (inputT2Current - inputT2Last) * tariffs.electro.t2;

    const totalElectricCalculation = electricCalculationT1 + electricCalculationT2;

    const coldWater = (inputColdWaterCurrent - inputColdWaterLast);
    const coldWaterCalculation = coldWater * tariffs.water.cold;
    const hotWater = (inputHotWaterCurrent - inputHotWaterLast);
    const hotWaterCalculation = hotWater * tariffs.water.hot;
    const disposalWaterCalculation = (coldWater + hotWater) * tariffs.water.disposal;
    const totalWaterCalculation = coldWaterCalculation + hotWaterCalculation + disposalWaterCalculation;

    const totalCalculation = totalElectricCalculation + totalWaterCalculation + tariffs.heating + tariffs.intercom + inputDebtLast;

    //выводим в интерфейс результат подсчета
    const electricCalc = addCalculationSection();
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т1', electricCalculationT1));
    electricCalc.appendChild(addCalculationLine('Электроэнергия Т2', electricCalculationT2));
    electricCalc.appendChild(addCalculationLine('Электроэнергия ИТОГ', totalElectricCalculation));

    const waterCalc = addCalculationSection()
    waterCalc.appendChild(addCalculationLine('Холодная вода', coldWaterCalculation));
    waterCalc.appendChild(addCalculationLine('Горячая вода', hotWaterCalculation));
    waterCalc.appendChild(addCalculationLine('Водоотведение', disposalWaterCalculation));
    waterCalc.appendChild(addCalculationLine('Водоснабжение ИТОГ', totalWaterCalculation));

    const heatingCalc = addCalculationSection();
    heatingCalc.appendChild(addCalculationLine('Отопление', tariffs.heating));

    const intercomCalc = addCalculationSection();
    intercomCalc.appendChild(addCalculationLine('Домофон', tariffs.intercom));

    const debtCalc = addCalculationSection();
    debtCalc.appendChild(addCalculationLine('Долг за прошлый месяц', inputDebtLast));

    const total = document.createElement('div');
    total.className = 'result-item-total';
    resultsContainer.appendChild(total);

    total.appendChild(addCalculationLine('Всего к оплате', totalCalculation.toFixed(1)));

    //показ контейнера с результатами расчета
    resultSection.style.display = 'flex';
    return total;
}