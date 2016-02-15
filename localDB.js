/**
 * Created by mkralik on 2/13/16.
 */

function localDB(){  //temp function
    load("data.json");

}

function load(url) {
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
            alert("Load DB Successful");
            document.getElementById("loadButton").disabled=true;

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveDB(){ //TODO
    var saveJSON = {
        meals : this.meals,
        exercises : this.exercises
        };
    var data = JSON.stringify(saveJSON);
    var url = 'data:text/json;charser=utf8,'+ encodeURIComponent(data);  //TODO ukladanie
    window.open(url, '_blank');
    window.focus();
}

function addDB(form){
    if(form.name=="addMeal"){
        meals.push(new meal(
            form["id"].value,
            form["nameMeal"].value,
            form["protein"].value,
            form["carbohydrate"].value,
            form["fat"].value,
            form["kcal"].value
        ));
        document.getElementById("addMealsButton").disabled=false;
    }else if(form.name=="addExercise"){
        exercises.push(new exercise(
            form["id"].value,
            form["nameExercise"].value,
            form["kcal"].value
        ));
        document.getElementById("addExerciseButton").disabled=false;
    }else{
        alert("Unknown input");
        form.reset();
        return;
    }
    form.reset();
    refreshShowDB();
}

function showAllDB(){
    if(meals.length==0 && exercises.length==0){
        alert("DB is empty");
        document.getElementById("showButton").disabled=false;
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

function refreshShowDB(){
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
}