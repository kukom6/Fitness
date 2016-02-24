QUnit.test( "add meal to DB", function( assert ) {
    managerM.addMeal(new Meal(2,"steak2",20,0,20,800,"100g"));
    assert.notOk( managerM.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "add incorrect meal to DB", function( assert ) {
    var newMeal = new Meal(3,"steak2",20,0,20,800,"100g");
    newMeal.id="";
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect id (empty string)");
    newMeal.id=null;
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect id (null)");
    newMeal.id=2;
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect id(id is in the db)");
    newMeal.id=3;
    newMeal.name="";
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect name (empty string)");
    newMeal.name=null;
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect name (null)");
    newMeal.name="steak2";
    newMeal.method="";
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect method (empty string)");
    newMeal.method=null;
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with incorrect method (null)");
    newMeal.method="100g";
    newMeal.protein=0;
    newMeal.carbohydrate=0;
    newMeal.fat=0;
    newMeal.kcal=0;
    assert.throws(function() {managerM.addMeal(newMeal);},"throws, meal with all empty optional parameters");
});
QUnit.test( "add meal without optional parameters to DB", function( assert ) {
    managerM.addMeal(new Meal(3,"steak2",0,0,0,800,"100g"));
    assert.equal(2,managerM.getAllMeals().length,"Added meals with all 0 parameters");
    managerM.addMeal(new Meal(4,"steak3","","","",800,"100g"));
    assert.equal(3,managerM.getAllMeals().length,"Added meals with all \"\" parameters");
    managerM.addMeal(new Meal(5,"steak4",null,null,null,800,"100g"));
    assert.equal(4,managerM.getAllMeals().length,"Added meals with all null parameters");
    managerM.addMeal(new Meal(6,"steak5",16,9,9,0,"100g"));
    assert.equal(181,managerM.getMealByID(6).kcal,"calculate empty kcal");
});
QUnit.test( "next free meal id", function( assert ) {
    assert.ok( managerM.nextMealId()==1 , "Next free ID (1) is OK" );
    managerM.addMeal(new Meal(1,"steak1",20,0,20,800,"100g"));
    assert.ok( managerM.nextMealId()==7 , "Next free ID (7) is OK" );
});
QUnit.test( "is meal with ID in DB", function( assert ) {
    assert.ok( managerM.isIdInDB(1) , "Meal with ID 1 is in the DB" );
    assert.notOk( managerM.isIdInDB(7) , "Meal with ID 7 is not in the DB" );
});
QUnit.test( "is meal with ID in DB with incorrect parameter", function( assert ) {
    assert.throws(function() {managerM.isIdInDB("");},"throws, isIdInDB with id (\"\")");
    assert.throws(function() {managerM.isIdInDB(null);},"throws, isIdInDB with id (null)");
});
QUnit.test( "get all meals", function( assert ) {
    assert.equal(6,managerM.getAllMeals().length,"All meals are in the returned DB");
});
QUnit.test( "get meal by id", function( assert ) {
    var originalMeal=new Meal(7,"steak7",20,0,20,800,"100g");
    managerM.addMeal(originalMeal);
    var mealFromDb = managerM.getMealByID(7);
    assert.deepEqual(originalMeal, mealFromDb , "meals are equal" );
    originalMeal.carbohydrate=4;
    mealFromDb = managerM.getMealByID(7);
    assert.notDeepEqual(originalMeal, mealFromDb , "meals are not same, change protein not affected value in DB" );
});
QUnit.test( "get meal by id with incorrect parameter", function( assert ) {
    assert.throws(function() {managerM.getMealByID(8);},"throws, get meal with incorect id");
    assert.throws(function() {managerM.getMealByID("");},"throws, get meal with incorect id (\"\")");
    assert.throws(function() {managerM.getMealByID(null);},"throws, get meal with incorect id (null)");
});
QUnit.test( "update meal", function( assert ) {
    var updateMeal = managerM.getMealByID(2);
/*  updateMeal.id=8; //TODO repair
    managerM.updateMeal(updateMeal);
    assert.equal(2,managerM.nextMealId(),"Id updated meal is free");
    updateMeal.id=2;
    managerM.updateMeal(updateMeal);*/
    updateMeal.name="2steak2";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.name,managerM.getMealByID(2).name,"Name was been updated");
    updateMeal.protein="40";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.protein,managerM.getMealByID(2).protein,"Protein was been updated");
    updateMeal.carbohydrate="100";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.carbohydrate,managerM.getMealByID(2).carbohydrate,"Carbohydrate was been updated");
    updateMeal.fat="20";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.fat,managerM.getMealByID(2).fat,"Fat was been updated");
    updateMeal.kcal="400";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.kcal,managerM.getMealByID(2).kcal,"Kcal was been updated");
    updateMeal.method="one piece";
    managerM.updateMeal(updateMeal);
    assert.equal(updateMeal.method,managerM.getMealByID(2).method,"Method was been updated");
    assert.deepEqual(updateMeal, managerM.getMealByID(2) , "meals are equal" );
});
QUnit.test( "update meal with incorrect parameter", function( assert ) {
    var updateMeal = managerM.getMealByID(2);
    updateMeal.id="";
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect id (empty string)");
    updateMeal.id=null;
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect id (null)");
/*  updateMeal.id=5;
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect id(id is in the db)"); //TODO not updated another meal
    updateMeal.id=2;*/
    updateMeal.name="";
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect name (empty string)");
    updateMeal.name=null;
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect name (null)");
    updateMeal.name="steak2";
    updateMeal.method="";
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect method (empty string)");
    updateMeal.method=null;
    assert.throws(function() {managerM.updateMeal(updateMeal);},"throws, meal with incorrect method (null)");
    updateMeal.method="100g";
    updateMeal.protein=0;
    updateMeal.carbohydrate=0;
    updateMeal.fat=0;
    updateMeal.kcal=0;
    assert.throws(function() {managerM.addMeal(updateMeal);},"throws, meal with all empty optional parameters");
});
QUnit.test( "delete meals", function( assert ) {
    for(var i=1;i<=7;i++){
        managerM.deleteMealByID(i);
    }
    assert.ok( managerM.isEmpty() , "DB is empty" );
    assert.ok( managerM.nextMealId()==1 , "Passed! next free Id after delete" );
});
QUnit.test( "delete storage", function( assert ) {
    localStorage.clear();
    managerM.getAllMeals().length=0;
    assert.equal(1,managerM.nextMealId(), "storage was deleted" );
});
