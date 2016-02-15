/**
 * Created by mkralik on 2/14/16.
 */
var meals = [];

function mealsManager(){

    this.sortByIdDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.id - meal2.id;
        });
    }

    this.sortByIdAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.id - meal1.id;
        });
    }
}
var managerM = new mealsManager(); //TODO move to init()