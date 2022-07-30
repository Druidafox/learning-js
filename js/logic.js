function validaremail() {
    var email = document.getElementById("mail").value;
    var regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regx.test(email)) {

        return true

    }
    else {
        alert("voce digitou um email invalido")
        return false
    }

}
//Mascara do telefone//
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}
function id(el) {
    return document.getElementById(el);
}
window.onload = function () {
    id('telefone').onkeyup = function () {
        mascara(this, mtel);
    }
}
//Função para Inserir Nome e Sobre nome Maisculos
String.prototype.capitalize = function () {
return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

console
var nome1=document.getElementById("nome").value;