$(function(){

  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.date}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${content}
                </p>
                ${img}
                </div>
                </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $('.form__submit').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content').val('')
      $('html, body').animate({scrollTop: $(document).height()},100);
    })
    .fail(function(){
      alert('エラー');
    })
  })
});