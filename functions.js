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
function createTariffsWindow (T1, T2, hot, cold, disposal, heat, intercom) {

    const containerTariffs = document.createElement('div');
    containerTariffs.className = 'tariffs-container';

    const electricPower = createSection('Электроэнергия');
    electricPower.appendChild(createInput('Тариф Т1 (кВт·ч):', T1, 'number'));
    electricPower.appendChild(createInput('Тариф Т2 (кВт·ч):', T2, 'number'));
    containerTariffs.appendChild(electricPower);

    const waterSupply = createSection('Водоснабжение');
    waterSupply.appendChild(createInput('Холодная вода (м3):', cold, 'number'));
    waterSupply.appendChild(createInput('Горячая вода (м3):', hot, 'number'));
    waterSupply.appendChild(createInput('Водоотведение (м3):', disposal, 'number'));
    containerTariffs.appendChild(waterSupply);

    const heating = createSection('Отопление');
    heating.appendChild(createInput('Отопление (абон. плата):', heat, 'number'));
    containerTariffs.appendChild(heating);

    const intercomSystem = createSection('Домофон');
    intercomSystem.appendChild(createInput('Домофон (абон. плата):', intercom, 'number'));
    containerTariffs.appendChild(intercomSystem);



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
    container.appendChild(modal);

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = modalText;
    modalTitle.className = 'title';
    modal.appendChild(modalTitle);

    const saveButton = createButton('Сохранить');
    modal.appendChild(saveButton);

    const closeButton = createButton('Закрыть');
    closeButton.id = 'close-button'
    document.getElementById('close-button').onclick = () => {
        modal.close();
        enableScroll();
    }
    modal.appendChild(closeButton);

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