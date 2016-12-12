QUnit.module( "Meals Manager",{
    beforeEach: function() {
        localStorage.clear();
        globalExercisesManager=new ExercisesManager();
        globalDaysManager= new DaysManager();
        globalMealsManager= new MealsManager();
    }
} );
QUnit.test( "add meal to DB", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    assert.notOk( globalMealsManager.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "add incorrect meal to DB", function( assert ) {
    var newMeal = new Meal("steak",20,0,20,800,"100g");
    newMeal.name="";
    assert.throws(function() {globalMealsManager.addMeal(newMeal);},"throws, meal with incorrect name (empty string)");
    newMeal.name=null;
    assert.throws(function() {globalMealsManager.addMeal(newMeal);},"throws, meal with incorrect name (null)");
    newMeal.name="steak2";
    newMeal.method="";
    assert.throws(function() {globalMealsManager.addMeal(newMeal);},"throws, meal with incorrect method (empty string)");
    newMeal.method=null;
    assert.throws(function() {globalMealsManager.addMeal(newMeal);},"throws, meal with incorrect method (null)");
    newMeal.method="100g";
    newMeal.protein=0;
    newMeal.carbohydrate=0;
    newMeal.fat=0;
    newMeal.kcal=0;
    assert.throws(function() {globalMealsManager.addMeal(newMeal);},"throws, meal with all empty optional parameters");
});
QUnit.test( "add meal without optional parameters to DB", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak1",0,0,0,800,"100g"));
    assert.equal(1,globalMealsManager.getAllMeals().length,"Added meals with all 0 parameters");
    globalMealsManager.addMeal(new Meal("steak2","","","",800,"100g"));
    assert.equal(2,globalMealsManager.getAllMeals().length,"Added meals with all \"\" parameters");
    globalMealsManager.addMeal(new Meal("steak3",null,null,null,800,"100g"));
    assert.equal(3,globalMealsManager.getAllMeals().length,"Added meals with all null parameters");
    globalMealsManager.addMeal(new Meal("steak4",16,9,9,0,"100g"));
    assert.equal(181,globalMealsManager.getMealByID(4).kcal,"calculate empty kcal");
});
QUnit.test( "next free meal id", function( assert ) {
    assert.ok( globalMealsManager.nextMealId()==1 , "Next free ID (1) is OK" );
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    assert.ok( globalMealsManager.nextMealId()==2 , "Next free ID (2) is OK" );
});
QUnit.test( "is meal with ID in DB", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    assert.ok( globalMealsManager.isIdInDB(1) , "Meal with ID 1 is in the DB" );
    assert.notOk( globalMealsManager.isIdInDB(7) , "Meal with ID 7 is not in the DB" );
});
QUnit.test( "is meal with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.isIdInDB("");},"throws, isIdInDB with id (\"\")");
    assert.throws(function() {globalMealsManager.isIdInDB(null);},"throws, isIdInDB with id (null)");
});
QUnit.test( "get all meals", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    assert.equal(2,globalMealsManager.getAllMeals().length,"All meals are in the returned DB");
});
QUnit.test( "get meal by id", function( assert ) {
    var originalMeal=new Meal("steak",20,0,20,800,"100g");
    globalMealsManager.addMeal(originalMeal);
    var mealFromDb = globalMealsManager.getMealByID(1);
    originalMeal.id= 1;
    assert.deepEqual(originalMeal, mealFromDb , "meals are equal" );
    originalMeal.carbohydrate=4;
    mealFromDb = globalMealsManager.getMealByID(1);
    assert.notDeepEqual(originalMeal, mealFromDb , "meals are not same, change protein not affected value in DB" );
});
QUnit.test( "get meal by id with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.getMealByID(8);},"throws, get meal with incorect id");
    assert.throws(function() {globalMealsManager.getMealByID("");},"throws, get meal with incorect id (\"\")");
    assert.throws(function() {globalMealsManager.getMealByID(null);},"throws, get meal with incorect id (null)");
});
QUnit.test( "get meals by part of day", function( assert ) {
    globalMealsManager.addMeal(new Meal("steakB1",20,0,0,0,"100g","breakfast"));
    globalMealsManager.addMeal(new Meal("steakB2",20,0,0,0,"100g","breakfast"));
    globalMealsManager.addMeal(new Meal("steakB3",20,0,0,0,"100g","breakfast"));
    globalMealsManager.addMeal(new Meal("steakL1",20,0,0,0,"100g","lunch"));
    globalMealsManager.addMeal(new Meal("steakL2",20,0,0,0,"100g","lunch"));
    globalMealsManager.addMeal(new Meal("steakL3",20,0,0,0,"100g","lunch"));
    globalMealsManager.addMeal(new Meal("steakL4",20,0,0,0,"100g","lunch"));
    globalMealsManager.addMeal(new Meal("steakD1",20,0,0,0,"100g","dinner"));
    globalMealsManager.addMeal(new Meal("steakD2",20,0,0,0,"100g","dinner"));
    globalMealsManager.addMeal(new Meal("steakS1",20,0,0,0,"100g","snack"));
    assert.equal(3,globalMealsManager.getMealsInBreakfast().length,"All meals in the breakfast");
    assert.equal(4,globalMealsManager.getMealsInLunch().length,"All meals in the lunch");
    assert.equal(2,globalMealsManager.getMealsInDinner().length,"All meals in the dinner");
    assert.equal(1,globalMealsManager.getMealsInSnack().length,"All meals in the snack");
});
QUnit.test( "update meal", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    var updateMeal = globalMealsManager.getMealByID(1);
    updateMeal.name="2steak2";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.name,globalMealsManager.getMealByID(1).name,"Name was updated");
    updateMeal.protein="40";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.protein,globalMealsManager.getMealByID(1).protein,"Protein was updated");
    updateMeal.carbohydrate="100";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.carbohydrate,globalMealsManager.getMealByID(1).carbohydrate,"Carbohydrate was updated");
    updateMeal.fat="20";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.fat,globalMealsManager.getMealByID(1).fat,"Fat was updated");
    updateMeal.kcal="400";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.kcal,globalMealsManager.getMealByID(1).kcal,"Kcal was updated");
    updateMeal.method="one piece";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.method,globalMealsManager.getMealByID(1).method,"Method was updated");
    assert.deepEqual(updateMeal, globalMealsManager.getMealByID(1) , "meals are equal" );
});
QUnit.test( "update meal with incorrect parameter", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,0,20,800,"100g"));
    var updateMeal = globalMealsManager.getMealByID(1);
    updateMeal.id="";
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect id (empty string)");
    updateMeal.id=null;
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect id (null)");
    updateMeal.name="";
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect name (empty string)");
    updateMeal.name=null;
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect name (null)");
    updateMeal.name="steak2";
    updateMeal.method="";
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect method (empty string)");
    updateMeal.method=null;
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect method (null)");
    updateMeal.method="100g";
    updateMeal.protein=0;
    updateMeal.carbohydrate=0;
    updateMeal.fat=0;
    updateMeal.kcal=0;
    assert.throws(function() {globalMealsManager.addMeal(updateMeal);},"throws, meal with all empty optional parameters");
});
QUnit.test( "test number function", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    assert.equal(100,globalMealsManager.sumProtein(),"sum of protein");
    assert.equal(25,globalMealsManager.sumCarbohydrate(),"sum of carbohydrate");
    assert.equal(100,globalMealsManager.sumFat(),"sum of fat");
    assert.equal(4000,globalMealsManager.sumKcal(),"sum of kcal");
});
QUnit.test( "delete meals", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    globalMealsManager.addMeal(new Meal("steak",20,5,20,800,"100g"));
    var max = globalMealsManager.nextMealId();
    for(var i=1;i<max;i++){
        globalMealsManager.deleteMealByID(i);
    }
    assert.ok( globalMealsManager.isEmpty() , "DB is empty" );
    assert.ok( globalMealsManager.nextMealId()==1 , "Passed! next free Id after delete" );
});
QUnit.test( "delete meal with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.deleteMealByID("");},"throws, delete meal with id (\"\")");
    assert.throws(function() {globalMealsManager.deleteMealByID(null);},"throws, delete meal with id (null)");
    assert.throws(function() {globalMealsManager.deleteMealByID(10);},"throws, delete meal with wrong id");
});