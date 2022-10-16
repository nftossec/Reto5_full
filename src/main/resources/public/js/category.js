const BASE_URL_CAT = 'http://localhost:8090'
function obtenerCategoria(){
    $.ajax({
        url: BASE_URL_CAT+'/api/Category/all',
        type: "GET",
        dataType: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            mostrarCategoria(respuesta);
        }
    });
}

function mostrarCategoria(items){
    $("#consultarCat").text('Ocultar');
    $('#consultarCat').attr('onclick', 'ocultarRespuestaCategory()');

    let myTable=
        `<table class="table table-active">
        <thead>
               <th>nombre</th>
            <th>descripcion</th>
            
        </thead>
        <tbody>`;

    for(let i=0; i<items.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='borrarCategory("+items[i].id+")'>Borrar</button>"
        myTable += "<tr>";
    }
    myTable += "</tbody></table>";

    $("#listaCategoria").empty();
    $("#listaCategoria").append(myTable);
}

function ocultarRespuestaCategory(){
    $('#consultarCat').text('Consultar');
    $('#consultarCat').attr('onclick', 'obtenerCategoria()');
    $("#listaCategoria").empty();
}



function enviarCategoria(){
    let dcategoria = {
        name: $("#nameCat").val(),
        description: $("#descripcionCat").val(),
    };

    let dataToSend = JSON.stringify(dcategoria);

    $.ajax({
        url: BASE_URL_CAT+'/api/Category/save',
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',
        success:function(respuesta){
            $("#idCategory").val("");
            $("#nameCat").val("");
            $("#descripcionCat").val("");
            obtenerCategoria();
            alert("Se ha guardado la categoria");
        }
    });
}
function updateCategory(){
    let myData={
        id:$('#idCategory').val(),
        name:$("#nameCat").val(),
        description:$("#descripcionCat").val(),
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:BASE_URL_CAT+'/api/Category/update',
        type:"PUT",
        data:dataToSend,
        contentType:"application/json",
        success:function(respuesta){
            $("#nameCat").val("");
            $("#descripcionCat").val("");
            obtenerCategoria();
            alert("Se ha actualizado un dato");
        }
    });
}

function borrarCategory(idElemento){

    $.ajax({
        url:BASE_URL_CAT+'/api/Category/'+idElemento,
        type:"DELETE",
        dataType: "JSON",
        success:function(respuesta){
            obtenerCategoria();
            alert("Se ha eliminado un dato");
        }
    });
}
