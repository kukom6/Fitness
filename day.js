/**
 * Created by mkralik on 2/17/16.
 */

function day(date){
    this.date=date;
    this.dayMeals = [];
    this.dayExercises = [];

    this.addMeal = function(addM){
        this.dayMeals.push(addM);
    }

    this.addExercise = function(addE){
        this.dayExercises.push(addE);
    }
}