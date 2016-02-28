/**
 * Created by mkralik on 2/20/16.
 */
/**
 * show all db as table
 */
function showAllDB(){
    if(globalMealsManager.isEmpty() && globalMealsManager.isEmpty() && globalDaysManager.isEmpty()){
        alert("DB is empty, nothing to show");
        return;
    }
    document.getElementById("mealsTable").appendChild(createMealsTab(globalMealsManager,false));
    document.getElementById("exercisesTable").appendChild(createExercisesTab(globalExercisesManager,false));
    document.getElementById("daysTable").appendChild(createDaysTable(globalDaysManager));
}
/**
 * Create meals table with all items in the array
 * @param manager - specific meals manager
 * @param sum - if shows sum
 * @returns {Element} - Table DOM element
 */
function createMealsTab(manager,sum){
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
        tabMeals.appendChild(tr);
    }
    if(sum){
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
    }
    return tabMeals;
}
/**
 * Create exercises table with all items in the array
 * @param manager - exercises manager
 * @param sum - if shows sum
 * @returns {Element} - Table DOM element
 */
function createExercisesTab(manager,sum){
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
        tabExercises.appendChild(tr);
    }
    if(sum){
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
    }
    return tabExercises;
}
/**
 * Create days table with all items in the array
 * @param manager - days manager
 * @returns {Element} - Table DOM element
 */
function createDaysTable(manager){
    var array = manager.getAllDays();
    var tabDays = document.createElement("table");
    tabDays.style.border = "medium dashed red";
    tabDays.style.width = "100%";
    tabDays.style.backgroundColor = "lightgray";
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Days"));
    caption.style.color = "red";
    caption.style.fontWeight = "bold";
    tabDays.appendChild(caption);
    var tabDay = null;
    for(var i=0;i<array.length;i++){
        tabDay = document.createElement("table"); //create day table
        tabDay.style.border = "thin dotted red";
        tabDay.style.width = "100%";
        tabDay.id = array[i].date;
        caption = document.createElement("caption");
        var date = array[i].date.toDateString();
        caption.appendChild(document.createTextNode("Day: "+date));
        caption.style.fontWeight = "bold";
        tabDay.appendChild(caption);
        tabDay.appendChild(createMealsTab(array[i].mealsManager,true));
        tabDay.appendChild(createExercisesTab(array[i].exercisesManager,true));
        var deleteB = document.createElement("button");
        deleteB.id = date;
        deleteB.onclick = function() {
            deleteDayFromHTML(this);
        };
        deleteB.appendChild(document.createTextNode("Delete day"+date));

        tabDay.appendChild(deleteB);
        tabDays.appendChild(tabDay); //add day table to the days table
    }
    return tabDays;
}

/**
 * refresh table.
 * (remove table elements and call showAllDB function)
 */
function refreshShowDB(){  // TODO remove up element
    var table = document.getElementById("mealsTable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table = document.getElementById("exercisesTable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table = document.getElementById("daysTable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    showAllDB();
    document.getElementById("refreshButton").disabled=false;
}

function deleteDayFromHTML(button){
    var date=button.id;
    var deleteDate = new Date(date);
    globalDaysManager.deleteDayByDate(deleteDate);
    refreshShowDB();
}
