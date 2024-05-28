
//Esto si se ejecuta
//document.getElementById("titulo").innerHTML = "Despues: Titulo de la pagina desde JS"
function saludar() {
    let txtNombre = document.querySelector("#txtNombre");
    Swal.fire(`Hola ${txtNombre.value}!`);
}

let btnSaludar = document.querySelector("#btnSaludar");
btnSaludar.addEventListener("click", function(){
   saludar();
});

let txtNombre = document.querySelector("#txtNombre");
txtNombre.addEventListener("keypress", function(e){
    /*console.log("------------------------------");
    console.log(e.constructor.name);
    console.dir(e);
    console.log("------------------------------");*/
    if(e.key === "Enter"){
        saludar();
    }

    //     = asignación
    // == compara contenido
    // === compara tipo y contenido
    //if (1=="1"){ alert("(1=='1'") }
    //if (1==="1"){ alert("(1==='1'") }  //Es la manera mas pro y correcta de comparar en javascript
})