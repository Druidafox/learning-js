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

function list() {
    $('#usersTable tbody').empty();
    const api = new BackendAPI();
    api.users.getAll(buildTableLines());
}

window.onload = function () {
    list();
    var phoneFiledObject = document.getElementById('phone');
    phoneFiledObject.onkeyup = function () {
        this.value = applyPhoneMask(this.value)
    }
    $("#submitUserBtn").click(function () {
        createUser();
    });
}

function buildTableLines() {
    return (users) => {
        var table = $("#usersTable").find('tbody');
        $.each(users, (index, user) => {
            table.append($('<tr>')
                .append($('<td>').text(user.name))
                .append($('<td>').text(user.lastName))
                .append($('<td>').text(user.phone))
                .append($('<td>').text(user.email))
                .append($('<td>').text(user.age))
            );
        });
    };
}

function capitalize(filedObject) {
    var newValueCapitalized = filedObject.value.charAt(0).toUpperCase() + filedObject.value.slice(1).toLowerCase();
    filedObject.value = newValueCapitalized;
}

function serializeForm(form) {
    var hasError = false;
    var data = form.serializeArray();
    var fieldErros = [];
    $.each(data, function (index, field) {
        field.value = $.trim(field.value);
        if (!field.value) {
            hasError = true;
            fieldErros.push(field.name);
        }
    });
    return { hasError, data, fieldErros };
}

function showErrorMensages(fieldErros) {
    $.each(fieldErros, function (index, field) {
        var span = $('span[name=' + field + 'ErrorMessage' + ']');
        span.text(" (este campo não pode ser vazio)");
    })
}

function clearErrorMensages() {
    $('.errorMessage', "#formcad").each(function () {
        $(this).text("");
    })
}

function createUser() {
    const api = new BackendAPI();

    clearErrorMensages();

    var form = serializeForm($("#formcad"));

    if (form.hasError) {
        showErrorMensages(form.fieldErros);
        return;
    }

    api.users.create(form.data)
    list();
}

function BackendAPI() {
    this.users = {
        create: function (userPayload) {
            $.ajax({
                url: "/users",
                type: "POST",
                data: userPayload,
                success: function (result) {
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    console.error(errorMessage);
                }
            });
        },
        getAll: function (callbackFunction) {
            $.ajax({
                url: "/users",
                type: "GET",
                success: function (result) {
                    callbackFunction(result.users);
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    console.error(errorMessage);
                }
            });
        }
    }
}
