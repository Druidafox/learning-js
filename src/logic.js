window.onload = getDataDb();

function getDataDb() {
    const http = new XMLHttpRequest;
    const url = "http://localhost:3000/person";
    http.open('GET', url, true);
    console.log('OPENED: ', http.status);
    http.addEventListener('error', (event) => {
        alert('Houve algum erro na requisição!');
    })
    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            const status = http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
            } else {
                alert("Houve algum erro na requisição!")
            }
            const dbData = JSON.parse((http.response));
            var table = document.getElementById("table").getElementsByTagName('tbody')[0];
            var newrow = table.insertRow(table.length);
            console.log(dbData.length)
            for (let i = 0; i < dbData.length; i++) {
                var newrow = table.insertRow(table.length);
                cell1 = newrow.insertCell(0);
                cell1.innerHTML = dbData[i]._id;
                cell2 = newrow.insertCell(1);
                cell2.innerHTML = dbData[i].name;
                cell3 = newrow.insertCell(2);
                cell3.innerHTML = dbData[i].lastname;
                cell4 = newrow.insertCell(3);
                cell4.innerHTML = dbData[i].phone;
                cell5 = newrow.insertCell(4);
                cell5.innerHTML = dbData[i].email;
                cell6 = newrow.insertCell(5);
                cell6.innerHTML = dbData[i].age;
                cell5 = newrow.insertCell();
                cell5.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal" onclick="getId(this)">
                edit
              </button>
              <button type="button" class="btn btn-secondary" onclick="onDelete(this)">
              delete
            </button>`;
            }
        }
    };
    http.send();
}

function readFormData() {
    formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["lastname"] = document.getElementById("lastName").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;
    formData["age"] = document.getElementById("age").value;
    return formData;
}

function populateTable() {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newrow = table.insertRow(table.length);
    console.log(table.rows.length);
    cell1 = newrow.insertCell(0);
    cell1.innerHTML = document.getElementById("name").value;
    cell2 = newrow.insertCell(1);
    cell2.innerHTML = document.getElementById("lastName").value;
    cell3 = newrow.insertCell(2);
    cell3.innerHTML = document.getElementById("phone").value;
    cell4 = newrow.insertCell(3);
    cell4.innerHTML = document.getElementById("email").value;
    cell5 = newrow.insertCell(4);
    cell5.innerHTML = document.getElementById("age").value;
    cell6 = newrow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit /</a>
    <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("formcad").reset();
}

function validate() {
    var clearspan = document.querySelectorAll("span");
    for (let i = 0; i < clearspan.length; i++) {
        clearspan[i].textContent = '';
    }
    readFormData();
    var fieldError = [];
    for (const [field, value] of Object.entries(formData)) {
        if (!value) {
            fieldError.push(field);
        }
    }
    if (fieldError.length === 0) {
        submitForm();
    } else {
        fieldError.forEach(function (field) {
            var spanField = field + "ErrorMessage";
            var getSpan = document.getElementById(spanField);
            var spanErrorMessage = document.createTextNode("Este campo é obrigatório!");
            getSpan.appendChild(spanErrorMessage);
        })
    }
}

function submitForm() {
    readFormData();
    const http = new XMLHttpRequest;
    const url = "http://localhost:3000/person";
    http.open('POST', url, true);
    console.log('OPENED: ', http.status);
    http.addEventListener('error', (event) => {
        alert('Oops! Something went wrong.');
    });
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(formData));
    http.addEventListener('load', (event) => {
        resetForm();
        alert("usuário criado com sucesso!")
        location.reload();
    })
}

function onDelete(tr) {
    if (confirm('Are you sure to delete this record ?')) {
        const http = new XMLHttpRequest;
        const url = "http://localhost:3000/person/delete";
        const id = (tr.parentNode.parentNode.firstChild.textContent);
        console.log(url + '/delete/' + id)
        http.open("DELETE", url + '/' + id, true);
        alert("registro deletado com sucesso.")
        location.reload();
        http.send(null);

    }
}

function onEdit() {
    modalData()
    const http = new XMLHttpRequest;
    const url = "http://localhost:3000/person/update";
    http.open("PUT", url + '/' + id, true);
    http.addEventListener('error', (event) => {
        alert('Oops! Something went wrong.');
    });
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(modalInput));
    http.addEventListener('load', (event) => {
        alert("usuário ATUALIZADO com sucesso!")
        location.reload();
    })
}

function modalData() {
    modalInput = {};
    modalInput["name"] = document.getElementById("modalname").value;
    modalInput["lastname"] = document.getElementById("modallastname").value;
    modalInput["phone"] = document.getElementById("modalphone").value;
    modalInput["email"] = document.getElementById("modalemail").value;
    modalInput["age"] = document.getElementById("modalage").value;
    for (const [field, value] of Object.entries(modalInput)) {
        if (modalInput[field] == "") {
            delete modalInput[field];
        }
    }
    return modalInput
}

function getId(tr) {
    id = (tr.parentNode.parentNode.firstChild.textContent);
    return id;
}