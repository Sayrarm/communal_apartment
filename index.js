// Создаем корневой элемент
const app = document.createElement('div');
document.body.appendChild(app);

// Тарифы
const tariffs = {
    electricity: { t1: 6.5, t2: 2.5 },
    water: { cold: 40.0, hot: 180.0, drainage: 30.0 },
    heating: 45.0,
    intercom: 150.0,
    apartmentArea: 60
};

// Контейнер
const container = document.createElement('div');
container.className = 'container';
app.appendChild(container);

// Заголовок
const title = document.createElement('h1');
title.textContent = 'Калькулятор коммунальных платежей';
container.appendChild(title);

// Форма
const form = document.createElement('form');

// Функция создания секции
function createSection(titleText) {
    const section = document.createElement('div');
    section.className = 'section';

    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = titleText;

    section.appendChild(sectionTitle);
    return section;
}

// Функция создания поля ввода
function createInput(labelText, id, type, defaultValue = '') {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = id;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.value = defaultValue;

    group.appendChild(label);
    group.appendChild(input);

    return group;
}

// Электроэнергия
const electricitySection = createSection('Электроэнергия');
electricitySection.appendChild(createInput('Тариф Т1 (кВт·ч):', 'electricity-t1', 'number'));
electricitySection.appendChild(createInput('Тариф Т2 (кВт·ч):', 'electricity-t2', 'number'));
form.appendChild(electricitySection);

// Вода
const waterSection = createSection('Водоснабжение');
waterSection.appendChild(createInput('Холодная вода (м³):', 'water-cold', 'number'));
waterSection.appendChild(createInput('Горячая вода (м³):', 'water-hot', 'number'));
waterSection.appendChild(createInput('Водоотведение (м³):', 'water-drainage', 'number'));
form.appendChild(waterSection);

// Отопление
const heatingSection = createSection('Отопление');
heatingSection.appendChild(createInput('Площадь квартиры (м²):', 'apartment-area', 'number', tariffs.apartmentArea));
form.appendChild(heatingSection);

// Домофон
const intercomSection = createSection('Домофон');
form.appendChild(intercomSection);

// Долг
const debtSection = createSection('Долг за прошлый месяц');
debtSection.appendChild(createInput('Сумма долга (руб):', 'debt', 'number'));
form.appendChild(debtSection);

// Кнопка расчета
const calculateBtn = document.createElement('button');
calculateBtn.type = 'button';
calculateBtn.textContent = 'Рассчитать';
form.appendChild(calculateBtn);

// Результаты
const resultSection = document.createElement('div');
resultSection.className = 'result';
resultSection.style.display = 'none';

const resultTitle = document.createElement('h3');
resultTitle.textContent = 'Результаты расчета';
resultSection.appendChild(resultTitle);

const resultsContainer = document.createElement('div');
resultSection.appendChild(resultsContainer);

form.appendChild(resultSection);
container.appendChild(form);

// Расчет
calculateBtn.addEventListener('click', () => {
    const inputs = {
        electricity: {
            t1: parseFloat(document.getElementById('electricity-t1').value) || 0,
            t2: parseFloat(document.getElementById('electricity-t2').value) || 0
        },
        water: {
            cold: parseFloat(document.getElementById('water-cold').value) || 0,
            hot: parseFloat(document.getElementById('water-hot').value) || 0,
            drainage: parseFloat(document.getElementById('water-drainage').value) || 0
        },
        apartmentArea: parseFloat(document.getElementById('apartment-area').value) || tariffs.apartmentArea,
        debt: parseFloat(document.getElementById('debt').value) || 0
    };

    // Очистка ошибок
    document.querySelectorAll('.error').forEach(el => el.remove());

    // Валидация
    let hasErrors = false;
    Object.entries(inputs).forEach(([category, values]) => {
        if (typeof values === 'object') {
            Object.entries(values).forEach(([subcat, value]) => {
                if (value < 0) {
                    const input = document.getElementById(`${category}-${subcat}`);
                    const error = document.createElement('span');
                    error.className = 'error';
                    error.textContent = 'Значение не может быть отрицательным';
                    input.parentNode.appendChild(error);
                    hasErrors = true;
                }
            });
        }
    });
    if (hasErrors) return;

    // Расчет
    const calc = {
        electricity: {
            t1: inputs.electricity.t1 * tariffs.electricity.t1,
            t2: inputs.electricity.t2 * tariffs.electricity.t2,
            total: 0
        },
        water: {
            cold: inputs.water.cold * tariffs.water.cold,
            hot: inputs.water.hot * tariffs.water.hot,
            drainage: inputs.water.drainage * tariffs.water.drainage,
            total: 0
        },
        heating: inputs.apartmentArea * tariffs.heating,
        intercom: tariffs.intercom,
        debt: inputs.debt,
        total: 0
    };

    calc.electricity.total = calc.electricity.t1 + calc.electricity.t2;
    calc.water.total = calc.water.cold + calc.water.hot + calc.water.drainage;
    calc.total = calc.electricity.total + calc.water.total + calc.heating + calc.intercom + calc.debt;

    // Вывод результатов
    resultsContainer.innerHTML = '';

    const addResult = (name, value) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `<span>${name}:</span><span>${value.toFixed(2)} руб</span>`;
        resultsContainer.appendChild(item);
    };

    addResult(`Электроэнергия Т1 (${tariffs.electricity.t1} руб/кВт·ч)`, calc.electricity.t1);
    addResult(`Электроэнергия Т2 (${tariffs.electricity.t2} руб/кВт·ч)`, calc.electricity.t2);
    addResult('Итого по электроэнергии', calc.electricity.total);

    addResult(`Холодная вода (${tariffs.water.cold} руб/м³)`, calc.water.cold);
    addResult(`Горячая вода (${tariffs.water.hot} руб/м³)`, calc.water.hot);
    addResult(`Водоотведение (${tariffs.water.drainage} руб/м³)`, calc.water.drainage);
    addResult('Итого по водоснабжению', calc.water.total);

    addResult(`Отопление (${tariffs.heating} руб/м²)`, calc.heating);
    addResult('Домофон', calc.intercom);
    if (calc.debt > 0) addResult('Долг за прошлый месяц', calc.debt);

    const total = document.createElement('div');
    total.className = 'result-item total';
    total.innerHTML = `<span>Общая сумма к оплате:</span><span>${calc.total.toFixed(2)} руб</span>`;
    resultsContainer.appendChild(total);

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
});