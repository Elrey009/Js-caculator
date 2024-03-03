const display = document.querySelector(".display");
const inputBox = document.querySelector(".input-box");
const alphaBtn = document.querySelector(".alpha-btn");
const operatorBtn = document.querySelector(".operator-btn");

let lastInput = null;

// append input to display
function appendToDisplay(input) {
  if (Number(display.textContent) === 0) {
    display.textContent = input;
    return;
  }

  display.textContent += input;

  console.log(display.textContent);
}

// click event
inputBox.addEventListener("click", (event) => {
  if (
    event.target.tagName === "BUTTON" ||
    event.target.classList.contains("alpha-btn")
  ) {
    const value = event.target.textContent;
    if (event.target.classList.contains("alpha-btn")) {
      appendToDisplay("");
    } else appendToDisplay(value);
  }
});

// delete & all clear funtion

const clear = document.querySelector(".delete");

clear.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    display.textContent = "0";
  }
});

const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", () => {
  display.textContent = "";
});

// operators function
const mathOperation = () => {
  let equation = display.textContent;
  let result = 0;

  let operators = equation.split(/([+\-*/])/);

  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i].trim();

    if (
      operator === "+" ||
      operator === "-" ||
      operator === "*" ||
      operator === "/"
    ) {
      continue;
    }

    let number = parseFloat(operators[i]);

    if (i === 0) {
      result = number;
    } else {
      let prevOperator = operators[i - 1].trim();
      if (prevOperator === "+") {
        result += number;
      } else if (prevOperator === "-") {
        result -= number;
      } else if (prevOperator === "*") {
        result *= number;
      } else if (prevOperator === "/") {
        result /= number;
      }
    }
  }
  display.textContent = result;
  console.log(result);
};

//calculate function
const calculateEl = document.querySelector(".calculate");

const calculate = () => {
  try {
    // Explicitly replace the division and multiplication operators
    const expression = display.textContent
      .replace(/÷/g, "/")
      .replace(/×/g, "*");
    display.textContent = eval(expression);
  } catch (error) {
    display.textContent = "error";
  }
};

calculateEl.addEventListener("click", calculate);

// Degree and Radian function

const modeBtn = document.querySelector(".deg");
const calcModeEl = document.querySelector(".d-r-btn");

const degreeTORadian = () => {
  try {
    display.textContent = parseFloat(
      (parseFloat(display.textContent) * Math.PI) / 180
    ).toFixed(2);
  } catch (error) {
    display.textContent = "Error";
  }
};

const radianToDegree = () => {
  try {
    display.textContent = parseFloat(
      (parseFloat(display.textContent) * 180) / Math.PI
    ).toFixed(2);
  } catch (error) {
    display.textContent = "Error";
  }
};

calcModeEl.addEventListener("click", () => {
  if (modeBtn.textContent === "DEG") {
    modeBtn.textContent = "RAD";
    degreeTORadian();
  } else if (modeBtn.textContent === "RAD") {
    modeBtn.textContent = "DEG";
    radianToDegree();
  }
});
