function MealsManager(){
    var meals = [];
    /**
     * Add meal to the meal manager
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
        saveMealsManager();
        console.log("Meal : \n" + meal + "\n was been added to DB");
    };
    /**
     * Update meal in the meal manager
     * @param meal - updated meal
     */
    this.updateMeal = function(meal){
        console.log("updateMeal" + meal);
        if(!this.correctArgument(meal)){
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
        saveMealsManager();
        console.log("Meal : \n" + meal + "\n updated in the DB");
    };
    /**
     * Delete meal from meal manager
     * @param id - id particular meal
     */
    this.deleteMealByID = function(id){
        console.log("deleteMealById: "+id);
        var index= this.indexMealInArrayById(id);
        if(index == -1){
            console.error("Meal with " + id + " id is not in the DB");
            throw "Meal with " + id + " id is not in the DB" ;
        }
        meals.splice(index,1);
        saveMealsManager();
        console.log("Meal was deleted from DB");
    };
    /**
     * Get meal by ID form meal manager
     * @param id - meal id
     * @returns {Meal} - return from meal manager
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
     * Get all meals from meal manager
     * @returns {Array} - array meals from meal manager
     */
    this.getAllMeals = function(){
        console.log("getAllMeals");
        return meals;
    };
    /**
     * Get all meals which have breakfast in the part of day
     * @returns {Array}
     */
    this.getMealsInBreakfast = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="breakfast"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    /**
     * Get all meals which have dinner in the part of day
     * @returns {Array}
     */
    this.getMealsInDinner = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="dinner"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    /**
     * Get all meals which have lunch in the part of day
     * @returns {Array}
     */
    this.getMealsInLunch = function(){
        var returnMeals = [];
        for(var i=0;i<meals.length;i++){
            if(meals[i].partOfDay=="lunch"){
                returnMeals.push(meals[i]);
            }
        }
        return returnMeals;
    };
    /**
     * Get all meals which have snack in the part of day
     * @returns {Array}
     */
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
     * If meal is in the meal manager
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
     * If meals manager is empty
     * @returns {boolean} - if meals array is empty
     */
    this.isEmpty = function(){
        return meals.length==0;
    };
    /**
     * Index particular meal in the exercise manager
     * @param id - meal id
     * @return {number} index meal in the array
     */
    this.indexMealInArrayById = function(id){
        for (var i = 0; i < meals.length; i++) {
            if (meals[i].id == id) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Check if the arguments are correct
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
     * Fill missing optionally values
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
     * Sum of protein in meal manager
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
     * Sum of carbohydrate in meal manager
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
     * Sum of fat in meal manager
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
     * Sum of kcal in meal manager
     * @returns {number} sum
     */
    this.sumKcal = function(){
        var sum=0;
        for(var i=0;i<meals.length;i++){
            sum+=Number(meals[i].kcal);
        }
        return sum;
    };
    /**
     * Sort meals in the meal manager by name - from A
     */
    this.sortByNameFromA = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.name.localeCompare(meal2.name);
        });
    };
    /**
     * Sort meals in the meal manager by name - from Z
     */
    this.sortByNameFromZ = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.name.localeCompare(meal1.name);
        });
    };
    /**
     * Sort meals in the meal manager by protein - descending
     */
    this.sortByProteinDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.protein - meal2.protein;
        });
    };
    /**
     * Sort meals in the meal manager by protein - ascending
     */
    this.sortByProteinAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.protein - meal1.protein;
        });
    };
    /**
     * Sort meals in the meal manager by carbohydrate - descending
     */
    this.sortByCarbohydrateDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.carbohydrate - meal2.carbohydrate;
        });
    };
    /**
     * Sort meals in the meal manager by carbohydrate - ascending
     */
    this.sortByCarbohydrateAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.carbohydrate - meal1.carbohydrate;
        });
    };
    /**
     * Sort meals in the meal manager by fat - descending
     */
    this.sortByFatDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.fat - meal2.fat;
        });
    };
    /**
     * Sort meals in the meal manager by fat - ascending
     */
    this.sortByFatAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.fat - meal1.fat;
        });
    };
    /**
     * Sort meals in the meal manager by kcal - descending
     */
    this.sortByKcalDescending = function(){
        meals.sort(function(meal1, meal2) {
            return meal1.kcal - meal2.kcal;
        });
    };
    /**
     * Sort meals in the meal manager by kcal - ascending
     */
    this.sortByKcalAscending = function(){
        meals.sort(function(meal1, meal2) {
            return meal2.kcal - meal1.kcal;
        });
    };
}
