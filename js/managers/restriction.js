
function Restriction(protein,carbohydrate,fat,kcal){
    this.protein=protein;
    this.carbohydrate=carbohydrate;
    this.fat=fat;
    this.kcal=kcal;

    this.toString = function () {
        return "Restriction " + this.name + " has: "+ this.protein + "g proteins," +
            " " + this.carbohydrate + "g carbohydrates, " + this.fat + "g fats and " + this.kcal + "kcal.";
    }
}