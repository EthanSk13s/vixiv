let user = document.getElementsByName("user")[0];

function createWarn(text) {
    let container = document.createElement("div");
    container.setAttribute("class", "input-warn");
    container.setAttribute("id", "userWarn");

    container.innerHTML = text;

    return container;
}

function checkUser() {
    let user = document.getElementsByName("user")[0];
    let warn = document.getElementById("userWarn");

    if (user.value.length <= 3) {
        if (warn == null) {
            let warn = createWarn("Username must be more than 3 characters")
            user.parentNode.appendChild(warn);
        }
    } else {
        if (warn != null) {
            user.parentNode.removeChild(warn);
        }
    }
}

user.addEventListener("input", checkUser);