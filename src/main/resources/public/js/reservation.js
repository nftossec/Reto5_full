const BASE_URL_RES = 'http://141.148.81.115/api/Reservation';

function listReservations(){
    $.ajax({
        url: `${BASE_URL_RES}/all`,
        type: 'GET',
        dataType: 'JSON',
        success: (res)=>{
            console.clear();
            console.log('Mostrando reservas...');
            loadReservations(res);
        },
        error: (err)=>{
            alert(`Error: Status ${err.status}`);
        }
    })
}

function loadReservations(res){
    const reservations = res;

    $('#reservationList').empty();
    $('#reservationList').append(
        `<table id="reservationTable" style="border: 1px solid black"> 
            <thead>
                <th>Estado</th>
                <th>Cliente</th>
                <th>Bicicleta</th>
                <th>Fecha inicio</th>
                <th>Fecha entrega</th>
                <th>Calificacion</th>
            </thead>
            <tbody></tbody>
         </table>`
    )

    for(let i=0; i<reservations.length; i++){
        $('#reservationTable tbody').append(
            `<tr id=${i}>
                <th>${reservations[i].status}</th>
                <th>${reservations[i].client.name}</th>
                <th>${reservations[i].bike.name}</th>
                <td>${reservations[i].startDate.slice(0,10)}</td>
                <td>${reservations[i].devolutionDate.slice(0,10)}</td>
             </tr>`
        )
        if(reservations[i].score == null){
            $(`#reservationTable tbody #${i}`).append(
                `<td>Sin calificar</td>
                 <td><button onclick="loadScoreForm(${reservations[i].idReservation})">Calificar</button></td>`)
        } else {
            $(`#reservationTable tbody #${i}`).append(
                `<td>${reservations[i].score.score}</td>
                 <td>
                    <button onclick="loadEditFormScore(
                        ${reservations[i].score.id},
                        ${reservations[i].score.score},
                        '${reservations[i].score.message}')"
                    >Editar calificación
                    </button>
                </td>`)
        }

        $(`#reservationTable tbody #${i}`).append(
            `<td>
                <button
                    onclick="loadEditFormReservation(
                        ${reservations[i].idReservation},
                        '${reservations[i].startDate.slice(0,10)}',
                        '${reservations[i].devolutionDate.slice(0,10)}')"
                    >Actualizar
                </button>
            </td>
            <td>
                <button onclick="deleteReservation(${reservations[i].idReservation})">Borrar</button>
            </td>`)
    }
    $('#list-btn-reservation').text('Ocultar');
    $('#list-btn-reservation').attr('onclick', 'hideReservations()');
}

function saveReservation(){
    if(validateDates()){
        $.ajax({
            url: `${BASE_URL_RES}/save`,
            type: 'POST',
            data: JSON.stringify({
                startDate: $('#startDate-reservation').val(),
                devolutionDate: $('#devolutionDate-reservation').val(),
                client: {idClient: $('#clientId-reservation').val()},
                bike: {id: $('#bikeId-reservation').val()}
            }),
            contentType: 'application/json',
            success: (res)=>{
                console.clear();
                console.log('Guardando reserva...');
                alert('Se ha guardado la reserva');
                listReservations();
                clearReservation();
            },
            error: (err)=>{
                alert(`Error: Status ${err.status}`);
            }
        })
    } else {
        alert('La fecha de entrega debe ser posterior a la fecha de inicio.');
    }
}

function updateReservation(idReservation){
    if(validateDates()){
        $.ajax({
            url: `${BASE_URL_RES}/update`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                idReservation,
                startDate: $('#startDate-reservation').val(),
                devolutionDate: $('#devolutionDate-reservation').val(),
                status: $('#status').val()
            }),
            success: (res)=> {
                console.clear();
                console.log('Editando reserva...');
                alert('Se ha modificado la reserva');
                loadFormReservation();
                listReservations();
                clearReservation();
            }
        })
    } else {
        alert('La fecha de entrega debe ser posterior a la fecha de inicio.');
    }
}

function deleteReservation(idReservation){
    $.ajax({
        url: `${BASE_URL_RES}/${idReservation}`,
        type: 'DELETE',
        dataType: 'JSON',
        success: (res)=>{
            console.clear();
            console.log('Eliminando reserva...');
            alert('Se ha eliminado la reserva');
            listReservations();
        }
    })
}

function loadEditFormReservation(id, startDate, devolutionDate){
    $('#form-reservas').empty();
    $('#form-reservas').append(
        `<form>
            <label for="status">Estado: </label>
            <select name="status" id="status">
                <option value="programado">Programado</option>
                <option value="realizado">Realizado</option>
                <option value="cancelado">Cancelado</option>
            </select>
            <br />
            <br />
            <label for="startDate-reservation">Fecha de inicio: </label>
            <input type="date" name="startDate-reservation" id="startDate-reservation">
            <label for="devolutionDate-reservation">Fecha de entrega: </label>
            <input type="date" name="devolutionDate-reservation" id="devolutionDate-reservation">
        </form>`)
    $('#startDate-reservation').val(startDate);
    $('#devolutionDate-reservation').val(devolutionDate);
    hideReservations();
    $('#list-btn-reservation').hide();
    $('#save-btn-reservation').text('Actualizar');
    $('#save-btn-reservation').attr('onclick', `updateReservation(${id})`);
}

function loadFormReservation() {
    $('#form-reservas').empty();
    $('#form-reservas').append(
        `<form>
            <input type="number" name="clientId-reservation" id="clientId-reservation" placeholder="ID del cliente">
            <input type="number" name="bikeId-reservation" id="bikeId-reservation" placeholder="ID de la bicicleta">
            <br />
            <br />
            <label for="startDate-reservation">Fecha de inicio: </label>
            <input type="date" name="startDate-reservation" id="startDate-reservation">
            <label for="devolutionDate-reservation">Fecha de entrega: </label>
            <input type="date" name="devolutionDate-reservation" id="devolutionDate-reservation">
        </form>`
    )
    $('#save-btn-reservation').text('Guardar');
    $('#save-btn-reservation').attr('onclick', 'saveReservation()');
    $('#list-btn-reservation').show();
    listReservations();
}

function validateDates(){
    let startDate = $('#startDate-reservation').val(),
        devolutionDate = $('#devolutionDate-reservation').val();

    return devolutionDate > startDate ? true : false
}

function clearReservation(){
    $('#clientId-reservation').val('');
    $('#bikeId-reservation').val('');
    $('#startDate-reservation').val('');
    $('#devolutionDate-reservation').val('');
}

function hideReservations(){
    $('#list-btn-reservation').text('Consultar');
    $('#list-btn-reservation').attr('onclick', 'listReservations()');
    $('#reservationList').empty();
}