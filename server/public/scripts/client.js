$( document ).ready( onReady );

function addTask(event){
    event.preventDefault();
    let objectToSend = {
        taskType: $('#taskTypeIn').val(),
        doBy: $('#doByIn').val(),
        taskIn: $('#taskIn').val(),
        name: $('#nameIn').val()
        // object to send includes database column names as properties -
        // without 'done' as status default is set to 'false' prior to being
        // removed from DOM by deleteTask click action
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
} //end addTask function

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function( response ){
        let el = $( '#outputDiv' );
        el.empty();
        for( let i=0; i<response.length; i++){
            el.append(`<section id="newTask">${ response[i].taskType } ${ response[i].doBy} ${ response[i].taskIn} ${ response[i].name}
            <button class="deleteButton" data-id="${ response[i].id}">Delete</button>
            <button class="toggleDoneButton" data-id="${ response[i].id}"
            data-pending="${ response[i].done}">Done?: ${ response[i].done }
            </button></section>`)
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

function doneStatusHandler() {
    $('#newTask').addClass('doneTask');
}

function onReady(){
    getTasks();
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#outputDiv' ).on( 'click', '.deleteButton', deleteTask );
    $('#outputDiv').on('click', '.toggleDoneButton', toggleDone, doneStatusHandler);
}


function toggleDone(){
    const id = $( this ).data( 'id' );
    const doneStatus = $( this ).data( 'done' );
    console.log( 'in toggleDone:', id, doneStatus );
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ id }`,
        data: { newStatus: !doneStatus}
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getTasks();
        }).catch( function (err){
        alert( 'error updating:', err );
    })
}