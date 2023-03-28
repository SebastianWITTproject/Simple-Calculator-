// DOM variables 

const num = document.getElementById("num");
const buttons = document.getElementById("bt").querySelectorAll("button:not(.ope):not(.equal)");
const ope = document.getElementsByClassName("ope");
const clr = document.getElementById("clear");
const del = document.getElementById("delete");
const prev = document.getElementById("prev");
const equal = document.getElementById("equal");

// variables setup 

let nb;
let operator = 0;
let displayTrace = '';
let history = '';
let previous = null;
let current;


let start = false;

// This function check if there is already a '.' in order to prevent input with several '.' (ex: 45.54.345)

function filterDisplay(input)
{
    if (input == '.')
    {
        if (nb.includes('.'))
        {
            return;
        }
    }
    nb = nb + input;
}

//Take care of update of the screen after a number is clicked 

function display(event)
{
    if (start == false)
    {
        nb = event.target.innerHTML;
        start = true;
    }
    else 
    {
        filterDisplay(event.target.innerHTML);
    }
    num.innerHTML= nb;
    checkSize();
}

// When called this function manage the upper screen display

function manageHist(data, ope)
{
    displayTrace = data + ' ' + ope;
    prev.innerHTML = displayTrace;
}
// Take care of the state of the operation = prevent first that an operator is clicked before any nunber input
// Then the function checks if there is already an operation done, since the logic implies that the first operation should be treated differently
// Logic is the following : after operator is clicked first time => define previous as the first number input prior to operator clicked, then after operator pressed another time calculate previous with current 
// The upper screen history trace is managed differently since the operator displayed should be the last operator clicked and not the operator used before that define the calculus between the 2 operands 

function check(event)
{
    if (start == false)
    {
        blink();
    }
    if (start ==true)
    {
        
        if (previous == null)
        {   
            operator = event.target.innerHTML;
            manageHist(nb,event.target.innerHTML);
            previous = parseFloat(nb);
            nb = '';
            start = false;
        }
       else
       {
            operate();
            manageHist(current, event.target.innerHTML);
            manageOperation();
            operator = event.target.innerHTML;
       }
    }
}

// Update the variables and the screen based on the operate function result 

function manageOperation()
{
    previous = current;
    num.innerHTML = current.toString();
    nb = '';
    start = false;
}

// Calculate the data of the last input before the operator was clicked with the data of the current input after the operator was pressed

function operate()
{
    if (operator == '+')
    {
        current = add(previous, parseFloat(nb));
    }
    if (operator == '-')
    {
        current = soustract(previous, parseFloat(nb));
    }
    if (operator == '÷')
    {
        current = divide(previous, parseFloat(nb));
    }
    if (operator == 'x')
    {
        current = multiply(previous, parseFloat(nb));
    }
    current = Number(current.toFixed(2));
}

// Take care of case when '=' is pressed 

function calculate()
{
    if (start == false)
    {
        blink();
    }
    if (previous != null && nb != '')
    {   
       operate();
       num.innerHTML = current.toString();
       history = displayTrace + ' ' + nb + ' ' + '=';
       prev.innerHTML = history;
       clear(true, true);
    }
    else
    {
        blink();
    }
}

equal.addEventListener("click", calculate);

// add event listener to all p elements node list

for (let i=0; i<buttons.length; i++)
{
    buttons[i].addEventListener("click", display);
}

for (let j=0; j<ope.length; j++)
{
    ope[j].addEventListener("click",check);
}

// operators function 

function add(a, b)
{
    return a + b
}

function soustract(a, b)
{
    return a - b
}

function divide(a, b)
{
    return a / b
}

function multiply(a, b)
{
    return a * b
}

// manage the delete button 

function delet()
{
    nb = nb.slice(0, -1);
    num.innerHTML= nb;
}

del.addEventListener("click", delet);

// manage the clear button the parameters determine if current screen display should be left or cleared

function clear(toggleNum, togglePrev)
{
    operator = 0;
    previous = null;
    current = null;
    start = false;
    nb = '';
    displayTrace = '';
    history = '';
    if(!togglePrev)
    {
        prev.innerHTML = displayTrace;
    }
    if (!toggleNum)
    {
        num.innerHTML= nb;
    }
}

clr.addEventListener("click", () => clear(false));

function checkSize()
{
   if (nb.length + 1 > 25)
   {
        num.innerHTML = "TOO LONG";
        clear(true, false);

   }
}

// Make the lower screen display blink if an operator has already been clicked

function blink()
{
    console.log("hi");
    num.style.color = "transparent";
    setTimeout(() => {num.style.color = "black"}, 125);
}