QUnit.module( "Work With DB" , {
    beforeEach: function() {
        localStorage.clear();
        globalExercisesManager=new ExercisesManager();
        globalDaysManager= new DaysManager();
        globalMealsManager= new MealsManager();
    }
});
QUnit.test( "test local db", function( assert ) {
    globalMealsManager.addMeal(new Meal("steakGlobal",30,0,10,600,"one piece"));
    globalMealsManager.addMeal(new Meal("steak2Global",10,0,5,300,"100g"));
    globalExercisesManager.addExercise(new Exercise("runGlobal",600));
    globalDaysManager.addDay(new Day(new Date()));
    globalDaysManager.addDay(new Day(new Date("2015-03-25")));

    var getDay=globalDaysManager.getDayByDate(new Date());
    getDay.mealsManager.addMeal(globalMealsManager.getMealByID(1));
    getDay.mealsManager.addMeal(new Meal("D1steakLocal",50,10,5,300,"100g"));
    getDay.mealsManager.addMeal(new Meal("D1steak2Local",100,0,50,300,"100g"));
    getDay.exercisesManager.addExercise(globalExercisesManager.getExerciseByID(1));
    getDay.exercisesManager.addExercise(new Exercise("D1runLocal",100));

    getDay = globalDaysManager.getDayByDate(new Date("2015-03-25"));
    getDay.mealsManager.addMeal(new Meal("D2steakLocal",40,0,50,300,"100g"));
    getDay.mealsManager.addMeal(new Meal("D2steak2Local",60,10,0,300,"100g"));
    getDay.mealsManager.addMeal(globalMealsManager.getMealByID(2));
    getDay.exercisesManager.addExercise(new Exercise("D2runLocal",200));
    getDay.exercisesManager.addExercise(new Exercise("D2run2Local",300));
    getDay.exercisesManager.addExercise(globalExercisesManager.getExerciseByID(1));
    saveLocal();
    globalExercisesManager=new ExercisesManager();
    globalDaysManager= new DaysManager();
    globalMealsManager= new MealsManager();
    assert.ok(globalDaysManager.isEmpty()&&globalExercisesManager.isEmpty()&&globalDaysManager.isEmpty(),"global managers was been deleted");
    loadLocal();
    assert.notOk(globalMealsManager.isEmpty(),"global meals manager is not empty, load successful");
    assert.equal("steakGlobal",globalMealsManager.getMealByID(1).name,"meal is in global manager");
    assert.equal("runGlobal",globalExercisesManager.getExerciseByID(1).name,"exercise is in global manager");

    assert.equal("steakGlobal",globalDaysManager.getDayByDate(new Date()).mealsManager.getMealByID(1).name,"global meal is in the 1. day manager");
    assert.equal("D1steakLocal",globalDaysManager.getDayByDate(new Date()).mealsManager.getMealByID(2).name,"local meal is in the 1. day manager");
    assert.equal("runGlobal",globalDaysManager.getDayByDate(new Date()).exercisesManager.getExerciseByID(1).name,"global exercise is in the 1. day manager");
    assert.equal("D1runLocal",globalDaysManager.getDayByDate(new Date()).exercisesManager.getExerciseByID(2).name,"local exercise is in the 1. day manager");

    assert.equal("steak2Global",globalDaysManager.getDayByDate(new Date("2015-03-25")).mealsManager.getMealByID(3).name,"global meal is in the 2. day manager");
    assert.equal("D2steak2Local",globalDaysManager.getDayByDate(new Date("2015-03-25")).mealsManager.getMealByID(2).name,"local meal is in the 2. day manager");
    assert.equal("runGlobal",globalDaysManager.getDayByDate(new Date("2015-03-25")).exercisesManager.getExerciseByID(3).name,"global exercise is in the 2. day manager");
    assert.equal("D2run2Local",globalDaysManager.getDayByDate(new Date("2015-03-25")).exercisesManager.getExerciseByID(2).name,"local exercise is in the 2. day manager");
});
QUnit.test( "delete storage", function( assert ) {
    globalMealsManager.addMeal(new Meal("steakGlobal",30,0,10,600,"one piece"));
    assert.ok(localStorage.length>0,"local storage is not empty");
    localStorage.clear();
    assert.ok(localStorage.length==0,"local storage is empty");
});
