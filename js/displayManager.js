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
    document.getElementById("mealsTable").appendChild(createGlobalMealsTab());
    document.getElementById("exercisesTable").appendChild(createGlobalExercisesTab());
    document.getElementById("daysTable").appendChild(createGlobalDaysTable());
}
/**
 * Create meals table with global data
 * @returns {Element}
 */
function createGlobalMealsTab(){
    var array = globalMealsManager.getAllMeals();
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
        var deleteB = document.createElement("button"); //add delete button 
        deleteB.id = "G#"+array[j].id;
        deleteB.onclick = function() {
            deleteMeal(this);
        };
        deleteB.appendChild(document.createTextNode("Delete meal"));
        tr.appendChild(deleteB);
        var input = document.createElement("input"); //add data type for add button
        input.type="date";
        input.id="DM#"+array[j].id;
        tr.appendChild(input);
        var addB = document.createElement("button"); // add add button
        addB.id = "add#"+array[j].id;
        addB.onclick = function() {
            addMeal(this);
        };
        addB.appendChild(document.createTextNode("Add meal to day"));
        tr.appendChild(addB);
        tabMeals.appendChild(tr);
    }
    return tabMeals;
}
/**
 * Create exercises table with global data
 * @returns {Element}
 */
function createGlobalExercisesTab(){
    var array = globalExercisesManager.getAllExercises();
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
        var deleteB = document.createElement("button"); //add delete button
        deleteB.id = "G#"+array[j].id;
        deleteB.onclick = function() {
            deleteExercise(this);
        };
        deleteB.appendChild(document.createTextNode("Delete exercise"));
        tr.appendChild(deleteB);
        var input = document.createElement("input"); //add data type for add button
        input.type="date";
        input.id="DE#"+array[j].id;
        tr.appendChild(input);
        var addB = document.createElement("button"); // add add button
        addB.id = "add#"+array[j].id;
        addB.onclick = function() {
            addExercise(this);
        };
        addB.appendChild(document.createTextNode("Add exercise to day"));
        tr.appendChild(addB);
        tabExercises.appendChild(tr);
    }
    return tabExercises;
}
/**
 * Create days table with all days data
 * @returns {Element}
 */
function createGlobalDaysTable(){
    var array = globalDaysManager.getAllDays();
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
        tabDay.appendChild(createDayMealsTab(array[i]));
        tabDay.appendChild(createDayExerciseTab(array[i]));
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
 * Create one meals tab for specific day
 * @param day
 * @returns {Element}
 */
function createDayMealsTab(day){
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
            deleteMeal(this);
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
/**
 * Create one exercises tab for specific day
 * @param day
 * @returns {Element}
 */
function createDayExerciseTab(day){
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
            deleteExercise(this);
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

function addExercise(button){
    var id = button.id.split("#");
    var idDate = "DE#"+id[1];
    var dateElement=document.getElementById(idDate);
    var date=dateElement.value;
    if(date==""){
        alert("Set date!");
        return;
    }
    if(!globalDaysManager.isDayInDB(new Date(date))){
        globalDaysManager.addDay(new Day(new Date(date)));
    }
    globalDaysManager.addExerciseToDay(new Date(date),globalExercisesManager.getExerciseByID(id[1]));
    refreshShowDB();
}

function addMeal(button){
    var id = button.id.split("#");
    var idDate = "DM#"+id[1];
    var dateElement=document.getElementById(idDate);
    var date=dateElement.value;
    if(date==""){
        alert("Set date!");
        return;
    }
    if(!globalDaysManager.isDayInDB(new Date(date))){
        globalDaysManager.addDay(new Day(new Date(date)));
    }
    globalDaysManager.addMealToDay(new Date(date),globalMealsManager.getMealByID(id[1]));
    refreshShowDB();
}

function deleteExercise(button){
    if (confirm("Are you sure ?") == false) {
        return;
    }
    var id = button.id.split("#");
    if(id[0]=="G"){
        globalExercisesManager.deleteExerciseByID(id[1]);
        refreshShowDB();
    }else if(id[0]=="L"){
        globalDaysManager.deleteExerciseInDay(new Date(id[1]),id[2]);
        refreshShowDB();
    }
}

function deleteMeal(button){
    if (confirm("Are you sure ?") == false) {
        return;
    }
    var id = button.id.split("#");
    if(id[0]=="G"){
        globalMealsManager.deleteMealByID(id[1]);
        refreshShowDB();
    }else if(id[0]=="L"){
        globalDaysManager.deleteMealInDay(new Date(id[1]),id[2]);
        refreshShowDB();
    }
}

function deleteDayFromHTML(button){
    if (confirm("Are you sure ?") == false) {
        return;
    }
    var date=button.id;
    var deleteDate = new Date(date);
    globalDaysManager.deleteDayByDate(deleteDate);
    refreshShowDB();
}

/**
 * add value to current date
 * @param form
 */
function addDB(form){
    if(form["addToDB"].checked){ //save to db
        if(form.name=="addMeal"){
            addToDB("meal",form);
        }else{
            addToDB("exercise",form);
        }
    }
    if(form["addToDay"].checked){ //save to date
        if(form.name=="addMeal"){
            addToDay("meal",form);
        }else{
            addToDay("exercise",form);
        }
    }
    form.reset();
}

/**
 * add value to DB with form
 * @param mode - type of value
 * @param form - form from html
 */
function addToDB(mode,form){
    if(mode=="meal"){
        globalMealsManager.addMeal(new Meal(
            form[0].value,
            form[1].value,
            form[2].value,
            form[3].value,
            form[4].value,
            form[5].value
        ));
    }else if(mode=="exercise"){
        globalExercisesManager.addExercise(new Exercise(
            form[0].value,
            form[1].value
        ));
    }
    refreshShowDB();
    saveLocal();
}

/** TODO
 * add new meal or exercise to the new or exist day
 * @param mode - type of value
 * @param form - form from html
 */
function addToDay(mode,form){
    //TODO if current date or setted day
    var dateElement=document.getElementById("setDate");
    var date=dateElement.value;
    if(date==""){
        alert("Set date!");
        return;
    }
    var particularDate = new Date(date);
    if(!globalDaysManager.isDayInDB(particularDate)){
        globalDaysManager.addDay(new Day(particularDate)); // if day is not in the db
    }
    var day = globalDaysManager.getDayByDate(particularDate);
    if(mode=="meal"){
        day.mealsManager.addMeal(new Meal(
            form[0].value,
            form[1].value,
            form[2].value,
            form[3].value,
            form[4].value,
            form[5].value
        ));
    }else if(mode=="exercise"){
        day.exercisesManager.addExercise(new Exercise(
            form[0].value,
            form[1].value
        ));
    }
    refreshShowDB();
    saveLocal();
}