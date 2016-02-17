/**
 * Created by mkralik on 2/13/16.
 */

function loadDB(){  //temp function
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
        for(var i=0;i<tempArr["meals"].length;i++){
            meals.push(new meal(tempArr["meals"][i].id,
                tempArr["meals"][i].name,
                tempArr["meals"][i].protein,
                tempArr["meals"][i].carbohydrate,
                tempArr["meals"][i].fat,
                tempArr["meals"][i].kcal));
        }
        for(i=0;i<tempArr["exercises"].length;i++){
            exercises.push(new exercise(tempArr["exercises"][i].id,
                tempArr["exercises"][i].name,
                tempArr["exercises"][i].kcal));
        }
        alert("Load DB Successful from DB file");
        document.getElementById("loadButton").disabled=true;
        document.getElementById("input").disabled=true;
        saveLocal();
    };
    reader.readAsText(jsonFiles[0]);
}
/**
 * load define DB after first start with XMLHttpRequest
 */
function loadJSON(url) { //TODO refactoring
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tempArr = JSON.parse(xmlhttp.responseText);
            for(var i=0;i<tempArr["meals"].length;i++){
                meals.push(new meal(tempArr["meals"][i].id,
                                    tempArr["meals"][i].name,
                                    tempArr["meals"][i].protein,
                                    tempArr["meals"][i].carbohydrate,
                                    tempArr["meals"][i].fat,
                                    tempArr["meals"][i].kcal));
            }
            for(i=0;i<tempArr["exercises"].length;i++){
                exercises.push(new exercise(tempArr["exercises"][i].id,
                                        tempArr["exercises"][i].name,
                                        tempArr["exercises"][i].kcal));
            }
            alert("Load DB Successful from JSON");
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
    for(var i=0;i<tempArr["meals"].length;i++){
        meals.push(new meal(tempArr["meals"][i].id,
            tempArr["meals"][i].name,
            tempArr["meals"][i].protein,
            tempArr["meals"][i].carbohydrate,
            tempArr["meals"][i].fat,
            tempArr["meals"][i].kcal));
    }
    for(i=0;i<tempArr["exercises"].length;i++){
        exercises.push(new exercise(tempArr["exercises"][i].id,
            tempArr["exercises"][i].name,
            tempArr["exercises"][i].kcal));
    }
    alert("Load DB Successful from local DB");
    if(this.meals.length==0&&this.exercises.length==0){ //DB in local storage was been empty
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
        exercises : this.exercises
    };
    var data = JSON.stringify(saveJSON);
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
        exercises : this.exercises
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