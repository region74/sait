window.onload = function () {
  const arrGameNums = [[], [], [], []]; // внутренний массив с правильными элементами
  const arrGameNumsIn = [[], [], [], []]; // динамический массив дублирующий реальное поле
  let counter = 0; // счетчик нажатий на ячейки

  document.querySelector(".play-table").addEventListener("click", (e) => {
    if (e.target.textContent !== "" && e.target.tagName == "TD") {
      movement(e.target); // реакция на нажатие ячейки
    }
  });

  nullification(); // заполнение массивов

  document.querySelector(".main__buttons").addEventListener("click", (e) => {
    if (e.target.id === "1") {
      // реакция на нажатие на первую кнопку
      nullification(); // обнуляем внутренние массивы для начала игры
      createField(); // передаем на игровое поле ячейки
      counter = 0;
      makeRundom(400); // перемешиваем
      removeColor();
    } else if (e.target.id === "2") {
      // реакция на нажатие на вторую кнопку
      nullification();
      // createField();
      counter = 0;
      // makeRundom(400);
      createField();
    }
  });

  function movement(el, robot = false) {
    counter++;
    let coordinateEl; // передвигаемы элемент
    let coordinateZe; // пустая ячейка
    let zero = document.getElementById(0); // получить пустую ячейку

    document.querySelector(".score").textContent = counter; // вывод счета
    // console.log(arrGameNumsIn);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arrGameNumsIn[i][j] === Number(el.textContent)) {
          
          coordinateEl = [i, j]; // координата ячейки в нашем виртуальном массиве
        }
        if (arrGameNumsIn[i][j] === 16) {
          coordinateZe = [i, j]; // координата пустой ячейки в нашем виртуальном массиве
        }
      }
    }

    if (!checker(coordinateEl, coordinateZe)) {
      // проверяем, находится ли рядом нажатый блок
      return;
    } else {
      removeColor();

      arrGameNumsIn[coordinateEl[0]][coordinateEl[1]] = 16; // нулевой блок 16
      arrGameNumsIn[coordinateZe[0]][coordinateZe[1]] = Number(el.textContent); // меняем местами выборку
      zero.outerHTML = `<td id = ${el.textContent}>${el.textContent}</td>`;
      el.outerHTML = `<td id = 0 style="background-color:hsla(200, 60%, 30%, 0.5);"></td>`; 
      if (!robot) {
        if (winCheck())
        return;
      } //проверяем на победу
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arrGameNumsIn[i][j] === 16) {
          coordinateZe = [i, j]; // координата пустой ячейки в  виртуальном массиве
        }
      }
    }
    color(coordinateZe);
  }

  /**
   * создает поле с помощью замены html на новую таблицу
   */
  function createField() {
    let htmlStr = "";
    for (let i = 0; i < 4; i++) {
      htmlStr += "<tr>";

      for (let j = 0; j < 4; j++) {
        if (i === 3 && j === 3) {
          htmlStr += `<td class="el" id=0></td>`;
          continue;
        }
        htmlStr += `<td id=${arrGameNums[i][j]}>${arrGameNums[i][j]}</td>`;
      }
      htmlStr += "</tr>";
    }

    document.querySelector(".play-table").innerHTML = htmlStr;
    document.getElementById(0).style.backgroundColor =
      "hsla(200, 60%, 30%, 0.3)";
  }

  /**
   * проверка, рядом ли нажатый элемент
   */
  function checker(coordinateEl, coordinateZe) {
    let possibleElems = [[], [], [], []]; // создаем массив элементов вокруг пустой ячейки

    possibleElems[0][0] = coordinateZe[0] - 1;
    possibleElems[0][1] = coordinateZe[1];

    possibleElems[1][0] = coordinateZe[0] + 1;
    possibleElems[1][1] = coordinateZe[1];

    possibleElems[2][0] = coordinateZe[0];
    possibleElems[2][1] = coordinateZe[1] + 1;

    possibleElems[3][0] = coordinateZe[0];
    possibleElems[3][1] = coordinateZe[1] - 1;

    for (let i = 0; i < possibleElems.length; i++) {
      if (
        coordinateEl[0] == possibleElems[i][0] &&
        coordinateEl[1] == possibleElems[i][1]
      ) {
        return true; // проверяем совпадают ли координаты нажатой кнопки и окружающих элементов
      }
    }
  }

  /**
   * случайно перемешиваем таблицу
   */
  function makeRundom(quontity) {
    for (let i = 0; i < quontity; i++) {
      let rundom = getRandomIntInclusive(1, 15);
      
      el = document.getElementById(rundom);
      if (el.textContent !== "") {
        movement(el, true);
      }
      counter = 0;
    }
  }

  /**
   * обнуляем массивы для новой игры
   */
  function nullification() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        arrGameNums[i][j] = i * 4 + j + 1;
        arrGameNumsIn[i][j] = i * 4 + j + 1;
      }
    }
  }

  /**
   * проверка на победу
   */
  function winCheck() {
    let winCount = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arrGameNums[i][j] == arrGameNumsIn[i][j]) {
          winCount++;
        }
      }
    }
    if (winCount == 16) {
      console.log(`You win!,
    Youre score is ${counter}`);
      document.querySelector('.play-table').innerHTML = `<div class="win">Вы выиграли,
      ваш результат ${counter}!</div>`
      return true;
    }
  }

 
  function color(coordinateZe) {
    let possibleElems = [[], [], [], []];

    possibleElems[0][0] = coordinateZe[0] - 1;
    possibleElems[0][1] = coordinateZe[1];

    possibleElems[1][0] = coordinateZe[0] + 1;
    possibleElems[1][1] = coordinateZe[1];

    possibleElems[2][0] = coordinateZe[0];
    possibleElems[2][1] = coordinateZe[1] + 1;

    possibleElems[3][0] = coordinateZe[0];
    possibleElems[3][1] = coordinateZe[1] - 1;

    let arrInd = [];

    for (let i = 0; i < possibleElems.length; i++) {
      if (
        possibleElems[i][0] <= -1 ||
        possibleElems[i][1] <= -1 ||
        possibleElems[i][0] >= 4 ||
        possibleElems[i][1] >= 4
      ) {
        continue
      } else {
        arrInd[i] = arrGameNumsIn[possibleElems[i][0]][possibleElems[i][1]];
      }
    }
    arrInd.forEach(element => {
      if(element != ""){
        document.getElementById(element).className += 'possibleTD';
      }
    });
  }

  function removeColor(){
    let tds = document.querySelectorAll('td');
    tds.forEach(element => {
        element.classList.remove('possibleTD');
    });
  }

  /**рандом
   */
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
};
