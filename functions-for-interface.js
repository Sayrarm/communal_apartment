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



//функция для создания строки для расчета
function addCalculationLine (name, value) {

    const line = document.createElement('div');
    line.className = 'result-item';

    const lineName = document.createElement('div');
    lineName.textContent = `${name}: `;

    const valueName = document.createElement('div');
    valueName.textContent = `${value} руб.`;

    line.append(lineName, ' ', valueName);


    return line;
}

//функция для создания input-строки
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

//функция для создания input-ввода для тарифов и данных пользователя
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
        debtSection.appendChild(createInput('Долг (руб):', debt, 'number', tariffs.debt));
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

//функция для анимации всплывающего текста
function showAnimatedMessage(messageElement, text) {
    // Устанавливаем текст (если передан)
    if (text) {
        messageElement.textContent = text;
    }

    // 1. Показываем сообщение
    messageElement.style.display = 'flex';
    messageElement.style.opacity = '1';
    messageElement.classList.remove('fade-out');

    // 2. Запускаем анимацию прыжка
    messageElement.classList.add('bounce');

    // 3. Через 0.8 сек запускаем исчезновение
    setTimeout(() => {
        messageElement.classList.add('fade-out');

        // 4. Через 0.5 сек скрываем полностью
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 500);
    }, 800);
}

//функция для создания модального окна
function createModal (modalText, buttons = ['save', 'csv', 'clear', 'close']) {

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

    //сделали возможность изменения кнопок для разных модальных окон (вынесли их как параметры)
    buttons.forEach(buttonType => {
        switch (buttonType) {
            case 'save':
                const saveButton = createButton('Сохранить');
                saveButton.onclick = () => {
                    inputTariffs(); //подставляем значения по умолчанию, если тарифы не введены (0 - считается введенным тарифом)
                    saveToLocalStorageTariffs(); //сохраняем в localstorage
                    showAnimatedMessage(message, 'Данные сохранены!');

                    // Обновляем initialValue после сохранения
                    const inputs = modalTariffs.querySelectorAll('input[type="number"]');
                    inputs.forEach(input => {
                        input.dataset.initialValue = input.value;
                    });
                }
                buttonSection.appendChild(saveButton);
                break;
            case 'csv':
                const saveCSVButton = createButton('Выгрузить в CSV');
                saveCSVButton.onclick = () => {
                    downloadCSV();
                }
                buttonSection.appendChild(saveCSVButton);
                break;
            case 'clear':
                const clearButton = createButton('Очистить историю');
                clearButton.onclick = () => {
                    clearHistory();
                }
                buttonSection.appendChild(clearButton);
                break;
            case 'close':
                const closeButton = createButton('Закрыть');
                closeButton.id = 'close-button'
                closeButton.onclick = () => {
                    const inputs = modal.querySelectorAll('input[type="number"]');
                    let hasUnsavedData = false;

                    inputs.forEach(input => {
                        if (input.value !== input.dataset.initialValue) { // сравниваем с сохранённым значением
                            hasUnsavedData = true;
                        }
                    });

                    if (hasUnsavedData) {
                        const shouldClose = confirm('Внимание, данные не сохранены! Чтобы сохранить данные, вернитесь и нажмите кнопку "Сохранить".\n\nЗакрыть без сохранения?');
                        if (!shouldClose) return;
                    }

                    modal.close();
                    enableScroll();
                }
                buttonSection.appendChild(closeButton);
                break;
        }
    });

    return modal;
}

// Функция для запрета прокрутки страницы
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Функция для разрешения прокрутки страницы
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

    // Если поле пустое '' или undefined, подставляем значение из переменной `tariffs`
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

//создаем части таблицы
function createTableParts(tag, titleName) {
    const thData = document.createElement(tag);
    thData.textContent = titleName === null || titleName === undefined
        ? '0.00'
        : (typeof titleName === 'number' ? titleName.toFixed(3) : titleName);

    return thData;
}

//функция для создания таблицы в модальном окне "История Расчетов"
function createTableHistory() {

    // 1. Очищаем контейнер перед добавлением новых результатов
    modalHistoryWithoutButtons.textContent = '';

    // Получаем историю из localStorage (если истории нет, то возвращаем пустой массив)
    calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    // Если история пуста, создаем и возвращаем элемент с сообщением
    if (calculationHistory.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'message-without-table';
        emptyMessage.textContent = 'История расчетов пуста';
        emptyMessage.style.display = 'flex';
        modalHistoryWithoutButtons.appendChild(emptyMessage);
        return emptyMessage;
    }

    // Создаем основную таблицу
    const tableHistory = document.createElement('table');

    // Создаем заголовок таблицы
    const theadTableHistory = document.createElement('thead');
    tableHistory.appendChild(theadTableHistory);

    //создаем блок для заголовков
    const trTheadTableHistory = document.createElement('tr');
    theadTableHistory.appendChild(trTheadTableHistory);

    // Добавляем все заголовки
    trTheadTableHistory.appendChild(createTableParts('th', 'Дата'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т1 (квт•ч)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т2 (квт•ч)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Хол.вода (м3)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Гор.вода (м3)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Водоотведение (м3)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Отопление (руб.)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Домофон (руб.)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т1 итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Т2 итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Электроэнергия итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Хол.вода итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Гор.вода итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Водоотведение итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Вода итог (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Всего (руб)'));
    trTheadTableHistory.appendChild(createTableParts('th', 'Всего с арендой (руб)'));

    // Создаем тело таблицы
    const tbodyHistory = document.createElement('tbody');
    tableHistory.appendChild(tbodyHistory);

    // Добавляем данные из localstorage
    calculationHistory.forEach((calculationEntry, index) => {

        const trTbodyTableHistory = document.createElement('tr');
        tbodyHistory.appendChild(trTbodyTableHistory);

        // Добавляем все ячейки
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.date));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.inputs.t1Current));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.inputs.t2Current));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.inputs.coldWaterCurrent));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.inputs.hotWaterCurrent));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.disposal));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.heating));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.intercom));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.electricT1));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.electricT2));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.totalElectric));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.coldWater));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.hotWater));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.disposalCalc));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.totalWater));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.total));
        trTbodyTableHistory.appendChild(createTableParts('td', calculationEntry.results.totalWithRent));

        // Создаем кнопку удаления для каждой строки
        const deleteButton = createButton('');
        deleteButton.className = 'delete-button';
        const icon = document.createElement('img');
        icon.src = 'trash2.svg';
        icon.width = 25;
        icon.height = 25;
        // Добавляем обработчики событий
        deleteButton.addEventListener('mouseenter', () => {
            icon.src = 'trash-red.svg';
        });

        deleteButton.addEventListener('mouseleave', () => {
            icon.src = 'trash2.svg';
        });
        deleteButton.appendChild(icon);

        // Добавляем обработчик события для кнопки удаления
        deleteButton.onclick = () => {
            if (confirm('Вы уверены, что хотите удалить эту запись?')) {
                // Удаляем запись из массива
                calculationHistory.splice(index, 1);

                // Обновляем localStorage
                localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));

                // Пересоздаем таблицу
                createTableHistory();
            }
        }

        trTbodyTableHistory.appendChild(deleteButton);
    });

    modalHistoryWithoutButtons.appendChild(tableHistory);

    return tableHistory;
}
