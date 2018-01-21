function updateClassList() {

}


function removeClass(targetId, day) {
    // Set day to false
    // if all days are false, delete entry
    var id;
    var classes = JSON.parse(window.localStorage.getItem('userData')).schedule;
    
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
}

function modifyClass(data) {
    
}

function addClass(data) {

}