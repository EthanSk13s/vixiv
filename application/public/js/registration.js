let validUser = false;
const validChar = /[a-zA-Z]/

function createWarn(text) {
    let container = document.createElement("div");
    container.setAttribute("class", "input-warn");
    container.setAttribute("id", "userWarn");
    container.innerHTML = text;

    return container;
}

function createInvalidForm(text) {
    let container = document.createElement("div");
    container.setAttribute("class", "column-md warn-box");
    container.setAttribute("id", "invalidForm");

    container.innerHTML = text;

    return container;
}

function checkUser() {
    let user = document.getElementsByName("user")[0];
    let warn = document.getElementById("userWarn");
    let warnString = "";

    if (!validChar.exec(user.value[0])) {
        warnString = "Username must start with an alphabet";
        if (warn == null) {
            let warn = createWarn(warnString);
            user.parentNode.appendChild(warn);
            validUser = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else if (user.value.length <= 3) {
        warnString = "Username must be more than 3 characters";
        if (warn == null) {
            let warn = createWarn(warnString);
            user.parentNode.appendChild(warn);
            validUser = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else {
        if (warn != null) {
            user.parentNode.removeChild(warn);
            validUser = true;
        }
    }
}

function checkForm(event) {
    let form = document.getElementById("main-form");
    if (!validUser) {
        let invalidBox = createInvalidForm("Invalid input for user");
        form.before(invalidBox);
        event.preventDefault();
    }
}

let user = document.getElementsByName("user")[0];
let form = document.getElementById("main-form");

user.addEventListener("input", checkUser);
form.addEventListener("submit", checkForm);
