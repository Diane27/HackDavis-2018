function auth(username, password) {
    $.ajax({

        url : '/login',
        type : 'GET',
        username : username,
        password : password,
        success : function(data) {              
            window.localStorage.setItem('loggedIn', data.loggedIn);
        },
        error : function(request,error)
        {
            alert("wrong username or password");
        }
    });
}

function getUserData(){}