console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('jQuery has been loaded');
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
            }
        })
    });
});