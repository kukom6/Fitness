/**
 * Created by mkralik on 3/21/16.
 */
function generatedData(){
    loadArrayMeals(); //meals
    var exercises;
    for(var i=0;i<20;i++){ //exercises
        exercises=new Exercise("run"+i,i+i+i+i+i+i+i+i+100);
        globalExercisesManager.addExercise(exercises);
    }
    var random,randomId,date,day;
    for(i=1;i<57;i++){ //day
        if(i>30){
            var h=i-29;
            if(h<10){
                date=new Date("2015-04-0"+h);
            }else{
                date=new Date("2015-04-"+h);

            }
        }else{
            if(i<10){
                date=new Date("2015-03-0"+i);
            }else{
                date=new Date("2015-03-"+i);
            }
        }
        day = new Day(date);
        random = Math.floor((Math.random() * 13) + 1);
        for(var j=0;j<random;j++){ //meals
            randomId=Math.floor((Math.random() * (globalMealsManager.nextMealId() -1)) + 1);
            day.mealsManager.addMeal(globalMealsManager.getMealByID(randomId))
        }
        random = Math.floor((Math.random() * 4) + 1);
        for(j=0;j<random;j++){ //exercises
            randomId=Math.floor((Math.random() * (globalExercisesManager.nextExerciseId() -1)) + 1);
            day.exercisesManager.addExercise(globalExercisesManager.getExerciseByID(randomId));
        }
        globalDaysManager.addDay(day);
    }
    alert("Random data have been generated.");
}
function loadArrayMeals(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        var meal,randMethod;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tempArr = JSON.parse(xmlhttp.responseText);
            for(var j=0;j<tempArr.length;j++){
                if((Math.floor((Math.random() * 2) + 1))==1){
                    randMethod="100g";
                }else{
                    randMethod="one piece"
                }
                meal=new Meal(tempArr[j].name.substring(0, 10),tempArr[j].protein,tempArr[j].carbohydrate,tempArr[j].fat,tempArr[j].kcal,randMethod);
                globalMealsManager.addMeal(meal);
            }
        }
    };
    xmlhttp.open("GET", "testData.json", true);
    xmlhttp.send();
}