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

function applyPhoneMask(phoneFieldValue) {
    phoneFieldValue = phoneFieldValue.replace(/\D/g, "");
    phoneFieldValue = phoneFieldValue.replace(/^(\d{2})(\d)/g, "($1) $2");
    phoneFieldValue = phoneFieldValue.replace(/(\d)(\d{4})$/, "$1-$2");
    return phoneFieldValue;
}

window.onload = function () {
    var phoneFiledObject = document.getElementById('telefone');
    phoneFiledObject.onkeyup = function () {
        this.value = applyPhoneMask(this.value)
    }
}

function capitalize(filedObject) {
    var newValueCapitalized = filedObject.value.charAt(0).toUpperCase() + filedObject.value.slice(1).toLowerCase();
    filedObject.value = newValueCapitalized;
}

function send() {
    $.ajax({
        url: "/users",
        type: "POST",
        data: {
            name: "",
            lastName: "",
            email: "",
            phone: "",
            age: ""
        },
        success: function (result) {
            console.log(result);
            $('p').append(JSON.stringify(result) + "<br/>");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage);
        }
    });
}

