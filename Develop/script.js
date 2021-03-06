var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function renderSchedule(){
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);
   
    //loop thru array then assign the text to the timeBlock with data-hour equal to hour. 
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++){
      var itemHour = toDoItems[i].hour;
      var itemText = toDoItems[i].text; 
  
      $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
  }
  
  function saveHandler(){
    var $thisBlock = $(this).parent();
  
    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();
  
    //see which item we need to update based on the hour of the button clicked matching
    for (var i = 0; i < toDoItems.length; i++){
        if (toDoItems[i].hour == hourToUpdate){
            //set its text to what was added to textarea
            toDoItems[i].text = itemToAdd;
          }
        }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
  }
  
  //add event listener to buttons
  $(document).ready(function(){
    //display current date
    $currentDay.text(currentDate);
  
    //add style to time blocks to show where we are in the day
    $timeBlocks.each(function () {
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
  
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
  
    renderSchedule();
    $scheduleArea.on("click", "button", saveHandler);
  
  });