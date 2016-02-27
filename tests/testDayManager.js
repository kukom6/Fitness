/**
 * Created by mkralik on 2/27/16.
 */
QUnit.test( "test day constructor", function( assert ) {
    today = new Day(new Date());
    dateToday = new Date();
    assert.equal(dateToday.toDateString(),today.date.toDateString(),"date is equals");
});
QUnit.test( "add meal and exercise to day", function( assert ) {
    today.addMeal(new Meal(2,"steak",10,10,10,256,"100g"));
    assert.ok(today.isMealIdInDay(2),"meals by ID is in day");
    today.addExercise(new Exercise(4,"beh",240));
    assert.ok(today.isExerciseIdInDay(4),"exercise by ID is in day");
    assert.notOk( today.isMealsEmpty() , "Meals is not empty" );
    assert.notOk( today.isExercisesEmpty() , "Exercises is no empty" );
});
QUnit.test( "next free exercise id", function( assert ) {
    assert.ok( today.nextExerciseId()==1 , "Next free exercise ID (1) is OK" );
    assert.ok( today.nextMealId()==1 , "Next free meal ID (1) is OK" );
    today.addMeal(new Meal(1,"steak1",10,10,10,256,"100g"));
    today.addExercise(new Exercise(1,"beh1",240));
    assert.ok( today.nextExerciseId()==2 , "Next free exercise ID (2) is OK" );
    assert.ok( today.nextMealId()==3 , "Next free meal ID (2) is OK" );
});
QUnit.test( "is exercise with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {today.isMealIdInDay("");},"throws, isMealIdInDay with id (\"\")");
    assert.throws(function() {today.isMealIdInDay(null);},"throws, isMealIdInDay with id (null)");
    assert.throws(function() {today.isExerciseIdInDay("");},"throws, isExerciseIdInDay with id (\"\")");
    assert.throws(function() {today.isExerciseIdInDay(null);},"throws, isExerciseIdInDay with id (null)");
});
QUnit.test( "delete meal and exercise from day", function( assert ) {
    today.deleteMeal(1);
    today.deleteExercise(1);
    today.deleteMeal(2);
    today.deleteExercise(4);
    assert.ok( today.isMealsEmpty() , "Meals is empty" );
    assert.ok( today.isExercisesEmpty() , "Exercises is empty" );
});
QUnit.test( "delete meal and exercise from day with incorrect parameter", function( assert ) {
    assert.throws(function() {today.deleteExercise("");},"throws, delete exercise with id (\"\")");
    assert.throws(function() {today.deleteExercise(null);},"throws, delete exercise with id (null)");
    assert.throws(function() {today.deleteMeal("");},"throws, delete meal with id (\"\")");
    assert.throws(function() {today.deleteMeal(null);},"throws, delete meal with id (null)");
    assert.throws(function() {today.deleteExercise(10);},"throws, delete exercise with wrong id");
    assert.throws(function() {today.deleteMeal(10);},"throws, delete meal with wrong id");
});
QUnit.test( "delete storage", function( assert ) {
    localStorage.clear();
    today.dayMeals.length=0;
    today.dayExercises.length=0;
    assert.equal(1,today.nextExerciseId(), "storage was deleted" );
    assert.equal(1,today.nextMealId(), "storage was deleted" );
});