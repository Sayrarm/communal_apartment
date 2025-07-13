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


function calculator () {
    const electricCalculationT1 = (parseFloat(document.getElementById('t1-current').value) - parseFloat(document.getElementById('t1-last').value)) * tariffs.electro.t1;
    const electricCalculationT2 = (parseFloat(document.getElementById('t2-current').value) - parseFloat(document.getElementById('t2-last').value)) * tariffs.electro.t2;

    const totalElectricCalculation = electricCalculationT1 + electricCalculationT2;

    const coldWater = (parseFloat(document.getElementById('cold-current').value) - parseFloat(document.getElementById('cold-last').value));
    const coldWaterCalculation = coldWater * tariffs.water.cold;
    const hotWater = (parseFloat(document.getElementById('hot-current').value) - parseFloat(document.getElementById('hot-last').value));
    const hotWaterCalculation = hotWater * tariffs.water.hot;
    const disposalWaterCalculation = (coldWater - hotWater) * tariffs.water.disposal;

    const totalWaterCalculation = coldWaterCalculation + hotWaterCalculation + disposalWaterCalculation;

    return totalElectricCalculation + totalWaterCalculation + tariffs.heating + tariffs.intercom + parseFloat(document.getElementById('debt-last').value);
}

