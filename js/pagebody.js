window.addEventListener(
    "load",
    function() {
        var elt = document.querySelector(".principal > div.pagebody[aria-expanded=true]");
        if (elt) {
            var toolbarId = elt.getAttribute("aria-owns");
            if (toolbarId) showToolbar(toolbarId);
        }
       if(localStorage.getItem('isInLocal')){
           loadLocal();
           alert("load from local"); //TODO temp
       }
   }
);
/**
 * Save previous pages (for back button)
 * @type {Array}
 */
var previousPages =[];
/**
 * Start sorting by 
 * @type {string}
 */
var commonSort = "asc";
/**
 * Save page which is activated (expanded) to the previous pages array
 */
function savePreviousPage(){
    var activePage=document.querySelector(".principal > div.pagebody[aria-expanded=true]");
    previousPages.push(activePage.getAttribute("id"));
}
/**
 * Show particular page without saving previous activated page
 * @param id - id page
 */
function revealPage(id) {
   var elt = document.getElementById(id);
   var nodeName = elt.nodeName; // expect "DIV" (.pagebody)
   var siblings = elt.parentNode.children;
   for (var i=0; i < siblings.length; ++i) {
      var sib = siblings[i];
      if ((sib.nodeName === nodeName) && (sib != elt)) {
         sib.setAttribute("aria-expanded", "false");
      }
   }
   elt.setAttribute("aria-expanded", "true");
   var toolbarId = elt.getAttribute("aria-owns");
   if (toolbarId) {
       showToolbar(toolbarId);
   }else{
       closeAllToolbar();
   }
}
/**
 * Show particular page with saving previous activated page
 * @param id - id page
 */
function revealPageSave(id){
    savePreviousPage();
    console.log("Page with id: "+id+" was been added");
    console.log("Previous page contains: "+previousPages);
    revealPage(id);
}
/**
 * Show global meals page
 */
function showGlobalMeals(){
    document.getElementById("mealsBoard").appendChild(createGlobalMealsTable());
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal();
    }
}
/**
 * Show global exercises page
 */
function showGlobalExercises(){
    document.getElementById("exercisesBoard").appendChild(createGlobalExercisesTable());
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise();
    }
}
/**
 * Show global days page
 */
function showGlobalDays(){
    var manager = globalDaysManager.getAllDays();
    var daysBoard = document.getElementById('daysBoard');
    var ul = document.createElement('ul');
    var li = null;
    for(var i=0;i<manager.length;i++){
        li=document.createElement('li');
        li.setAttribute("idDay","GD#"+manager[i].date);
        li.onclick = function(){
            var id = this.getAttribute("idDay").split("#");
            revealPageSave("pageDay");
            showDay(id[1]);
        };
        li.appendChild(document.createTextNode(manager[i].date.toDateString()));
        ul.appendChild(li);
    }
    daysBoard.appendChild(ul);
}
/**
 * Show particular day
 * @param dayDate - date of particular day
 */
function showDay(dayDate){
    document.getElementById("dayBoard").appendChild(createDayTable(dayDate));
}
/**
 * Show global meals board for add meal to the particular day
 * @param date - date of particular day
 */
function showAddMealsBoard(date){
    document.getElementById("addFromMealsBoard").appendChild(createGlobalMealsTable(date));
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal(date);
    }

}
/**
 * Show global exercise board for add exercise to the particular day
 * @param date - date of particular day
 */
function showAddExercisesBoard(date){
    document.getElementById("addFromExercisesBoard").appendChild(createGlobalExercisesTable(date));
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise(date);
    }
}
/**
 * Delete table from HTML
 * @param name - name of table
 */
function deleteShowTable(name){
    var table = document.getElementById(name);
    if(table==null){
        return; //if date was deleted
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}