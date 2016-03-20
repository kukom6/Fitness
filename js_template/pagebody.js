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
    tabMeals.border = '2';
    tabMeals.style.width = "100%";
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals:"));
    caption.style.fontWeight = "bold";
    caption.style.color = "red";
    tabMeals.appendChild(caption);
    //create head table
    var tr = document.createElement("tr");
    var node = document.createElement("td");
    node.appendChild(document.createTextNode("Id"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Name"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Protein"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Carbohydrate"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Fat"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Kcal"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Method"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    tabMeals.appendChild(tr);
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].id));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].protein));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].carbohydrate));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].fat));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].method));
        node.align = "middle";
        tr.appendChild(node);
        var deleteB = document.createElement("button");
        deleteB.id = "L#"+day.date.toLocaleString()+"#"+array[j].id;
        deleteB.onclick = function() {
            if (confirm("Are you sure ?") == false) {
                return;
            }
            var id = this.id.split("#");
            if(id[0]=="G"){
                globalMealsManager.deleteMealByID(id[1]);
            }else if(id[0]=="L"){
                globalDaysManager.deleteMealInDay(new Date(id[1]),id[2]);
            }
            deleteShowDay();
            showDay(new Date(id[1]));
        };
        deleteB.appendChild(document.createTextNode("Delete meal"));
        tr.appendChild(deleteB);
        tabMeals.appendChild(tr);
    }
    tr = document.createElement("tr");
    tr.style.backgroundColor = '#EE8A8E';
    node = document.createElement("td");
    node.appendChild(document.createTextNode("SUCET"));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumProtein()));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumCarbohydrate()));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumFat()));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(String(manager.sumKcal())));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    tabMeals.appendChild(tr);
    return tabMeals;
}
function createDayExerciseTab2(day){
    var manager = day.exercisesManager;
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); //create exercises table
    tabExercises.border = '2';
    tabExercises.style.width = "100%";
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Exercises"));
    caption.style.color = "red";
    caption.style.fontWeight = "bold";
    tabExercises.appendChild(caption);
    //create head table
    var tr = document.createElement("tr");
    var node = document.createElement("td");
    node.appendChild(document.createTextNode("Id"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Name"));
    node.style.fontWeight = "bold";
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Kcal"));
    tr.appendChild(node);
    node.style.fontWeight = "bold";
    node.align = "middle";
    tabExercises.appendChild(tr);

    for(var j=0;j<array.length;j++){ //show all exercises in the day
        tr = document.createElement("tr");
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].id));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        node.align = "middle";
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        node.align = "middle";
        tr.appendChild(node);
        var deleteB = document.createElement("button");
        deleteB.id = "L#"+day.date.toLocaleString()+"#"+array[j].id;
        deleteB.onclick = function() {
            if (confirm("Are you sure ?") == false) {
                return;
            }
            var id = this.id.split("#");
            if(id[0]=="G"){
                globalExercisesManager.deleteExerciseByID(id[1]);
            }else if(id[0]=="L"){
                globalDaysManager.deleteExerciseInDay(new Date(id[1]),id[2]);
            }
            deleteShowDay();
            showDay(new Date(id[1]));
        };
        deleteB.appendChild(document.createTextNode("Delete exercise"));
        tr.appendChild(deleteB);
        tabExercises.appendChild(tr);
    }
    tr = document.createElement("tr");
    tr.style.backgroundColor = '#EE8A8E';
    node = document.createElement("td");
    node.appendChild(document.createTextNode('SUCET'));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(''));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode('-'+manager.sumKcal()));
    node.align = "middle";
    tr.appendChild(node);
    tabExercises.appendChild(tr);
    return tabExercises;
}