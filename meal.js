/**
 * Created by mkralik on 2/13/16.
 */

/**
 * type meal
 */
function meal(id,name,protein,carbohydrate,fat,kcal){
    this.id=id;
    this.name=name;
    this.protein=protein;
    this.carbohydrate=carbohydrate;
    this.fat=fat;
    this.kcal=kcal;

    this.toString = function () {
        return "Jedlo " + this.name + " ma: "+ this.protein + "g proteinov," +
            " " + this.carbohydrate + "g sacharidov, " + this.fat + "g tukov a " + this.kcal + "kcal na 100g."
    }
}

