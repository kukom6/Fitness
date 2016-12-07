/**
 * Fill form for edit meal
 * @param homePage - if is true,form will be on homePage
 * @param id - id edited meal, id contains more string separate by #
 * First string is controls (how manager will be use):
 * GM - meal from global manager  For example : id = GM#[id]
 * LM - meal from manager from particular date For example = LM#[date]#[id] 
 */
function fillEditMeal(homePage,id) {
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
    form[5].onclick = function () {
        var form = document.getElementById("editMealForm");
        form[4].value= parseFloat(form[1].value*4 + form[2].value*4 + form[3].value*9).toFixed(1);
        return false; //because after true web page will be reloaded
    };
    if (ids[0] == "LM") {
        form[6].value = meal.method;
        form[6].disabled = true;
        form[7].style.visibility = "visible";
        form[7].disabled = false;
        form[7].value = meal.partOfDay;
    }else{
        form[6].disabled = false;
        form[6].value = meal.method;
        form[7].style.visibility = "hidden";
        form[7].disabled = true;
    }
    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if(device.platform!="windows"){
            if (confirm("Delete meal. Are you sure ?") == false) {
                return;
            }
        }
        if(ids[0]=="LM"){
            globalDaysManager.deleteMealInDay(new Date(ids[1]),ids[2]);
        }else{
            globalMealsManager.deleteMealByID(ids[1]);
        }
        if(ids[0]=="LM"){
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                showDay(new Date(ids[1]));
            }
        }else{
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
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
            saveMeal.partOfDay = form[7].value;
            globalDaysManager.updateMealInDay(new Date(ids[1]),saveMeal);
        }else{
            saveMeal = globalMealsManager.getMealByID(ids[1]);
            saveMeal.name = form[0].value;
            saveMeal.protein = parseFloat(form[1].value).toFixed(2);
            saveMeal.carbohydrate = parseFloat(form[2].value).toFixed(2);
            saveMeal.fat = parseFloat(form[3].value).toFixed(2);
            saveMeal.kcal = parseFloat(form[4].value).toFixed(2);
            saveMeal.method = form[6].value;
            saveMeal.partOfDay = form[7].value;
            globalMealsManager.updateMeal(saveMeal);
        }
        alert("Meal was been updated");
        form.reset();
        if(ids[0]=="LM"){
            if(homePage){
                deleteShowTable("homeBoard");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                showDay(new Date(ids[1]));
            }
        }else{
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
        revealPage(previousPages.pop());
    };
}
/**
 * Fill form for edit exercise
 * @param homePage - if is true,form will be on homePage
 * @param id - id edited exercise, id contains more string separate by #
 * First string is controls (how manager will be use):
 * GE - exercise from global manager  For example : id = GE#[id]
 * LE - exercise from manager from particular date For example = LE#[date]#[id]
 */
function fillEditExercise(homePage,id){
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
        if(device.platform!="windows"){
            if (confirm("Delete exercise. Are you sure ?") == false) {
                return;
            }
        }
        if(ids[0]=="LE"){
            globalDaysManager.deleteExerciseInDay(new Date(ids[1]),ids[2]);
        }else{
            globalExercisesManager.deleteExerciseByID(ids[1]);
        }
        if(ids[0]=="LE"){
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                showDay(new Date(ids[1]));
            }
        }else{
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
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
        alert("Exercise was been updated");
        form.reset();
        if(ids[0]=="LE"){
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                showDay(new Date(ids[1]));
            }
        }else{
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
        }
        revealPage(previousPages.pop());
    };
}
/**
 * Fill form for add meal, parameters determine how way of form will be use 
 * @param homePage - if is true,form will be on homePage
 * @param date optional, when new meal will be added to the particular day (date parameter) , id mustn't be set
 * @param id optional, when meal will be added from the global manager to the particular day (date parameter) , date must be set
 * when function haven't any parameters, new meal will be added to the global manager
 */
function fillAddMeal(homePage,date,id){

    var saveButton,form = null;
    if(id){ //fill from global meal
        revealPageSave("addMealFromGlobalPage");
        form = document.getElementById("addMealFromGlobalForm");
        var ids = id.split("#");
        var meal = globalMealsManager.getMealByID(ids[1]);
        form[0].disabled = true;
        form[0].value = meal.name;
        form[1].disabled = true;
        form[1].value = meal.protein;
        form[2].disabled = true;
        form[2].value = meal.carbohydrate;
        form[3].disabled = true;
        form[3].value = meal.fat;
        form[4].disabled = true;
        form[4].value = meal.kcal;
        form[5].disabled = true;
        form[5].onclick = function () {
            var form = document.getElementById("addMealFromGlobalForm");
            form[4].value= parseFloat(form[1].value*4 + form[2].value*4 + form[3].value*9).toFixed(1);
            return false; //because after true web page will be reloaded
        };
        form[6].onclick = function () {
            form[0].disabled = false;
            form[1].disabled = false;
            form[2].disabled = false;
            form[3].disabled = false;
            form[4].disabled = false;
            form[5].disabled = false;
            return false; //because after true web page will be reloaded
        };
        form[7].value = meal.partOfDay;
        form[8].onkeyup = function(){  //counting
            var form = document.getElementById("addMealFromGlobalForm");
            var ids = id.split("#");
            var meal = globalMealsManager.getMealByID(ids[1]);
            form[1].value = parseFloat(meal.protein * this.value).toFixed(1);
            form[2].value = parseFloat(meal.carbohydrate * this.value).toFixed(1);
            form[3].value = parseFloat(meal.fat * this.value).toFixed(1);
            form[4].value = parseFloat(meal.kcal * this.value).toFixed(1);
        };
        form[9].value = meal.method;
        form[9].disabled = true;
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addMealFromGlobalForm");
            if (!validateForm(form, "meal")) {
                return;
            }
            var saveMeal = new Meal(
                form[0].value,
                parseFloat(form[1].value).toFixed(1),
                parseFloat(form[2].value).toFixed(1),
                parseFloat(form[3].value).toFixed(1),
                parseFloat(form[4].value).toFixed(1),
                form[9].value,
                form[7].value);
            globalDaysManager.addMealToDay(new Date(date),saveMeal);
            alert("Meal was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShowTable("addFromMealsBoard");
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                revealPage("pageDay");
                showDay(new Date(date));
            }
        };
    }else if(date){ 
        revealPageSave("addNewMealPage");
        saveButton = document.getElementById("saveButton");
        form = document.getElementById("addNewMealForm");
        form[5].onclick = function () {
            var form = document.getElementById("addNewMealForm");
            form[4].value= parseFloat(form[1].value*4 + form[2].value*4 + form[3].value*9).toFixed(1);
            return false; //because after true web page will be reloaded
        };
        saveButton.onclick = function() {
            var form = document.getElementById("addNewMealForm");
            if (!validateForm(form, "meal")) {
                return;
            }
            var saveMeal = new Meal(
                form[0].value,
                parseFloat(form[1].value).toFixed(1),
                parseFloat(form[2].value).toFixed(1),
                parseFloat(form[3].value).toFixed(1),
                parseFloat(form[4].value).toFixed(1),
                "one piece",
                form[6].value);
            globalDaysManager.addMealToDay(new Date(date),saveMeal);
            alert("Meal was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShowTable("addFromMealsBoard");
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                revealPage("pageDay");
                showDay(new Date(date));
            }
        };
    }else{ 
        revealPageSave("addNewMealToGlobalPage");
        form = document.getElementById("addNewMealToGlobalForm");
        form[5].onclick = function () {
            var form = document.getElementById("addNewMealToGlobalForm");
            form[4].value= parseFloat(form[1].value*4 + form[2].value*4 + form[3].value*9).toFixed(1);
            return false; //because after true web page will be reloaded
        };
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addNewMealToGlobalForm");
            if (!validateForm(form, "meal")) {
                return;
            }
            var saveMeal = new Meal(
                form[0].value,
                parseFloat(form[1].value).toFixed(1),
                parseFloat(form[2].value).toFixed(1),
                parseFloat(form[3].value).toFixed(1),
                parseFloat(form[4].value).toFixed(1),
                form[6].value);
            globalMealsManager.addMeal(saveMeal);
            alert("Meal was been added!");
            form.reset();
            previousPages.pop();
            deleteShowTable("mealsBoard");
            revealPage("pageMeals");
            showGlobalMeals(homePage);
        };
    }
}
/**
 * Fill form for add exercise, parameters determine how way of form will be use 
 * @param homePage - if is true,form will be on homePage
 * @param date optional, when new exercise will be added to the particular day (date parameter) , id mustn't be set
 * @param id optional, when exercise will be added from the global manager to the particular day (date parameter) , date must be set
 * when function haven't any parameters, new exercise will be added to the global manager
 */
function fillAddExercise(homePage,date,id){
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
            form[1].value = parseFloat(exercise.kcal * this.value).toFixed(1);
        };
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addExerciseForm");
            if (!validateForm(form, "exercise")) {
                return;
            }
            var saveExercise = new Exercise(form[0].value, parseFloat(form[1].value).toFixed(1));
            globalDaysManager.addExerciseToDay(new Date(date),saveExercise);
            alert("Exercise was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShowTable("addFromExercisesBoard");
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                revealPage("pageDay");
                showDay(new Date(date));
            }
        };
    }else if(date){ //fill from new exercise
        form[2].disabled = true;
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addExerciseForm");
            if (!validateForm(form, "exercise")) {
                return;
            }
            var saveExercise = new Exercise(form[0].value, parseFloat(form[1].value).toFixed(1));
            globalDaysManager.addExerciseToDay(new Date(date),saveExercise);
            alert("Exercise was been added!");
            form.reset();
            previousPages.pop();
            previousPages.pop();
            deleteShowTable("addFromExercisesBoard");
            if(homePage){
                deleteShowTable("homeBoard");
                revealPage("homePage");
                showHomepage();
            }else{
                deleteShowTable("dayBoard");
                revealPage("pageDay");
                showDay(new Date(date));
            }
        };
    }else{ //fill to the global
        form[2].disabled = true;
        saveButton = document.getElementById("saveButton");
        saveButton.onclick = function() {
            var form = document.getElementById("addExerciseForm");
            if (!validateForm(form, "exercise")) {
                return;
            }
            var saveExercise = new Exercise(form[0].value, parseFloat(form[1].value).toFixed(1));
            globalExercisesManager.addExercise(saveExercise);
            alert("Exercise was been added!");
            form.reset();
            previousPages.pop();
            deleteShowTable("exercisesBoard");
            revealPage("pageExercises");
            showGlobalExercises(homePage);
        };
    }
}
/**
 * Validate form if all parameters are set correctly
 * @param form - HTML form
 * @param type - type of form (meal or exercise)
 * @returns {boolean}
 */
function validateForm(form,type){
    var isOnlyNumber = function(str){ //test if value from form is only number
        return (/^[0-9.]*$/).test(str) ;
    };
    var containsComma = function(str){ 
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
        // which form it is ? ( because add meal have 3 types of from
        if(form.id=="addNewMealToGlobalForm"){
            if(form[6].value==null||form[6].value==""){
                alert("Method must be chosen!");
                return false;
            }
        }else if(form.id=="addMealFromGlobalForm"){
            if(form[7].value==null||form[7].value==""){
                alert("Part of the day must be chosen!");
                return false;
            }
            if(form[9].value==null||form[9].value==""){
                alert("Method must be chosen!");
                return false;
            }
        }else if(form.id=="addNewMealForm"){
            if(form[6].value==null||form[6].value==""){
                alert("Part of the day must be chosen!");
                return false;
            }
        }else{
            if(form[7].value==null||form[7].value==""){
                alert("Part of the day must be chosen!");
                return false;
            }
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
/**
 * Fill form for restriction
 * @param homePage - if is true,form will be on homePage
 * @param date
 */
function fillEditRestriction(homePage,date){
    revealPageSave("editRestrictionPage");

    var form = document.getElementById("editRestrictionForm");
    var restriction = globalDaysManager.getDayByDate(new Date(date)).restriction;
    if(restriction==null){
        restriction = new Restriction(null,null,null,null);
    }
    form[0].value=restriction.protein;
    form[1].value=restriction.carbohydrate;
    form[2].value=restriction.fat;
    form[3].value=restriction.kcal;

    var toolbarButton = document.getElementById("deleteIconEdit");
    toolbarButton.onclick = function(){
        if(device.platform!="windows"){
            if (confirm("Reset restriction. Are you sure ?") == false) {
                return;
            }
        }
        globalDaysManager.deleteRestriction(new Date(date));
        if(homePage){
            deleteShowTable("homeBoard");
            revealPage("homePage");
            showHomepage();
        }else{
            deleteShowTable("dayBoard");
            showDay(new Date(date));
        }
        revealPage(previousPages.pop());
    };
    toolbarButton = document.getElementById("updateIconEdit");
    toolbarButton.onclick = function(){
        var form = document.getElementById("editRestrictionForm");
        if(!validateFormRestriction(form)){
            return;
        }
        globalDaysManager.addRestrictionToDay(new Date(date),new Restriction(parseFloat(form[0].value).toFixed(2),
                    parseFloat(form[1].value).toFixed(2),
                    parseFloat(form[2].value).toFixed(2),
                    parseFloat(form[3].value).toFixed(2)));
        alert("Restriction was been updated");
        form.reset();
        if(homePage){
            deleteShowTable("homeBoard");
            revealPage("homePage");
            showHomepage();
        }else{
            deleteShowTable("dayBoard");
            showDay(new Date(date));
        }
        revealPage(previousPages.pop());
    };
}
/**
 * Validate form for restriction
 * @param form
 * @returns {boolean}
 */
function validateFormRestriction(form){
    var isOnlyNumber = function(str){ //test if value from form is only number
        return (/^[0-9.]*$/).test(str) ;
    };
    var containsComma = function(str){
        return str.indexOf(',') !== -1;

    };
    if(containsComma(form[0].value) || containsComma(form[1].value) || containsComma(form[2].value) || containsComma(form[3].value)){
        alert("Please use a period instead of comma in the decimal numbers!");
        return false;
    }
    if(!isOnlyNumber(form[0].value)&&form[0].value!=null&&form[0].value!=""){
        alert("Protein must contains only numbers or empty value");
        return false;
    }
    if(!isOnlyNumber(form[1].value)&&form[1].value!=null&&form[1].value!=""){
        alert("Carbohydrate must contains only numbers or empty value");
        return false;
    }
    if(!isOnlyNumber(form[2].value)&&form[2].value!=null&&form[2].value!=""){
        alert("Fat must contains only numbers or empty value");
        return false;
    }
    if(!isOnlyNumber(form[3].value)&&form[3].value!=null&&form[3].value!=""){
        alert("Kcal must contains only numbers or empty value");
        return false;
    }
    return true;
}