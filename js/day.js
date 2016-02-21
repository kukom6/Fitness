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