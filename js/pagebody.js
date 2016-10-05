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
            alert("load from local storage"); //TODO temp
        }
        picker = new Pikaday({ field: document.getElementById('datepicker')});
        picker.setDate(new Date());
        showHomepage();
        revealPageSave('homePage')
    }
);
var picker = null;
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
 * @param homePage - if is true, board will be on homePage
 */
function showGlobalMeals(homePage){
    document.getElementById("mealsBoard").appendChild(createGlobalMealsTable(homePage));
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal(homePage);
    }
}
/**
 * Show global exercises page
 * @param homePage - if is true, board will be on homePage
 */
function showGlobalExercises(homePage){
    document.getElementById("exercisesBoard").appendChild(createGlobalExercisesTable(homePage));
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise(homePage);
    }
}
/**
 * Show particular day (day will be chosen in the datapicker)
 */
function showDay(){
    var pick = document.getElementById('datepicker');
    var date = picker.getDate();
    try{
        document.getElementById("dayBoard").appendChild(createDayTable(false,new Date(date)));
    }catch(ex){ //if day is not in the DB manager will create new empty day and show it
        globalDaysManager.addDay(new Day(new Date(date)));
        document.getElementById("dayBoard").appendChild(createDayTable(false,new Date(date)));
    }
    pick.onblur = function () { //click to other day
        var date = picker.getDate();
        deleteShowTable("dayBoard");
        try{
            document.getElementById("dayBoard").appendChild(createDayTable(false,new Date(date)));
        }catch(ex){ //if day is not in the DB manager will create new empty day and show it
            globalDaysManager.addDay(new Day(new Date(date)));
            document.getElementById("dayBoard").appendChild(createDayTable(false,new Date(date)));
        }
    }
}
/**
 * Show homepage, if today is empty, show message
 */
function showHomepage(){
    try{
        var empty = globalDaysManager.getDayByDate(new Date()).isEmpty();
        if(empty){
            emptyDay("homeBoard");
            var addB = document.getElementById("addMealButton");
            addB.setAttribute("date",String(new Date()));
            addB.onclick = function() {
                deleteShowTable("addFromMealsBoard");
                showAddMealsBoard(true,this.getAttribute("date"));
            };
            addB = document.getElementById("addExerciseButton");
            addB.setAttribute("date",String(new Date()));
            addB.onclick = function() {
                deleteShowTable("addFromExercisesBoard");
                showAddExercisesBoard(true,this.getAttribute("date"));
            };
        }else{
            document.getElementById("homeBoard").appendChild(createDayTable(true,new Date()));
        }
    }catch(ex){ //if day is not in the DB manager will create new empty day and show it
        globalDaysManager.addDay(new Day(new Date()));
        emptyDay("homeBoard");
        var addB = document.getElementById("addMealButton");
        addB.setAttribute("date",String(new Date()));
        addB.onclick = function() {
            deleteShowTable("addFromMealsBoard");
            showAddMealsBoard(true,this.getAttribute("date"));
        };
        addB = document.getElementById("addExerciseButton");
        addB.setAttribute("date",String(new Date()));
        addB.onclick = function() {
            deleteShowTable("addFromExercisesBoard");
            showAddExercisesBoard(true,this.getAttribute("date"));
        };
    }
}
/**
 * Show global meals board for add meal to the particular day
 * @param homePage - if is true, board will be on homePage
 * @param date - date of particular day
 */
function showAddMealsBoard(homePage,date){
    document.getElementById("addFromMealsBoard").appendChild(createGlobalMealsTable(homePage,date));
    document.getElementById("addNewMealButton").onclick = function(){
        fillAddMeal(homePage,date);
    }

}
/**
 * Show global exercise board for add exercise to the particular day
 * @param homePage - if is true, board will be on homePage
 * @param date - date of particular day
 */
function showAddExercisesBoard(homePage,date){
    document.getElementById("addFromExercisesBoard").appendChild(createGlobalExercisesTable(homePage,date));
    document.getElementById("addNewExerciseButton").onclick = function(){
        fillAddExercise(homePage,date);
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
/**
 * Show message to the empty day
 * @param nameElement name of element for whom message will be appended
 */
function emptyDay(nameElement){
    var element=document.getElementById(nameElement);
    var icon = document.createElement("img");
    icon.src = "style/images/hungry.png";
    icon.style.width = "90%";
    element.appendChild(icon);
    var text=document.createElement("p");
    text.appendChild(document.createTextNode("Day is empty! You should eat something"));
    text.style.font = "italic bold 20px arial,serif";
    element.appendChild(text);

}