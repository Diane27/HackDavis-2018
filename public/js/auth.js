var loginButton = document.getElementById('submitButton');
var loginForm = document.getElementById('login-form');

loginButton.addEventListener('click', function(event) {
  event.preventDefault();
  var username = loginForm.username.value;
  var password = loginForm.password.value;

  auth(username, password).done(function() {
    console.log('Auth success');
    getUserData(username).done(function() {
      console.log(window.localStorage.getItem('userData'));
    });
  });
});

function auth(username, password) {
  return $.ajax({
    url: '/login',
    type: 'POST',
    data: {
      username: username,
      password: password
    }
  })
    .done(function(response) {
      window.localStorage.setItem('loggedIn', response.data.loggedIn);
    })
    .fail(function() {
      window.localStorage.setItem('loggedIn', false);
      alert('wrong username or password');
    });
}

function getUserData(username) {
  return $.ajax({
    url: '/account',
    type: 'GET',
    data: {
      username: username
    }
  })
    .done(function(response) {
      window.localStorage.setItem('userData', JSON.stringify(response.data));
    })
    .fail(function() {
      alert('wrong username or password');
    });
}
