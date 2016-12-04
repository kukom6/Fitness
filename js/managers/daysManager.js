function DaysManager(){
    var days = [];
    /**
     * Ddd day to the days manager
     * @param day
     */
    this.addDay = function(day){
        if(this.isDayInDB(day.date)){
            console.error("date: "+day.data+" is already in db, please update exist day");
            throw "date: "+day.data+" is already in db, please update exist day";
        }
        days.push(day);
        saveDaysManager();
        console.log("Day: "+day.date+" was added to DB");
    };
    /**
     * Add meal to the particular day
     * @param date - date of day
     * @param meal
     */
    this.addMealToDay = function(date, meal){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        if(meal.partOfDay!="breakfast" && meal.partOfDay!="lunch" && meal.partOfDay!="dinner" && meal.partOfDay!="snack"){
            console.error("Meal with " + id + " id does not contain part of day! Meal which not have part of day cannot add to the day.");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.mealsManager.addMeal(meal);
        saveDaysManager();
        console.log("Meal: "+meal+" was added to day: "+day.date.toDateString());
    };
    /**
     * Add exercise to the particular day
     * @param date - date of day
     * @param exercise
     */
    this.addExerciseToDay = function(date, exercise){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.exercisesManager.addExercise(exercise);
        saveDaysManager();
        console.log("Exercise: "+exercise+" was added to day: "+day.date.toDateString());
    };
    /**
     * Delete meal from particular date
     * @param date
     * @param idMeal
     */
    this.deleteMealInDay = function(date,idMeal){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.mealsManager.deleteMealByID(idMeal);
        console.log("Meal was deleted from day: "+day.date.toDateString());
        saveDaysManager();
    };
    /**
     * Delete exercise from particular date
     * @param date
     * @param idExercise
     */
    this.deleteExerciseInDay = function(date,idExercise){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.exercisesManager.deleteExerciseByID(idExercise);
        console.log("Exercise was deleted from day: "+day.date.toDateString());
        saveDaysManager();
    };
    /**
     * Update meal in the particular date
     * @param date
     * @param meal
     */
    this.updateMealInDay = function(date,meal){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        if(meal==""||meal==null){
            console.error("invalid meal");
            throw "invalid argument exception";
        }
        if(meal.partOfDay!="breakfast" && meal.partOfDay!="lunch" && meal.partOfDay!="dinner" && meal.partOfDay!="snack"){
            console.error("Meal with " + id + " id does not contain part of day!");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.mealsManager.updateMeal(meal);
        console.log("Meal was updated in day: "+day.date.toDateString());
        saveDaysManager();
    };
    /**
     * Update exercise in the particular date
     * @param date
     * @param exercise
     */
    this.updateExerciseInDay = function(date,exercise){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        if(exercise==""||exercise==null){
            console.error("invalid exercise");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.exercisesManager.updateExercise(exercise);
        console.log("Exercise was updated in day: "+day.date.toDateString());
        saveDaysManager();
    };
    /**
     * Get day by date
     * @param date
     * @returns {Day} particular date
     */
    this.getDayByDate = function(date){
        console.log("getDayByDate: "+date);
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var result = this.indexDayInArrayById(date);
        if(result == -1){
            console.error("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB";
        }
        console.log("Day : \n" + date.toDateString() + "\n was been gotten from DB");
        return days[result];
    };
    /**
     * Get all days from the days manager
     * @returns {Array} all days
     */
    this.getAllDays = function() {
        console.log("getAllDays");
        return days;
    };
    /**
     * Delete particular date from days manager
     * @param date
     */
    this.deleteDayByDate = function(date){
        console.log("deleteDayByDate: "+date);
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var index= this.indexDayInArrayById(date);
        if(index == -1){
            console.error("Day with " + date + " date is not in the DB");
            throw "Day with " + date + " date is not in the DB" ;
        }
        days.splice(index,1);
        saveDaysManager();
        console.log("Day was deleted from DB");
    };
    /**
     * If day is in day manager
     * @param date
     * @returns {boolean}
     */
    this.isDayInDB = function(date){
        if(date==""||date==null){
            console.error("invalid date parameter in isDayInDb");
            throw "invalid argument exception";
        }
        return (this.indexDayInArrayById(date) != -1) ;
    };
    /**
     * If days manager is empty
     * @returns {boolean}
     */
    this.isEmpty = function(){
        return days.length==0;
    };
    /**
     * index particular date in the days manager
     * @param dateIn
     * @returns {number}
     */
    this.indexDayInArrayById = function(dateIn){
        for (var i = 0; i < days.length; i++) {
            if (days[i].date.toDateString() == dateIn.toDateString()) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Return total kcal in the particular date
     * @param date
     * @returns {number} total kcal
     */
    this.totalKcal = function(date){
        var day = this.getDayByDate(date);
        return day.mealsManager.sumKcal() - day.exercisesManager.sumKcal();
    };
    /**
     * Add restriction to day
     * @param date
     * @param restriction
     */
    this.addRestrictionToDay = function(date, restriction){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        if(restriction==""||restriction==null){
            console.error("invalid restriction");
            throw "invalid argument exception";
        }
        if(!this.checkValidityRestriction(restriction)){
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.restriction = new Restriction(restriction.protein,restriction.carbohydrate,restriction.fat,restriction.kcal);
        saveDaysManager();
        console.log("Restriction: "+restriction+" was added to day: "+day.date.toDateString());
    };
    /**
     * Delete restriction from date
     * @param date
     */
    this.deleteRestriction = function(date){
        if(date==""||date==null){
            console.error("invalid date");
            throw "invalid argument exception";
        }
        var day=this.getDayByDate(date);
        day.restriction=null;
        console.log("Restriction was deleted from day: "+day.date.toDateString());
    };
    /**
     * Check if restriction is valid
     * @param restriction
     * @returns {boolean}
     */
    this.checkValidityRestriction = function(restriction) {
        var isOnlyNumber = function(str){ //test if value from form is only number
            return (/^[0-9.]*$/).test(str) ;
        };
        if(restriction.protein=="NaN"){
            restriction.protein=null;
        }if(!isOnlyNumber(restriction.protein)&&restriction.protein!=null&&restriction.protein!=""){
            console.error("Invalid protein restriction: "+restriction.protein);
            return false;
        }if(restriction.carbohydrate=="NaN"){
            restriction.carbohydrate=null;
        }if(!isOnlyNumber(restriction.carbohydrate)&&restriction.carbohydrate!=null&&restriction.carbohydrate!="") {
            console.error("Invalid carbohydrate restriction: " + restriction.carbohydrate);
            return false;
        }if(restriction.fat=="NaN"){
            restriction.fat=null;
        }if(!isOnlyNumber(restriction.fat)&&restriction.fat!=null&&restriction.fat!="") {
            console.error("Invalid fat restriction: " + restriction.fat);
            return false;
        }if(restriction.kcal=="NaN"){
            restriction.kcal=null;
        }if(!isOnlyNumber(restriction.kcal)&&restriction.kcal!=null&&restriction.kcal!=""){
            console.error("Invalid kcal restriction: "+restriction.kcal);
            return false;
        }
        return true;
    }
}