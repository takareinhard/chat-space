$(function(){

  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
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
            } else if (message.content) {
     var html = '<div class="message" data-id=' + message.id + '>' +
                '<div class="upper-message">' +
                  '<div class="upper-message__user-name">' +
                    message.user_name +
                  '</div>' +
                  '<div class="upper-message__date">' +
                    message.created_at +
                  '</div>' +
                '</div>' +
                '<div class="lower-message">' +
                  '<p class="lower-message__content">' +
                    message.content +
                  '</p>' +
                '</div>' +
              '</div>'
            } else if (message.image.url) {
      var html = '<div class="message" data-id=' + message.id + '>' +
                '<div class="upper-message">' +
                  '<div class="upper-message__user-name">' +
                    message.user_name +
                  '</div>' +
                  '<div class="upper-message__date">' +
                    message.created_at +
                  '</div>' +
                '</div>' +
                '<div class="lower-message">' +
                  '<img src="' + message.image.url + '" class="lower-message__image" >' +
                '</div>' +
              '</div>'
            };
            return html;
          };

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
      var html = buildMessageHTML(message);
      $('.messages').append(html)
      $("form")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラー');
    })
  })

var reloadMessages = function() {
  last_message_id = message.id
  $.ajax({
    url: api/messages,
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    //追加するHTMLの入れ物を作る
    var insertHTML = '';
    messages.forEach(function(insertHTML){
    var html = buildMessageHTML(message);
    $('.messages').append(html)
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  })
  .fail(function() {
    console.log('error');
        });
    });
  };
setInterval(reloadMessages, 5000);
});