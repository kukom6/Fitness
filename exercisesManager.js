/**
 * Created by mkralik on 2/14/16.
 */
var exercises = [];
var managerE = new ExercisesManager(); //TODO move to init()

function ExercisesManager(){
    this.sortByIdDescending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise1.id - exercise2.id;
        });
    };

    this.sortByIdAscending = function(){
        exercises.sort(function(exercise1, exercise2) {
            return exercise2.id - exercise1.id;
        });
    }
}

