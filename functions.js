//функция для создания секции для тарифа
function createSection (titleText) {
    const section = document.createElement('div');
    section.className = 'section';
    container.appendChild(section);

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
    modal.textContent = modalText;
    container.appendChild(modal);

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