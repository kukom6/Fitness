/**
 * Created by mkralik on 2/20/16.
 */
/**
 * show all db as table
 */
function showAllDB(){
    if(meals.length==0 && exercises.length==0 && days.length == 0){
        alert("DB is empty, nothing to show");
        return;
    }
    document.getElementById("mealsTable").appendChild(createMealsTab(meals));
    document.getElementById("exercisesTable").appendChild(createExercisesTab(exercises));
    document.getElementById("daysTable").appendChild(createDaysTable(days));
}
/**
 * Create meals table with all items in the array
 * @param array - array with meals
 * @returns {Element} - Table DOM element
 */
function createMealsTab(array){
    var tabMeals = document.createElement("table"); //create meals table
    tabMeals.border = '2';
    tabMeals.style.width = "100%";
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals:"));
    caption.style.fontWeight = "bold";
    caption.style.color = "red";
    tabMeals.appendChild(caption);
    var tr,node = null;
    //create head table
    tr = document.createElement("tr");
    node = document.createElement("td");
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
    tr.appendChild(node);
    node.style.fontWeight = "bold";
    node.align = "middle";
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
        tabMeals.appendChild(tr);
    }
    return tabMeals;
}
/**
 * Create exercises table with all items in the array
 * @param array - array with meals
 * @returns {Element} - Table DOM element
 */
function createExercisesTab(array){
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
    return tabExercises;
}
/**
 * Create days table with all items in the array
 * @param array - array with meals
 * @returns {Element} - Table DOM element
 */
function createDaysTable(array){
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
        caption.appendChild(document.createTextNode("Day: "+array[i].date));
        caption.style.fontWeight = "bold";
        tabDay.appendChild(caption);
        tabDay.appendChild(createMealsTab(array[i].dayMeals));
        tabDay.appendChild(createExercisesTab(array[i].dayExercises));
        tabDays.appendChild(tabDay); //add day table to the days table
    }
    return tabDays;
}

/**
 * refresh table.
 * (remove table elements and call showAllDB function)
 */
function refreshShowDB(){  // TODO right? delete and show ?
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