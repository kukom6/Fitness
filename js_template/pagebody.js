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
    revealPage(id);
}
function showGlobalMeals(){
    document.getElementById("mealsBoard").appendChild(createDayMealsTable("sort"));
}
function showGlobalExercises(){
    document.getElementById("exercisesBoard").appendChild(createDayExerciseTable("sort"));
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
function createDayTable(inDate){
    var dayDate;
    try{ //if date is string or date object
        dayDate.toLocaleString();
        dayDate=inDate;
    }catch(ex){
        dayDate=new Date(inDate);
    }
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
    tabDay.appendChild(createDayMealsTable(currentDate));
    tabDay.appendChild(createDayExerciseTable(currentDate));
    var deleteB = document.createElement("button");
    deleteB.id = date;
    deleteB.onclick = function() {
        if (confirm("Are you sure ?") == false) {
            return;
        }
        var date=this.id;
        globalDaysManager.deleteDayByDate(new Date(date));
        deleteShow("dayBoard");
        showDay(new Date(date));
    };
    deleteB.appendChild(document.createTextNode("Delete day"+date));
    tabDay.appendChild(deleteB);
    return tabDay;
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
function createDayMealsTable(day){
    var sort = false;
    if(day=="sort"){ //TODO right ?
        sort = true;
        day = false;
    }
    var manager = null;
    if(day){
        manager = day.mealsManager;
    }else{
        manager = globalMealsManager
    }
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
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalMealsManager.sortByNameFromA();
                commonSort = "desc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }else{
                globalMealsManager.sortByNameFromZ();
                commonSort = "asc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("P"));
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalMealsManager.sortByProteinAscending();
                commonSort = "desc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }else{
                globalMealsManager.sortByProteinDescending();
                commonSort = "asc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("C"));
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalMealsManager.sortByCarbohydrateAscending();
                commonSort = "desc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }else{
                globalMealsManager.sortByCarbohydrateDescending();
                commonSort = "asc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("F"));
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalMealsManager.sortByFatAscending();
                commonSort = "desc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }else{
                globalMealsManager.sortByFatDescending();
                commonSort = "asc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalMealsManager.sortByKcalAscending();
                commonSort = "desc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }else{
                globalMealsManager.sortByKcalDescending();
                commonSort = "asc";
                deleteShow("mealsBoard");
                showGlobalMeals();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Met"));
    tr.appendChild(node);
    node = document.createElement("th"); //TEMP part of day 
    node.appendChild(document.createTextNode("Part"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        if(day){
            tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        }else{
            tr.setAttribute("idMeal","GM#"+array[j].id);
        }
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
        node = document.createElement("td"); //TEMP part of day
        node.appendChild(document.createTextNode(array[j].partOfDay));
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
    node.appendChild(document.createTextNode(manager.sumProtein().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumCarbohydrate().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumFat().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(String(manager.sumKcal().toFixed(2))));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td"); //TEMP part of day
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
function createDayExerciseTable(day){
    var sort = false;
    if(day=="sort"){ //TODO right ?
        sort = true;
        day = false;
    }
    var manager = null;
    if(day){
        manager = day.exercisesManager;

    }else{
        manager = globalExercisesManager;
    }
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
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalExercisesManager.sortByNameFromA();
                commonSort = "desc";
                deleteShow("exercisesBoard");
                showGlobalExercises();
            }else{
                globalExercisesManager.sortByNameFromZ();
                commonSort = "asc";
                deleteShow("exercisesBoard");
                showGlobalExercises();
            }
        }
    }
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    if(sort){
        node.onclick = function(){
            if(commonSort=="asc"){
                globalExercisesManager.sortByKcalAscending();
                commonSort = "desc";
                deleteShow("exercisesBoard");
                showGlobalExercises();
            }else{
                globalExercisesManager.sortByKcalDescending();
                commonSort = "asc";
                deleteShow("exercisesBoard");
                showGlobalExercises();
            }
        }
    }
    tr.appendChild(node);
    thead.appendChild(tr);
    tabExercises.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){ //show all exercises in the day
        tr = document.createElement("tr");
        if(day){
            tr.setAttribute("idExercise","LE#"+day.date+"#"+array[j].id);
        }else{
            tr.setAttribute("idExercise","GE#"+array[j].id);
        }
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
    node.appendChild(document.createTextNode('-'+manager.sumKcal().toFixed(2)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}
function fillEditMeal(id){
    revealPageSave("editMealPage");
    var ids = id.split("#");
    var form = document.getElementById("editMealForm");
    var meal = null;
    if(ids[0]=="LM"){
        meal = globalDaysManager.getDayByDate(new Date(ids[1])).mealsManager.getMealByID(ids[2]);
    }else if(ids[0]=="GM"){
        meal = globalMealsManager.getMealByID(ids[1]);
    }
    form[0].value=meal.name;
    form[1].value=meal.protein;
    form[2].value=meal.carbohydrate;
    form[3].value=meal.fat;
    form[4].value=meal.kcal;
    if(meal.method=="one piece"||meal.method=="100g"){
        form[5].value=meal.method;
    }
    if(meal.partOfDay=="breakfast"||meal.partOfDay=="lunch"||meal.partOfDay=="dinner"||meal.partOfDay=="snack"){
        form[6].value=meal.partOfDay;
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
            saveMeal.method = form[5].value;
            saveMeal.partOfDay = form[6].value;
            globalDaysManager.updateMealInDay(new Date(ids[1]),saveMeal);
        }else{
            saveMeal = globalMealsManager.getMealByID(ids[1]);
            saveMeal.name = form[0].value;
            saveMeal.protein = parseFloat(form[1].value).toFixed(2);
            saveMeal.carbohydrate = parseFloat(form[2].value).toFixed(2);
            saveMeal.fat = parseFloat(form[3].value).toFixed(2);
            saveMeal.kcal = parseFloat(form[4].value).toFixed(2);
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
        if(form[5].value==null||form[5].value==""){
            alert("Method must be chosen!");
            return false;
        }
        if(form[5].value==null||form[5].value==""){
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
