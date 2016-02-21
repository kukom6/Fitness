/**
 * Created by mkralik on 2/13/16.
 */

function loadDB(){  //TODO temp function
    if (storageAvailable('localStorage')) {
        if(localStorage.getItem('isInLocal')){
            loadLocal();
        }else{ //first start
            loadJSON("data.json");
        }
        showAllDB();
    }else {
        alert("local storage is not supported, please update your browser."); //TODO
    }
}
/**
 * load DB from upload file, next time data will be on the local storage
 * @param jsonFiles
 */
function loadJSONasFile(jsonFiles){
    //TODO test na validitu suboru jsonFils[0]
    var reader = new FileReader();
    reader.onload = function(event) {
        var tempArr = JSON.parse(event.target.result);
        if(!parseJSONtoLocal(tempArr)){
            alert("DB unsuccessfully load from uploaded file");
            return; //TODO exception?
        }
        alert("DB was successfully loaded from uploaded file");
        document.getElementById("loadButton").disabled=true;
        document.getElementById("input").disabled=true;
        saveLocal();
        refreshShowDB();
    };
    reader.readAsText(jsonFiles[0]);
}
/**
 * load define DB after first start with XMLHttpRequest
 */
function loadJSON(url) { //TODO refactoring, temp function, will delete from aplication
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tempArr = JSON.parse(xmlhttp.responseText);
            if(!parseJSONtoLocal(tempArr)){
                alert("DB unsuccessfully load from JSON");
                return; //TODO exception?
            }
            alert("DB was successfully loaded from JSON");
            document.getElementById("loadButton").disabled=true;
            document.getElementById("input").disabled=true;
            saveLocal();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/**
 * Load from local storage
 */
function loadLocal(){
    var data = localStorage.getItem('jsonData');
    var tempArr = JSON.parse(data);
    if(!parseJSONtoLocal(tempArr)){
        alert("DB unsuccessfully loaded from local DB");
        return; //TODO exception?
    }
    alert("DB was successfully loaded from local DB");
    if(this.meals.length==0&&this.exercises.length==0&&this.days.length==0){ //DB in local storage was been empty
        alert("DB is empty!");
        document.getElementById("loadButton").disabled=false;
        return;
    }
    document.getElementById("loadButton").disabled=true;
    document.getElementById("input").disabled=true;
}

/**
 * Save DB(changed) to local storage
 */
function saveLocal(){
    if(this.meals.length==0&&this.exercises.length==0){
        alert("DB is empty! DB wil not save");
        return;
    }
    var saveJSON = {
        meals : this.meals,
        exercises : this.exercises,
        days : this.days
    };
    var data = JSON.stringify(saveJSON);   //TODO save as only one a JSON type or each of them as a separated JSON type (meals,exercises,days)?
    localStorage.setItem('jsonData',data);
    localStorage.setItem('isInLocal',true);
    alert("DB was saved");
}

/**
 * Export DB to JSON file
 */
function saveJSON(){ //TODO download file, right way ?
    var saveJSON = {
        meals : this.meals,
        exercises : this.exercises,
        days : this.days
        };
    var data = 'data:text/json;charser=utf8,'+ encodeURIComponent(JSON.stringify(saveJSON));  //TODO ukladanie
    var a = document.createElement('a');
    a.href = data;
    a.download = 'data.json';
    document.getElementById("downloadVisible").appendChild(a); //TODO chrome vs. the others
    a.click();
}

/**
 * delete DB in the local storage
 */
function deleteLocal(){
    if (confirm("Delete local storage! Make sure that you download DB!") == true) {
        alert("Local storage was deleted. App will be reload");
        localStorage.clear();
        location.reload();
    }
}

/**
 * Parsing JSON to the local objects
 * @param tempArr - parse JSON
 * @returns {boolean}
 */
function parseJSONtoLocal(tempArr){
    if(tempArr == null){
        return false;
    }
    for(var i=0;i<tempArr["meals"].length;i++){ //load meals
        meals.push(new Meal(tempArr["meals"][i].id,
            tempArr["meals"][i].name,
            tempArr["meals"][i].protein,
            tempArr["meals"][i].carbohydrate,
            tempArr["meals"][i].fat,
            tempArr["meals"][i].kcal));
    }
    for(i=0;i<tempArr["exercises"].length;i++){ //load exercises
        exercises.push(new Exercise(tempArr["exercises"][i].id,
            tempArr["exercises"][i].name,
            tempArr["exercises"][i].kcal));
    }
    var saveDay = [];
    var specificDay = []; // helpful variable
    for(i=0;i<tempArr["days"].length;i++){  //load days with days and exercises
        specificDay = tempArr["days"][i]; // clarifications code
        saveDay = new Day(new Date(specificDay["date"]));
        for(var j=0;j<specificDay["dayMeals"].length;j++){
            saveDay.addMeal(new Meal(specificDay["dayMeals"][j].id,
                specificDay["dayMeals"][j].name,
                specificDay["dayMeals"][j].protein,
                specificDay["dayMeals"][j].carbohydrate,
                specificDay["dayMeals"][j].fat,
                specificDay["dayMeals"][j].kcal));
        }
        for(j=0;j<specificDay["dayExercises"].length;j++){
            saveDay.addExercise(new Exercise(specificDay["dayExercises"][j].id,
                specificDay["dayExercises"][j].name,
                specificDay["dayExercises"][j].kcal));
        }
        days.push(saveDay);
    }
    return true;
}

/**
 * test if web browser supported local storage
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

/**
 * Test how many items will fit into the local storage
 * (don't forget to delete the database after test!)
 */
function storageTest(){
    var data = null;
    var count = 0;
    while(true) {
        try {
            data = new Meal(100,"meso tesco classic",100,100,100,1000);
            localStorage.setItem('TEST'+count,data);
            count++;
        } catch (e) {
            alert("Plna pamet! Pocet zaznamov: " +count+"\n " +
                "(meal(100,\"meso tesco classic\",100,100,100,1000)) \n" +
                "pocet dni v DB pri 100 miestnej databaze cvikov a jedal s priemerom 15 jedal na den: " + ((count/15) - 100) + " dni.");
            break;
        }
    }
    if (confirm("Clear storage?") == true) {
        localStorage.clear();
    }
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
function addToDB(mode,form){  //TODO way of forms ???
    if(mode=="meal"){
        meals.push(new Meal(
            form[0].value,
            form[1].value,
            form[2].value,
            form[3].value,
            form[4].value,
            form[5].value
        ));
    }else if(mode=="exercise"){
        exercises.push(new Exercise(
            form[0].value,
            form[1].value,
            form[2].value
        ));
    }
    refreshShowDB();
    saveLocal();
}

/** TODO do it
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
    var tmp = new Date(date);
    //TODO get day by date , if it not exist create new
    var newDay = new Day(tmp);
    if(mode=="meal"){
        newDay.addMeal(new Meal(
            form[0].value,
            form[1].value,
            form[2].value,
            form[3].value,
            form[4].value,
            form[5].value
        ));
    }else if(mode=="exercise"){
        newDay.addExercise(new Exercise(
            form[0].value,
            form[1].value,
            form[2].value
        ));
    }
    days.push(newDay);
    refreshShowDB();
    saveLocal();
}
