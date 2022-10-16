

const BASE_URL_MSG = 'http://141.148.81.115/api/Message';

function leerMensajes(){
    $.ajax({
        url: `${BASE_URL_MSG}/all`,
        type: 'GET',
        dataType: 'JSON',
        success: (res)=>{
            console.clear();
            console.log('Mostrando mensajes...');
            mostrarInfoMensajes(res);
        },
        error: (err)=>{
            alert(`Error: Status ${err.status}`);
        }
    })
}

function mostrarInfoMensajes(res){
    let mensajes = res;

    $('#listaMensajes').empty();
    $('#listaMensajes').append(
        `<table id="tablaMensajes" style="border: 1px solid black">
            <thead>
                <th>Cliente</th>
                <th>Bicicleta</th>
                <th>Mensaje</th>
            </thead>
            <tbody></tbody>
        </table>`
    )

    for(let i=0; i<mensajes.length; i++){
        $('#tablaMensajes tbody').append(
            `<tr>
                <th>${mensajes[i].client.name}</th>
                <th>${mensajes[i].bike.name}</th>
                <td>${mensajes[i].messageText}</td>
                <td>
                    <button onclick="formEditar(${mensajes[i].idMessage},'${mensajes[i].messageText}')">Actualizar</button>
                </td>
                <td>
                    <button onclick="borrarMensaje(${mensajes[i].idMessage})">Borrar</button>
                </td>
            </tr>`)
    }
    $('#listarMensajes').text('Ocultar');
    $('#listarMensajes').attr('onclick', 'ocultarMensajes()');
}

function ocultarMensajes(){
    $('#listarMensajes').text('Consultar');
    $('#listarMensajes').attr('onclick', 'leerMensajes()');
    $('#listaMensajes').empty();
}

function guardarMensaje(){
    $.ajax({
        url: `${BASE_URL_MSG}/save`,
        type: 'POST',
        data: JSON.stringify({
            messageText: $('#text-message').val(),
            client: {idClient: $('#clientId-message').val()},
            bike: {id: $('#bikeId-message').val()}
        }),
        contentType: 'application/json',
        success: (res)=> {
            console.clear();
            console.log('Guardando mensaje...');
            clearMessage();
            leerMensajes();
        },
        error: (err)=>{
            alert(`Error: Status ${err.status}`)
        }
    })
}

function formEditar(msgId, msgText){
    $('#text-message').val(msgText);
    $('#enviarMensaje').attr('onclick', `editarMensaje(${msgId})`);
    $('#enviarMensaje').text('Actualizar');
    ocultarMensajes();
    $('#clientId-message').hide();
    $('#bikeId-message').hide();
    $('#listarMensajes').hide();

}

function editarMensaje(id){
    $.ajax({
        url: `${BASE_URL_MSG}/update`,
        type: 'PUT',
        data: JSON.stringify({
            idMessage: id,
            messageText: $('#text-message').val()
        }),
        contentType: 'application/json',
        success: (res)=>{
            console.clear();
            console.log('Editando mensaje...');
            clearMessage();
            $('#listarMensajes').show();
            $('#clientId-message').show();
            $('#bikeId-message').show();
            $('#enviarMensaje').attr('onclick', `guardarMensaje()`);
            $('#enviarMensaje').text('Guardar');
            alert('Se ha modificado el mensaje');
            leerMensajes();
        },
        error: (err)=>{
            alert(`Error: Status ${err.status}`)
        }
    })
}

function borrarMensaje(idMsg){
    $.ajax({
        url: `${BASE_URL_MSG}/${idMsg}`,
        type: 'DELETE',
        dataType: 'JSON',
        success: (res)=>{
            console.clear();
            console.log('Eliminando mensaje...');
            leerMensajes();
            alert('Se ha eliminado el mensaje');
        },
        error: (err)=>{
            alert(`Error: Status ${err.status}`)
        }
    })
}

function clearMessage(){
    $('#clientId-message').val('');
    $('#bikeId-message').val('');
    $('#text-message').val('');
}