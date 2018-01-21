function updateClassList() {
    renenderSchedule();
}

var fillForm = $('#classEditForm')

fillForm.submit(function (event) {
    event.preventDefault();

    console.log(fillForm);
})


function removeClass(targetId, day=0) {
    // Set day to false
    // if all days are false, delete entry
    var id = data.id;
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
    var targetId = data.id;
    var userData = JSON.parse(window.localStorage.getItem('userData'));
    var classes = userData.schedule;
    var index = classes.indexOf( function(e) { return e.id == targetId; });
    classes[index] = data;
    
    window.localStorage.setItem('userData', userData);
}

function addClass(data) {
    var userData = JSON.parse(window.localStorage.getItem('userData'));
    //data['id'] = (new Date()).getTime();
    userData.schedule.push(data);
}

function fillClassEditForm(id) {
    var classData = JSON.parse(window.localStorage.getItem('userData')).schedule.find(section => section.id == id);

    fillForm.find('[name="id"]').val(id);
    fillForm.find('[name="name"]').val(classData.name);
    fillForm.find('[name="building"]').val(classData.building);
    fillForm.find('[name="startTime"]').val(classData['start-time']);
    fillForm.find('[name="endTime"]').val(classData['end-time']);

    for (var i = 0; i < classData.days.length; i++) {
        fillForm.find('.classDayLabel input').eq(i).prop('checked', classData.days[i]);
    }

    fillForm.removeAttr('hidden');
}

function fillFormToObj() {
    return {
        id: fillForm.find('[name="id"]').val(),
        name: fillForm.find('[name="name"]').val(),
        building: fillForm.find('[name="building"]').val(),
        'start-time': fillForm.find('[name="startTime"]').val(),
        'end-time': fillForm.find('[name="endTime"]').val(),
        days: fillForm.find('.classDayLabel input').map((i, e) => e.checked).toArray()
    };
}