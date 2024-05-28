
//Esto si se ejecuta
//document.getElementById("titulo").innerHTML = "Despues: Titulo de la pagina desde JS"
function empiezaConMayuscula(str) {
    return /^[A-Z][a-z]*$/.test(str);
}


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

    /*if (!txtNombre.value.match(/^[A-Z][a-z]*$/)){
        let txtErrorNombre = document.querySelector("#txtErrorNombre");
        txtErrorNombre.style.display = "block";
        txtErrorNombre.innerHTML = "Error: El nombre debe empezar con una letra mayuscula y tener al menos 2 caracteres";
    }else{
        txtErrorNombre.style.display = "none";
    }*/


    txtErrorNombre.style.display = (!empiezaConMayuscula(txtNombre.value)) ? "block" : "none";
    txtErrorNombre.innerHTML = "Error: El nombre debe empezar con una letra mayuscula y tener al menos 2 caracteres";

    /*if(e.key === "Enter"){
        saludar();
    }*/
    (e.key === "Enter") && saludar();

    //     = asignación
    // == compara contenido
    // === compara tipo y contenido
    //if (1=="1"){ alert("(1=='1'") }
    //if (1==="1"){ alert("(1==='1'") }  //Es la manera mas pro y correcta de comparar en javascript
})