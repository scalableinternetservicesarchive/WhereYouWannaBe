$(document).on('turbolinks:load', function() {
    //TODO: organize click binding
    // click and then check target
    $(function() {
        $('.datepicker').datepicker();
    });

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
            $("#newComment").val("");
            // TODO: clean this mess
            var newComment = '<div class="card commentContainer" data-comment-id="'+data.id+'">' +
                '  <div class="card-header">' +
                '    <a id="logo" href="/"><img height="50" width="50" class="rounded-circle" src=""></a>' +
                '    <button type="button" class="close closeBtn" aria-label="Close">' +
                '      <span aria-hidden="true">×</span>' +
                '    </button>' +
                '    <span> 1 </span>' +
                '  </div>' +
                '  <div class="card-body">' +
                '    <p class="card-text">'+data.message+'</p>' +
                '    <p class="font-weight-light">'+data.date+'</p>' +
                '  </div>' +
                '</div>';
            $("#commentsContainer").append(newComment);
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

    $("#deleteEvent").click(function() {
        event_id = $("#eventContainer").data("event-id");
        $.ajax({
            url: '/events/'+event_id,
            type: 'DELETE',
            success: function(result) {
                console.log(result);
            },
            failure: function(result) {
                console.log(result);
            }
        });
    });

    $("#updateEvent").click(function() {
        event_id = $("#eventContainer").data("event-id");
        event_title = $("#event_title").val();
        event_description = $("#event_description").val();
        tag = $("#event_tag_id").val();
        event_location = $("#event_location_id").val();
        event_price = $("#event_price").val();
        var eventData = {
            title: event_title,
            description: event_description,
            tag_id: parseInt(tag),
            location_id: parseInt(event_location),
            price: parseInt(event_price),
            date:new Date($.now()),
            user_id:1
        }
        $.ajax({
            url: '/events/'+event_id,
            type: 'POST',
            data: {event:eventData, _method:'PUT'},
            success: function(result) {
               alert("event updated");
            },
            failure: function(result) {
                alert(result);
            }
        });
    });

    // $(".eventContainer").click(function(){
    //     // TODO: check if this is the right way
    //     event_id = $(this).data('event-id');
    //     document.location.href = '/events/'+event_id;
    //     // $.ajax({
    //     //     url: '/events/'+event_id,
    //     //     type: 'GET',
    //     //     success: function(result) {
    //     //         console.log(result);
    //     //     }
    //     // });
    // });
})