/**
 * Created by mkralik on 2/17/16.
 */
var globalDaysManager = new DaysManager(); //TODO move to init()

function DaysManager(){
    var days = [];
    this.addDay = function(day){
        if(this.isDayInDB(day.date)){
            console.error("date is already in db, please update exist day");
            throw "date is already in db, please update exist day";
        }
        days.push(day); //TODO validacia
        saveLocal();
        console.log("Day: "+day.date+" was added to DB");
    };
    this.addMealToDay = function(date, meal){
        if(date==""||date==null){ //TODO validation meal is in the meals manager??
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.mealsManager.addMeal(meal);
        console.log("Meal: "+meal+" was added to day: "+day.date.toDateString());
    };
    this.addExerciseToDay = function(date, exercise){
        if(date==""||date==null){ //TODO validation exercise is in the exercises manager??
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.exercisesManager.addExercise(exercise);
        console.log("Exercise: "+exercise+" was added to day: "+day.date.toDateString());
    };
    this.getDayByDate = function(date){
        console.log("getDayByDate: "+date);
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var result = this.indexDayInArrayById(date);
        if(result == -1){
            console.error("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB";
        }
        console.log("Day : \n" + date.toDateString() + "\n was been gotten from DB");
        return days[result]; //TODO unsafe
    };
    this.getAllDays = function() {
        console.log("getAllDays");
        return days; //TODO unsafe !!
    };
    this.deleteMealInDay = function(date,idMeal){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.mealsManager.deleteMealByID(idMeal);
        console.log("Meal was deleted from day: "+day.date.toDateString());
    };
    this.deleteExerciseInDay = function(date,idExercise){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.exercisesManager.deleteExerciseByID(idExercise);
        console.log("Exercise was deleted from day: "+day.date.toDateString());
    };
    this.deleteDayByDate = function(date){
        console.log("deleteDayByDate: "+date);
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var index= this.indexDayInArrayById(date);
        if(index == -1){
            console.error("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB" ;
        }
        days.splice(index,1);
        saveLocal();
        console.log("Day was deleted from DB");
    };
    this.isDayInDB = function(date){ //TODO correct day values
        if(date==""||date==null){
            console.error("invalid date parameter in isDayInDb");
            throw "invalid argument exception";
        }
        return this.indexDayInArrayById(date) != -1 ;
    };
    this.isEmpty = function(){
        return days.length==0;
    };
    this.indexDayInArrayById = function(date){
        return days.findIndex(function(day){
            return date.toDateString()==day.date.toDateString(); //TODO how compare date ???
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
    var allMeals,allExercises;
    for(var i=0;i < days.length;i++){
        results+= "<b> Day " + days[i].date +"</b><br>";
        results += "<b>Meals: </b><br>";
        allMeals=days[i].mealsManager.getAllMeals();
        for(var j=0;j<allMeals.length;j++){
            results+=allMeals[j];
            results+="<br>";
        }
        results += "<b>Exercises: </b><br>";
        allExercises=days[i].exercisesManager.getAllExercises();
        for(j=0;j<allExercises.length;j++){
            results+=allExercises[j];
            results+="<br>";
        }
        results+="<hr>";
    }
    document.getElementById("showDB").innerHTML = results;
}