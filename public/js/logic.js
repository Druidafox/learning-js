/**
 * Return true if is valid email
 * @returns boolean
 */
function isValidEmail() {
    var email = document.getElementById("email").value;
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
    var phoneFiledObject = document.getElementById('phone');
    phoneFiledObject.onkeyup = function () {
        this.value = applyPhoneMask(this.value)
    }
}

function capitalize(filedObject) {
    var newValueCapitalized = filedObject.value.charAt(0).toUpperCase() + filedObject.value.slice(1).toLowerCase();
    filedObject.value = newValueCapitalized;
}

/**
 * TODO fazer a validação dos outros campos
 * TODO fazer a rotina de limpar as mesagens de errors
 * @returns a object with data of form and verifies if exists errors
 */
function createFormData() {
    var error = false;
    var name = $("#name").val();
    if (name === "") {
        error = true;
        $("#nameMessage").text("Nome não pode ser vazio");
    }
    var lastName = $("#lastName").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var age = $("#age").val();

    var formData = { name, lastName, phone, email, age, error }

    return formData;
}

/**
 * TODO criar um objeto para concentrar as funções de users
 * TODO tonar as chamadas agnósticas
 * @returns
 */
function send() {

    var data = createFormData();

    if (data.error) {
        return;
    }

    $.ajax({
        url: "/users",
        type: "POST",
        data: data,
        success: function (result) {
            console.log(result);
            $('p').append(JSON.stringify(result) + "<br/>");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage);
        }
    });
}

