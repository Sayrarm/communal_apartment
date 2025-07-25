//функция для создания секции для тарифа
function createSection (titleText) {
    const section = document.createElement('div');
    section.className = 'section';

    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = titleText;
    section.appendChild(sectionTitle);

    return section;
}

//функция для создания секции расчетов
function addCalculationSection () {
    const totalSection = document.createElement('div');
    totalSection.className = 'calc-section';
    resultsContainer.appendChild(totalSection);

    return totalSection;
}

//функция для создания строки для расчета
function addCalculationLine (name, value) {

    const line = document.createElement('div');
    line.className = 'result-item';

    const lineName = document.createElement('div');
    lineName.textContent = `${name}: `;

    const valueName = document.createElement('div');
    valueName.textContent = `${value} руб.`;

    line.append(lineName, ' ', valueName);
    resultsContainer.appendChild(line);

    return line;
}

//функция для создания графы для подсчета
function createInput (labelText, id, type, defaultValue) {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = id;
    group.appendChild(label);

    const input = document.createElement('input');
    input.type = type;
    input.title = 'Введите значение';
    input.id = id;
    input.value = defaultValue;
    group.appendChild(input);

    return group;
}

//функция для создания ввода-граф для тарифов
function createTariffsWindow (T1, T2, cold, hot, disposal, debt, heat, intercom, rent) {

    const containerTariffs = document.createElement('div');
    containerTariffs.className = 'tariffs-container';

    //электричество
    const electricPower = createSection('Электроэнергия');
    electricPower.appendChild(createInput('Тариф Т1 (кВт·ч):', T1, 'number'));
    electricPower.appendChild(createInput('Тариф Т2 (кВт·ч):', T2, 'number'));
    containerTariffs.appendChild(electricPower);

    //водоснабжение
    const waterSupply = createSection('Водоснабжение');
    waterSupply.appendChild(createInput('Холодная вода (м3):', cold, 'number'));
    waterSupply.appendChild(createInput('Горячая вода (м3):', hot, 'number'));

    if (disposal !== undefined) {
        waterSupply.appendChild(createInput('Водоотведение (м3):', disposal, 'number', tariffs.water.disposal));
    }
    containerTariffs.appendChild(waterSupply);

    //долг (добавляем, только если debt !== undefined)
    if (debt !== undefined) {
        const debtSection = createSection('Долг');
        debtSection.appendChild(createInput('Долг:', debt, 'number', tariffs.debt));
        containerTariffs.appendChild(debtSection);
    }

    // Отопление (добавляем, только если heat !== undefined)
    if (heat !== undefined) {
        const heating = createSection('Отопление');
        heating.appendChild(createInput('Абон. плата:', heat, 'number', tariffs.heating));
        containerTariffs.appendChild(heating);
    }

    // Домофон (добавляем, только если intercom !== undefined)
    if (intercom !== undefined) {
        const intercomSystem = createSection('Домофон');
        intercomSystem.appendChild(createInput('Абон. плата:', intercom, 'number', tariffs.intercom));
        containerTariffs.appendChild(intercomSystem);
    }

    //Аренда квартиры
    if (rent !== undefined) {
        const rentApartment = createSection('Аренда за квартиру');
        rentApartment.appendChild(createInput('Ежемес. платеж:', rent, 'number', tariffs.rent));
        containerTariffs.appendChild(rentApartment);
    }

    return containerTariffs;
}

//функция для создания кнопок
function createButton (buttonText) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = buttonText;
    container.appendChild(button);

    return button;
}

//функция для создания модального окна
function createModal (modalText) {

    const modal = document.createElement('dialog');
    modal.className = 'modal';
    document.body.appendChild(modal);

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = modalText;
    modalTitle.className = 'section-title';
    modal.appendChild(modalTitle);

    const buttonSection = document.createElement('div');
    buttonSection.className = 'button-section';
    modal.appendChild(buttonSection);

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = 'Данные сохранены';
    message.style.display = 'none';
    modal.appendChild(message);

    const saveButton = createButton('Сохранить');
    saveButton.onclick = () => {
        inputTariffs(); //подставляем значения по умолчанию, если тарифы не введены (0 - считается введенным тарифом)
        saveToLocalStorage(); //сохраняем в localstorage
        message.style.display = 'flex';
    }
    buttonSection.appendChild(saveButton);

    const closeButton = createButton('Закрыть');
    closeButton.id = 'close-button'
    closeButton.onclick = () => {
        message.style.display = 'none';
        modal.close();
        enableScroll();
    }
    buttonSection.appendChild(closeButton);

    return modal;
}

// Функция для запрета скролла
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Функция для разрешения скролла
function enableScroll() {
    document.body.style.overflow = '';
}

/*
функция для модального окна "Тарифы": в случае отсутствия значений в input-поле подставляются
тарифы по умолчанию после нажатия кнопки "Сохранить"
*/
function inputTariffs() {
    const tariffInputs = {
        t1: document.getElementById('t1-tariff'),
        t2: document.getElementById('t2-tariff'),
        cold: document.getElementById('cold-tariff'),
        hot: document.getElementById('hot-tariff'),
        disposal: document.getElementById('disposal-tariff'),
        heating: document.getElementById('heating-tariff'),
        intercom: document.getElementById('intercom-tariff'),
        rent: document.getElementById('rent-tariff'),
    };

    // Если поле пустое ('' или undefined), подставляем значение из `tariffs`
    if (!tariffInputs.t1?.value) tariffInputs.t1.value = tariffs.electro.t1;
    if (!tariffInputs.t2?.value) tariffInputs.t2.value = tariffs.electro.t2;
    if (!tariffInputs.cold?.value) tariffInputs.cold.value = tariffs.water.cold;
    if (!tariffInputs.hot?.value) tariffInputs.hot.value = tariffs.water.hot;
    if (!tariffInputs.disposal?.value) tariffInputs.disposal.value = tariffs.water.disposal;
    if (!tariffInputs.heating?.value) tariffInputs.heating.value = tariffs.heating;
    if (!tariffInputs.intercom?.value) tariffInputs.intercom.value = tariffs.intercom;
    if (!tariffInputs.rent?.value) tariffInputs.rent.value = tariffs.rent;

    return tariffInputs;
}

function createTableParts(tag, titleName) {
    const thData = document.createElement(tag);
    thData.textContent = titleName;

    return thData;
}

function createTableHistory() {

    const tableHistory = document.createElement('table');
    modalHistory.appendChild(tableHistory);

    const theadTableHistory = document.createElement('thead');
    tableHistory.appendChild(theadTableHistory);

    const trTheadTableHistory = document.createElement('tr');
    theadTableHistory.appendChild(trTheadTableHistory);

    trTheadTableHistory.appendChild(createTableParts('th', 'Дата'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т1'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т2'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Хол.вода'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Гор.вода'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Водоотведение'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Отопление'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Домофон'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т1 итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т2 итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Электроэнергия итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Хол.вода итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Гор.вода итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Водоотведение итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Вода итог'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Всего'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Всего с арендой'));

    const tbodyHistory = document.createElement('tbody');
    tableHistory.appendChild(tbodyHistory);

    const trTbodyTableHistory = document.createElement('tr');
    tbodyHistory.appendChild(trTbodyTableHistory);

    trTbodyTableHistory.appendChild(createTableParts('td', '1'));
    trTbodyTableHistory.appendChild(createTableParts('td', '2'));
    trTbodyTableHistory.appendChild(createTableParts('td', '3'));
    trTbodyTableHistory.appendChild(createTableParts('td', '4'));
    trTbodyTableHistory.appendChild(createTableParts('td', '5'));
    trTbodyTableHistory.appendChild(createTableParts('td', '6'));
    trTbodyTableHistory.appendChild(createTableParts('td', '7'));
    trTbodyTableHistory.appendChild(createTableParts('td', '8'));
    trTbodyTableHistory.appendChild(createTableParts('td', '9'));
    trTbodyTableHistory.appendChild(createTableParts('td', '10'));
    trTbodyTableHistory.appendChild(createTableParts('td', '11'));
    trTbodyTableHistory.appendChild(createTableParts('td', '12'));
    trTbodyTableHistory.appendChild(createTableParts('td', '13'));
    trTbodyTableHistory.appendChild(createTableParts('td', '14'));
    trTbodyTableHistory.appendChild(createTableParts('td', '15'));
    trTbodyTableHistory.appendChild(createTableParts('td', '16'));
    trTbodyTableHistory.appendChild(createTableParts('td', '17'));


    return tableHistory;
}
