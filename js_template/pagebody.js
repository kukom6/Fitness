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
}
function showGlobalExercises(){
    document.getElementById("exercisesBoard").appendChild(createGlobalExercisesTable());
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
function showTempDay(dayDate){
    document.getElementById("homeDayBoard").appendChild(createDayTable(dayDate)); //TODO delete, test day on homepage
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
function deleteShow(name){
    var table = document.getElementById(name);
    if(table==null){
        return; //if date was deleted
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}
function fillEditMeal(id) {
    revealPageSave("editMealPage");
    var ids = id.split("#");
    var form = document.getElementById("editMealForm");
    var meal = null;
    if (ids[0] == "LM") {
        meal = globalDaysManager.getDayByDate(new Date(ids[1])).mealsManager.getMealByID(ids[2]);
    } else if (ids[0] == "GM") {
        meal = globalMealsManager.getMealByID(ids[1]);
    }
    form[0].value = meal.name;
    form[1].value = meal.protein;
    form[2].value = meal.carbohydrate;
    form[3].value = meal.fat;
    form[4].value = meal.kcal;
    if (ids[0] == "LM") {
        form[5].value = meal.method;
        form[5].disabled = true;
        form[6].style.visibility = "visible";
        form[6].disabled = false;
        form[6].value = meal.partOfDay;
    }else{
        form[5].disabled = false;
        form[5].value = meal.method;
        form[6].style.visibility = "hidden";
        form[6].disabled = true;
    }
    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if (confirm("Delete meal. Are you sure ?") == false) {
            return;
        }
        if(ids[0]=="LM"){
            globalDaysManager.deleteMealInDay(new Date(ids[1]),ids[2]);
        }else{
            globalMealsManager.deleteMealByID(ids[1]);
        }
        saveLocal();
        if(ids[0]=="LM"){
            deleteShow("homeDayBoard"); //TODO temp
            deleteShow("dayBoard");
            showDay(new Date(ids[1]));
        }else{
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
        form.reset();
        revealPage(previousPages.pop());
    };
    toolbarButton = document.getElementById("updateIconEdit");
    toolbarButton.onclick = function(){
        var form = document.getElementById("editMealForm");
        var saveMeal = null;
        if(!validateForm(form,"meal")){
            return;
        }
        if(ids[0]=="LM"){
            saveMeal = globalDaysManager.getDayByDate(new Date(ids[1])).mealsManager.getMealByID(ids[2]);
            saveMeal.name = form[0].value;
            saveMeal.protein = parseFloat(form[1].value).toFixed(2);
            saveMeal.carbohydrate = parseFloat(form[2].value).toFixed(2);
            saveMeal.fat = parseFloat(form[3].value).toFixed(2);
            saveMeal.kcal = parseFloat(form[4].value).toFixed(2);
            saveMeal.partOfDay = form[6].value;
            globalDaysManager.updateMealInDay(new Date(ids[1]),saveMeal);
        }else{
            saveMeal = globalMealsManager.getMealByID(ids[1]);
            saveMeal.name = form[0].value;
            saveMeal.protein = parseFloat(form[1].value).toFixed(2);
            saveMeal.carbohydrate = parseFloat(form[2].value).toFixed(2);
            saveMeal.fat = parseFloat(form[3].value).toFixed(2);
            saveMeal.kcal = parseFloat(form[4].value).toFixed(2);
            saveMeal.method = form[5].value;
            saveMeal.partOfDay = form[6].value;
            globalMealsManager.updateMeal(saveMeal);
        }
        saveLocal();
        alert("Meal was been updated");
        form.reset();
        if(ids[0]=="LM"){
            deleteShow("dayBoard");
            showDay(new Date(ids[1]));
        }else{
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
        revealPage(previousPages.pop());
    };
}
function fillEditExercise(id){
    revealPageSave("editExercisePage");
    var ids = id.split("#");
    var form = document.getElementById("editExerciseForm");
    var exercise = null;
    if(ids[0]=="LE"){
        exercise = globalDaysManager.getDayByDate(new Date(ids[1])).exercisesManager.getExerciseByID(ids[2]);
    }else if(ids[0]=="GE"){
        exercise = globalExercisesManager.getExerciseByID(ids[1]);
    }
    form[0].value=exercise.name;
    form[1].value=exercise.kcal;
    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if (confirm("Delete exercise. Are you sure ?") == false) {
            return;
        }
        if(ids[0]=="LE"){
            globalDaysManager.deleteExerciseInDay(new Date(ids[1]),ids[2]);
        }else{
            globalExercisesManager.deleteExerciseByID(ids[1]);
        }
        saveLocal();
        if(ids[0]=="LE"){
            deleteShow("homeDayBoard"); //TODO temp
            deleteShow("dayBoard");
            showDay(new Date(ids[1]));
        }else{
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }
        revealPage(previousPages.pop());
    };
    toolbarButton = document.getElementById("updateIconEdit");
    toolbarButton.onclick = function(){
        var form = document.getElementById("editExerciseForm");
        var saveExercise = null;
        if(!validateForm(form,"exercise")){
            return;
        }
        if(ids[0]=="LE"){
            saveExercise = globalDaysManager.getDayByDate(new Date(ids[1])).exercisesManager.getExerciseByID(ids[2]);
            saveExercise.name = form[0].value;
            saveExercise.kcal = parseFloat(form[1].value).toFixed(2);
            globalDaysManager.updateExerciseInDay(new Date(ids[1]),saveExercise);
        }else{
            saveExercise = globalExercisesManager.getExerciseByID(ids[1]);
            saveExercise.name = form[0].value;
            saveExercise.kcal = parseFloat(form[1].value).toFixed(2);
            globalExercisesManager.updateExercise(saveExercise);
        }
        saveLocal();
        alert("Exercise was been updated");
        form.reset();
        if(ids[0]=="LE"){
            deleteShow("dayBoard");
            showDay(new Date(ids[1]));
        }else{
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }
        revealPage(previousPages.pop());
    };
}
function fillAddMeal(date,id){
    revealPageSave("addMealPage");
    var form = document.getElementById("addMealForm");
    var saveButton = null;
    if(id){ //fill from global meal
        var ids = id.split("#");
        var meal = globalMealsManager.getMealByID(ids[1]);
        form[0].value = meal.name;
        form[1].value = meal.protein;
        form[2].value = meal.carbohydrate;
        form[3].value = meal.fat;
        form[4].value = meal.kcal;
        form[5].value = meal.partOfDay;
        form[6].disabled = false;
        form[6].style.width = "70%";
        form[6].onkeyup = function(){  //counting
            var form = document.getElementById("addMealForm");
            var ids = id.split("#");
            var meal = globalMealsManager.getMealByID(ids[1]);
            form[1].value = meal.protein * this.value;
            form[2].value = meal.carbohydrate * this.value;
            form[3].value = meal.fat * this.value;
            form[4].value = meal.kcal * this.value;
        };
        form[7].value = meal.method;
        form[7].style.visibility = "visible";
        form[7].disabled = true;
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addMealForm");
            if (!validateForm(form, "meal")) {
                return;
            }
            var saveMeal = new Meal(
                form[0].value,
                parseFloat(form[1].value).toFixed(2),
                parseFloat(form[2].value).toFixed(2),
                parseFloat(form[3].value).toFixed(2),
                parseFloat(form[4].value).toFixed(2),
                form[7].value,
                form[5].value);
            globalDaysManager.addMealToDay(new Date(date),saveMeal);
            alert("Meal was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShow("dayBoard");
            deleteShow("addFromMealsBoard");
            revealPage("pageDay");
            showDay(new Date(date));
        };
    }else{ //fill from new meal
        saveButton = document.getElementById("saveButton");
        form[6].disabled = true;
        form[6].style.width = "90%";
        form[7].style.visibility = "hidden";
        saveButton.onclick = function() {
            var form = document.getElementById("addMealForm");
            if (!validateForm(form, "meal")) {
                return;
            }
            var saveMeal = new Meal(
                form[0].value,
                parseFloat(form[1].value).toFixed(2),
                parseFloat(form[2].value).toFixed(2),
                parseFloat(form[3].value).toFixed(2),
                parseFloat(form[4].value).toFixed(2),
                "one piece",
                form[5].value);
            globalDaysManager.addMealToDay(new Date(date),saveMeal);
            alert("Meal was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShow("dayBoard");
            deleteShow("addFromMealsBoard");
            revealPage("pageDay");
            showDay(new Date(date));
        };
    }
}
function fillAddExercise(date,id){
    revealPageSave("addExercisePage");
    var form = document.getElementById("addExerciseForm");
    var saveButton = null;
    if(id){ //fill from global exercise
        var ids = id.split("#");
        var exercise = globalExercisesManager.getExerciseByID(ids[1]);
        form[0].value = exercise.name;
        form[1].value = exercise.kcal;
        form[2].disabled = false;
        form[2].onkeyup = function(){  //counting
            var form = document.getElementById("addExerciseForm");
            var ids = id.split("#");
            var exercise = globalExercisesManager.getExerciseByID(ids[1]);
            form[1].value = exercise.kcal * this.value;
        };
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addExerciseForm");
            if (!validateForm(form, "exercise")) {
                return;
            }
            var saveExercise = new Exercise(form[0].value, form[1].value);
            globalDaysManager.addExerciseToDay(new Date(date),saveExercise);
            alert("Exercise was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShow("dayBoard");
            deleteShow("addFromExercisesBoard");
            revealPage("pageDay");
            showDay(new Date(date));
        };
    }else{ //fill from new exercise
        form[2].disabled = true;
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addExerciseForm");
            if (!validateForm(form, "exercise")) {
                return;
            }
            var saveExercise = new Exercise(form[0].value, form[1].value);
            globalDaysManager.addExerciseToDay(new Date(date),saveExercise);
            alert("Exercise was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShow("dayBoard");
            deleteShow("addFromExercisesBoard");
            revealPage("pageDay");
            showDay(new Date(date));
        };
    }
}
function validateForm(form,type){

    var isOnlyNumber = function(str){ //test if value from form is only number
        return (/^[0-9.]*$/).test(str) ;
    };

    var containsComma = function(str){ //test if value from form contains comma in the decimal number
        return str.indexOf(',') !== -1;

    };

    if(form[0].value==null||form[0].value==""){
        alert("Name must be filled!");
        return false;
    }
    if(form[0].value.length>20){
        alert("Name must have less as 20 characters!");
        return false;
    }
    if(type=="meal"){
        if((form[1].value==null||form[1].value==""||form[1].value==0)&&
            (form[2].value==null||form[2].value==""||form[2].value==0)&&
            (form[3].value==null||form[3].value==""||form[3].value==0)&&
            (form[4].value==null||form[4].value==""||form[4].value==0)
        ){
            alert("At least one item of protein, carbohydrate, fat, kcal must be filled!");
            return false;
        }
        if(containsComma(form[1].value) || containsComma(form[2].value) || containsComma(form[3].value) || containsComma(form[4].value)){
            alert("Please use a period instead of comma in the decimal numbers!");
            return false;
        }
        if(!isOnlyNumber(form[1].value)){
            alert("Protein must contains only numbers!");
            return false;
        }
        if(!isOnlyNumber(form[2].value)){
            alert("Carbohydrate must contains only numbers!");
            return false;
        }
        if(!isOnlyNumber(form[3].value)){
            alert("Fat must contains only numbers!");
            return false;
        }
        if(!isOnlyNumber(form[4].value)){
            alert("Kcal must contains only numbers!");
            return false;
        }
        var placePOD = 5;
        var placeMethod = 7;
        if(form.id == "editMealForm"){ //because 'part of day' and 'method' have other order or edit form either add form
            placePOD = 6;
            placeMethod = 5;
        }
        if(form[placeMethod].value==null||form[placeMethod].value==""){
            alert("Method must be chosen!");
            return false;
        }
        if(form[placePOD].value==null||form[placePOD].value==""){
            alert("Part of the day must be chosen!");
            return false;
        }

    }else if(type=="exercise"){
        if(form[1].value==null||form[1].value==""){
            alert("Kcal must be filled!");
            return false;
        }
        if(containsComma(form[1].value )){
            alert("Please use a period instead of comma in the decimal numbers!");
            return false;
        }
        if(!isOnlyNumber(form[1].value)){
            alert("Name must contains only numbers!");
            return false;
        }
    }else{
        console.error("form with type "+type+" is not supported");
        return false;
    }
    return true;
}