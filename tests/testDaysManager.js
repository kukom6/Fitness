/**
 * Created by mkralik on 2/24/16.
 */
QUnit.test( "test add day", function( assert ) {
    assert.ok(globalDaysManager.isEmpty(),"days array is empty");
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addDay(new Day(new Date("2015-03-25")));
    assert.equal(2,globalDaysManager.getAllDays().length,"2 days in the days array");
    var getDay=globalDaysManager.getDayByDate(new Date());
    var date = getDay.date.toDateString();
    assert.deepEqual(new Date().toDateString(),date,"1. date is equal");
    getDay = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    date = getDay.date.toDateString();
    assert.deepEqual(new Date("2015-03-25").toDateString(),date,"2. date is equal");
});
QUnit.test( "add with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.addDay(new Date());},"throws, day is already in the db");
});
QUnit.test( "test add meal to day", function( assert ) {
    globalDaysManager.addMealToDay(new Date("2015-03-25"),new Meal("steak",10,10,10,null,"100g"));
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.notOk(day.mealsManager.isEmpty(),"Meals array is not empty");
    var getMeal = day.mealsManager.getMealByID(1);
    assert.equal("steak",getMeal.name);
});
QUnit.test( "add meal with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.addMealToDay("",new Meal("steak",10,10,10,null,"100g"));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addMealToDay(null,new Meal("steak",10,10,10,null,"100g"));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addMealToDay(new Date("2015-03-24"),new Meal("steak",10,10,10,null,"100g"));},"throws, day is not in the db");
});
QUnit.test( "test add exercise to day", function( assert ) {
    globalDaysManager.addExerciseToDay(new Date("2015-03-25"),new Exercise("run",300));
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.notOk(day.exercisesManager.isEmpty(),"Exercises array is not empty");
    var getExercise = day.exercisesManager.getExerciseByID(1);
    assert.equal("run",getExercise.name);
});
QUnit.test( "add exercise with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.addExerciseToDay("",new Exercise("run",300));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addExerciseToDay(null,new Exercise("run",300));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addExerciseToDay(new Date("2015-03-24"),new Exercise("run",300));},"throws, day is not in the db");
});
QUnit.test( "get day with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.getDayByDate("");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.getDayByDate(null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.getDayByDate(new Date("2015-03-24"));},"throws, day is not in the db");
});
QUnit.test( "update meal in the day", function( assert ) {
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
    var originalMeal = day.mealsManager.getMealByID(1);
    var updateMeal = day.mealsManager.getMealByID(1);
    updateMeal.name = "test1";
    updateMeal.carbohydrate = 30;
    updateMeal.fat = 20;
    globalDaysManager.updateMealInDay(new Date("2015-03-25"),updateMeal);
    var updatedMeal = day.mealsManager.getMealByID(1);
    assert.notDeepEqual(originalMeal,updatedMeal,"original and updated meal are not same");
    assert.deepEqual(updateMeal,updatedMeal,"updated meals was successfully ");
    day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
});
QUnit.test( "update meal with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.updateMealInDay("","");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateMealInDay(null,null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date("2015-03-24"),new Meal("steak",10,10,10,null,"100g"));},"throws, day is not in the db");
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date("2015-03-25"),new Meal("steak",10,10,10,null,"100g"));},"throws, meal is not in the day");
});
QUnit.test( "update exercise in the day", function( assert ) {
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
    var originalExercise = day.exercisesManager.getExerciseByID(1);
    var updateExercise = day.exercisesManager.getExerciseByID(1);
    updateExercise.name = "test1";
    updateExercise.kcal = 20;
    globalDaysManager.updateExerciseInDay(new Date("2015-03-25"),updateExercise);
    var updatedExercise = day.exercisesManager.getExerciseByID(1);
    assert.notDeepEqual(originalExercise,updatedExercise,"original and updated exercise are not same");
    assert.deepEqual(updateExercise,updatedExercise,"updated exercises was successfully ");
    day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
});
QUnit.test( "update exercise with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.updateExerciseInDay("","");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(null,null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(new Date("2015-03-24"),new Exercise("run",300));},"throws, day is not in the db");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(new Date("2015-03-25"),new Exercise("run",300));},"throws, exercise is not in the day");
});
QUnit.test( "deleted meal from the day", function( assert ) {
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
    globalDaysManager.deleteMealInDay(new Date("2015-03-25"),1);
    assert.ok(day.mealsManager.isEmpty(),"meals array is empty");
});
QUnit.test( "delete meals with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteMealInDay("",1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteMealInDay(null,1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteMealInDay(new Date("2015-03-24"),1);},"throws, day is not in the db");
});
QUnit.test( "delete exercise from the day", function( assert ) {
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
    globalDaysManager.deleteExerciseInDay(new Date("2015-03-25"),1);
    assert.ok(day.exercisesManager.isEmpty(),"exercises array is empty");
});
QUnit.test( "delete exercises with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteExerciseInDay("",1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteExerciseInDay(null,1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteExerciseInDay(new Date("2015-03-24"),1);},"throws, day is not in the db");
});
QUnit.test( "delete day from days", function( assert ) {
    var day = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    globalDaysManager.deleteDayByDate(new Date("2015-03-25"));
    globalDaysManager.deleteDayByDate(new Date());
    assert.throws(function() {globalDaysManager.deleteDayByDate(new Date());},"throws, day is not in the db");
    assert.ok(globalDaysManager.isEmpty(),"days array is empty");
});
QUnit.test( "delete days with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteDayByDate("");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteDayByDate(null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteDayByDate(new Date("2015-03-24"));},"throws, day is not in the db");
});