/**
 * Created by mkralik on 2/17/16.
 */

/**
 * Type of day
 * @param date - date of day
 * @constructor
 */
function Day(date){
    this.date=date;
    this.dayMeals = [];
    this.dayExercises = [];

    this.addMeal = function(addM){
        this.dayMeals.push(addM);
    };

    this.addExercise = function(addE){
        this.dayExercises.push(addE);
    };
    /**
     * delede meal by id ( order )
     * @param id
     */
    this.deleteMeal = function(id){
        console.log("deleteMealById: "+id +" from day: "+this.date);
        var index= this.indexMealInDay(id);
        if(index == -1){
            console.log("Meal with " + id + " date is not in the day "+this.date);
            throw "Meal with " + id + " date is not in the day "+this.date ;
        }
        this.dayMeals.splice(index,1);
        saveLocal();
        console.log("Meal was deleted from the day");
    };
    /**
     * delede exercise by id ( order )
     * @param id
     */
    this.deleteExercise = function(id){
        console.log("deleteExerciseById: "+id+" from day: "+this.date);
        var index= this.indexExerciseInDay(id);
        if(index == -1){
            console.log("Exercise with " + id + " date is not in the day "+this.date);
            throw "Exercise with " + id + " date is not in the day "+this.date ;
        }
        this.dayExercises.splice(index,1);
        saveLocal();
        console.log("Exercise was deleted from the day");
    };
    this.nextMealId = function(){
        for(var i=0;i<=this.dayMeals.length;i++){
            if(!this.isMealIdInDay(i+1)){
                return i+1;
            }
        }
    };
    this.nextExerciseId = function(){
        for(var i=0;i<=this.dayExercises.length;i++){
            if(!this.isExerciseIdInDay(i+1)){
                return i+1;
            }
        }
    };
    this.isMealIdInDay = function(id){
        if(id==""||id==null){
            console.log("invalid ID in isIdInDb");
            throw "invalid argument exception";
        }
        return this.indexMealInDay(id) != -1 ;
    };
    this.isExerciseIdInDay = function(id){
        if(id==""||id==null){
            console.log("invalid ID in isIdInDb");
            throw "invalid argument exception";
        }
        return this.indexExerciseInDay(id) != -1 ;
    };
    this.isMealsEmpty = function(){
        return this.dayMeals.length==0;
    };
    this.isExercisesEmpty = function(){
        return this.dayExercises.length==0;
    };
    //private
    this.indexMealInDay = function(id){
        return this.dayMeals.findIndex(function(meal){
            return id==meal.id;
        });
    };
    //private
    this.indexExerciseInDay = function(id){
        return this.dayExercises.findIndex(function(exercise){
            return id==exercise.id;
        });
    };

    this.toString = function () {
        var result = "";
        result += "Den " +this.date.toLocaleString()+ ":\n";
        result += "Meals: \n";
        for(var j=0;j<this.dayMeals.length;j++){
            result+=this.dayMeals[j];
            result+="\n";
        }
        result += "Exercises: \n";
        for(j=0;j<this.dayExercises.length;j++){
            result+=this.dayExercises[j];
            result+="\n";
        }
        return result;
    }
}