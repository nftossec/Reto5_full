const BASE_URL_SCORE = 'http://141.148.81.115/api/Score';

function saveScore(idReservation){
    let dataToSend;

    if($('#score-zero').prop('checked')){
        dataToSend = JSON.stringify({
            score: $('#score-zero').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    } else if($('#score-one').prop('checked')) {
        dataToSend = JSON.stringify({
            score: $('#score-one').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    } else if($('#score-two').prop('checked')) {
        dataToSend = JSON.stringify({
            score: $('#score-two').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    } else if($('#score-three').prop('checked')) {
        dataToSend = JSON.stringify({
            score: $('#score-three').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    } else if($('#score-four').prop('checked')) {
        dataToSend = JSON.stringify({
            score: $('#score-four').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    } else if($('#score-five').prop('checked')) {
        dataToSend = JSON.stringify({
            score: $('#score-five').prop('value'),
            message: $('#message-score').val(),
            reservation: {idReservation}
        })
    }

    $.ajax({
        url: `${BASE_URL_SCORE}/save`,
        type: 'POST',
        data: dataToSend,
        contentType: 'application/json',
        success: ()=>{
            console.clear();
            console.log('Guardando calificacion...');
            alert('Se ha guardado la calificación');
            loadFormReservation();
        },
        error: ()=>{
            alert(`Error: Status ${err.status}`);
        }
    })
}

function updateScore(id){
    let dataToSend;
    if($('#score-zero').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-zero').prop('value'),
            message: $('#message-score').val()
        })

    } else if($('#score-one').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-one').prop('value'),
            message: $('#message-score').val()
        })

    } else if($('#score-two').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-two').prop('value'),
            message: $('#message-score').val()
        })

    } else if($('#score-three').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-three').prop('value'),
            message: $('#message-score').val()
        })

    } else if($('#score-four').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-four').prop('value'),
            message: $('#message-score').val()
        })

    } else if($('#score-five').is(':checked')){
        dataToSend = JSON.stringify({
            id,
            score: $('#score-five').prop('value'),
            message: $('#message-score').val()
        })
    }

    $.ajax({
        url: `${BASE_URL_SCORE}/update`,
        type: 'PUT',
        contentType: 'application/json',
        data: dataToSend,
        success: (res)=>{
            console.clear();
            console.log('Editando calificacion...')
            alert('Se ha modificado la calificación');
            loadFormReservation();
        },
        error: ()=>{
            alert(`Error: Status ${err.status}`);
        }
    })
}

function loadScoreForm(idReservation){
    hideReservations();
    $('#list-btn-reservation').hide();
    $('#form-reservas').empty();
    $('#form-reservas').append(
        `<form>
            <p><b>Califica la reserva :</b></p>
            <input type="radio" id="score-zero" name="score" value="0">
            <label for="score-zero">0</label>
            
            <input type="radio" id="score-one" name="score" value="1">
            <label for="score-one">1</label>
            
            <input type="radio" id="score-two" name="score" value="2">
            <label for="score-two">2</label>
            
            <input type="radio" id="score-three" name="score" value="3">
            <label for="score-three">3</label>
            
            <input type="radio" id="score-four" name="score" value="4">
            <label for="score-four">4</label>
            
            <input type="radio" id="score-five" name="score" value="5">
            <label for="score-five">5</label>
            <br />
            <br />
            <textarea
            name="message-score"
            id="message-score"
            cols="25" rows="6"
            placeholder="Ingresar mensaje..."
            style="resize: none"
            ></textarea>
        </form>`
    )
    $('#save-btn-reservation').text('Enviar calificación');
    $('#save-btn-reservation').attr('onclick', `saveScore(${idReservation})`);
}

function loadEditFormScore(id, score, message){
    hideReservations();
    $('#list-btn-reservation').hide();
    $('#form-reservas').empty();
    $('#form-reservas').append(
        `<form>
            <p><b>Califica la reserva :</b></p>
            <input type="radio" id="score-zero" name="score" value="0">
            <label for="score-zero">0</label>
            
            <input type="radio" id="score-one" name="score" value="1">
            <label for="score-one">1</label>
            
            <input type="radio" id="score-two" name="score" value="2">
            <label for="score-two">2</label>
            
            <input type="radio" id="score-three" name="score" value="3">
            <label for="score-three">3</label>
            
            <input type="radio" id="score-four" name="score" value="4">
            <label for="score-four">4</label>
            
            <input type="radio" id="score-five" name="score" value="5">
            <label for="score-five">5</label>
            <br />
            <br />
            <textarea
            name="message-score"
            id="message-score"
            cols="25" rows="6"
            placeholder="Ingresar mensaje..."
            style="resize: none"
            ></textarea>
        </form>`)

    $('#message-score').text(message);
    $('#save-btn-reservation').text('Actualizar calificación');
    $('#save-btn-reservation').attr('onclick', `updateScore(${id})`);
}