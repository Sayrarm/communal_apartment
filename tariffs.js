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

function calculator () {
    const electricCalculationT1 = tariffs.electro.t1 * parseFloat(document.getElementById('electricity-t1').value);
    const electricCalculationT2 = tariffs.electro.t2 * parseFloat(document.getElementById('electricity-t2').value);
}
