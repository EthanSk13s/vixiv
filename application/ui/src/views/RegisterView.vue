<script lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';

let validUser = false;
let validPass = false;
let matchingPass = false;

const validChar = /[a-zA-Z]/;
const validSpecial = /\W/;
const validInt = /[0-9]/;
const hasUpper = /[A-Z]/;

function createWarn(text: string, id: string) {
    let container = document.createElement("div");
    container.setAttribute("class", "input-warn");
    container.setAttribute("id", id);
    container.innerHTML = text;

    return container;
}

function createInvalidForm(text: string) {
    let container = document.createElement("div");
    container.setAttribute("class", "column-md warn-box");
    container.setAttribute("id", "invalidForm");

    container.innerHTML = text;

    return container;
}

function checkPass() {
    let pass = document.getElementsByName("password")[0] as HTMLInputElement;
    let warn = document.getElementById("passWarn");
    let warnString;

    if (!validSpecial.exec(pass.value)) {
        warnString = "Password must have any of the following characters: /*-+!@#$^&~[]";
        if (warn == null) {
            let warn = createWarn(warnString, "passWarn");
            pass.parentNode?.appendChild(warn);
            validPass = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else if (!validInt.exec(pass.value)) {
        warnString = "Password mush have at least 1 number";
        if (warn == null) {
            let warn = createWarn(warnString, "passWarn");
            pass.parentNode?.appendChild(warn);
            validPass = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else if (!hasUpper.exec(pass.value)) {
        warnString = "Password must have at least 1 uppercase letter";
        if (warn == null) {
            let warn = createWarn(warnString, "passWarn");
            pass.parentNode?.appendChild(warn);
            validPass = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else if (pass.value.length < 8) {
        warnString = "Password must have at least 8 characters";
        if (warn == null) {
            let warn = createWarn(warnString, "passWarn");
            pass.parentNode?.appendChild(warn);
            validPass = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else {
        if (warn != null) {
            pass.parentNode?.removeChild(warn);
            validPass = true;
        }
    }
}

function matchPass() {
    let pass = document.getElementsByName("password")[0] as HTMLInputElement;
    let confirmPass = document.getElementById("confirmPass") as HTMLInputElement;
    let warn = document.getElementById("confirmWarn");
    let warnString;

    if (pass.value != confirmPass.value) {
        warnString = "Passwords do not match";
        if (warn == null) {
            let warn = createWarn(warnString, "confirmWarn");
            confirmPass.parentNode?.appendChild(warn);
            matchingPass = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else {
        if (warn != null) {
            confirmPass.parentNode?.removeChild(warn);
            validPass = true;
        }
    }

}

function checkUser() {
    let user = document.getElementsByName("user")[0] as HTMLInputElement;
    let warn = document.getElementById("userWarn");
    let warnString = "";

    if (!validChar.exec(user.value[0])) {
        warnString = "Username must start with an alphabet";
        if (warn == null) {
            let warn = createWarn(warnString, "userWarn");
            user.parentNode?.appendChild(warn);
            validUser = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else if (user.value.length <= 3) {
        warnString = "Username must be more than 3 characters";
        if (warn == null) {
            let warn = createWarn(warnString, "userWarn");
            user.parentNode?.appendChild(warn);
            validUser = false;
        } else {
            warn.innerHTML = warnString;
        }
    } else {
        if (warn != null) {
            user.parentNode?.removeChild(warn);
            validUser = true;
        }
    }
}

function checkForm(event: { preventDefault: () => void; }) {
    let form = document.getElementById("main-form");
    let invalidBox = document.getElementById("invalidForm");
    if (!validUser || !validPass || !matchingPass) {
        if (invalidBox == null) {
            let invalidBox = createInvalidForm("Invalid values, check your name or password");
            form?.before(invalidBox);
        }

        event.preventDefault();
    }
}

export default {
    components: {
        RegisterForm
    },
    mounted() {
        let user = document.getElementsByName("user")[0];
        let pass = document.getElementsByName("password")[0];
        let form = document.getElementById("main-form");
        let confirmPass = document.getElementById("confirmPass");

        user.addEventListener("input", checkUser);
        form?.addEventListener("submit", checkForm);
        pass.addEventListener("input", checkPass);
        confirmPass?.addEventListener("input", matchPass);
    }
}
</script>

<template>
    <main>
        <RegisterForm />
    </main>
</template>