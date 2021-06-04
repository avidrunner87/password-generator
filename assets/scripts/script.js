// ------------- Assignment Code -------------
//Arrays for password criteria options
const letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numericOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const specialCharOptions = ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", "<", "=", ">", "?", "@", "^", "_", "~"];

// Element selectors
const lengthSlider = document.getElementById("pwLength");
const lengthOutput = document.getElementById("pwLengthOutput");
const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

// ---------------- Functions ----------------
// Update password length slider value 
lengthOutput.innerHTML = lengthSlider.value;

lengthSlider.oninput = function() {
  lengthOutput.innerHTML = this.value;
}

// Return criteria for the password
function getCriteria() {
  // Gather inputs from password criteria form
  const lowercase = document.getElementById("pwLowercase").checked;
  const uppercase = document.getElementById("pwUppercase").checked;
  const numeric = document.getElementById("pwNumeric").checked;
  const specialChar = document.getElementById("pwSpecialChar").checked;

  // Build array based on password criteria the user selected
  let passwordOptions = [];
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

  // Return the criteria array
  return passwordOptions;
}

// Return option from the password criteria arrays
function getOptions(type) {
  // Determine the options array to use
  let items = [];
  if (type === "letters") {
    items = letterOptions;
  } else if (type === "numbers") {
    items = numericOptions;
  } else if (type === "characters") {
    items = specialCharOptions;
  }
  
  // Select an item in the array
  const item = Math.floor(Math.random() * items.length);

  // Return the selected item 
  return items[item];
}

// Alert users when a password has been created
function alertUser () {
  // Copy the password to the clipboard
  passwordText.select();
  passwordText.setSelectionRange(0, 99999)
  document.execCommand("copy");

  //Alert user with window alert
  alert("The password has been copied to the clipboard.");
}

// Write password to the #password output
function writePassword(event) {
  // Prevent page refresh on button click
  event.preventDefault();
  
  // Generate the password
  const password = generatePassword();
  
  // Populate the text area with the password and alert user if needed
  if (password === "") {
    passwordText.value = "Please select at least one password criteria option";
  } else {
    passwordText.value = password;
    alertUser();
  }
}

// Generate the password based on the password criteria
function generatePassword() {
  // Gather inputs from password criteria form
  const length = lengthSlider.value;

  // Gather the password criteria
  const passwordCriteria = getCriteria();

  // Generate the password output
  let passwordOutput = "";
  if (passwordCriteria != null && passwordCriteria.length > 0) {
    for(var i = 0; i < length; i++) {
      let p = Math.floor(Math.random() * passwordCriteria.length);

      if (passwordCriteria[p] === "0") {
        passwordOutput = passwordOutput += getOptions("letters");
      }

      if (passwordCriteria[p] === "1") {
        passwordOutput = passwordOutput += getOptions("letters").toUpperCase();
      } 

      if (passwordCriteria[p] === "2") {
        passwordOutput = passwordOutput += getOptions("numbers");
      } 

      if (passwordCriteria[p] === "3") {
        passwordOutput = passwordOutput += getOptions("characters");
      } 
    }
  }

  // Return the generated password
  return passwordOutput
}

// ------------- Event Listeners -------------
// Add event listener to password criteria toggles
let toggleBtn = document.querySelectorAll("input[type=checkbox] + span");

toggleBtn.forEach(element => {
  element.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      if (element.previousElementSibling.checked) {
        element.previousElementSibling.checked = false;
      } else {
        element.previousElementSibling.checked = true;
      }
    }
  })
});

// Add event listener to password generation button
generateBtn.addEventListener("click", writePassword);
