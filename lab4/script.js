// Получаем элементы формы и индикатор загрузки
const form = document.getElementById('dataForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const loadingIndicator = document.getElementById('loading');
const dataTableBody = document.getElementById('data-table-body');
const fetchError = document.getElementById('fetchError');

// Функция для валидации имени (не должна содержать цифры)
function validateName() {
    const nameValue = nameInput.value.trim();
    if (/\d/.test(nameValue)) {
        nameError.textContent = 'Имя не должно содержать цифры';
        return false;
    }
    nameError.textContent = '';
    return true;
}

// Функция для валидации email (проверка на формат)
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Введите корректный email';
        return false;
    }
    emailError.textContent = '';
    return true;
}

// Функция для валидации возраста (проверка на число/отрицательное число)
function validateAge(){
    const ageValue = ageInput.value.trim();
    if (isNaN(ageValue)||ageValue<1) {
        ageError.textContent = 'Введите корректный возраст';
        return false;
    }
    ageError.textContent = '';
    return true;

}

// Функция отправки формы
// Асинхронная функция для отправки формы
async function submitForm(event) {
    // Предотвращаем стандартное поведение отправки формы, чтобы не было перезагрузки страницы
    event.preventDefault();

    // Проверяем валидность полей формы с помощью отдельных функций
    const isNameValid = validateName();  // Проверка имени
    const isEmailValid = validateEmail(); // Проверка email
    const isAgeValid = validateAge();    // Проверка возраста

    // Если все поля валидны
    if (isNameValid && isEmailValid && isAgeValid) {
        // Форма валидна, можно отправлять POST-запрос

        // Показываем индикатор загрузки, чтобы пользователь видел, что происходит отправка
        loadingIndicator.style.display = 'block';

        // Создаем объект FormData из элементов формы, чтобы было удобно собирать данные
        const formData = new FormData(form);

        try{
            // Отправляем POST-запрос на сервер
            const response = await fetch('http://localhost:8000/home', {
                method: 'POST', // Указываем метод запроса
                body: JSON.stringify(Object.fromEntries(formData)), // Преобразуем FormData в JSON и отправляем
                headers: {
                    'Content-Type': 'application/json'  // Указываем тип контента
                }
            });

            // Проверяем, что ответ от сервера был успешным (статус 200-299)
            if (!response.ok) {
                // Если ответ не ok, выбрасываем ошибку
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            // Если запрос успешен, выводим сообщение в консоль и сбрасываем форму
            console.log(`Form submitted with POST!
data = ${nameInput.value.trim()}, ${emailInput.value.trim()}, ${ageInput.value.trim()}`);
            form.reset(); // Очищаем поля формы после успешной отправки

        } catch(error){
            // Обрабатываем ошибки, которые могут возникнуть при отправке запроса
            fetchError.textContent = `Ошибка отправки данных: ${error.message}`; // Выводим ошибку в элемент на странице
            console.error('Ошибка POST:', error); // Выводим ошибку в консоль разработчика
        } finally {
            // В любом случае (успех или ошибка) скрываем индикатор загрузки
            loadingIndicator.style.display = 'none';
        }

    } else {
        // Если форма не валидна, выводим сообщение в консоль
        console.log('Form has errors, check input values');
    }
}
// Обработчик события 'DOMContentLoaded', гарантирующий, что код запустится после полной загрузки HTML
document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на DOM-элементы, которые будут использоваться в скрипте
    const loadingIndicator = document.getElementById('loading'); // Индикатор загрузки (элемент с id='loading')
    const dataTableBody = document.getElementById('data-table-body'); // Тело таблицы (<tbody>, элемент с id='data-table-body')
    const fetchErrorDiv = document.getElementById('fetchError');  // Элемент для отображения ошибок (div с id='fetchError')
    const dataTable = document.getElementById('data-table'); // Сама таблица (table с id='data-table')
    const loadDataButton = document.getElementById('loadDataButton'); // Кнопка для загрузки данных (button с id='loadDataButton')

    // Асинхронная функция для загрузки данных с сервера
    const fetchData = async () => {
        try {
            // Выполняем запрос к серверу с помощью fetch()
            const response = await fetch(' http://127.0.0.1:8000/home'); // Замените URL, если он отличается
            // Проверяем, что ответ сервера успешен (статус 200-299)
            if (!response.ok) {
                // Если ответ не успешный, выбрасываем ошибку
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            // Преобразуем ответ сервера в JSON-объект
            const data = await response.json();

            // Проверяем, что в полученном JSON есть поле "users"
            if(!data.users){
                // Если поля "users" нет, выбрасываем ошибку, указывая, что формат данных неверный
                throw new Error('Неверный формат данных JSON: отсутствует поле "users"');
            }

            // Скрываем индикатор загрузки, так как данные получены
            loadingIndicator.style.display = 'none';
            // Отображаем таблицу, так как данные загружены
            dataTable.style.display = 'table';


            // Обрабатываем данные и добавляем их в таблицу
            data.users.forEach(user => {
                // Для каждого пользователя создаем новую строку (<tr>)
                const row = document.createElement('tr');
                // Заполняем строку данными пользователя, используя шаблонные литералы
                row.innerHTML = `
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                `;
                // Добавляем созданную строку в тело таблицы (<tbody>)
                dataTableBody.appendChild(row);
            });
        } catch (error) {
            // Обрабатываем ошибки, которые могут возникнуть при запросе или обработке данных
            console.error('Ошибка при загрузке данных:', error); // Выводим ошибку в консоль
            // Скрываем индикатор загрузки в случае ошибки
            loadingIndicator.style.display = 'none';
            // Отображаем сообщение об ошибке на странице
            fetchErrorDiv.textContent = 'Ошибка при загрузке данных: ' + error.message;
            fetchErrorDiv.style.display = 'block';
        }
    };

    // Добавляем обработчик события 'click' на кнопку загрузки данных
    // При нажатии на кнопку вызывается асинхронная функция fetchData для загрузки данных
    loadDataButton.addEventListener('click', fetchData);
});
// Добавляем обработчики событий
form.addEventListener('submit', submitForm);
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
ageInput.addEventListener('blur', validateAge);


