/**
 * Created by mkralik on 2/21/16.
 */
var testFactory = new TestFunction();


/**
 * Class for test function , temp file
 * @constructor
 */
function TestFunction(){
    this.nextMealId = function(){
        document.getElementById("nextFreeIdMeal").innerHTML = globalMealsManager.nextMealId();
    };
    this.nextExerciseId = function(){
        document.getElementById("nextFreeIdExercise").innerHTML = globalExercisesManager.nextExerciseId();
    };
    this.isMealIdInDB = function(form){
        var id = form[0].value;
        document.getElementById("freeIdMeal").innerHTML = globalMealsManager.isIdInDB(id);
        form.reset();
    };
    this.isExerciseIdInDB = function(form){
        var id = form[0].value;
        document.getElementById("freeIdExercise").innerHTML = globalExercisesManager.isIdInDB(id);
        form.reset();
    };
    this.deleteMeal = function(form){
        var id = form[0].value;
        globalMealsManager.deleteMealByID(id);
        refreshShowDB();
        form.reset();
    };
    this.deleteExercise = function(form){
        var id = form[0].value;
        globalExercisesManager.deleteExerciseByID(id);
        refreshShowDB();
        form.reset();
    };
}