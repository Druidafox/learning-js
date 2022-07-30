/**
 * Return true if is valid email
 * @returns boolean
 */
function isValidEmail() {
    var email = document.getElementById("mail").value;
    var regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regx.test(email)) {
        return true;
    }
    alert("You type invalid email!")
    return false;
}

function mask(phoneFieldInput, callbackMask) {
    var phone = phoneFieldInput;
    var callback = callbackMask;
    setTimeout(function () {
        phone.value = callback(phone.value)
    }, 1)
}

function applyPhoneMask(phoneFieldValue) {
    phoneFieldValue = phoneFieldValue.replace(/\D/g, "");
    phoneFieldValue = phoneFieldValue.replace(/^(\d{2})(\d)/g, "($1) $2");
    phoneFieldValue = phoneFieldValue.replace(/(\d)(\d{4})$/, "$1-$2");
    return phoneFieldValue;
}

window.onload = function () {
    var id = document.getElementById('telefone');
    id.onkeyup = function () {
        mask(this, applyPhoneMask);
    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

var nome1 = document.getElementById("nome").value;