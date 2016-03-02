/**
 * Created by mkralik on 2/27/16.
 */
QUnit.test( "test day constructor", function( assert ) {
    var today = new Day(new Date());
    var dateToday = new Date();
    assert.equal(today.date.toDateString(),dateToday.toDateString(),"date is equal");
    var yesterday = new Day(new Date("2015-03-25"));
    assert.notDeepEqual(today,yesterday,"date is not equal");
    today.mealsManager.addMeal(new Meal("steakT",10,10,10,10,"100g"));
    today.mealsManager.addMeal(new Meal("milkT",5,5,5,5,"one piece"));
    today.exercisesManager.addExercise(new Exercise("runT",400));
    yesterday.mealsManager.addMeal(new Meal("steakY",10,10,10,10,"100g"));
    yesterday.mealsManager.addMeal(new Meal("milkY",5,5,5,5,"one piece"));
    yesterday.exercisesManager.addExercise(new Exercise("runY",400));
    assert.notDeepEqual(today,yesterday,"date is not equal");
    assert.notEqual(today.mealsManager.getMealByID(1),yesterday.mealsManager.getMealByID(1),"meals in day is not equal");
    assert.equal(2,today.mealsManager.getAllMeals().length,"length array is OK ");
});