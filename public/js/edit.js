function updateClassList() {

}


function removeClass(targetId, day) {
    // Set day to false
    // if all days are false, delete entry
    var id;
    var data = JSON.parse(window.localStorage.getItem('userData'));
    var classes = data.schedule;
    
    var i = 0;
    for (; i < classes.length; ++i) {
        if (classes[i].id == targetId) {
            break;
        }
    }

    classes[i].days[day] = false;

    if (c.days.every(function (e) { !e } )) {
        classes.splice(i, 1);
    }

    window.localStorage.setItem('userData', data);
}

function modifyClass(data) {

}

function addClass(data) {

}