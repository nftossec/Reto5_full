const BASE_URL_ADMOUSER ='http://141.148.81.115'

function getAdmoUser(){
    $.ajax({
        url:BASE_URL_ADMOUSER +'/api/Admin/all',
        type:"GET",
        dataType:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdmoUser(respuesta);
        }
    })
}

function pintarRespuestaAdmoUser(items){
    $('#consultarAdmoUser').text('Ocultar');
    $('#consultarAdmoUser').attr('onclick', 'ocultarRespuesta()');

    let myTable=
        `<table style="border: 1px solid black">
        <thead>
            <th>Nombre</th>
            <th>Correo</th>
        </thead>
        <tbody>`;

    for (let i=0; i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td> <button onclick='borrarAdmoUser("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</tbody></table>";
    $("#listaAdmoUser").empty();
    $("#listaAdmoUser").append(myTable);
}

function ocultarRespuesta(){
    $('#consultarAdmoUser').text('Consultar');
    $('#consultarAdmoUser').attr('onclick', 'getAdmoUser()');
    $("#listaAdmoUser").empty();
}

function guardarAdmoUser(){
    let myData={
        name:$("#nombreUsuarioAdmo").val(),
        email:$("#emailUsuarioAdmo").val(),
        password:$("#passwordUsuarioAdmo").val()
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:BASE_URL_ADMOUSER+'/api/Admin/save',
        type:"POST",
        data:dataToSend,
        contentType: 'application/json',
        success:function(respuesta){
            $("#nombreUsuarioAdmo").val("");
            $("#emailUsuarioAdmo").val("");
            $("#passwordUsuarioAdmo").val("");
            getAdmoUser();
            alert("Se ha guardado el dato");
        }
    });
}

 function editarAdmoUser(){
    let myData={
        id:$('#idUsuarioAdmo').val(),
        name:$("#nombreUsuarioAdmo").val(),
        email:$("#emailUsuarioAdmo").val(),
        password:$("#passwordUsuarioAdmo").val(),
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:BASE_URL_BIKE+'/api/Admin/update',
        type:"PUT",
        data:dataToSend,
        contentType:"application/json",
        success:function(respuesta){
            $("#nombreUsuarioAdmo").val("");
            $("#emailUsuarioAdmo").val("");
            $("#passwordUsuarioAdmo").val("");
            getAdmoUser();
            alert("Se ha actualizado un dato");
        }
    });
}

 function borrarAdmoUser(idElemento){
    $.ajax({
        url:BASE_URL_ADMOUSER+'/api/Admin/'+idElemento,
        type:"DELETE",
        dataType: "JSON",
        success:function(respuesta){
            getAdmoUser();
            alert("Se ha eliminado un dato");
        }
    });
}
