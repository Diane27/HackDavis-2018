var exploreButton = $('#exploreButton');
var explore = $('#explore');
var scheduleButton = $('#scheduleButton');
var schedule = $('#schedule');
var active = '';

exploreButton.click(function () {
  $('#content').show();
  if (active != 'explore') {
    // Set the nav bar.
    exploreButton.addClass('active');
    scheduleButton.removeClass('active');
    active = 'explore';

    // Set the content.
    schedule.fadeOut();
    explore.fadeIn('fast');
  }
});

scheduleButton.click(function () {
  $('#content').show();
  if (active != 'schedule') {
    // Set the nav bar.
    exploreButton.removeClass('active');
    scheduleButton.addClass('active');
    active = 'schedule';

    // Set the content.
    explore.fadeOut();
    schedule.fadeIn('fast');
  }
});
