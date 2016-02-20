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
 * add value to DB with form
 * @param mode - type of value
 */
function addDB(mode){  //TODO way of forms ???
    if(mode=="meal"){
        meals.push(new meal(
            document.forms["addMeal"][0].value,
            document.forms["addMeal"][1].value,
            document.forms["addMeal"][2].value,
            document.forms["addMeal"][3].value,
            document.forms["addMeal"][4].value,
            document.forms["addMeal"][5].value
    ));
        document.getElementById("addMealsButton").disabled=false;  //TODO 2.button 2.way
    }else if(mode=="exercise"){
        exercises.push(new exercise(
            document.forms[0]["id"].value,
            document.forms[1]["nameExercise"].value,
            document.forms[2]["kcal"].value
        ));
        document.getElementById("addExerciseButton").disabled=false; //TODO 2.button 2.way
    }else{
        alert("Unknown input");
        return;
    }
    refreshShowDB();
    saveLocal();
}

/**
 * show all db as table
 */
function showAllDB(){
    if(meals.length==0 && exercises.length==0){
        alert("DB is empty, nothing to show");
        return;
    }
    /*
    var results = "";
    results+="<h1>MEALS</h1>";
    for(var i=0;i<meals.length;i++){
        results +=meals[i] + "<br>";
    }

    results+="<h1>EXERCISES</h1>";
    for(i=0;i<exercises.length;i++){
        results +=exercises[i] + "<br>";
    }
    document.getElementById("showDB").innerHTML = results;*/
    var tabMeals = document.getElementById("meals");
    var tr,node;
    for(var i=0;i<meals.length;i++){
        tr = document.createElement("tr");
        tabMeals.appendChild(tr);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].id));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].protein));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].carbohydrate));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].fat));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(meals[i].kcal));
        tr.appendChild(node);
    }
    var tabExercises = document.getElementById("exercises");
    for(i=0;i<exercises.length;i++){
        tr = document.createElement("tr");
        tabExercises.appendChild(tr);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(exercises[i].id));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(exercises[i].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(exercises[i].kcal));
        tr.appendChild(node);
    }
}

/**
 * refresh table.
 * (remove table elements and call showAllDB function
 */
function refreshShowDB(){  // TODO right? delete and show ?
    var tabMeals = document.getElementById("headMe");
    var temp=tabMeals.nextSibling;
    for(;temp!=null;temp=tabMeals.nextSibling){
        temp.remove();
    }
    var tabExercises = document.getElementById("headEx");
    temp=tabExercises.nextSibling;
    for(;temp!=null;temp=tabExercises.nextSibling){
        temp.remove();
    }
    showAllDB();
    document.getElementById("refreshButton").disabled=false;
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
            data = new meal(100,"meso tesco classic",100,100,100,1000);
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
 * Parsing JSON to the local objects
 * @param tempArr - parse JSON
 * @returns {boolean}
 */
function parseJSONtoLocal(tempArr){
    if(tempArr == null){
        return false;
    }
    for(var i=0;i<tempArr["meals"].length;i++){ //load meals
        meals.push(new meal(tempArr["meals"][i].id,
            tempArr["meals"][i].name,
            tempArr["meals"][i].protein,
            tempArr["meals"][i].carbohydrate,
            tempArr["meals"][i].fat,
            tempArr["meals"][i].kcal));
    }
    for(i=0;i<tempArr["exercises"].length;i++){ //load exercises
        exercises.push(new exercise(tempArr["exercises"][i].id,
            tempArr["exercises"][i].name,
            tempArr["exercises"][i].kcal));
    }
    var saveDay = [];
    var specificDay = []; // helpful variable
    for(i=0;i<tempArr["days"].length;i++){  //load days with days and exercises
        specificDay = tempArr["days"][i]; // clarifications code
        saveDay = new day(specificDay["date"]);
        for(var j=0;j<specificDay["dayMeals"].length;j++){
            saveDay.addMeal(new meal(specificDay["dayMeals"][j].id,
                specificDay["dayMeals"][j].name,
                specificDay["dayMeals"][j].protein,
                specificDay["dayMeals"][j].carbohydrate,
                specificDay["dayMeals"][j].fat,
                specificDay["dayMeals"][j].kcal));
        }
        for(j=0;j<specificDay["dayExercises"].length;j++){
            saveDay.addExercise(new exercise(specificDay["dayExercises"][j].id,
                specificDay["dayExercises"][j].name,
                specificDay["dayExercises"][j].kcal));
        }
        days.push(saveDay);
    }
    return true;
}
