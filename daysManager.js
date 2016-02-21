/**
 * Created by mkralik on 2/17/16.
 */
var days = [];
var daysM = new DaysManager(); //TODO move to init()

function DaysManager(){

    this.sortByDataDescending = function(){
        //TODO not implemented yet
    }

    this.sortByDataAscending = function(){
        //TODO not implemented yet
    }
}

/**
 * test temp function,
 */
function showDays(){
    var results = "";
    for(var i=0;i < days.length;i++){
        results+= "<b> Day " + days[i].date +"</b><br>";
        results += "<b>Meals: </b><br>";
        for(var j=0;j<days[i].dayMeals.length;j++){
            results+=days[i].dayMeals[j];
            results+="<br>";
        }
        results += "<b>Exercises: </b><br>";
        for(j=0;j<days[i].dayExercises.length;j++){
            results+=days[i].dayExercises[j];
            results+="<br>";
        }
        results+="<hr>";
    }
    document.getElementById("showDB").innerHTML = results;
}