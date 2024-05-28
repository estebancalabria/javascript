
// Esto no se ejecuta nunca porque no se cargo la pagina aun/
//document.getElementById("titulo").innerHTML = "Antes: Titulo de la pagina desde JS"

//Quiero que se cargue el titulo luego de que se cargue la pagina
//Eventos : Estilo 1 - Te permite un solo evento
/*window.onload = function() {
    document.getElementById("titulo").innerHTML = "Antes: Titulo de la pagina desde JS"
}*/

//Evenntos : Estilo 2 : Te permite asociar varios eventos
window.addEventListener("load", function() {
    document.getElementById("titulo").innerHTML = "Antes: Titulo de la pagina desde JS (addEventListener)"
});

window.addEventListener("load", function() {
    document.querySelector("body > div").style.display = "block"

    //Quiero cambiar todos los input de la pagina por javascript (ojo esto se hace con css, estamos probando)
    /*document.querySelectorAll("input").forEach(function(input) {
        input.style.width = "100%";
        input.style.borderRadius = "5px";
    })*/
    for (let input of document.querySelectorAll("input")) {
        input.style.width = "100%";
        input.style.borderRadius = "5px";
        input.style.marginBottom = "1em";
    }

    //Obteniendo info de un elemento
    let txtNombre = document.querySelector("#txtNombre");
    console.log("%c----------------------------","font-size: 18px; color: blue");
    console.log("typeof txtNombre: " + typeof txtNombre);  
    console.log("txtNombre.constructor.name: " + txtNombre.constructor.name);  
    console.log(txtNombre);
    console.dir(txtNombre);
    console.log("%c----------------------------","font-size: 18px; color: blue");
})