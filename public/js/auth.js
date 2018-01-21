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
        document.getElementById('logged-page').removeAttribute('hidden');
        document.getElementById('login-page').setAttribute('hidden', 'hidden');
    } else {
        document.getElementById('login-page').removeAttribute('hidden');
        document.getElementById('logged-page').setAttribute('hidden', 'hidden');
    }
}

function renenderSchedule() {
    var classList = document.getElementById('class-list');
    classList.innerHTML = "";
    hideLogin(true);
    userData = JSON.parse(window.localStorage.getItem('userData'));
    var li = document.createElement('li');

    var nextClass = getNextClass(userData.schedule);
    if (nextClass) {
      $('#nextClass').html('<p><b>' + nextClass.name + '</b></p> <p>' + nextClass.building + '</p>');
      $('#nextClassButton').html(`<a href="#map" onclick="routeToBuilding('${nextClass.building}')" class="goButton">Show me <br>the way!</a>`);
    } else {
      $('#nextClass').html('No more classes today.');
    }
    
    for (var section of userData.schedule) {
      li = document.createElement('li');
      li.innerHTML = `${section.name} ${section.days
          .map((day, i) => (day ? 'MTWRFSS'[i] : null))
          .filter(day => day)
          .join('')} <button class="classEditButton" onclick="fillClassEditForm(${section.id})">EDIT</button> <button onclick="alert(${section.id})">DELETE</button>`;
      classList.appendChild(li);
    }
}
