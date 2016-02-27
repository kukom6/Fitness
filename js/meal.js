/**
 * Created by mkralik on 2/13/16.
 */

/**
 *  Type Meal
 * @param id
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
        return "Jedlo " + this.name + " ma: "+ this.protein + "g proteinov," +
            " " + this.carbohydrate + "g sacharidov, " + this.fat + "g tukov a " + this.kcal + "kcal na "+ this.method +"."
    }
}

