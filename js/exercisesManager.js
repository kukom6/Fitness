/**
 * Created by mkralik on 2/14/16.
 */
var managerE = new ExercisesManager(); //TODO move to init()

function ExercisesManager(){
    var exercises = [];

    this.getExerciseByID = function(id){
        var result = this.indexExerciseInArrayById(id);
        if(result == -1){
            alert("Meal with " + id + " id is not in the DB");
            return; //TODO throw ?
        }
        return exercises[result]; //TODO unsafe !!
    };

    this.getAllExercises = function(){ //todo copy meals ?
        return exercises; //TODO unsafe !!
    };

    this.addExercise = function(exercise){
        //TODO test validation
        exercises.push(exercise); //TODO unsafe!!
        saveLocal();
    };

    this.updateExercise = function(exercise){

    };
    /**
     * Delete exercise from DB
     * @param id - exercise id
     */
    this.deleteExerciseByID = function(id){
        var index= this.indexExerciseInArrayById(id);
        if(index == -1){
            alert("exercise with " + id + " id is not in the DB");
            return; //TODO throw ?
        }
        exercises.splice(index,1);
        console.log("Exercise was deleted from DB");
        saveLocal();
    };
    /**
     * Next free ID for new exercise
     * @returns {number} - free ID
     */
    this.nextExerciseId = function(){
        this.sortByIdAscending();
        try{
            var id = parseInt(exercises[0].id);
        }catch(ex){
            return 0;
        }
        return id + 1;
    };

    /**
     * If exercise is in the DB
     * @param id - exercise id
     * @returns {boolean}
     */
    this.isIdInDB = function(id){
        return this.indexExerciseInArrayById(id) != -1 ;
    };

    /**
     * @returns {boolean} - if exercises array is empty
     */
    this.isEmpty = function(){
        return exercises.length==0;
    };

    /**
     * @param id - exercise id
     * @return index exercise in the array
     */
    this.indexExerciseInArrayById = function(id){
        return exercises.findIndex(function(exercise){
            return id==exercise.id;
        });
    };

    this.sortByIdDescending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise1.id - exercise2.id;
        });
    };
    this.sortByIdAscending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise2.id - exercise1.id;
        });
    };
    this.sortByNameFromA = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise1.name.localeCompare(exercise2.name);
        });
    };
    this.sortByNameFromZ = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise2.name.localeCompare(exercise1.name);
        });
    };
    this.sortByKcalDescending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise1.kcal - exercise2.kcal;
        });
    };
    this.sortByKcalAscending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise2.kcal - exercise1.kcal;
        });
    };
}

