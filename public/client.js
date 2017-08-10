console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('jQuery has been loaded');

    getMessages();

    $('#sendMessageButton').on('click', function(){
        console.log('sendMessageButton was clicked');
        var nameInput = $('#nameInput').val();
        var messageInput = $('#messageInput').val();
        var inputObject = {
            name: nameInput,
            message: messageInput
        };
        $.ajax({
            method: 'POST',
            url: '/message',
            data: inputObject,
            success: function(response) {
                console.log(response);
                getMessages();
            }
        })
    });

    $('#messageContainer').on('click', '.saveButton', function(){
        console.log('Save button was clicked');
        var messageID = $(this).parent().data();
        console.log('message ID is', messageID);
    });

});

function getMessages() {
    $.ajax({
        method: 'GET',
        url: '/message',
        success: function(response){
            console.log(response);
            drawMessage(response);
        }
    })
}

function drawMessage(messagesArray) {
    $('#messageContainer').empty();
    for (var i = 0; i < messagesArray.length; i++) {
        var message = messagesArray[i];
        
        //assigning a variable that applies a new div to the dom
        var $messageDiv = $('<div></div>');
        //Assigning each new message div with data that retains each ID the comes from the Database so we can get a hold of it later for
        //editing
        $messageDiv.data('id', message.user_id);
        //To this variable we append a new div with a username from the database
        $messageDiv.append('<div class="username">' + message.name + '</div>');
        //assigning another variable with the message data we get from the table
        var $messageDivInput = $('<div class="messages">' + message.message + '</div>');
        //apprending to the older div variable the new div that applies a message
        $messageDiv.append($messageDivInput);

        //appending a button to the message div that applies a save button to edit the message
        $messageDiv.append('<button class="saveButton">Save</button>')
        //we prepend the whole thing so the newest message shows up top
        $('#messageContainer').prepend($messageDiv, "<br>");     
    }
}