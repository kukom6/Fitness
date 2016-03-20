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
       }
   }
);
function revealPage(id) {
   savePreviousPage();
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
function showDay(dayDate){
    var currentDate = globalDaysManager.getDayByDate(dayDate);
    var tabDay = document.createElement("table"); //create day table
    tabDay.style.border = "thin dotted red";
    tabDay.style.width = "100%";
    tabDay.id = currentDate.date;
    var caption = document.createElement("caption");
    var date = currentDate.date.toDateString();
    caption.appendChild(document.createTextNode("Day: "+date));
    caption.style.fontWeight = "bold";
    tabDay.appendChild(caption);
    tabDay.appendChild(createDayMealsTab2(currentDate));
    tabDay.appendChild(createDayExerciseTab2(currentDate));
    var deleteB = document.createElement("button");
    deleteB.id = date;
    deleteB.onclick = function() {
        if (confirm("Are you sure ?") == false) {
            return;
        }
        var date=this.id;
        globalDaysManager.deleteDayByDate(new Date(date));
        deleteShowDay();
        showDay(new Date(date));
    };
    deleteB.appendChild(document.createTextNode("Delete day"+date));
    tabDay.appendChild(deleteB);
    document.getElementById("dayBoard").appendChild(tabDay);
}
function deleteShowDay(){
    var table = document.getElementById("dayBoard");
    if(table==null){
        return; //if date was deleted
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}
function createDayMealsTab2(day){
    var manager = day.mealsManager;
    var array = manager.getAllMeals();
    var tabMeals = document.createElement("table"); //create meals table
    tabMeals.style.width = "100%";
    tabMeals.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals"));
    caption.style.textAlign = "center";
    tabMeals.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("P"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("C"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("F"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Met"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(this.getAttribute("idMeal"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].protein));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].carbohydrate));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].fat));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].method));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabMeals.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Total"));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumProtein()));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumCarbohydrate()));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumFat()));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(String(manager.sumKcal())));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
function createDayExerciseTab2(day){
    var manager = day.exercisesManager;
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); //create exercises table
    tabExercises.style.width = "100%";
    tabExercises.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Exercises"));
    caption.style.textAlign = "center";
    tabExercises.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabExercises.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){ //show all exercises in the day
        tr = document.createElement("tr");
        tr.setAttribute("idExercise","LE#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditExercise(this.getAttribute("idExercise"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabExercises.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode('Total'));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode('-'+manager.sumKcal()));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}
function fillEditMeal(id){
    revealPage("editMealPage");
    var ids = id.split("#");
    var form = document.getElementById("editMealForm");
    var meal = globalDaysManager.getDayByDate(new Date(ids[1])).mealsManager.getMealByID(ids[2]);
    form[0].value=meal.name;
    form[1].value=meal.protein;
    form[2].value=meal.carbohydrate;
    form[3].value=meal.fat;
    form[4].value=meal.kcal;
    if(meal.method=="one piece"||meal.method=="100g"){
        form[5].value=meal.method;
    }
    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if (confirm("Delete meal. Are you sure ?") == false) {
            return;
        }
        globalDaysManager.deleteMealInDay(new Date(ids[1]),ids[2]);
        saveLocal();
        deleteShowDay();
        showDay(new Date(ids[1]));
        revealPage(previousPage);
    };
}
function fillEditExercise(id){
    revealPage("editExercisePage");
    var ids = id.split("#");
    var form = document.getElementById("editExerciseForm");
    var meal = globalDaysManager.getDayByDate(new Date(ids[1])).exercisesManager.getExerciseByID(ids[2]);
    form[0].value=meal.name;
    form[1].value=meal.kcal;
    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if (confirm("Delete exercise. Are you sure ?") == false) {
            return;
        }
        globalDaysManager.deleteExerciseInDay(new Date(ids[1]),ids[2]);
        saveLocal();
        deleteShowDay();
        showDay(new Date(ids[1]));
        revealPage(previousPage);
    };
}
