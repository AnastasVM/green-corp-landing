const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 50; //количество пузырьков

function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
  };

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;

        this.getCanvasSize();

        this.init();
    }
  
    getCanvasSize() {//будет вытаскивать из холста его размеры и сохранять в переменные внутри класса Bubble
        this.canvasWidth = this.canvas.clientWidth; //Ширина html-элемента
        this.canvasHeight = this.canvas.clientHeight;//Высота html-элемента
    }
  
    init() {//будет инициализировать пузырек: выбирать ему один из случайных цветов, какой-то размер, начальное положение на холсте
        this.color = COLORS[Math.floor(Math.random() *COLORS.length)];
        this.size = generateDecimalBetween(3, 9);
        this.alpha = generateDecimalBetween(5, 10)/10; //прозрачность
        this.translateX = generateDecimalBetween(0, this.canvasWidth); //начальная позиция пузырька
        this.translateY = generateDecimalBetween(0, this.canvasHeight); //начальная позиция пузырька
        this.velocity = generateDecimalBetween(20, 40); //скорость пузырьков
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity; //направление движения и скорость
        this.movementY = generateDecimalBetween(1, 20) / this.velocity; //направление движения и скорость
    }
  
    move() {//будет пересчитывать положение пузырька на холсте, так как фигуры должны двигаться вверх
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;

        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
          }
        }    
  };

class CanvasBackground { //работать с холстом: добавлять пузырьки, рисовать их, анимировать
    constructor(id) {
      this.canvas = document.getElementById(id);
      this.ctx = this.canvas.getContext("2d");  
      this.dpr = window.devicePixelRatio;
    }
  
    start() { 
    this.canvasSize();
    this.generateBubbles(); 
    this.animate(); //запустить анимацию
    }

    canvasSize () { //выставить ширину и высоту холста и настроить масштаб
        this.canvas.width = this.canvas.offsetWidth * this.dpr; // * this.dpr - хорошее отображение графики при высоком разрешении монитора
        this.canvas.height = this.canvas.offsetHeight * this.dpr; // * this.dpr - хорошее отображение графики при высоком разрешении монитора

        this.ctx.scale(this.dpr, this.dpr); //настроить масштаб
    }

    generateBubbles () { //сгенерировать пузырьки
        this.bubblesList = [];
        for (let i=0; i< BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas))
        }
    }

    animate () {
        //Очистить холст:
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        //Изменить положение пузырьков:
        this.bubblesList.forEach((bubble) => {
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);
             //Нарисовать пузырьки с новым положением:
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);//размер пузырька отрисовался согласно размерам холста, учитывающим devicePixelRatio  
        });

        requestAnimationFrame(this.animate.bind(this));//запустим анимацию
     };
    };

const canvas = new CanvasBackground("orb-canvas");
canvas.start();