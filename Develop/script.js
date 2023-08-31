// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBlocksContainer = $("#time-blocks");
  var timeBlocks = generateTimeBlocks();
  var storageBlocks = [];
  console.log(timeBlocks);

  // Create a function that will take in a set hour frame and will create a list of objects that are our timeblocks
  function generateTimeBlocks() {
    var startHour = 8;
    var endHour = 8;
    var timeBlocks = [];

    for (var i = startHour; i <= endHour + 12; i++) {
      var timeBlock = {
        time: i,
        events: "",
      };
      timeBlocks.push(timeBlock);
    }
    return timeBlocks;
  }

  //Create, build, and place each block to have them be added to the page
  function printTimeBlocks(timeBlocks) {
    //Get the current time to compare to each time block
    var currentHour = parseInt(dayjs().format("H"));
    var pastPresentFuture;

    timeBlocksContainer.empty();
    for (var i = 0; i < timeBlocks.length; i++) {
      //Get the hour in non military time
      var hour = timeBlocks[i].time % 12;
      if (hour === 0) {
        hour = 12;
      }

      //Get if the time is am or pm
      var amOrPm;
      if (timeBlocks[i].time > 12) {
        amOrPm = "pm";
      } else {
        amOrPm = "am";
      }

      //Get the past present and future blocks
      if (timeBlocks[i].time < currentHour) {
        pastPresentFuture = "past";
      } else if (timeBlocks[i].time === currentHour) {
        pastPresentFuture = "present";
      } else {
        pastPresentFuture = "future";
      }

      var newTimeBlockEL =
        $(`<div id="hour-${timeBlocks[i].time}" class="row time-block ${pastPresentFuture}">
      <div class="col-2 col-md-1 hour text-center py-3">${hour} ${amOrPm}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`);
      timeBlocksContainer.append(newTimeBlockEL);
    }
  }

  printTimeBlocks(timeBlocks);

  $("button").click(function () {
    var timeBlockID = $(this).parent()[0].id;
    var timeBlockValue = $(this).siblings().next()[0].value;
    if (timeBlockValue !== " ") {
      localStorage.setItem(timeBlockID, timeBlockValue);
      storageBlocks.push(timeBlockID);
      JSON.stringify(storageBlocks);
      localStorage.setItem("storage", storageBlocks);
    }
  });

  function displayFromStorage() {
    var storageItems = localStorage.getItem("storage");
    console.log(storageItems);
    for (var i = 0; i < storageBlocks.length; i++) {
      storageItems.push(localStorage.getItem(storageBlocks[i]));
    }
    console.log(storageItems);
  }

  displayFromStorage();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
