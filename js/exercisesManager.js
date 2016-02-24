/**
 * Created by mkralik on 2/14/16.
 */
var managerE = new ExercisesManager(); //TODO move to init()

function ExercisesManager(){
    var exercises = [];
    /**
     * Get exercise by ID form DB
     * @param id - exercise id
     * @returns {Exercise} - return new copy exercise from DB
     */
    this.getExerciseByID = function(id){
        console.log("getExerciseById: "+id);
        if(id==""||id==null){
            console.log("invalid ID");
            throw "invalid argument exception";
        }
        var result = this.indexExerciseInArrayById(id);
        if(result == -1){
            console.log("Exercise with " + id + " id is not in the DB");
            throw "Exercise with " + id + " id is not in the DB";
        }
        var originalExercise = exercises[result];
        console.log("Exercise : \n" + originalExercise + "\n was been gotten from DB");
        return new Exercise(originalExercise.id,originalExercise.name,originalExercise.kcal);
        //       return exercises[result]; //unsafe ?? !!
    };
    /**
     * Get all exercises from DB
     * @returns {Array} - array exercises from DB
     */
    this.getAllExercises = function(){
        console.log("getAllExercises");
        return exercises; //TODO unsafe !!
    };
    /**
     * add exercise to the db (create new exercise object)
     * @param exercise
     */
    this.addExercise = function(exercise){
        console.log("addExercise" + exercise);
        if(!this.correctArgument(exercise)||this.isIdInDB(exercise.id)){
            throw "invalid argument exception";
        }
        var pushExercise = new Exercise(exercise.id,exercise.name,exercise.kcal); //safe ?
        exercises.push(pushExercise);
        saveLocal();
        console.log("Exercise : \n" + exercise + "\n was been added to DB");
    };
    /**
     * Update exercise in the DB
     * @param exercise - updated exercise
     */
    this.updateExercise = function(exercise){
        console.log("updateExercise" + exercise);
        if(!this.correctArgument(exercise)){ //TODO correct if id is not incorrect
            throw "invalid argument exception";
        }
        var result = this.indexExerciseInArrayById(exercise.id);
        if(result == -1){
            console.log("Exercise with " + id + " id is not in the DB use add function!");
            throw "Exercise with " + id + " id is not in the DB use add function!";
        }
        exercises[result].name=exercise.name;
        exercises[result].protein=exercise.protein;
        exercises[result].kcal=exercise.kcal;
        saveLocal();
        console.log("Exercise : \n" + exercise + "\n was been updated DB");
    };
    /**
     * Delete exercise from DB
     * @param id - exercise id
     */
    this.deleteExerciseByID = function(id){
        console.log("deleteExerciseById: "+id);
        var index= this.indexExerciseInArrayById(id);
        if(index == -1){
            console.log("Exercise with " + id + " id is not in the DB");
            throw "Exercise with " + id + " id is not in the DB" ;
        }
        exercises.splice(index,1);
        saveLocal();
        console.log("Exercise was deleted from DB");
    };
    /**
     * Next free ID for new exercise
     * @returns {number} - free ID
     */
    this.nextExerciseId = function(){
        /*  this.sortByIdAscending();
         try{
         var id = parseInt(exercises[0].id);
         }catch(ex){
         return 0;
         }
         return id + 1;*/ //TODO or ?
        for(var i=0;i<=exercises.length;i++){
            if(!this.isIdInDB(i+1)){
                return i+1;
            }
        }
    };
    /**
     * If exercise is in the DB
     * @param id - exercise id
     * @returns {boolean}
     */
    this.isIdInDB = function(id){
        if(id==""||id==null){
            console.log("invalid ID in isIdInDb");
            throw "invalid argument exception";
        }
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
    /**
     * Chech if the arguments are correct
     * @param exercise
     * @returns {boolean}
     */
    this.correctArgument = function(exercise){
        if(exercise.id==null||exercise.id==""){
            console.log("Invalid ID: "+exercise.id);
            return false;
        }
        if(exercise.name==null||exercise.name==""){
            console.log("Invalid name: "+exercise.name);
            return false;
        }
        if(exercise.kcal==null||exercise.kcal==""||exercise.kcal<=0) {
            console.log("Invalid argument, at least one parameter must be filled");
            return false;
        }
        return true;
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

