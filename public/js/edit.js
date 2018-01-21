function updateClassList() {
    renenderSchedule();
}


function removeClass(targetId, day=1) {
    // Set day to false
    // if all days are false, delete entry
    var data = JSON.parse(window.localStorage.getItem('userData'));
    var classes = data.schedule;
    
    var i = 0;
    for (; i < classes.length; ++i) {
        if (classes[i].id == targetId) {
            break;
        }
    }
    
    classes.splice(i, 1);

    window.localStorage.setItem('userData', JSON.stringify(data));
    updateClassList();
}

function modifyClass(data) {
    var targetId = data.id;
    var userData = JSON.parse(window.localStorage.getItem('userData'));
    var classes = userData.schedule;
    var index = classes.indexOf( function(e) { return e.id == targetId; });
    classes[index] = data;
    
    window.localStorage.setItem('userData', JSON.stringify(userData));
    updateClassList();
}

function addClass(data) {
    var userData = JSON.parse(window.localStorage.getItem('userData'));
    data['id'] = (new Date()).getTime();
    userData.schedule.push(data);
    window.localStorage.setItem('userData', JSON.stringify(userData));
}

function fillClassEditForm(id) {
    var classData = JSON.parse(window.localStorage.getItem('userData')).schedule.find(section => section.id == id);
    var fillForm = $('#classEditForm');

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