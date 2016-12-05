/**
 * Type of day
 * @param date - date of day
 * @constructor
 */
function Day(date){
    this.date=date;
    this.restriction=null;
    this.mealsManager = new MealsManager();
    this.exercisesManager = new ExercisesManager();

    this.isEmpty = function(){
        return this.mealsManager.isEmpty()&&this.exercisesManager.isEmpty();
    };
    
    this.toString = function () {
        var result = "";
        result += "Date " +this.date.toLocaleString()+ ":\n";
        result += "Restriction " +this.restriction+ ":\n";
        result += "Meals: \n";
        var dayMeals = this.mealsManager.getAllMeals();
        for(var j=0;j<dayMeals.length;j++){
            result+=dayMeals[j];
            result+="\n";
        }
        result += "Exercises: \n";
        var dayExercises = this.exercisesManager.getAllExercises();
        for(j=0;j<dayExercises.length;j++){
            result+=dayExercises[j];
            result+="\n";
        }
        return result;
    }
}