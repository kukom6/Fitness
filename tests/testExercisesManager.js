QUnit.test( "add exercise to DB", function( assert ) {
    managerE.addExercise(new Exercise(2,"run2",800));
    assert.notOk( managerE.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "add incorrect exercise to DB", function( assert ) {
    var newExercise = new Exercise(3,"run3",700);
    newExercise.id="";
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect id (empty string)");
    newExercise.id=null;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect id (null)");
    newExercise.id=2;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect id(id is in the db)");
    newExercise.id=3;
    newExercise.name="";
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect name (empty string)");
    newExercise.name=null;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect name (null)");
    newExercise.name="run3";
    newExercise.kcal=0;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect kcal (0)");
    newExercise.kcal=-1;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect kcal (-1)");
    newExercise.kcal=null;
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect kcal (null)");
    newExercise.kcal="";
    assert.throws(function() {managerE.addExercise(newExercise);},"throws, exercise with incorrect kcal (\"\")");
});
QUnit.test( "next free exercise id", function( assert ) {
    assert.ok( managerE.nextExerciseId()==1 , "Next free ID (1) is OK" );
    managerE.addExercise(new Exercise(1,"run1",600));
    assert.ok( managerE.nextExerciseId()==3 , "Next free ID (3) is OK" );
});
QUnit.test( "is exercise with ID in DB", function( assert ) {
    assert.ok( managerE.isIdInDB(1) , "Exercise with ID 1 is in the DB" );
    assert.notOk( managerE.isIdInDB(3) , "Exercise with ID 3 is not in the DB" );
});
QUnit.test( "is exercise with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {managerE.isIdInDB("");},"throws, isIdInDB with id (\"\")");
    assert.throws(function() {managerE.isIdInDB(null);},"throws, isIdInDB with id (null)");
});
QUnit.test( "get all exercises", function( assert ) {
    assert.equal(2,managerE.getAllExercises().length,"All exercises are in the returned DB");
});
QUnit.test( "get exercise by id", function( assert ) {
    var originalExercise=new Exercise(3,"run3",900);
    managerE.addExercise(originalExercise);
    var exerciseFromDb = managerE.getExerciseByID(3);
    assert.deepEqual(originalExercise, exerciseFromDb , "exercises are equal" );
    originalExercise.kcal=400;
    exerciseFromDb = managerE.getExerciseByID(3);
    assert.notDeepEqual(originalExercise, exerciseFromDb , "exercises are not same, change protein not affected value in DB" );
});
QUnit.test( "get exercise by id with incorrect parameter", function( assert ) {
    assert.throws(function() {managerE.getExerciseByID(8);},"throws, get exercise with incorect id");
    assert.throws(function() {managerE.getExerciseByID("");},"throws, get exercise with incorect id (\"\")");
    assert.throws(function() {managerE.getExerciseByID(null);},"throws, get exercise with incorect id (null)");
});
QUnit.test( "update exercise", function( assert ) {
    var updateExercise = managerE.getExerciseByID(2);
    /*  updateExercise.id=8; //TODO repair
     managerE.updateExercise(updateExercise);
     assert.equal(2,managerE.nextExerciseId(),"Id updated exercise is free");
     updateExercise.id=2;
     managerE.updateExercise(updateExercise);*/
    updateExercise.name="2run2";
    managerE.updateExercise(updateExercise);
    assert.equal(updateExercise.name,managerE.getExerciseByID(2).name,"Name was been updated");
    updateExercise.kcal="400";
    managerE.updateExercise(updateExercise);
    assert.equal(updateExercise.kcal,managerE.getExerciseByID(2).kcal,"Kcal was been updated");
    assert.deepEqual(updateExercise, managerE.getExerciseByID(2) , "exercises are equal" );
});
QUnit.test( "update exercise with incorrect parameter", function( assert ) {
    var updateExercise = managerE.getExerciseByID(2);
    updateExercise.id="";
    assert.throws(function() {managerE.updateExercise(updateExercise);},"throws, exercise with incorrect id (empty string)");
    updateExercise.id=null;
    assert.throws(function() {managerE.updateExercise(updateExercise);},"throws, exercise with incorrect id (null)");
    /*  updateExercise.id=5;
     assert.throws(function() {managerE.updateExercise(updateExercise);},"throws, exercise with incorrect id(id is in the db)"); //TODO not updated another exercise
     updateExercise.id=2;*/
    updateExercise.name="";
    assert.throws(function() {managerE.updateExercise(updateExercise);},"throws, exercise with incorrect name (empty string)");
    updateExercise.name=null;
    assert.throws(function() {managerE.updateExercise(updateExercise);},"throws, exercise with incorrect name (null)");
    updateExercise.name="run2";
});
QUnit.test( "delete exercises", function( assert ) {
    for(var i=1;i<=3;i++){
        managerE.deleteExerciseByID(i);
    }
    assert.ok( managerE.isEmpty() , "DB is empty" );
    assert.ok( managerE.nextExerciseId()==1 , "Passed! next free Id after delete" );
});
QUnit.test( "delete exercise with incorrect parameter", function( assert ) {
    assert.throws(function() {managerE.deleteExercise("");},"throws, delete exercise with id (\"\")");
    assert.throws(function() {managerE.deleteExercise(null);},"throws, delete exercise with id (null)");
    assert.throws(function() {managerE.deleteExercise(10);},"throws, delete exercise with wrong id");
});
QUnit.test( "delete storage", function( assert ) {
    localStorage.clear();
    managerE.getAllExercises().length=0;
    assert.equal(1,managerE.nextExerciseId(), "storage was deleted" );
});