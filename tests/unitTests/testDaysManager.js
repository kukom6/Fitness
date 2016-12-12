QUnit.module( "Days Manager", {
    beforeEach: function() {
        localStorage.clear();
        globalExercisesManager=new ExercisesManager();
        globalDaysManager= new DaysManager();
        globalMealsManager= new MealsManager();
    }
});

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
    globalDaysManager.addDay(new Day(new Date()));
    assert.throws(function() {globalDaysManager.addDay(new Date());},"throws, day is already in the db");
});
QUnit.test( "test add meal to day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g","lunch"));
    var day = globalDaysManager.getDayByDate(new Date());
    assert.notOk(day.mealsManager.isEmpty(),"Meals array is not empty");
    var getMeal = day.mealsManager.getMealByID(1);
    assert.equal("steak",getMeal.name);
    assert.equal("lunch",getMeal.partOfDay);
});
QUnit.test( "add meal with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.addMealToDay("",new Meal("steak",10,10,10,null,"100g"));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addMealToDay(null,new Meal("steak",10,10,10,null,"100g"));},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.addMealToDay(new Date("2015-03-24"),new Meal("steak",10,10,10,null,"100g"));},"throws, day is not in the db");
    assert.throws(function() {globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g"));},"throws, meal haven't part of day");
    assert.throws(function() {globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g","night"));},"throws, meal have incorrect part of day");
});
QUnit.test( "test add exercise to day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addExerciseToDay(new Date(),new Exercise("run",300));
    var day = globalDaysManager.getDayByDate(new Date());
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
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g","lunch"));
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
    var originalMeal = day.mealsManager.getMealByID(1);
    var updateMeal = day.mealsManager.getMealByID(1);
    updateMeal.name = "test1";
    updateMeal.carbohydrate = 30;
    updateMeal.fat = 20;
    updateMeal.partOfDay = "snack";
    globalDaysManager.updateMealInDay(new Date(),updateMeal);
    var updatedMeal = day.mealsManager.getMealByID(1);
    assert.notDeepEqual(originalMeal,updatedMeal,"original and updated meal are not same");
    assert.deepEqual(updateMeal,updatedMeal,"updated meals was successfully ");
    day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
    assert.equal("snack",updatedMeal.partOfDay,"meal updated");

});
QUnit.test( "update meal with incorrect date", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g","lunch"));
    assert.throws(function() {globalDaysManager.updateMealInDay("","");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateMealInDay(null,null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date("2015-03-24"),new Meal("steak",10,10,10,null,"100g"));},"throws, day is not in the db");
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date(),new Meal("steak",10,10,10,null,"100g"));},"throws, meal is not in the day");
    var tempMeal = globalDaysManager.getDayByDate(new Date()).mealsManager.getMealByID(1);
    tempMeal.partOfDay="";
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date(),tempMeal);},"throws, meal have incorrect part of day");
    tempMeal.partOfDay="night";
    assert.throws(function() {globalDaysManager.updateMealInDay(new Date(),tempMeal);},"throws, meal have incorrect part of day");
    assert.equal("lunch",globalDaysManager.getDayByDate(new Date()).mealsManager.getMealByID(1).partOfDay,"meal wasn't updated");

});
QUnit.test( "update exercise in the day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addExerciseToDay(new Date(),new Exercise("run",300));
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
    var originalExercise = day.exercisesManager.getExerciseByID(1);
    var updateExercise = day.exercisesManager.getExerciseByID(1);
    updateExercise.name = "test1";
    updateExercise.kcal = 20;
    globalDaysManager.updateExerciseInDay(new Date(),updateExercise);
    var updatedExercise = day.exercisesManager.getExerciseByID(1);
    assert.notDeepEqual(originalExercise,updatedExercise,"original and updated exercise are not same");
    assert.deepEqual(updateExercise,updatedExercise,"updated exercises was successfully ");
    day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
});
QUnit.test( "update exercise with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.updateExerciseInDay("","");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(null,null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(new Date("2015-03-24"),new Exercise("run",300));},"throws, day is not in the db");
    assert.throws(function() {globalDaysManager.updateExerciseInDay(new Date(),new Exercise("run",300));},"throws, exercise is not in the day");
});
QUnit.test( "deleted meal from the day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addMealToDay(new Date(),new Meal("steak",10,10,10,null,"100g","lunch"));
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.mealsManager.getAllMeals().length,"one meal in the day");
    globalDaysManager.deleteMealInDay(new Date(),1);
    assert.ok(day.mealsManager.isEmpty(),"meals array is empty");
});
QUnit.test( "delete meals with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteMealInDay("",1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteMealInDay(null,1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteMealInDay(new Date("2015-03-24"),1);},"throws, day is not in the db");
});
QUnit.test( "delete exercise from the day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addExerciseToDay(new Date(),new Exercise("run",300));
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(1,day.exercisesManager.getAllExercises().length,"one exercise in the day");
    globalDaysManager.deleteExerciseInDay(new Date(),1);
    assert.ok(day.exercisesManager.isEmpty(),"exercises array is empty");
});
QUnit.test( "delete exercises with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteExerciseInDay("",1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteExerciseInDay(null,1);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteExerciseInDay(new Date("2015-03-24"),1);},"throws, day is not in the db");
});
QUnit.test( "delete day from days", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    var day = globalDaysManager.getDayByDate(new Date());
    globalDaysManager.deleteDayByDate(new Date());
    assert.throws(function() {globalDaysManager.deleteDayByDate(new Date());},"throws, day is not in the db");
    assert.ok(globalDaysManager.isEmpty(),"days array is empty");
});
QUnit.test( "delete days with incorrect date", function( assert ) {
    assert.throws(function() {globalDaysManager.deleteDayByDate("");},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteDayByDate(null);},"throws, date have invalid form");
    assert.throws(function() {globalDaysManager.deleteDayByDate(new Date("2015-03-24"));},"throws, day is not in the db");
});
QUnit.test( "test add restriction to day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    var restriction = new Restriction(null,10,10,null);
    globalDaysManager.addRestrictionToDay(new Date(),restriction);
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(day.restriction.protein,null,"Protein restriction");
    assert.equal(day.restriction.carbohydrate,10,"Carbohydrate restriction");
    assert.equal(day.restriction.fat,10,"Fat restriction");
    assert.equal(day.restriction.kcal,null,"Protein restriction");
    assert.deepEqual(day.restriction,restriction,"Restrictions are not equal");
});
QUnit.test( "test add restriction with incorrect parameters", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    var restriction = new Restriction("f",10,10,null);
    assert.throws(function() {globalDaysManager.addRestrictionToDay(new Date(),restriction);},"throws, invalid parameter");
    assert.throws(function() {globalDaysManager.addRestrictionToDay(null,restriction);},"throws, invalid date");
    assert.throws(function() {globalDaysManager.addRestrictionToDay(new Date(),null);},"throws, invalid restriction");
});

QUnit.test( "test delete restriction in day", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    var restriction = new Restriction(null,10,10,null);
    globalDaysManager.addRestrictionToDay(new Date(),restriction);
    globalDaysManager.deleteRestriction(new Date());
    var day = globalDaysManager.getDayByDate(new Date());
    assert.equal(day.restriction,null,"Restriction was deleted");
});
QUnit.test( "test delete restriction with incorrect parameters", function( assert ) {
    globalDaysManager.addDay(new Day(new Date()));
    var restriction = new Restriction(null,10,10,null);
    globalDaysManager.addRestrictionToDay(new Date(),restriction);
    assert.throws(function() {globalDaysManager.deleteRestriction(null);},"throws, invalid date");
});