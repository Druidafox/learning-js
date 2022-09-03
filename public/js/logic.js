

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


function serializeForm(form) {
    var hasError = false;
    const data = form.serializeArray();
    var fieldErros = [];
    $.each(data, (index, field) => {
        field.value = $.trim(field.value);
        if (!field.value) {
            hasError = true;
            fieldErros.push(field.name);
        }
    })
    return { hasError, data, fieldErros };
}

function showErrorMessages(fieldErros) {
    $.each(fieldErros, (index, field) => {
        var span = $("span[name=" + field + "ErrorMessage]")
        span.text("Este campo não pode ser vazio")
    })
}

const tableBody = document.querySelector("#table > tbody");
/**
 * TODO criar um objeto para concentrar as funções de users
 * TODO tonar as chamadas agnósticas
 * @returns
 */
function send() {

    var data = serializeForm($("#formcad"));
    var datausers = data.data;
    var arraydata = [];
    if (data.hasError) {
        showErrorMessages(data.fieldErros)
        return;
    }

    $.ajax({
        url: "/users",
        type: "POST",
        data: datausers,
        success: function (sucess) {
            datausers.forEach(function (value) {
                arraydata.push(value.value);
            });
            const tbody = $('#table').children('tbody');
            const table = document.getElementById('table');
            const tr = document.createElement('tr');
            arraydata.forEach(function (value, key) {
                const td = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');

                const name = document.createTextNode(value);
               td.append(name);
               console.log(td);
               tr.append(td);
               tbody.append(tr);

            

               



            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage);
        }
    });
}


function cleartable() {
    while (tableBody.firstChild) { //enquanto a tabela tiver qualquer conteúdo dentro do tbody durante o carregamento ele irá deletar.//
        tableBody.removeChild(tableBody.firstChild);
    }
}


document.addEventListener("DOMContentLoaded", () => { cleartable(); }); //executa os scprits após o do carregamento completo da página
