var globalMealsManager = null;
var globalDaysManager = null;
var globalExercisesManager = null;

window.addEventListener(
    "load",
    function() {
        globalMealsManager = new MealsManager();
		globalDaysManager = new DaysManager();
		globalExercisesManager = new ExercisesManager();
    }
);

QUnit.module( "Set Up" , {});
QUnit.test( "Set up managers", function( assert ) {
    assert.ok( globalMealsManager instanceof MealsManager , "Meals manager was set" );
    assert.ok( globalExercisesManager instanceof ExercisesManager , "Exercises manager was set" );
    assert.ok( globalDaysManager instanceof DaysManager , "Days manager was set" );
});