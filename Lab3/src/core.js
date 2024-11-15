/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const evenNumbers = [];
    for (let i = 2; i <= 20; i += 2) {
        evenNumbers.push(i);
    }
    return evenNumbers;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0; // Инициализация переменной для хранения суммы
    for (let i = 1; i <= n; i++) { // Цикл от 1 до n
        sum += i; // Добавляем текущее число к сумме
    }
    return sum; // Возвращаем итоговую сумму
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    // Базовый случай: если n равно 0, возвращаем 0
    if (n <= 0) {
        return 0;
    }
    // Рекурсивный случай: n + сумма чисел от 1 до n-1
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    // Проверяем, является ли n отрицательным числом
    if (n < 0) {
        throw new Error("Факториал не определен для отрицательных чисел");
    }
    // Базовый случай: факториал 0 равен 1
    if (n === 0) {
        return 1;
    }
    // Рекурсивный случай: n * факториал (n-1)
    return n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    // Проверяем, является ли n положительным числом
    if (n <= 0) {
        return false;
    }
    // Проверяем, является ли n степенью двойки
    return (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    // Проверяем, является ли n целым неотрицательным числом
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Параметр n должен быть неотрицательным целым числом.');
    }

    // Базовые случаи
    if (n === 0) return 0; // F(0) = 0
    if (n === 1) return 1; // F(1) = 1

    // Используем итеративный подход для вычисления N-го числа Фибоначчи
    let a = 0; // F(0)
    let b = 1; // F(1)
    let c; // Для хранения текущего числа Фибоначчи

    for (let i = 2; i <= n; i++) {
        c = a + b; // Sуммируем предыдущие два числа
        a = b; // Сдвигаем a на следующее число
        b = c; // Сдвигаем b на текущее число
    }

    return c; // Возвращаем N-е число Фибоначчи
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    // Устанавливаем начальное значение
    let currentValue = initialValue;

    // Если функция операции не задана, то она по умолчанию возвращает текущее значение
    if (typeof operatorFn !== 'function') {
        return () => currentValue;
    }

    // Возвращаем новую функцию
    return (newValue) => {
        currentValue = operatorFn(currentValue, newValue);
        return currentValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    if(isNaN(start) || isNaN(step)){
        start = 0;
        step = 1;
    }
    let current = start; // Начальное значение

    return function generator() {
        const value = current; // Сохраняем текущее значение для возврата
        current += step; // Увеличиваем текущее значение на шаг
        return value; // Возвращаем текущее значение
    };
}

/**
 Напишите функцию deepEqual, которая принимает два значения
 и возвращает true только в том случае, если они имеют одинаковое значение
 или являются объектами с одинаковыми свойствами,
 значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно

 @param {object} firstObject - первый объект
 @param {object} secondObject - второй объект
 @returns {boolean} - true если объекты равны(по содержанию) иначе false
 @example
 deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 deepEqual({text: 'some text', count: 3, arr: [11, 22]},{text: 'some text', count: 3, arr: [11, 22]}) // true
 deepEqual({obj: {count: 12}, value: null, flag: true},{obj: {count: 12}, value: null, flag: true}) // true
 deepEqual({obj: {arr: ['a', 'b']}, value: undefined},{obj: {arr: ['a', 'b']}, value: undefined}) // true

 */
function deepEqual(firstObject, secondObject) {

    // Получаем ключи объектов
    // const keysFirst = Object.keys(firstObject);
    // const keysSecond = Object.keys(secondObject);
    // Сравниваем значения по ключам
    // let i=0;
    // Проверка наличия ключа во втором объекте и сравнение значений
    // for (const key of keysFirst) {
    //     if (keysSecond.includes(key) && firstObject[key]===secondObject[key]) {i=i+1;}
    // }
    // if (keysFirst.length===keysSecond.length && i===keysFirst.length){return true;}
    // if (isNaN(firstObject) && isNaN(secondObject)) {return true;}
    // return false;

    // Проверка на NaN
    if (Object.is(firstObject, NaN) && Object.is(secondObject, NaN)) {
        return true;
    }

    // Проверка на строгое равенство (на случай примитивов и null)
    if (firstObject === secondObject) {
        return true;
    }

    // Проверка на null и типы данных
    if (firstObject == null || secondObject == null ||
        typeof firstObject !== 'object' || typeof secondObject !== 'object') {
        return false;
    }

    // Получение ключей объекта
    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    // Проверка на количество ключей
    if (keysA.length !== keysB.length) {
        return false;
    }

    // Сравнение ключей и их значений рекурсивно
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}
module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
