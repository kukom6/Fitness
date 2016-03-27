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
var previousPages =[];
var commonSort = "asc";
//previousPages.push("homePage"); //first start
function savePreviousPage(){
    var activePage=document.querySelector(".principal > div.pagebody[aria-expanded=true]");
    previousPages.push(activePage.getAttribute("id"));
}
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
function revealPageSave(id){
    savePreviousPage();
    console.log("Page with id: "+id+" was been added");
    console.log("Previous page contains: "+previousPages);
    revealPage(id);
}
function showGlobalMeals(){
    document.getElementById("mealsBoard").appendChild(createGlobalMealsTable());
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal();
    }
}
function showGlobalExercises(){
    document.getElementById("exercisesBoard").appendChild(createGlobalExercisesTable());
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise();
    }
}
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
function showDay(dayDate){
    document.getElementById("dayBoard").appendChild(createDayTable(dayDate));
}
function showAddMealsBoard(date){
    document.getElementById("addFromMealsBoard").appendChild(createGlobalMealsTable(date));
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal(date);
    }

}
function showAddExercisesBoard(date){
    document.getElementById("addFromExercisesBoard").appendChild(createGlobalExercisesTable(date));
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise(date);
    }
}
function deleteShowTable(name){
    var table = document.getElementById(name);
    if(table==null){
        return; //if date was deleted
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}
