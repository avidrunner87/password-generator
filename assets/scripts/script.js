// Assignment Code
let lengthSlider = document.getElementById("pwLength");
let lengthOutput = document.getElementById("pwLengthOutput");
let generateBtn = document.querySelector("#generate");

//Array of options for password criteria
const letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numericOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const specialCharOptions = ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", "<", "=", ">", "?", "@", "^", "_", "~"];

// Update password length slider value
lengthOutput.innerHTML = lengthSlider.value;

lengthSlider.oninput = function() {
  lengthOutput.innerHTML = this.value;
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {

  alert("This is a pop-up");
  //Get values from the input form
  let length = lengthSlider.value;
  let lowercase = document.getElementById("pwLowercase").checked;
  let uppercase = document.getElementById("pwUppercase").checked;
  let numeric = document.getElementById("pwNumeric").checked;
  let specialChar = document.getElementById("pwSpecialChar").checked;
  let passwordOptions = [];
  let passwordOutput = "";

  if (lowercase) {
    passwordOptions.push("0");
  }
  if (uppercase) {
    passwordOptions.push("1");
  }
  if (numeric) {
    passwordOptions.push("2");
  }
  if (specialChar) {
    passwordOptions.push("3");
  }

  if (passwordOptions != null && passwordOptions.length > 0) {
    for(var i = 0; i < length; i++) {
      let p = Math.floor(Math.random() * passwordOptions.length);

      if (passwordOptions[p] === "0") {
        passwordOutput = passwordOutput += getLowerCaseOption();
      }

      if (passwordOptions[p] === "1") {
        passwordOutput = passwordOutput += getUpperCaseOption();
      } 

      if (passwordOptions[p] === "2") {
        passwordOutput = passwordOutput += getNumericOption();
      } 

      if (passwordOptions[p] === "3") {
        passwordOutput = passwordOutput += getSpecialCharOption();
      } 
    }
  } else {
    passwordOutput = "Please select at least one password criteria option"
  }

  return passwordOutput
}

function getLowerCaseOption() {
  let i = Math.floor(Math.random() * 26);
  return letterOptions[i]
}

function getUpperCaseOption() {
  let i = Math.floor(Math.random() * 26);
  return letterOptions[i].toUpperCase()
}

function getNumericOption() {
  let i = Math.floor(Math.random() * 10);
  return numericOptions[i]
}

function getSpecialCharOption() {
  let i = Math.floor(Math.random() * 18);
  return specialCharOptions[i]
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
