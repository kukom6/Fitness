/**
 * Type of exercise
 * @param name - name of exercise
 * @param kcal - count of exercise
 * @constructor
 */
function Exercise(name,kcal){
    this.id=null;
    this.name=name;
    this.kcal=kcal;

    this.toString = function () {
        return "Exercise " + this.name + " has " +this.kcal+ "kcal per minute.";
    }
}
