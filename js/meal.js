/**
 * Created by mkralik on 2/13/16.
 */

/**
 *  Type Meal
 * @param name - name of meal
 * @param protein - count of protein
 * @param carbohydrate - count of carbohydrate
 * @param fat - count of fat
 * @param kcal - count of kcal
 * @param method - "100g" - the values are on 100g ;"one piece" - the values are on one piece
 * @constructor
 */
function Meal(name,protein,carbohydrate,fat,kcal,method){
    this.id=null; //TODO or var id = null; get+set
    this.name=name;
    this.protein=protein;
    this.carbohydrate=carbohydrate;
    this.fat=fat;
    this.kcal=kcal;
    this.method=method;

    this.toString = function () {
        return "Meal " + this.name + " have: "+ this.protein + "g proteins," +
            " " + this.carbohydrate + "g carbohydrates, " + this.fat + "g fats and " + this.kcal + "kcal for "+ this.method +"."
    }
}

