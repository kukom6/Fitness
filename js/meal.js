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
 * @param partOfDay - how part of day meal was eaten (lunch,breakfast,lunch,dinner)
 * @constructor
 */
function Meal(name,protein,carbohydrate,fat,kcal,method,partOfDay){
    this.id=null; //TODO or var id = null; get+set
    this.name=name;
    this.protein=protein;
    this.carbohydrate=carbohydrate;
    this.fat=fat;
    this.kcal=kcal;
    this.method=method;
    this.partOfDay=partOfDay;

    this.toString = function () {
        var res = "Meal " + this.name + " have: "+ this.protein + "g proteins," +
            " " + this.carbohydrate + "g carbohydrates, " + this.fat + "g fats and " + this.kcal + "kcal for "+ this.method +".";
        if(this.partOfDay==null){
            res += "Part of day is not set yet.";
            return res;
        }
        return res;
    }
}

