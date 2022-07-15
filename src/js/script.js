"use strict" //Подключаем строгий режим
//Скрипт для центрирования фонового изображения
$(document).ready(function() {
   function ibg(){
      $.each($('.ibg'), function(index, val) {
         if($(this).find('img').length > 0){
            $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
         }
      });
   }
   ibg();
});
//ПЛАВНАЯ ПРОКРУТКА (SCROLL) СТРАНИЦЫ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Для подключения скролла в HTML документе необходимо добавить к кнопке (ссылке) запускающей скролл атрибут data-goto=".имя__класса", где "имя__класса" это класс элемента к которому необходимо сделать скролл

const menuLinks = document.querySelectorAll('.header__link[data-goto]'); //Находим все ссылки .header__link в документе
if (menuLinks.length > 0) { //Проверяем наличие в документе ссылок .header__link
   menuLinks.forEach(menuLink => { //Перебираем массив с полученными ссылками .header__link 
      menuLink.addEventListener("click", onMenuLinkClick); //Вешаем событие клик на ссылку .header__link
   });
   function onMenuLinkClick(e) { //Создаем функцию при клике на меню .header__link
      const body = document.querySelector('body'); //Объявляем переменную body и помещаем в неё элемент body
      const burger = document.querySelector('.header__burger'); //Объявляем переменную burger и помещаем в неё главный меню-бургер
      const menu = document.querySelector('.header__menu'); //Объявляем переменную menu и помещаем в неё главное header-menu
      const menuLink = e.target; //Получаем целевую ссылку .header__link

      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //Проверяем наличие элементов с атрибутами data-goto в HTML 
         const gotoBlock = document.querySelector(menuLink.dataset.goto); //Получаем данные из атрибута data-goto чтобы понять куда ведет ссылка
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header ').offsetHeight; //Отнимаем высоту шапки при подсчете расстояния скролла
         if (menu.classList.contains('active')) { //Если меню при этом было открыто
            burger.classList.remove('active');//Удаляем класс active у нашего бургера (трансформируем из крестика в три полоски)
            menu.classList.remove('open'); //Удаляем проверочный класс open у нашего меню которое мы добавили когда открыли меню через бургер
            menu.classList.remove('active'); //Удаляем класс active у нашего меню (закрываем его)
            body.classList.remove('lock'); //Удаляем класс lock у body (возвращаем скролл на страницу)
         }
         window.scrollTo({ //Запускаем скролл
            top: gotoBlockValue,  //Передаем значение высоты шапки
            behavior: "smooth" //Задаем плаавность скролла до объета
         });
         e.preventDefault(); //Отключаем функцию ссылки чтобы страница не обновлялась
      }
   }
}

//МЕНЮ БУРГЕР/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.burger').forEach(e => { //Находим все элементы с классом .burger (кнопка бургер) на странице и запускаем стрелочную функцию в которой мы получаем в element наш бургер
   e.addEventListener('click', e => { //Вешаем событие клик на элемент в который мы получили наш бургер
      const body = document.querySelector('body'); //Объявляем переменную body и помещаем в неё элемент body
      const menuBurger = e.currentTarget.dataset.burger; //Получаем в переменную menuBurger значение дата-атрибута data-burger нажатого элемента с классом.burger
      const menuList = document.querySelector(`[data-menu=${menuBurger}]`); //Получаем в переменную menuList меню с дата атрибутом data-menu и привязываем ему значение дата атрибута data-burger 
      const headerArrows = document.querySelectorAll('.header__arrow'); //Получаем в переменную headerArrows все элементы с классом .header__arrows (стрелочки выпадающего подменю)
      const headerItems = document.querySelectorAll('.header__item'); //Объявляем переменную menu и помещаем в неё главное header-menu
      const burger = document.querySelector('.header__burger'); //Объявляем переменную burger и помещаем в неё главный меню-бургер

      let intervalId; // Объявляем переменную intervalId

      document.querySelectorAll('.header__sub-list').forEach(function (e) { //Находим все элементы с классом .header__sub-list (выпадающее подменю) 
         if (e.classList.contains('open')) { //Если у выпадающего подменю есть класс .open
            e.classList.remove('active'); //Тогда мы удаляем у выпадающего подменю класс .active
            headerArrows.remove('active'); //И удаляем у стрелочек выпадающего подменю класс .open
         }
      });

      document.querySelectorAll('.header__menu').forEach(e => { //Находим все элементы с классом .header__menu (выпадающее меню) на странице и запускаем стрелочную функцию в которой мы получаем в element наше выпадающее меню
         if (!menuList.classList.contains('open')) { //Если выпадающее меню не имеет класса .open
            menuList.classList.add('active'); //Добавляем выпадающему меню класс .active 
            burger.classList.add('active'); //Добавляем бургеру класс .active 
            body.classList.add('lock'); //Добавляем телу страницы класс .lock

            intervalId = setTimeout(() => {
               menuList.classList.add('open'); //Добавляем выпадающему меню класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (menuList.classList.contains('open')) { ///Если выпадающее меню имеет класс .open
            clearTimeout(intervalId);
            menuList.classList.remove('active'); //Удаляем выпадающему меню класс .active 
            burger.classList.remove('active'); //Удаляем бургеру класс .active 
            body.classList.remove('lock'); //Удаляем телу страницы класс .lock
            intervalId = setTimeout(() => {
               menuList.classList.remove('open'); //Удаляем выпадающему меню класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
      });
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      window.onclick = e => { //Функция закрытия меню по клику вне обслати меню
         let headerArrow = ''; //Объявляем переменную headerArrow со значением пустой строки
         for (let i = 0; i < headerArrows.length; i++) { //Запускаем цикл перебора массива .header__arrow
            headerArrow = headerArrows[i]; //Задаем переменной headerArrow значение headerArrows с индексом
            if (e.target == headerArrow) { //Если целью клика является переменная headerArrow (стрелочка выпадающего подменю)
               return; //Тогда возвращаем функцию (ничего не происходит)
            }
         }

         let headerItem = ''; //Объявляем переменную headerItem со значением пустой строки
         for (let i = 0; i < headerItems.length; i++) { //Запускаем цикл перебора массива .header__item
            headerItem += headerItems[i]; //Задаем переменной headerItem значение headerItems с индексом
            if (e.target == menuList //Если целью клика является переменная menuList (выпадающее меню) 
               || e.target == burger //Если целью клика является переменная burger (бургер)
               || e.target == headerItem //Если целью клика является переменная headerItem (элемент списка выпадающего меню)
            ) {
               return; //Тогда возвращаем функцию (ничего не происходит)
            } else { //Иначе
               menuList.classList.remove('active'); //Удаляем класс .active у выпадающего меню
               menuList.classList.remove('open'); //Удаляем класс .open у выпадающего меню
               burger.classList.remove('active'); //Удаляем класс .active у бургера
               body.classList.remove('lock'); //Удаляем класс .lock у тела страницы
            }
         }
      }
   })
});

//ВЫПАДАЮЩЕЕ МЕНЮ (DROPDOWNS)/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.header__link').forEach(e => { //Находим все элементы с классом .header__link (пункт меню) на странице и запускаем стрелочную функцию в которой мы получаем в element наш пункт меню
   e.addEventListener('click', e => { //Вешаем событие клик на элемент в который мы получили наш пункт меню
      const body = document.querySelector('body'); //Объявляем переменную body и помещаем в неё элемент body
      const menu = document.querySelector('.header__menu'); //Объявляем переменную menu и помещаем в неё главное header-menu
      const burger = document.querySelector('.header__burger'); //Объявляем переменную burger и помещаем в неё главный меню-бургер
      const headerLink = e.currentTarget.dataset.link;  //Получаем в переменную headerLink значение дата-атрибута data-link нажатого элемента с классом .header__link
      const headerSubList = document.querySelector(`[data-sublist=${headerLink}]`); //Получаем в переменную headerSubList подменю с дата атрибутом data-sublist и привязываем ему значение дата атрибута data-link 
      const headerArrow = document.querySelector(`[data-arrow=${headerLink}]`); //Получаем в переменную headerArrow стрелочку с дата атрибутом data-arrow и привязываем ему значение дата атрибута data-link 
      const headerItems = document.querySelectorAll('.header__item'); //Получаем в переменную headerItems пункт главного меню 

      let intervalId; // Объявляем переменную intervalId
      //Функция на выпадающее подменю//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      document.querySelectorAll('.header__sub-list').forEach(e => { //Находим все элементы с классом .header__sub-list (выпадающее подменю) 
         if (!headerArrow.classList.contains('open') || !headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка не имеют класса .open
            e.classList.remove('active'); //Тогда мы удаляем у всех выпадающих подменю и у стрелочек класс .active
            e.classList.remove('open'); //И удаляем у всех выпадающих подменю и у стрелочек класс .open
            headerSubList.classList.add('active'); //Добавляем нажатому выпадающему подменю класс .active 

            intervalId = setTimeout(() => {
               headerSubList.classList.add('open'); //Добавляем выпадающему подменю класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (headerArrow.classList.contains('open') || headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка имеют класс .open
            clearTimeout(intervalId);
            headerSubList.classList.remove('active'); //Удаляем у нажатого выпадающего подменю класс .active
            intervalId = setTimeout(() => {
               headerSubList.classList.remove('open'); //Удаляем выпадающему подменю класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
      });
      //Функция на крутящуюся стрелочку/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      document.querySelectorAll('.header__arrow').forEach(e => { //Находим все стрелочки на странице и запускаем стрелочную функцию в которой мы получаем в element нашу стрелочку
         if (!headerArrow.classList.contains('open') || !headerSubList.classList.contains('open')) { //Если стрелочка или выпадающее подменю не имеют класса .open
            e.classList.remove('active'); //Тогда мы удаляем у всех выпадающих подменю и у стрелочек класс .active
            e.classList.remove('open'); //Удаляем у всех выпадающих подменю и у стрелочек класс .open
            headerArrow.classList.add('active'); //И добавляем нажатой стрелочке класс .active

            intervalId = setTimeout(() => {
               headerArrow.classList.add('open'); //добавляем нажатой стрелочке класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (headerArrow.classList.contains('open') || headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка имеют класс .open
            clearTimeout(intervalId);
            headerArrow.classList.remove('active'); //Удаляем у нажатой стрелочки класс .active 
            intervalId = setTimeout(() => {
               headerArrow.classList.remove('open'); //Удаляем нажатой стрелочки класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
         //Закрытие выпадающего подменю по клику вне области выпадалющего подменю///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         window.onclick = e => { //Функция закрытия подменю по клику вне обслати выпадающего подменю 
            let headerItem = ''; //Объявляем переменную headerItem со значением пустой строки
            for (let i = 0; i < headerItems.length; i++) { //Запускаем цикл перебора массива .header__item
               headerItem += headerItems[i]; //Задаем переменной headerItem значение headerItems с индексом
               if (  e.target == headerSubList //Если целью клика является переменная headerSubList (выпадающее подменю)
                  || e.target == headerArrow //Если целью клика является переменная headerArrow (стрелочка выпадающего подменю)
                  || e.target == document.querySelector(`[data-link=${headerLink}]`) //Если целью клика является пункт меню с атрибутом data-link
                  || e.target == menu //Если целью клика является переменная menu (главное меню)
                  || e.target == headerItem) { //Если целью клика является пункт меню
                  return; //Тогда возвращаем функцию (ничего не происходит)
               } else {
                  headerArrow.classList.remove('active'); //Удаляем класс .active у стрелочек
                  headerArrow.classList.remove('open'); //Удаляем класс .open у стрелочек
                  headerSubList.classList.remove('active'); //Удаляем класс .active у выпадающего подменю
                  headerSubList.classList.remove('open'); //Удаляем класс .open у выпадающего подменю
                  menu.classList.remove('active'); //Удаляем класс .active у главного меню
                  menu.classList.remove('open'); //Удаляем класс .open у главного меню
                  burger.classList.remove('active'); //Удаляем класс .active у бургера
                  body.classList.remove('lock'); //Удаляем класс .lock у тела страницы
               }
            }
         }
         //Закрытие выпадающего подменю по нажатию на клавишу ESC/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         window.addEventListener('keydown', function (e) { //Функция закрытия подменю по нажатию клавиши esc
            if (e.keyCode == 27) { //Если нажатой клавишей является клавиша esc 
               if (  headerArrow.classList.contains('active') || headerArrow.classList.contains('open') //Если у стрелочки есть класс .open и клас .active  
                  ) {
                  headerArrow.classList.remove('active'); //Удаляем класс .active у стрелочек
                  headerArrow.classList.remove('open'); //Удаляем класс .open у стрелочек
                  headerSubList.classList.remove('active'); //Удаляем класс .active у выпадающего подменю
                  headerSubList.classList.remove('open'); //Удаляем класс .open у выпадающего подменю
               }
            }
         }.bind(this));
      });
   });
});

//МОДАЛЬНЫЕ ОКНА////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Структура модального окна в HTML документе - <div class="modal"> => <div class="modal__container">
//Для того чтобы задать уникальное имя модального окна для связи с кнопкой, добавьте к контейнеру модального окна атрибут data-target="имя"
//Для связи кнопки запускающей модальное окно и самого модального окна, кнопке необходимо задать атрибут data-path="имя"
//Для подключения анимации в HTML документе необходимо добавить к кнопке запускающей анимацию атрибут data-animation="fadeInUp" 
//Для регулировки скорости анимаций в HTML документе необходимо добавить к кнопке запускающей анимацию атрибут data-speed="300"
//Для отключения прыжка элементов имеющий фиксированное и абсолютное позиционирование в HTML документе необходимо добавить им class="fix-block"

class Modal { //Создаем класс с конструктором, в который будем передавать все необходимые значения
   constructor(options) {
      let defaultOptions = {
         isOpen: () => { },
         isClose: () => { },
      }
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.animation = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
         'a[href]',
         'input',
         'button',
         'select',
         'textarea',
         '[tabindex]'
      ];
      this.events();
   }

   events() {
      if (this.modal) {
         document.addEventListener('click', function (e) {
            const clickedElement = e.target.closest('[data-path]');
            if (clickedElement) {
               let target = clickedElement.dataset.path;
               let animation = clickedElement.dataset.animation;
               let speed = clickedElement.dataset.speed;
               this.animation = animation ? animation : 'fade';
               this.speed = speed ? parseInt(speed) : 300;
               this.modalContainer = document.querySelector(`[data-target="${target}"]`);
               this.open();
               return;
            }
            if (e.target.closest('.modal-close')) { //Закрываем модальное окно по нажатию крестика
               this.closeModal();
               return;
            }
         }.bind(this));
         window.addEventListener('keydown', function (e) { //Закрываем модальное окно по нажатию клавиши esc
            if (e.keyCode == 27) {
               if (this.isOpen) {
                  this.closeModal();
               }
            }
            if (e.keyCode == 9 && this.isOpen) { //Включаем фокус внутри модального окна
               this.focusCatch(e);
               return;
            }
         }.bind(this));
         this.modal.addEventListener('click', function (e) { //Закрываем модальное окно по клику вне модального окна
            if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
               this.closeModal();
            }
         }.bind(this));
      }
   }
   open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('open'); //Открываем заднюю темную плашку
      this.disableScroll(); //Отключаем скролл сайта 
      this.modalContainer.classList.add('modal-open');  //Открываем модальное окно
      this.modalContainer.classList.add(this.animation);
      setTimeout(() => {
         this.options.isOpen(this);
         this.modalContainer.classList.add('animate-open'); //Включаем анимации
         this.isOpen = true;
         this.focusTrap();  //Включаем фокус внутри модального окна
      }, this.speed);
   }
   closeModal() {
      if (this.modalContainer) {
         this.modalContainer.classList.remove('animate-open');
         this.modalContainer.classList.remove(this.animation);
         this.modal.classList.remove('open');
         this.modalContainer.classList.remove('modal-open');
         this.enableScroll();
         this.options.isClose(this);
         this.isOpen = false;
         this.focusTrap();
      }
   }
   focusCatch(e) {  //Фокусировка на первом элементе модального окна                                                              
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
         focusArray[focusArray.length - 1].focus();
         e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
         focusArray[0].focus();
         e.preventDefault();
      }
   }
   focusTrap() { //Включаем фокус внутри модального окна
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
         if (focusable) focusable[0].focus();
      } else {
         this.previousActiveElement.focus();
      }
   }
   disableScroll() { //Отключаем скролл сайта 
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
   }
   enableScroll() { //Включаем скролл сайта 
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
   }
   lockPadding() {  //Отключение прыжка страницы при открывании модального окна
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
         el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
   }

   unlockPadding() {  //Отключение прыжка страницы при закрывании модального окна
      this.fixBlocks.forEach((el) => {
         el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
   }
}
const modal = new Modal({
   isOpen: () => {
      console.log(modal);
      console.log('opened');
   },
   isClose: () => {
      console.log('closed');
   }
});

//SPOLLERS

//АТТРИБУТЫ В HTML:
//ДЛЯ ОБОЛОЧЕК СПОЙЛЕРОВ - data-spollers 
//ДЛЯ ЗАГОЛОВКОВ СПОЙЛЕРОВ - data-spoller
//ДЛЯ ВОЗМОЖНОСТИ ПЕРЕХОДА ПО НАЖАТИЮ НА TAB ПО ЗАГОЛОВКАМ СПОЙЛЕРОВ tabindex="-1"
//ЕСЛИ ХОТИМ ЧТОБЫ ОТКРЫВАЛСЯ ТОЛЬКО ОДИН ЗАГОЛОВОК СПОЙЛЕРА - data-one-spoller 


//initSpolles - функция которая по клику вешает и убирает класс _init на спойлеры
//spollersRegular - массив не адаптивных спойлеров
//spollersArray  - массиав адапативных спойлеров
//mediaQueries - массив строк с информацией об адаптивных спойлерах 
//breakpoint - элементы массива mediaQueries со строками типа 600, max

const spollersArray = document.querySelectorAll('[data-spollers]'); //Получаем в переменную spollersArray (оболочки спойлеров) коллекцию элементов с дата-атрибутом spollers
if (spollersArray.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersArray с дата-атрибутом spollers
   //ПОЛУЧАЕМ МАССИВ ОБЫЧНЫХ (НЕ АДАПТИВНЫХ) СПОЙЛЕРОВ
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) { //С помощью Array.from мы переводим коллекцию spollersArray в массив, затем получаем в переменную spollersRegular массив spollersArray и фильтурем его для дальнешего разделения на обычные спойлеры и медиа-адаптивные спойлеры
      return !item.dataset.spollers.split(",")[0]; //Возвращаем с помощью функции все элементы у которых нет параметров дата-атрибута 
   });
   //ИНИЦИАЛИЗАЦИЯ ОБЫЧНЫХ СПОЛЙЕРОВ
   if (spollersRegular.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersRegular
      initSpollers(spollersRegular); //Передаем в будущую функцию initSpollers массив spollersRegular 
   }

   //ПОЛУЧАЕМ СПОЙЛЕРЫ С МЕДИА ЗАПРОСАМИ (АДАПТИВНЫЕ)
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) { //С помощью Array.from мы переводим коллекцию spollersArray в массив, затем получаем в переменную spollersMedia массив spollersArray и фильтурем его для дальнешего разделения на обычные спойлеры и медиа-адаптивные спойлеры
      return item.dataset.spollers.split(",")[0]; //Возвращаем с помощью функции все элементы у которых есть параметр дата-атрибута
   });

   //ИНИЦИАЛИЗАЦИЯ СПОЙЛЕРОВ С МЕДИА ЗАПРОСАМИ (АДАПТИВНЫХ) 
   if (spollersMedia.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersMedia 
      const breakpointsArray = []; //Создаем пустой массив breakpointsArray для дальнейшего наполнения
      spollersMedia.forEach(item => { //С помощью метода forEach мы перебираем массив объектов spollersMedia и присваеваем каждый элемент данного массива в переменную item
         const params = item.dataset.spollers; //Получаем в переменную params строку с параметрами для каждого объекта (в качестве примера задаем в html data-spollers="650,min" или data-spollers="800,max")
         const breakpoint = {}; //Создаем пустой объект (ассоциативный массив) для дальнейшего наполнения
         const paramsArray = params.split(","); //С помощью метода split разделяем строку внтури переменной params на массив подстрок с разделителем в качестве запятой "," и возвращаем новый массив 
         breakpoint.value = paramsArray[0]; //В объекте breakpoint создаем ключ value со значением в качестве нулевой ячейки (индекса) массива paramsArray 
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"; //В объекте breakpoint создаем ключ type со значением в качестве первой ячейки (индекса) массива paramsArray, но если первой ячеки не существует, условием будет значение "max"  
         breakpoint.item = item; //В объекте breakpoint создаем ключ item со значением в качестве самого объекта
         breakpointsArray.push(breakpoint); //Добавляем объект (ассоциативный массив) breakpoints в массив breakpointsArray
      });

      //ПОЛУЧАЕМ УНИКАЛЬНЫЕ БРЕЙКПОИНТЫ 
      let mediaQueries = breakpointsArray.map(function (item) { // Объявляем переменную mediaQueries в которую присваиваем значение массива breakpointsArray и с помощью метода .map перебираем последний массив 
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type; //Возвращаем в перебранный массив значение строки по типу (max-width: 600px), 600px, max - в качестве примера
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) { // В массиве mediaQueries мы запускаем функцию фильтрации с помощью метода .filter
         return self.indexOf(item) === index; // И получаем в данный массив уникальные брейкпоинты без дублей
      });

      //РАБОТАЕМ С КАЖДЫМ БРЕЙКПОИНТОМ
      mediaQueries.forEach(breakpoint => { // Перебираем массив mediaQueries с помощью метода forEach и присваиваем каждый элемент данного массива в переменную breakpoint
         const paramsArray = breakpoint.split(","); // В переменную paramsArray присваиваем строку массива mediaQueries, разделяем её с помощью метода split запятой "," и возвращаем её в виде массива
         const mediaBreakpoint = paramsArray[1]; // В переменную mediaBreakpoint присваеваем первую ячейку (индекса) массива mediaQueries - число (например 600)
         const mediaType = paramsArray[2]; // В переменную mediaType присваеваем вторую ячейку (индекса) массива mediaQueries - строку (например max)
         const matchMedia = window.matchMedia(paramsArray[0]); //В переменную matchMedia помещаем значение в виде прослушивания ширины экрана (paramsArray[0]);

         //ОБЪЕКТЫ С НУЖНЫМИ УСЛОВИЯМИ 
         const spollersArray = breakpointsArray.filter(function (item) { // Создаем переменную spollersArray присваиваем значения изначального массива всех брейкпоинтов breakpointsArray фильтруем его с помощью метода .filter
            if (item.value === mediaBreakpoint && item.type === mediaType) { // Собираем в константу spollersArray все объекты которые у которых совпадает и число [0] например 600 и тип например max [1] 
               return true; // Возвращаем булевое значение true
            }
         });
            
         //СОБЫТИЕ 
         matchMedia.addListener(function () { // Вешаем функцию на переменную matchMedia 
            initSpollers(spollersArray, matchMedia); // в функцию initSpollers собранный массив объектов spollersArray и константу matchMedia 
         });
         initSpollers(spollersArray, matchMedia); // Запускаем функцию initSpollers для того чтобы она отработала сразу при загрузке страницы
      });
   }

   //ИНИЦИАЛИЗАЦИЯ 
   function initSpollers(spollersArray, matchMedia = false) { // Создаем функцию initSpollers в которую получаем два параметра в виде массива spollersArray и константы matchMedia, но если мы не передаем константу matchMedia, то её значение будет равно false  
      spollersArray.forEach(spollersBlock => { // Перебираем массив spollersArray с помощью метода .forEach и присваиваем и присваеваем каждый элемент данного массива в переменную spollerBlock
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock; // Если matchMedia не равно нулю (true), мы получаем элемент объекта spollersBlock 
         if (matchMedia.matches || !matchMedia) { // Если  наш брейкпоинт сработал или мы передали обычные (не адаптивные) спойлеры
            spollersBlock.classList.add('_init'); // Добавляем спойлеру технический класс _init 
            initSpollerBody(spollersBlock); // Отправляем спойлер в будущую функцию initSpollersBody
            spollersBlock.addEventListener("click", setSpollerAction) // Вешаем на спойлер событие клик и вызываем будущую функцию которую напишем позднее
         } else { // Иначе...
            spollersBlock.classList.remove('_init'); // Отменяем технический класс _init у спойлера 
            initSpollerBody(spollersBlock, false); // Отправляем спойлер и параметр false в будущую функцию initSpollersBody 
            spollersBlock.removeEventListener("click", setSpollerAction); // Убираем со спойлера событие клик и вызываем будущую функцию которую напишем позднее
         }
      });  
   }

   //РАБОТА С КОНТЕНТОМ 
   function initSpollerBody(spollersBlock, hideSpollerBody = true) { // Создаем функцию в которую передаем два параметра в виде отдельного блока со спойлерами и hideSpollerBody равное true
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]'); // Получаем все заголовки спойлеров конкретного блока
      if (spollerTitles.length > 0) { // Проверяем есть ли у нас заголовки спойлеров 
         spollerTitles.forEach(spollerTitle => { // Перебираем массив заголовков с помощью метода .forEach и присваеваем каждый элемент данного массива в переменную spollerTitle
            if (hideSpollerBody) { // Если hideSpollerBody равен true 
               spollerTitle.removeAttribute('tabindex'); // Убираем у заголовка аттрибут tabindex (включение возможности перехода по заголовкам по нажатию на tab)
               if (!spollerTitle.classList.contains('_active')) { // Если у заголовка отсутствует класс _active 
                  spollerTitle.nextElementSibling.hidden = true; // Тогда мы скрываем контентную часть 
               }
            } else { 
               spollerTitle.setAttribute('tabindex', '-1'); // Иначе мы добавляем заголовку аттрибут tabindex со значением -1
               spollerTitle.nextElementSibling.hidden = false; // Показываем контенктные блоки если они были скрыты
            } 
         });
      }
   }
   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 400);
         }
         e.preventDefault();
      }
   }
   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, 400);
      }
   }
}

//=======================================================================================================================================================================
//SlideToggle 
let _slideUp = (target, duration = 400) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0; 
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 400) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0; 
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight; 
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 400) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}

//SWIPER///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
new Swiper('.image-slider', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
   },
   loop: true,

   autoplay: {
      delay: 3000,
      stopOnLastSlide: true,
      disableOnInteraction: false,
   },

   autoHeigth: true,
});


//CARDS//////////////////////////////////////////////////////////////////////////////////


 $(document).ready(function() {
   $(".catalog-item__link").click(function(e) {
      e.preventDefault();
      $(".catalog-item__content").toggleClass('catalog-item__content-active');
      $(".catalog-item__content").toggleClass('catalog-item__list-active');
      
    })
});