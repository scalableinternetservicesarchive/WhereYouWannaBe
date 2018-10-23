$(document).ready(function() {
    //TODO: organize click binding

    $("#addComment").click(function() {
       comment = $("#newComment").val();
       user = 1; // for now
        event = $("#eventContainer").data('event-id');
        console.log(comment);
        console.log(event);
        var commentData = {
            event_id: parseInt(event),
            message: comment,
            user_id: parseInt(user),
            date:new Date($.now())
        }

        $.post("/comments",
        {
            comment : commentData
            // dataType: 'json',
            // contentType: "application/json",
            // Accept:"application/json"
        },
        function(data, status){
            console.log(data);
            console.log(status);
        });
    });

    $(".closeBtn").click(function() {
        comment_id = $(this).parents(".commentContainer").data('comment-id');
        console.log(comment_id);
        // TODO: modify controller to send back json
        // TODO: update the events page
        $.ajax({
            url: '/comments/'+comment_id,
            type: 'DELETE',
            success: function(result) {
                console.log(result);
            }
        });
    });

    $(".eventContainer").click(function(){
        // TODO: check if this is the right way
        event_id = $(this).data('event-id');
        document.location.href = '/events/'+event_id;
        // $.ajax({
        //     url: '/events/'+event_id,
        //     type: 'GET',
        //     success: function(result) {
        //         console.log(result);
        //     }
        // });
    });
})