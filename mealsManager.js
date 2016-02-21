/**
 * Created by mkralik on 2/14/16.
 */
var meals = [];
var managerM = new MealsManager(); //TODO move to init()

function MealsManager(){

    this.sortByIdDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.id - meal2.id;
        });
    };
    this.sortByIdAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.id - meal1.id;
        });
    };
    this.sortByNameFromA = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.name.localeCompare(meal2.name);
        });
    };
    this.sortByNameFromZ = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.name.localeCompare(meal1.name);
        });
    };
    this.sortByProteinDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.protein - meal2.protein;
        });
    };
    this.sortByProteinAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.protein - meal1.protein;
        });
    };
    this.sortByCarbohydrateDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.carbohydrate - meal2.carbohydrate;
        });
    };
    this.sortByCarbohydrateAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.carbohydrate - meal1.carbohydrate;
        });
    };
    this.sortByFatDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.fat - meal2.fat;
        });
    };
    this.sortByFatAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.fat - meal1.fat;
        });
    };
    this.sortByKcalDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.kcal - meal2.kcal;
        });
    };
    this.sortByKcalAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.kcal - meal1.kcal;
        });
    };
    this.sortByMethodFromA = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.method.localeCompare(meal2.method);
        });
    };
    this.sortByMethodFromZ = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.method.localeCompare(meal1.method);

        });
    };
}
