// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // store current date from dayJS
  var currentDate = dayjs();
  // store initial hour object block starting at 9am
  var schedulerIndex = dayjs().hour(9);
  
  // Interval to control clock in header
  setInterval(function () {
    // pull a formatted date from day.js to insert into the header
    var headerDate = dayjs().format(`MMM DD YYYY dddd hh:mm:ss A`)
    // change text to current formatted time
    $("#currentDay").text(headerDate);
    
  }, 1000) // update once per second
  
  // build the html for each time block, using a while loop
  // it will check local storage and populate the necessary information in the textarea boxes
  while (schedulerIndex.hour() < 18) {
    // set boolean variables for future, past, present based on schedulerIndex and currentDate
    var isPast = schedulerIndex.hour() < currentDate.hour();
    var isPresent = schedulerIndex.hour() === currentDate.hour();
    // if neither isPast or isPresent is true, future will be passed as the else{}
    
    // insert html to create the indexed time block
    // add class of past, present or future based on the time
    // set the title text for the row to the appropriate hour
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
    loadText(schedulerIndex.hour());
    
    // increment hour
    schedulerIndex = schedulerIndex.add(1, 'hour');
    // 
  }
  
  // Function for populating the textboxes with data stored in localStorage, with an arguement for the hour desired
  function loadText(hourSelect) {
    var key = `hour-${hourSelect}`; // save the key of the hour desired
    // get text for hour from localStorage, set to empty string 
    var setText = localStorage.getItem(key) || "" ;
    // set the textarea value to the saved text
    $(`#hour-${hourSelect}`).children('textarea').val(setText)
  }
  
  // Make the dang save icons on the buttons spin when you hover over them
  // the first functions adds the fa-spin class, the second removes it when hovering is done
  $("button").hover(function () {
    $(this).children().addClass("fa-spin")
  }, function () {
    $(this).children().removeClass("fa-spin")
  })
  
  // Screw it, I'm going to make the header clock spin 
  // when you hover over the header
  // and there's nothing you can do to stop me
  $("header").hover(function () {
    $(this).children("#currentDay").addClass("fa-spin")
  }, function () {
    $(this).children("#currentDay").removeClass("fa-spin")
  });

  // Listener for when a save button is clicked
  $('button').click(function(event) {
    event.stopPropagation(); // stop event propogation

    // save the text in the adjacent textarea to variable
    var textForSavin = $(this).siblings("textarea").val(); 
    // save the div id to use as key in localStorage
    var timeTag = $(this).parent().attr('id');

    // save the event text to localStorage
    localStorage.setItem(timeTag, textForSavin)
    
  })
  
});
