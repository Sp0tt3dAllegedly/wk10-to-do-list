$( document ).ready( onReady );

function addTask(event){
    event.preventDefault();
    let objectToSend = {
        taskType: $('#taskTypeIn').val(),
        doBy: $('#doByIn').val(),
        taskIn: $('#taskIn').val(),
        name: $('#nameIn').val()

    }
    console.log( 'in addTask:', objectToSend );
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'error adding task:', err );
    })
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function( response ){
        let el = $( '#outputDiv' );
        el.empty();
        for( let i=0; i<response.length; i++){
            el.append(`<section><ul><li>${ response[i].taskType } ${ response[i].doBy} ${ response[i].taskIn} ${ response[i].name}
            <button class="deleteButton" data-id="${ response[i].id}">Delete</button>
            <button class="toggleDoneButton" data-id="${ response[i].id}"
            data-pending="${ response[i].done}">Done?: ${ response[i].done }
            </button></li></ul></section>`)
        } //end for
    }).catch( function( err ){
        alert( 'Error getting taskList:', err );
    })
}

function deleteTask(){
    const id = $( this ).data( 'id' );
    console.log( 'in deleteTask:', id );
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function( response ){
        console.log( 'back from DELETE:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
}

function onReady(){
    getTasks();
    $( '#addTaskButton' ).on( 'click', addtask );
    $( '#taskListOut' ).on( 'click', '.deleteButton', deleteTask );
    $( '#taskListOut' ).on( 'click', '.togglePendingButton', togglePending );
}

function togglePending(){
    const id = $( this ).data( 'id' );
    const pendingStatus = $( this ).data( 'pending' );
    console.log( 'in togglePending:', id, pendingStatus );
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ id }`,
        data: { newPending: !pendingStatus}
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getTasks();
        if ($(this).data === true){
            $(this).addClass("doneTask")
        }
        }).catch( function (err){
        alert( 'error updating:', err );
    })
}