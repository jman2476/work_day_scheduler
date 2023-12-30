// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // store current date from dayJS
  var currentDate = dayjs().hour(13);
  // store initial hour object block starting at 9am
  var schedulerIndex = dayjs().hour(9);
  
  // Interval to control clock in header
  setInterval(function () {
    // pull a formatted date from day.js to insert into the header
    var headerDate = dayjs().format(`MMM DD YYYY dddd hh:mm:ss A`)
    // change text to current formatted time
    $("#currentDay").text(headerDate);
    
  }, 1000) // update once per second
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  
  // Function for populating the textboxes with data stored in localStorage
  function loadText() {

  }

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // Loop over each time box to add in the correct formatting and load saved text
  while (schedulerIndex.hour() < 18) {
    // set boolean variables for future, past, present based on schedulerIndex and currentDate
    console.log(schedulerIndex.hour())
    var isPast = schedulerIndex.hour() < currentDate.hour();
    var isPresent = schedulerIndex.hour() === currentDate.hour();
    // if neither isPast or isPresent is true, future will be passed as the else{}
    
    // insert html to create the indexed time block
    // add class of past, present or future based on the time
    // set the title text for hour to the appropriate hour
    $('.container-lg').append(`
    <div id= hour-${schedulerIndex.hour()} class="row time-block ${isPast ? 'past' : isPresent ? 'present' : 'future'}">
    <div class="col-2 col-md-1 hour text-center py-3">${schedulerIndex.format('hA')}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    </div>
    `);
    
    // 
    
    // run loadText on current time box
    // loadText(index)
    
    // increment hour
    schedulerIndex = schedulerIndex.add(1, 'hour');
    // 
  }
  
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // Make the dang save icons on the buttons spin when you hover over them
  // the first functions adds the fa-spin class, the second removes it when
  // hovering is done
  $("button").hover(function () {
    $(this).children().addClass("fa-spin")
  }, function () {
    $(this).children().removeClass("fa-spin")
  })
  
  // Listener for when a save button is clicked
  $('button').click(function(event) {
    event.stopPropagation(); // stop event propogation

    // save the text in the adjacent textarea to variable
    var textForSavin = $(this).siblings("textarea").val(); 
    // save the div id to use as key in localStorage
    var timeTag = $(this).parent().attr('id');

    console.log(textForSavin)
    console.log(timeTag)
  })
  
});
