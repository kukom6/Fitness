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
        document.getElementById("nextFreeIdMeal").innerHTML = managerM.nextMealId();
    };
    this.nextExerciseId = function(){
        document.getElementById("nextFreeIdExercise").innerHTML = managerE.nextExerciseId();
    };
    this.isMealIdInDB = function(form){
        var id = form[0].value;
        document.getElementById("freeIdMeal").innerHTML = managerM.isIdInDB(id);
        form.reset();
    };
    this.isExerciseIdInDB = function(form){
        var id = form[0].value;
        document.getElementById("freeIdExercise").innerHTML = managerE.isIdInDB(id);
        form.reset();
    };
    this.deleteMeal = function(form){
        var id = form[0].value;
        managerM.deleteMealByID(id);
        refreshShowDB();
        form.reset();
    };
    this.deleteExercise = function(form){
        var id = form[0].value;
        managerE.deleteExerciseByID(id);
        refreshShowDB();
        form.reset();
    };
}