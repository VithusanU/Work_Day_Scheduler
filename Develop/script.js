$(function () {
    var startTime = 9;
    var timeBlocks = [
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "Current"
    ];

    function currentTime() {
        var timeNow = today.format('hh:mm a');

        // Find the "Current" time block by its text content
        $('.time-block').each(function () {
            if ($(this).find('.hour').text() === 'Current') {
                var currentTimeDiv = $('<div>').addClass('current-time')
                currentTimeDiv.text(timeNow)
                $(this).append(currentTimeDiv)
                $(this).addClass('present');
            }
        });
    }
    // This above code creates a timebox and applies the present class to it whilst displaying the time, there is an issue of the time also being affected by the present class requires further tuning.



    // DOM element references
    var timeDisplayEl = $('#currentDay');
    var timeTable = $('#container');
    // use hour as a reference for naming local storage, as well as html div elements
    var today = dayjs();


    // handle displaying the time
    function displayTime() {
        var rightNow = today.format('MMM DD, YYYY [at] hh:mm a');
        timeDisplayEl.text(`It is ${rightNow} `);
    }
    // set the time table page
    $.each(timeBlocks, function (i, timeBlock) {
        timeIndex = startTime + i;
        var texts;
        // textarea value is to be equal to that of the local storage
        var descriptionText = localStorage.getItem(timeBlock);
        if (!descriptionText) {
            texts = "";
        } else {
            texts = descriptionText;
        }
        timeTable.append(`<div id="${timeBlock}" class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${timeBlock}</div>
      <textarea id="comment-${i}" class="col-8 col-md-10 description" rows="3">${texts}</textarea>
      <button id="${i}" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
      </button>
      </div>`);
        // check for present time segment
        var entry = $(`#${timeBlock}`);
        if (timeIndex === today.hour()) {
            entry.addClass("present");
        } else if (timeIndex < today.hour()) {
            entry.addClass("past");
        } else {
            entry.addClass("future");
        }
    })





    //saving subroutin
    var saveBtn = $('.saveBtn');
    function saveDetail(event) {
        event.preventDefault();
        var texts = $(`#comment-${this.id}`);
        storageName = Number(this.id) + startTime;
        localStorage.setItem(`hour-${storageName}`, `${texts.val()}`);

        // This will display a confirmation message
        var confirmationMessage = `Data saved for ${timeBlocks[this.id]}!`;
        $('#saveConfirmationMessage').addClass('text-center');
        $('#saveConfirmationMessage').addClass('bg-info text-light');
        $('#saveConfirmationMessage').text(confirmationMessage);

    };
    saveBtn.on('click', saveDetail);
    displayTime();
    currentTime();
});


