/**
 * Created by mkralik on 2/14/16.
 */
var managerM = new MealsManager(); //TODO move to init()

function MealsManager(){
    var meals = [];

    this.getMealByID = function(id){
        var result = this.indexMealInArrayById(id);
        if(result == -1){
            alert("Meal with " + id + " id is not in the DB");
            return; //TODO throw ?
        }
        return meals[result]; //TODO unsafe !!
    };

    this.getAllMeals = function(){ //todo copy meals ?
        return meals; //TODO unsafe !!
    };

    this.addMeal = function(meal){
        //TODO test validation
        meals.push(meal); //TODO unsafe!!
        saveLocal();
    };

    this.updateMeal = function(meal){

    };
    /**
     * Delete meal from DB
     * @param id - meal id
     */
    this.deleteMealByID = function(id){
        var index= this.indexMealInArrayById(id);
        if(index == -1){
            alert("Meal with " + id + " id is not in the DB");
            return; //TODO throw ?
        }
        meals.splice(index,1);
        console.log("Meal was deleted from DB");
        saveLocal();
    };
    /**
     * Next free ID for new meal
     * @returns {number} - free ID
     */
    this.nextMealId = function(){
        this.sortByIdAscending();
        try{
            var id = parseInt(meals[0].id);
        }catch(ex){
            return 0;
        }
        return id + 1;
    };

    /**
     * If meal is in the DB
     * @param id - meal id
     * @returns {boolean}
     */
    this.isIdInDB = function(id){
        return this.indexMealInArrayById(id) != -1 ;
    };

    /**
     * @returns {boolean} - if meals array is empty
     */
    this.isEmpty = function(){
        return meals.length==0;
    };

    /**
     * @param id - meal id
     * @return index meal in the array
     */
    this.indexMealInArrayById = function(id){
        return meals.findIndex(function(meal){
            return id==meal.id;
        });
    };

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
