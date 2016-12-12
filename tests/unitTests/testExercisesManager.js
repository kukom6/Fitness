QUnit.module( "Execises Manager",{
    beforeEach: function() {
        localStorage.clear();
        globalExercisesManager=new ExercisesManager();
        globalDaysManager= new DaysManager();
        globalMealsManager= new MealsManager();
    }
});
QUnit.test( "add exercise to DB", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run1",800));
    assert.notOk( globalExercisesManager.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "add incorrect exercise to DB", function( assert ) {
    var newExercise = new Exercise("run3",700);
    newExercise.name="";
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect name (empty string)");
    newExercise.name=null;
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect name (null)");
    newExercise.name="run3";
    newExercise.kcal=0;
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect kcal (0)");
    newExercise.kcal=-1;
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect kcal (-1)");
    newExercise.kcal=null;
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect kcal (null)");
    newExercise.kcal="";
    assert.throws(function() {globalExercisesManager.addExercise(newExercise);},"throws, exercise with incorrect kcal (\"\")");
});
QUnit.test( "next free exercise id", function( assert ) {
    assert.ok( globalExercisesManager.nextExerciseId()==1 , "Next free ID (2) is OK" );
    globalExercisesManager.addExercise(new Exercise("run1",600));
    assert.ok( globalExercisesManager.nextExerciseId()==2 , "Next free ID (3) is OK" );
});
QUnit.test( "is exercise with ID in DB", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run1",600));
    assert.ok( globalExercisesManager.isIdInDB(1) , "Exercise with ID 1 is in the DB" );
    assert.notOk( globalExercisesManager.isIdInDB(2) , "Exercise with ID 2 is not in the DB" );
});
QUnit.test( "is exercise with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {globalExercisesManager.isIdInDB("");},"throws, isIdInDB with id (\"\")");
    assert.throws(function() {globalExercisesManager.isIdInDB(null);},"throws, isIdInDB with id (null)");
});
QUnit.test( "get all exercises", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run1",800));
    globalExercisesManager.addExercise(new Exercise("run2",600));
    assert.equal(2,globalExercisesManager.getAllExercises().length,"All exercises are in the returned DB");
});
QUnit.test( "get exercise by id", function( assert ) {
    var originalExercise=new Exercise("run",900);
    globalExercisesManager.addExercise(originalExercise);
    var exerciseFromDb = globalExercisesManager.getExerciseByID(1);
    originalExercise.id = 1;
    assert.deepEqual(originalExercise, exerciseFromDb , "exercises are equal" );
    originalExercise.kcal=400;
    exerciseFromDb = globalExercisesManager.getExerciseByID(1);
    assert.notDeepEqual(originalExercise, exerciseFromDb , "exercises are not same, change protein not affected value in DB" );
});
QUnit.test( "get exercise by id with incorrect parameter", function( assert ) {
    assert.throws(function() {globalExercisesManager.getExerciseByID(8);},"throws, get exercise with incorect id");
    assert.throws(function() {globalExercisesManager.getExerciseByID("");},"throws, get exercise with incorect id (\"\")");
    assert.throws(function() {globalExercisesManager.getExerciseByID(null);},"throws, get exercise with incorect id (null)");
});
QUnit.test( "update exercise", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run",900));
    var updateExercise = globalExercisesManager.getExerciseByID(1);
    updateExercise.name="2run";
    globalExercisesManager.updateExercise(updateExercise);
    assert.equal(updateExercise.name,globalExercisesManager.getExerciseByID(1).name,"Name was  updated");
    updateExercise.kcal="400";
    globalExercisesManager.updateExercise(updateExercise);
    assert.equal(updateExercise.kcal,globalExercisesManager.getExerciseByID(1).kcal,"Kcal was  updated");
    assert.deepEqual(updateExercise, globalExercisesManager.getExerciseByID(1) , "exercises are equal" );
});
QUnit.test( "update exercise with incorrect parameter", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run",900));
    var updateExercise = globalExercisesManager.getExerciseByID(1);
    updateExercise.id="";
    assert.throws(function() {globalExercisesManager.updateExercise(updateExercise);},"throws, exercise with incorrect id (empty string)");
    updateExercise.id=null;
    assert.throws(function() {globalExercisesManager.updateExercise(updateExercise);},"throws, exercise with incorrect id (null)");
    updateExercise.name="";
    assert.throws(function() {globalExercisesManager.updateExercise(updateExercise);},"throws, exercise with incorrect name (empty string)");
    updateExercise.name=null;
    assert.throws(function() {globalExercisesManager.updateExercise(updateExercise);},"throws, exercise with incorrect name (null)");
    updateExercise.name="run2";
});
QUnit.test( "test number function", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run",900));
    globalExercisesManager.addExercise(new Exercise("run",900));
    globalExercisesManager.addExercise(new Exercise("run",900));
    assert.equal(2700,globalExercisesManager.sumKcal(),"sum of kcal");
});
QUnit.test( "delete exercises", function( assert ) {
    globalExercisesManager.addExercise(new Exercise("run",900));
    globalExercisesManager.deleteExerciseByID(1);
    assert.ok( globalExercisesManager.isEmpty() , "DB is empty" );
    assert.ok( globalExercisesManager.nextExerciseId()==1 , "Passed! next free Id after delete" );
});
QUnit.test( "delete exercise with incorrect parameter", function( assert ) {
    assert.throws(function() {globalExercisesManager.deleteExerciseByID("");},"throws, delete exercise with id (\"\")");
    assert.throws(function() {globalExercisesManager.deleteExerciseByID(null);},"throws, delete exercise with id (null)");
    assert.throws(function() {globalExercisesManager.deleteExerciseByID(10);},"throws, delete exercise with wrong id");
});