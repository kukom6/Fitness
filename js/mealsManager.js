/**
 * Created by mkralik on 2/14/16.
 */
var globalMealsManager = new MealsManager(); //TODO move to init()

function MealsManager(){
    var meals = [];
    /**
     * Get meal by ID form DB
     * @param id - meal id
     * @returns {Meal} - return new copy meal from DB
     */
    this.getMealByID = function(id){
        console.log("getMealById: "+id);
        if(id==""||id==null){
            console.error("invalid ID");
            throw "invalid argument exception";
        }
        var result = this.indexMealInArrayById(id);
        if(result == -1){
            console.error("Meal with " + id + " id is not in the DB");
            throw "Meal with " + id + " id is not in the DB";
        }
        var originalMeal = meals[result];
        console.log("Meal : \n" + originalMeal + "\n was been gotten from DB");
        var returnMeal = new Meal(originalMeal.name,originalMeal.protein,originalMeal.carbohydrate,originalMeal.fat,originalMeal.kcal,originalMeal.method,originalMeal.partOfDay);
        returnMeal.id = id;
        return returnMeal;
 //       return meals[result]; //unsafe ?? !!
    };
    /**
     * Get all meals from DB
     * @returns {Array} - array meals from DB
     */
    this.getAllMeals = function(){
        console.log("getAllMeals");
        return meals; //TODO unsafe !!
    };
    this.getMealsInBreakfast = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="breakfast"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    this.getMealsInDinner = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="dinner"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    this.getMealsInLunch = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="lunch"){
                returnMeals.push(meals[i]);
            }
        }        
        return returnMeals;
    };
    this.getMealsInSnack = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="snack"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    /**
     * add meal to the db (create new meal object)
     * @param meal
     */
    this.addMeal = function(meal){
        console.log("addMeal" + meal);
        if(!this.correctArgument(meal)){
            throw "invalid argument exception";
        }
        this.addMissingValue(meal);
        var pushMeal = new Meal(meal.name,meal.protein,meal.carbohydrate,meal.fat,meal.kcal,meal.method,meal.partOfDay); //safe ?
        pushMeal.id=this.nextMealId();
        meals.push(pushMeal);
        saveLocal();
        console.log("Meal : \n" + meal + "\n was been added to DB");
    };
    /**
     * Update meal in the DB
     * @param meal - updated meal
     */
    this.updateMeal = function(meal){
        console.log("updateMeal" + meal);
        if(!this.correctArgument(meal)){ //TODO correct if id is not incorrect
            throw "invalid argument exception";
        }
        this.addMissingValue(meal);
        var result = this.indexMealInArrayById(meal.id);
        if(result == -1){
            console.error("Meal with " + id + " id is not in the DB use add function!");
            throw "Meal with " + id + " id is not in the DB use add function!";
        }
        meals[result].name=meal.name;
        meals[result].protein=meal.protein;
        meals[result].carbohydrate=meal.carbohydrate;
        meals[result].fat=meal.fat;
        meals[result].kcal=meal.kcal;
        meals[result].method=meal.method;
        meals[result].partOfDay=meal.partOfDay;
        saveLocal();
        console.log("Meal : \n" + meal + "\n was been updated DB");
    };
    /**
     * Delete meal from DB
     * @param id - meal id
     */
    this.deleteMealByID = function(id){
        console.log("deleteMealById: "+id);
        var index= this.indexMealInArrayById(id);
        if(index == -1){
            console.error("Meal with " + id + " id is not in the DB");
            throw "Meal with " + id + " id is not in the DB" ;
        }
        meals.splice(index,1);
        saveLocal();
        console.log("Meal was deleted from DB");
    };
    /**
     * Next free ID for new meal
     * @returns {number} - free ID
     */
    this.nextMealId = function(){
        for(var i=0;i<=meals.length;i++){
            if(!this.isIdInDB(i+1)){
                return i+1;
            }
        }
    };
    /**
     * If meal is in the DB
     * @param id - meal id
     * @returns {boolean}
     */
    this.isIdInDB = function(id){
        if(id==""||id==null){
            console.error("invalid ID in isIdInDb");
            throw "invalid argument exception";
        }
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
    /**
     * Chech if the arguments are correct
     * @param meal
     * @returns {boolean}
     */
    this.correctArgument = function(meal){
        if(meal.name==null||meal.name==""){
            console.error("Invalid name: "+meal.name);
            return false;
        }
        if(meal.method!="100g"&&meal.method!="one piece"){
            console.error("Invalid method: "+meal.method);
            return false;
        }
        if((meal.protein==null||meal.protein==""||meal.protein==0)&&
            (meal.carbohydrate==null||meal.carbohydrate==""||meal.carbohydrate==0)&&
            (meal.fat==null||meal.fat==""||meal.fat==0)&&
            (meal.kcal==null||meal.kcal==""||meal.kcal==0)
        ){
            console.error("Invalid argument, at least one parameter must be filled");
            return false;
        }
        return true;
    };
    /**
     * fill missing optionally values
     * @param meal
     */
    this.addMissingValue = function(meal){
        if(meal.protein==null||meal.protein==""||meal.protein=="NaN"){
            meal.protein=0;
        }
        if(meal.carbohydrate==null||meal.carbohydrate==""||meal.carbohydrate=="NaN"){
            meal.carbohydrate=0;
        }
        if(meal.fat==null||meal.fat==""||meal.fat=="NaN"){
            meal.fat=0;
        }
        if(meal.kcal==null||meal.kcal==""||meal.kcal=="NaN"){
            meal.kcal= meal.protein*4 + meal.carbohydrate*4 + meal.fat*9;
        }
    };
    /**
     * sum of protein
     * @returns {number} sum
     */
    this.sumProtein = function(){
        var sum=0;
        for(var i=0;i<meals.length;i++){
            sum+=Number(meals[i].protein);
        }
        return sum;
    };
    /**
     * sum of carbohydrate
     * @returns {number} sum
     */
    this.sumCarbohydrate = function(){
        var sum=0;
        for(var i=0;i<meals.length;i++){
            sum+=Number(meals[i].carbohydrate);
        }
        return sum;
    };
    /**
     * sum of fat
     * @returns {number} sum
     */
    this.sumFat = function(){
        var sum=0;
        for(var i=0;i<meals.length;i++){
            sum+=Number(meals[i].fat);
        }
        return sum;
    };
    /**
     * sum of kcal
     * @returns {number} sum
     */
    this.sumKcal = function(){
        var sum=0;
        for(var i=0;i<meals.length;i++){
            sum+=Number(meals[i].kcal);
        }
        return sum;
    };
    //TODO sort, this way ?
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
}
