/**
 * Created by mkralik on 2/17/16.
 */
var days = [];
var managerD = new DaysManager(); //TODO move to init()

function DaysManager(){

    this.sortByDataDescending = function(){
        days.sort(function(day1, day2) {
            return day1.date - day2.date;
        });
    };

    this.sortByDataAscending = function(){
        days.sort(function(day1, day2) {
            return day2.date - day1.date;      //TODO new Date(day2.date) - new Date(day1.date); ? equals ?
        });
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