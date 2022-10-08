
// get DOM elements
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("numbers");
const symbolElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

// create an object to hold the entire random generator functions
const randomFuncGenerator = {
  lower: generateLowerCase,
  upper: generateUpperCase,
  number: generateNumbers,
  symbol: generateSymbols,
};

// handle generate password button event
generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLowercase = lowercaseElement.checked;
  const hasUppercase = uppercaseElement.checked;
  const hasNumbers = numberElement.checked;
  const hasSymbols = symbolElement.checked;

  resultElement.innerText = generatePassword(
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    length
  )
});

// copy password to clipboard
clipboardElement.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const password = resultElement.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copied to clipboard');
})

// create generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // procedure
  // 1. init pw var
  let generatedPassword = "";

 // 2. Filter out unchecked types
  let typesCount = lower + upper + number + symbol;

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter
  (item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }
  
  // 3. Loop over the length, the call generator function for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFuncGenerator[funcName]();
    })
  }
  
  // 4. Add final pw to the pw var and return
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generate functions  net-comber.com/charset.html
function generateLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateNumbers() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbols() {
  const symbols = "!@#$%^&*(){}<>?/";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
