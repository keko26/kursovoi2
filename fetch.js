let items = [];//создаём массив

// Функция для загрузки XML и преобразования его в JSON
function loadXML(url) {//url - ссылка на xml файл(принимается при вызове функции)
    return fetch(url)//захват файла
        .then(response => response.text())//чтение файла
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))//распознование текста как xml-документа
        .then(data => {//получение данных
            items = Array.from(data.querySelectorAll('item')).map(item => {//заполняем массив структурой где 'item' - имя тега в xml, item - имя структуры
                console.log(item.querySelector('price').textContent); 
                return { 
                    price: item.querySelector('price').textContent,
                    img: item.querySelector('img').textContent,
                    about: item.querySelector('about').textContent,
                    ref: item.querySelector('ref').textContent,
                };
            });
            return items;//возращаем готовый массив
        });
}

// Функция для добавления элементов в items-list
function addItemsToDOM(items) {
    const itemsList = document.querySelector('.main');//создаём переменную хранящая элемент
    // Очищаем список перед добавлением новых элементов
    items.forEach(item => {//цикл переберающий элементы массива
        const itemDiv = document.createElement('div');//создаём контейнер для товара
        itemDiv.className = 'item item2';//выдаём класс контейнеру
        itemDiv.innerHTML = `
           <a href="${item.ref}"><div class="item_img"><img src="${item.img}"></div>
           <div class="divinf"><div class="inf">${item.about}</div>
           <div class="price"> ${item.price}</div></div></a>
            
           
        `;//заполняем контейнер информацией
        
        itemDiv.onclick = function() {//(опционально) вызов функции при нажатии на контейнер
        };
        itemsList.appendChild(itemDiv);//добовляем в наш .items-list созданный div
    });
}

document.addEventListener('DOMContentLoaded', function () {

    loadXML("items.xml").then(() => {
        addItemsToDOM(items);
    })
        .catch(error => console.error('Error fetching XML:', error));
})