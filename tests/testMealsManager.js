QUnit.test( "add meal to DB", function( assert ) {
    globalMealsManager.addMeal(new Meal("steak1",20,0,20,800,"100g"));
    assert.notOk( globalMealsManager.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "add incorrect meal to DB", function( assert ) {
    var newMeal = new Meal("steak2",20,0,20,800,"100g");
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
    globalMealsManager.addMeal(new Meal("steak2",0,0,0,800,"100g"));
    assert.equal(2,globalMealsManager.getAllMeals().length,"Added meals with all 0 parameters");
    globalMealsManager.addMeal(new Meal("steak3","","","",800,"100g"));
    assert.equal(3,globalMealsManager.getAllMeals().length,"Added meals with all \"\" parameters");
    globalMealsManager.addMeal(new Meal("steak4",null,null,null,800,"100g"));
    assert.equal(4,globalMealsManager.getAllMeals().length,"Added meals with all null parameters");
    globalMealsManager.addMeal(new Meal("steak5",16,9,9,0,"100g"));
    assert.equal(181,globalMealsManager.getMealByID(5).kcal,"calculate empty kcal");
});
QUnit.test( "next free meal id", function( assert ) {
    assert.ok( globalMealsManager.nextMealId()==6 , "Next free ID (1) is OK" );
    globalMealsManager.addMeal(new Meal("steak6",20,0,20,800,"100g"));
    assert.ok( globalMealsManager.nextMealId()==7 , "Next free ID (7) is OK" );
});
QUnit.test( "is meal with ID in DB", function( assert ) {
    assert.ok( globalMealsManager.isIdInDB(1) , "Meal with ID 1 is in the DB" );
    assert.notOk( globalMealsManager.isIdInDB(7) , "Meal with ID 7 is not in the DB" );
});
QUnit.test( "is meal with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.isIdInDB("");},"throws, isIdInDB with id (\"\")");
    assert.throws(function() {globalMealsManager.isIdInDB(null);},"throws, isIdInDB with id (null)");
});
QUnit.test( "get all meals", function( assert ) {
    assert.equal(6,globalMealsManager.getAllMeals().length,"All meals are in the returned DB");
});
QUnit.test( "get meal by id", function( assert ) {
    var originalMeal=new Meal("steak7",20,0,20,800,"100g");
    globalMealsManager.addMeal(originalMeal);
    var mealFromDb = globalMealsManager.getMealByID(7);
    originalMeal.id= 7;
    assert.deepEqual(originalMeal, mealFromDb , "meals are equal" );
    originalMeal.carbohydrate=4;
    mealFromDb = globalMealsManager.getMealByID(7);
    assert.notDeepEqual(originalMeal, mealFromDb , "meals are not same, change protein not affected value in DB" );
});
QUnit.test( "get meal by id with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.getMealByID(8);},"throws, get meal with incorect id");
    assert.throws(function() {globalMealsManager.getMealByID("");},"throws, get meal with incorect id (\"\")");
    assert.throws(function() {globalMealsManager.getMealByID(null);},"throws, get meal with incorect id (null)");
});
QUnit.test( "update meal", function( assert ) {
    var updateMeal = globalMealsManager.getMealByID(2);
/*  updateMeal.id=8; //TODO repair
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(2,globalMealsManager.nextMealId(),"Id updated meal is free");
    updateMeal.id=2;
    globalMealsManager.updateMeal(updateMeal);*/
    updateMeal.name="2steak2";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.name,globalMealsManager.getMealByID(2).name,"Name was been updated");
    updateMeal.protein="40";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.protein,globalMealsManager.getMealByID(2).protein,"Protein was been updated");
    updateMeal.carbohydrate="100";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.carbohydrate,globalMealsManager.getMealByID(2).carbohydrate,"Carbohydrate was been updated");
    updateMeal.fat="20";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.fat,globalMealsManager.getMealByID(2).fat,"Fat was been updated");
    updateMeal.kcal="400";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.kcal,globalMealsManager.getMealByID(2).kcal,"Kcal was been updated");
    updateMeal.method="one piece";
    globalMealsManager.updateMeal(updateMeal);
    assert.equal(updateMeal.method,globalMealsManager.getMealByID(2).method,"Method was been updated");
    assert.deepEqual(updateMeal, globalMealsManager.getMealByID(2) , "meals are equal" );
});
QUnit.test( "update meal with incorrect parameter", function( assert ) {
    var updateMeal = globalMealsManager.getMealByID(2);
    updateMeal.id="";
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect id (empty string)");
    updateMeal.id=null;
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect id (null)");
/*  updateMeal.id=5;
    assert.throws(function() {globalMealsManager.updateMeal(updateMeal);},"throws, meal with incorrect id(id is in the db)"); //TODO not updated another meal
    updateMeal.id=2;*/
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
    assert.equal(116,globalMealsManager.sumProtein(),"sum of protein");
    assert.equal(109,globalMealsManager.sumCarbohydrate(),"sum of carbohydrate");
    assert.equal(89,globalMealsManager.sumFat(),"sum of fat");
    assert.equal(4581,globalMealsManager.sumKcal(),"sum of kcal");
});
QUnit.test( "delete meals", function( assert ) {
    for(var i=1;i<=7;i++){
        globalMealsManager.deleteMealByID(i);
    }
    assert.ok( globalMealsManager.isEmpty() , "DB is empty" );
    assert.ok( globalMealsManager.nextMealId()==1 , "Passed! next free Id after delete" );
});
QUnit.test( "delete meal with incorrect parameter", function( assert ) {
    assert.throws(function() {globalMealsManager.deleteMeal("");},"throws, delete meal with id (\"\")");
    assert.throws(function() {globalMealsManager.deleteMeal(null);},"throws, delete meal with id (null)");
    assert.throws(function() {globalMealsManager.deleteMeal(10);},"throws, delete meal with wrong id");
});
QUnit.test( "delete storage", function( assert ) {
    localStorage.clear();
    globalMealsManager.getAllMeals().length=0;
    assert.equal(1,globalMealsManager.nextMealId(), "storage was deleted" );
});
