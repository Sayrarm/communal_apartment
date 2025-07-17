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
function createInput (labelText, id, type, defaultValue = '') {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = id;
    group.appendChild(label);

    const input = document.createElement('input');
    input.type = type;
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
        waterSupply.appendChild(createInput('Водоотведение (м3):', disposal, 'number'));
    }
    containerTariffs.appendChild(waterSupply);

    //долг (добавляем, только если debt !== undefined)
    if (debt !== undefined) {
        const debtSection = createSection('Долг');
        debtSection.appendChild(createInput('Долг:', debt, 'number'));
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

    const saveButton = createButton('Сохранить');
    buttonSection.appendChild(saveButton);

    const closeButton = createButton('Закрыть');
    closeButton.id = 'close-button'
    document.getElementById('close-button').onclick = () => {
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
