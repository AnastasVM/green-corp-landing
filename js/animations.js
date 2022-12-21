const INCREASE_NUMBER_ANIMATION_SPEED = 50;//константа для задания скорости анимации

function increaseNumberAnimationStep(i, element, endNumber) { //шаг анимации
    //i — счетчик анимации. Он будет принимать значение от 0 до 5000 и каждый кадр анимации увеличиваться на 1.
    //element — html-элемент тега с числом. За один кадр анимации значение внутри element мы будем менять на i.
    //endNumber — значение, когда анимация остановится. В нашем случае — 5000.
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
          } else {
            element.innerText = i;
          }

          i+=100;

          setTimeout(function() {
            increaseNumberAnimationStep(i, element, endNumber);
          }, INCREASE_NUMBER_ANIMATION_SPEED);
      }
  };

  function initIncreaseNumberAnimation() {//инициализирует и запускает анимацию
    const element = document.querySelector(".features__clients-count");
    
    increaseNumberAnimationStep(0, element, 5000);
  }
  
  //Селект с выбором примерного бюджета в ней (при выборе 'Другое' должно появляться дополнительное текстовое поле для ввода)

  document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    if (event.target.value === 'other') {
      const formContainer = document.createElement('div');
      formContainer.classList.add('form__group');
      formContainer.classList.add('form__other-input');
   
      const input = document.createElement('input');
      input.placeholder = "Введите ваш вариант";
      input.type = "text";
   
      formContainer.appendChild(input);
      document.querySelector('#form form').insertBefore(formContainer, document.querySelector('.form__submit')); 
    }

   //удаляем ранее добавленное поле, если оно есть в DOM

   const otherInput = document.querySelector('.form__other-input');

      if (event.target.value !== 'other' && Boolean(otherInput)) {
      document.querySelector('#form form').removeChild(otherInput);
      };
  });

let animationInited = false;

//Функция-колбек, которая будет вызываться при изменении скролла
  function updateScroll() {
    if (window.scrollY > 0) {
      document.querySelector('header').classList.add('header__scrolled');
    } else {
      document.querySelector('header').classList.remove('header__scrolled');
    }
    // Запуск анимации увеличения числа
    let windowBottomPosition = window.scrollY + window.innerHeight;
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;

     if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  };
  };

  window.addEventListener('scroll', updateScroll);

  //функция, которая будет тегу a (header)добавлять обработчик
  function addSmoothScroll(anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
   
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  };
   
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    addSmoothScroll(anchor);
  });

  //функция, которая будет обработчиком клика
  function onLinkClick(event) {
    //предотвратить поведение ссылки по умолчанию
    event.preventDefault();

    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  };

  addSmoothScroll(document.querySelector('.more-button'));