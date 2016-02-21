QUnit.test( "add meal to DB", function( assert ) {
    managerM.addMeal(new Meal(1,"steak",20,0,20,800,"100g"));
    assert.notOk( managerM.isEmpty() , "Add to db was OK!, DB is not empty" );
});
QUnit.test( "next free meal id", function( assert ) {
    assert.ok( managerM.nextMealId()==2 , "Next free ID is OK" );
});
QUnit.test( "is meal with ID in DB", function( assert ) {
    assert.ok( managerM.isIdInDB(1) , "Meal with ID 1 is in the DB" );
});
QUnit.test( "get all meals", function( assert ) {
    managerM.addMeal(new Meal(2,"steak2",30,0,30,200,"100g"));
    assert.equal(2,managerM.getAllMeals().length,"All meals are in the returned DB");
});
QUnit.test( "get meal by id", function( assert ) {
    var testMeal = managerM.getMealByID(1);
    assert.equal(1,testMeal.id,"Id is equals");
    assert.equal("steak",testMeal.name,"name is equals");
    assert.equal(20,testMeal.protein,"protein is equals");
    assert.equal(0,testMeal.carbohydrate,"carbohydrate is equals");
    assert.equal(20,testMeal.fat,"fat is equals");
    assert.equal(800,testMeal.kcal,"kcal is equals");
    assert.equal("100g",testMeal.method,"method is equals");
});

QUnit.test( "delete meals", function( assert ) {
    managerM.deleteMealByID(1);
    managerM.deleteMealByID(2);
    assert.ok( managerM.isEmpty() , "DB is empty" );
    assert.ok( managerM.nextMealId()==0 , "Passed! next free Id after delete" );
});
