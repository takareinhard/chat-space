$(function() {

var search_list = $("#user-search-result");
var selected_list = $(".chat-group-users");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
  search_list.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<li>
                <div class='chat-group-user clearfix'>${ msg }</div>
              </li>`
  search_list.append(html);
}

function appendList(userName, userId) {
  
  var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${userId}'>
                <p class='chat-group-user__name'>${userName}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  selected_list.append(html);
}


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
      });
       }
      else {
        appendErrMsgToHTML("ユーザー検索に失敗しました");
      }
    })
    .fail(function() {
      alert('error');
    });
  });
  $(document).on('click', '.user-search-add', function (){
    const userName = $(this).data('user-name');
    const userId = $(this).data('user-id');
    $(this).append(appendList(userName, userId));
  });
  $(document).on('click', '.user-search-add', function () {
    $(this).parent().remove();
      });
  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
      })
});