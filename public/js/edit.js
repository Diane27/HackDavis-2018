function updateClassList() {
    renenderSchedule();
}

var fillForm = $('#classEditForm')
var fillFormContainer = $('#editClassContainer')

fillForm.submit(function (event) {
    event.preventDefault();
    var schedule = fillFormToObj();
    console.log(schedule);
    if (fillFormContainer > 0) {
        modifyClass(schedule); 
    } else {
        addClass(schedule);
    }
})

function cancelEdit() {
    fillFormContainer.attr('hidden', 'hidden');
}

function removeClass(targetId, day=1) {
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
    var index = classes.findIndex( function(e) { return e.id == targetId; });
    classes[index] = data;
    
    window.localStorage.setItem('userData', JSON.stringify(userData));
    updateClassList();
    fillFormContainer.attr('hidden', 'hidden');
}

function addClass(data) {
    var userData = JSON.parse(window.localStorage.getItem('userData'));
    data['id'] = (new Date()).getTime();
    userData.schedule.push(data);
    window.localStorage.setItem('userData', JSON.stringify(userData));
    updateClassList();
    fillFormContainer.attr('hidden', 'hidden');
}

function fillClassEditForm(id) {
    if (id > 0) {
        var classData = JSON.parse(window.localStorage.getItem('userData')).schedule.find(section => section.id == id);
        
            fillForm.find('[name="id"]').val(id);
            fillForm.find('[name="name"]').val(classData.name);
            fillForm.find('[name="building"]').val(classData.building);
            fillForm.find('[name="startTime"]').val(classData['start-time']);
            fillForm.find('[name="endTime"]').val(classData['end-time']);
        
            for (var i = 0; i < classData.days.length; i++) {
                fillForm.find('.classDayLabel input').eq(i).prop('checked', classData.days[i]);
            }
    }
    

    fillFormContainer.removeAttr('hidden');
    fillFormContainer.attr('class-id', id);
    $('#editClassContainerA').click();
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