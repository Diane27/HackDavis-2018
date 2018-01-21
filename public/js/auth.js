var loginButton = document.getElementById('submitButton');
var loginForm = document.getElementById('login-form');
var userData;

if (window.localStorage.getItem('loggedIn')) {
    renenderSchedule();
}

loginButton.addEventListener('click', function(event) {
  event.preventDefault();
  var username = loginForm.username.value;
  var password = loginForm.password.value;

  auth(username, password).done(function() {
    console.log('Auth success');
    getUserData(username).done(function() {
      var data = JSON.parse(window.localStorage.getItem('userData'));
      console.log(getNextClass(data.schedule));
      renenderSchedule();
      scrollDown();
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
      window.localStorage.setItem('loggedIn', response.data.loggedIn == 'true');
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

function logout() {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("userData");
    hideLogin(false);
    document.getElementById('class-list').innerHTML = '';
}

function hideLogin(yes) {
    if (yes) {
        document.getElementById('classes').removeAttribute('hidden');
        document.getElementById('login-page').setAttribute('hidden', 'hidden');
    } else {
        document.getElementById('login-page').removeAttribute('hidden');
        document.getElementById('classes').setAttribute('hidden', 'hidden');
    }
}

function renenderSchedule() {
    var classList = document.getElementById('class-list');
    hideLogin(true);
    userData = JSON.parse(window.localStorage.getItem('userData'));
    var li = document.createElement('li');
  
    var nextClass = getNextClass(userData.schedule);
    li.innerHTML = nextClass ? `<button onclick="routeToBuilding('${nextClass.building}')" id="goToNextClass">Go to next class "${nextClass.name}"</button>` : 'No more classes today';
    classList.appendChild(li);
  
    for (var section of userData.schedule) {
      li = document.createElement('li');
      li.textContent =
        section.name +
        ' ' +
        section.days
          .map((day, i) => (day ? 'MTWRFSS'[i] : null))
          .filter(day => day)
          .join('');
      classList.appendChild(li);
    }
}
