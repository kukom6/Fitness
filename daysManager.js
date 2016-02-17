/**
 * Created by mkralik on 2/17/16.
 */
var days = [];

function daysManager(){

    this.sortByDataDescending = function(){
        //TODO not implemented yet
    }

    this.sortByDataAscending = function(){
        //TODO not implemented yet
    }
}
var daysM = new daysManager(); //TODO move to init()

/**
 * test temp function
 */
function testDays(){
    var temp = null;
    for(var i=0;i<3;i++){
        temp = new day(new Date(1994,3,i));
        for(var j=0;j<1+i;j++){
            temp.addMeal(new meal(1+j,"meso tesco classic"+j,100+j,100+j,100+j,1000+j));
            temp.addExercise(new exercise(3+1,"beh",150+j*i));
        }
        this.days.push(temp);
    }
    showDays();
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