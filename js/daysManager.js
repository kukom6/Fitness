/**
 * Created by mkralik on 2/17/16.
 */
var days = [];
var managerD = new DaysManager(); //TODO move to init()

function DaysManager(){

    this.getDayByDate = function(date){
        console.log("getDayByDate: "+date);
        if(date==""||date==null){ //TODO correct day values
            console.log("invalid date");
            throw "invalid argument exception";
        }
        var result = this.indexMealInArrayById(date);
        if(result == -1){
            console.log("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB";
        }
        console.log("Meal : \n" + originalDay + "\n was been gotten from DB");
        return days[result]; //TODO unsafe
    };

    this.getAllDays = function() {
        console.log("getAllDays");
        return days; //TODO unsafe !!
    };

    this.addDay = function(day){

    };
    this.addMealtoDay = function(date,meal){

    };
    this.addExercisetoDay = function(date,exercise){

    };
    this.deleteMealtoDay = function(date,idMeal){

    };
    this.deleteExercisetoDay = function(date,idExercise){

    };
    this.deleteDayByDate = function(date){
        console.log("deleteDayByDate: "+date);
        var index= this.indexDayInArrayById(date);
        if(index == -1){
            console.log("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB" ;
        }
        days.splice(index,1);
        saveLocal();
        console.log("Day was deleted from DB");
    };
    this.updateDay = function(meal) {

    };
    this.isDayInDB = function(date){ //TODO correct day values
        if(date==""||date==null){
            console.log("invalid date parameter in isDayInDb");
            throw "invalid argument exception";
        }
        return this.indexMealInArrayById(date) != -1 ;
    };
    this.isEmpty = function(){
        return days.length==0;
    };

    this.indexDayInArrayById = function(date){
        return days.findIndex(function(date){
            return date==day.date;
        });
    };

    this.sortByDataDescending = function(){
        days.sort(function(day1, day2) {
            return day1.date - day2.date;
        });
    };

    this.sortByDataAscending = function(){
        days.sort(function(day1, day2) {
            return day2.date - day1.date;
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