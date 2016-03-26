/**
 * Created by mkralik on 3/26/16.
 */
function createDayTable(inDate){
    var dayDate;
    try{ //if date is string or date object
        dayDate.toLocaleString();
        dayDate=inDate;
    }catch(ex){
        dayDate=new Date(inDate);
    }
    var currentDate = globalDaysManager.getDayByDate(dayDate);
    var tabDay = document.createElement("table"); //create day table
    tabDay.style.border = "thin dotted red";
    tabDay.style.width = "100%";
    tabDay.id = currentDate.date;
    var caption = document.createElement("caption");
    var date = currentDate.date.toDateString();
    caption.appendChild(document.createTextNode("Day: "+date));
    caption.style.fontWeight = "bold";
    tabDay.appendChild(caption);
    tabDay.appendChild(createDayMealsTable(currentDate));
    tabDay.appendChild(createDayExerciseTable(currentDate));
    var deleteB = document.createElement("button");
    deleteB.id = date;
    deleteB.onclick = function() {
        if (confirm("Are you sure ?") == false) {
            return;
        }
        var date=this.id;
        globalDaysManager.deleteDayByDate(new Date(date));
        deleteShow("dayBoard");
        showDay(new Date(date));
    };
    deleteB.appendChild(document.createTextNode("Delete day"+date));
    tabDay.appendChild(deleteB);
    return tabDay;
}
function createDayMealsTable(day){
    var manager = null;
    if(day){
        manager = day.mealsManager;
    }else{
        return;
    }
    var array = manager.getAllMeals();
    var tabMeals = document.createElement("table"); //create meals table
    tabMeals.style.width = "100%";
    tabMeals.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals"));
    caption.style.textAlign = "center";
    tabMeals.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("P"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("C"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("F"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Met"));
    tr.appendChild(node);
    node = document.createElement("th"); //TEMP part of day
    node.appendChild(document.createTextNode("Part"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","GM#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(this.getAttribute("idMeal"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].protein));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].carbohydrate));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].fat));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].method));
        tr.appendChild(node);
        node = document.createElement("td"); //TEMP part of day
        node.appendChild(document.createTextNode(array[j].partOfDay));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabMeals.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Total"));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumProtein().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumCarbohydrate().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumFat().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(String(manager.sumKcal().toFixed(2))));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td"); //TEMP part of day
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
function createGlobalMealsTable(){
    var manager = globalMealsManager;
    var array = manager.getAllMeals();
    var tabMeals = document.createElement("table"); //create meals table
    tabMeals.style.width = "100%";
    tabMeals.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals"));
    caption.style.textAlign = "center";
    tabMeals.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByNameFromA();
            commonSort = "desc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }else{
            globalMealsManager.sortByNameFromZ();
            commonSort = "asc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("P"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByProteinAscending();
            commonSort = "desc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }else{
            globalMealsManager.sortByProteinDescending();
            commonSort = "asc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("C"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByCarbohydrateAscending();
            commonSort = "desc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }else{
            globalMealsManager.sortByCarbohydrateDescending();
            commonSort = "asc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("F"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByFatAscending();
            commonSort = "desc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }else{
            globalMealsManager.sortByFatDescending();
            commonSort = "asc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByKcalAscending();
            commonSort = "desc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }else{
            globalMealsManager.sortByKcalDescending();
            commonSort = "asc";
            deleteShow("mealsBoard");
            showGlobalMeals();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Met"));
    tr.appendChild(node);
    node = document.createElement("th"); //TEMP part of day
    node.appendChild(document.createTextNode("Part"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","GM#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(this.getAttribute("idMeal"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].protein));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].carbohydrate));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].fat));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].method));
        tr.appendChild(node);
        node = document.createElement("td"); //TEMP part of day
        node.appendChild(document.createTextNode(array[j].partOfDay));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabMeals.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Total"));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumProtein().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumCarbohydrate().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(manager.sumFat().toFixed(1)));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(String(manager.sumKcal().toFixed(2))));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    node = document.createElement("td"); //TEMP part of day
    node.appendChild(document.createTextNode(""));
    node.align = "middle";
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
function createDayExerciseTable(day){
    var manager = null;
    if(day){
        manager = day.exercisesManager;
    }else{
        return;
    }
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); //create exercises table
    tabExercises.style.width = "100%";
    tabExercises.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Exercises"));
    caption.style.textAlign = "center";
    tabExercises.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    tr.appendChild(node);
    thead.appendChild(tr);
    tabExercises.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){ //show all exercises in the day
        tr = document.createElement("tr");
        tr.setAttribute("idExercise","LE#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditExercise(this.getAttribute("idExercise"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabExercises.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode('Total'));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode('-'+manager.sumKcal().toFixed(2)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}
function createGlobalExercisesTable(){
    var manager = globalExercisesManager;
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); //create exercises table
    tabExercises.style.width = "100%";
    tabExercises.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Exercises"));
    caption.style.textAlign = "center";
    tabExercises.appendChild(caption);
    //create head table
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var node = document.createElement("th");
    node.appendChild(document.createTextNode("Name"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalExercisesManager.sortByNameFromA();
            commonSort = "desc";
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }else{
            globalExercisesManager.sortByNameFromZ();
            commonSort = "asc";
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalExercisesManager.sortByKcalAscending();
            commonSort = "desc";
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }else{
            globalExercisesManager.sortByKcalDescending();
            commonSort = "asc";
            deleteShow("exercisesBoard");
            showGlobalExercises();
        }
    }
    tr.appendChild(node);
    thead.appendChild(tr);
    tabExercises.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){ //show all exercises in the day
        tr = document.createElement("tr");
        tr.setAttribute("idExercise","GE#"+array[j].id);
        tr.onclick = function(){
            fillEditExercise(this.getAttribute("idExercise"));
        };
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].name));
        tr.appendChild(node);
        node = document.createElement("td");
        node.appendChild(document.createTextNode(array[j].kcal));
        tr.appendChild(node);
        tbody.appendChild(tr);
    }
    tabExercises.appendChild(tbody);

    var tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode('Total'));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode('-'+manager.sumKcal().toFixed(2)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}