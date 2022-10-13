/*
Promise, Future, Async, Await

- Programação sícrona: quem chamou espera acabar tudo... => o proximo cliente tem que aguardar completamente o segundo ser atendido
chamo o servidor -> http... (i/o)
recebo a requisição...
acesso o banco de dados... (i/o)
manipulo os dados...   (cpu)
retorno para o cliente... (i/o)

1 - Thread: Cada requisição vai ser atendiada por uma nova thread

- Programação assícrona: Ela não espera ser concluída para atender uma nova requisição
chamo o servidor -> http... (i/o)
recebo a requisição...
acesso o banco de dados... (i/o) -> mas, não bloqueia a thread -> 
manipulo os dados...   (cpu)
retorno para o cliente... (i/o)

*/

try {
    const pro = new Promise((resolve, reject) => {
        const email = "";
        const pass = "";

        console.log("validando login...");
        if (!email || !pass) {
            reject("Não pode ter senha ou email vazios...")
        }
        resolve("login validado com sucesso...")
    });

    // pro.catch(error => console.error( "cuidado, man: " + error))
    console.log(await pro);
} catch (error) {
    console.log("cuidado, meu sistema falhou: " + error)
}

// const pro = new Promise((resolve, reject) => setTimeout(() => resolve("estou dentro de uma promise"), 3000));
// //pro.then(result => console.log(result));
// console.log(await pro);
// console.log("Depois da promise");





// const now = Date.now();

// console.log("eu sou o um")
// //while (Date.now() < (now + 3000)) {}
// //console.log("eu sou o dois (esperei três segundos)")
// setTimeout(() => console.log("eu sou o dois (esperei três segundos)"), 3000);
// console.log("eu sou o três")


