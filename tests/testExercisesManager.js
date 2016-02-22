QUnit.test( "before test ", function( assert ) {
    localStorage.clear();
    assert.ok( true, "storage was deleted" );
});

QUnit.test( "add exercise to DB", function( assert ) {
    managerE.addExercise(new Exercise(1,"beh",800));
    assert.notOk( managerE.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "next free exercise id", function( assert ) {
    assert.ok( managerE.nextExerciseId()==2 , "Next free ID is OK" );
});
QUnit.test( "is exercise with ID in DB", function( assert ) {
    assert.ok( managerE.isIdInDB(1) , "Exercise with ID 1 is in the DB" );
});
QUnit.test( "get all exercises", function( assert ) {
    managerE.addExercise(new Exercise(2,"joga",200));
    assert.equal(2,managerE.getAllExercises().length,"All meals are in the returned DB");
});
QUnit.test( "get exercise by id", function( assert ) {
    var testExercise = managerE.getExerciseByID(1);
    assert.equal(1,testExercise.id,"Id is equals");
    assert.equal("beh",testExercise.name,"name is equals");
    assert.equal(800,testExercise.kcal,"kcal is equals");
    testExercise.kcal = 700;
    testExercise = managerE.getExerciseByID(1);
    assert.notEqual(700,testExercise.kcal,"kcal is not equals but external object will be influence object in the DB");
});
QUnit.test( "delete exercises", function( assert ) {
    managerE.deleteExerciseByID(1);
    managerE.deleteExerciseByID(2);
    assert.ok( managerE.isEmpty() , "DB is empty" );
    assert.ok( managerE.nextExerciseId()==0 , "Passed! next free Id after delete" );
});


QUnit.test( "after test , delete storage after exercises", function( assert ) {
    localStorage.clear();
    assert.ok( true, "storage was deleted" );
});