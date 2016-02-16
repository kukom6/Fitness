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
        alert("local storage not found"); //TODO
    }
}

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
    document.getElementById("loadButton").disabled=true;
}

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
            saveLocal();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveLocal(){
    var saveJSON = {
        meals : this.meals,
        exercises : this.exercises
    };
    var data = JSON.stringify(saveJSON);
    localStorage.setItem('jsonData',data);
    localStorage.setItem('isInLocal',true);
    alert("DB was saved");

}

function saveJSON(){ //TODO download file
    var saveJSON = {
        meals : this.meals,
        exercises : this.exercises
        };
    var data = JSON.stringify(saveJSON);
    var url = 'data:text/json;charser=utf8,'+ encodeURIComponent(data);  //TODO ukladanie
    window.open(url, '_blank');
    window.focus();
}

function deleteLocal(){
    if (confirm("Delete local storage! Make sure that you download DB!") == true) {
        alert("Local storage was deleted. App will be reload");
        localStorage.clear();
        location.reload();
    } else {
        return;
    }
}

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

function showAllDB(){
    if(meals.length==0 && exercises.length==0){
        alert("DB is empty");
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