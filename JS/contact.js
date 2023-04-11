export class CONTACT {
  constructor() {
    previewContactPage();
    enableSubmitBtn();
    validateUserName();
    validateEmail();
    validatePhoneNumber();
    validateAge();
    validatePw();
    validateRePw();
  }
}
let submit = document.getElementById("submitBtn");
let inputNameTouched = false;
let inputEmailTouched = false;
let inputPhoneTouched = false;
let inputAgeTouched = false;
let inputPassTouched = false;
let inputRePassTouched = false;

document.getElementById("nameInput").addEventListener("focus", () => {
  inputNameTouched = true;
});

document.getElementById("emailInput").addEventListener("focus", () => {
  inputEmailTouched = true;
});

document.getElementById("phoneInput").addEventListener("focus", () => {
  inputPhoneTouched = true;
});

document.getElementById("ageInput").addEventListener("focus", () => {
  inputAgeTouched = true;
});

document.getElementById("pwInput").addEventListener("focus", () => {
  inputPassTouched = true;
});

document.getElementById("repwInput").addEventListener("focus", () => {
  inputRePassTouched = true;
});

function enableSubmitBtn() {
  $("#contactUs input").keyup((e) => {
    inputsValidation();
  });
}

function inputsValidation() {
  if (inputNameTouched) {
    if (validateUserName()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (inputEmailTouched) {
    if (validateEmail()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (inputPhoneTouched) {
    if (validatePhoneNumber()) {
      document
        .getElementById("PhoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("PhoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (inputAgeTouched) {
    if (validateAge()) {
      document
        .getElementById("AgeAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("AgeAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (inputPassTouched) {
    if (validatePw()) {
      document.getElementById("PwAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("PwAlert").classList.replace("d-none", "d-block");
    }
  }
  if (inputRePassTouched) {
    if (validateRePw()) {
      document
        .getElementById("RePwAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("RePwAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    validateUserName() &&
    validateEmail() &&
    validatePhoneNumber() &&
    validateAge() &&
    validatePw() &&
    validateRePw()
  ) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", true);
  }
}

function validateUserName() {
  let regex = /^[A-Za-z]{1,}$/g;
  return regex.test($("#nameInput").val());
}

function validateEmail() {
  let regex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test($("#emailInput").val());
}

function validatePhoneNumber() {
  let regex = /^01[0125][0-9]{8}$/g;
  return regex.test($("#phoneInput").val());
}

function validateAge() {
  let regex = /^[0-9][0-9]?$/g;
  return regex.test($("#ageInput").val());
}

function validatePw() {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test($("#pwInput").val());
}

function validateRePw() {
  return (
    document.getElementById("repwInput").value ==
    document.getElementById("pwInput").value
  );
}

function previewContactPage() {
  $(".links #contact").click(() => {
    $("section").fadeOut(500, () => {
      $("#contactUs").fadeIn(500);
    });
  });
}
