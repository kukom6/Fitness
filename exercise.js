/**
 * Created by mkralik on 2/13/16.
 */

/**
 * type exercise
 */
function exercise(id,name,kcal){
    this.id=id;
    this.name=name;
    this.kcal=kcal;

    this.toString = function () {
        return "Cvik " + this.name + " spotrebuje " +this.kcal+ "kcal za minutu.";
    }
}
