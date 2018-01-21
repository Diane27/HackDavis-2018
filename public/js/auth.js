function auth(username, password) {
    $.ajax({
        url : '/login',
        type : 'POST',
        data: {
            username : username,
            password : password,
        },
        success : function(data) {              
            window.localStorage.setItem('loggedIn', data.loggedIn);
        },
        error : function(request,error)
        {
            alert("wrong username or password");
        }
    });


}

function getUserData(username){
    $.ajax({
        url : '/account',
        type : 'GET',
        data: {
            username : username
        },
        success : function(data) {              
            window.localStorage.setItem('userData', JSON.stringify(data));
        },
        error : function(request,error)
        {
            alert("wrong username or password");
        }
    });
}