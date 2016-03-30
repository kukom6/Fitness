/**
 * Create table for particular day
 * @param inDate - date of the day
 * @param homePage - if is true, day table will be on homePage
 * @returns {Element} HTML table
 */
function createDayTable(homePage,inDate){
    var dayDate;
    if(inDate instanceof Date){
        dayDate=inDate;
    }else{
        dayDate=new Date(inDate);
    }
    var currentDate = globalDaysManager.getDayByDate(dayDate);
    var tabDay = document.createElement("table"); //create day table
    tabDay.style.width = "100%";
    tabDay.id = currentDate.date;
    var caption = document.createElement("caption");
    var date = currentDate.date.toDateString();
    caption.appendChild(document.createTextNode(date));
    caption.style.fontWeight = "bold";
    tabDay.appendChild(caption);
    tabDay.appendChild(createDayMealsTable(homePage,currentDate));
    tabDay.appendChild(createDayExerciseTable(homePage,currentDate));

    var tabfoot = document.createElement("table");
    tabfoot.style.width = "100%";
    tabfoot.className = "dayTable" ;
    var tfoot = document.createElement("tfoot");
    var tr = document.createElement("tr");
    tr.style.background = "goldenrod";
    var node = document.createElement("td");
    node.appendChild(document.createTextNode("Total day kcal"));
    tr.appendChild(node);
    node = document.createElement("td");
    node.appendChild(document.createTextNode(globalDaysManager.totalKcal(new Date(date)).toFixed(1)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabfoot.appendChild(tfoot);
    tabDay.appendChild(tabfoot);

    var deleteB = document.createElement("button");
    deleteB.id = date;
    deleteB.onclick = function() {
        if (confirm("Are you sure ?") == false) {
            return;
        }
        var date=this.id;
        globalDaysManager.deleteDayByDate(new Date(date));
        if(homePage){
            deleteShowTable("homeBoard");
            showHomepage();
            revealPage("dayBoard");
        }else{
            deleteShowTable("dayBoard");
            deleteShowTable("daysBoard");
            showGlobalDays();
            revealPage("dayBoard");
        }
    };
    deleteB.appendChild(document.createTextNode("Delete day"+date));
    tabDay.appendChild(deleteB);

    var addB = document.getElementById("addMealButton");
    addB.setAttribute("date",date);
    addB.onclick = function() {
        deleteShowTable("addFromMealsBoard");
        showAddMealsBoard(homePage,this.getAttribute("date"));
    };
    addB = document.getElementById("addExerciseButton");
    addB.setAttribute("date",date);
    addB.onclick = function() {
        deleteShowTable("addFromExercisesBoard");
        showAddExercisesBoard(homePage,this.getAttribute("date"));
    };
    return tabDay;
}
/**
 * Create meals table for particular day
 * @param homePage - if is true, table will be on homePage
 * @param day - particular day
 * @returns {Element} - HTML table
 */
function createDayMealsTable(homePage,day){
    var manager = null;
    if(day){
        manager = day.mealsManager;
    }else{
        console.error("Date must be set!");
        throw "invalid argument exception";
    }
    var tabMeals = document.createElement("table"); 
    tabMeals.style.width = "100%";
    tabMeals.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Meals"));
    caption.style.textAlign = "center";
    tabMeals.appendChild(caption);

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
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");

    var array = manager.getMealsInBreakfast(); 
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Breakfast"));
    node.setAttribute("colspan","5");
    node.style.textAlign = "center";
    node.style.backgroundColor = "gainsboro";
    tr.appendChild(node);
    tbody.appendChild(tr);
    for(var j=0;j<array.length;j++){
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(homePage,this.getAttribute("idMeal"));
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
        tbody.appendChild(tr);
    }

    array = manager.getMealsInLunch(); 
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Lunch"));
    node.setAttribute("colspan","5");
    node.style.textAlign = "center";
    node.style.backgroundColor = "gainsboro";
    tr.appendChild(node);
    tbody.appendChild(tr);
    for(j=0;j<array.length;j++){
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(homePage,this.getAttribute("idMeal"));
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
        tbody.appendChild(tr);
    }

    array = manager.getMealsInDinner();
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Dinner"));
    node.setAttribute("colspan","5");
    node.style.textAlign = "center";
    node.style.backgroundColor = "gainsboro";
    tr.appendChild(node);
    tbody.appendChild(tr);
    for(j=0;j<array.length;j++){
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(homePage,this.getAttribute("idMeal"));
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
        tbody.appendChild(tr);
    }

    array = manager.getMealsInSnack();
    tr = document.createElement("tr");
    node = document.createElement("td");
    node.appendChild(document.createTextNode("Snack"));
    node.setAttribute("colspan","5");
    node.style.textAlign = "center";
    node.style.backgroundColor = "gainsboro";
    tr.appendChild(node);
    tbody.appendChild(tr);
    for(j=0;j<array.length;j++){
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","LM#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditMeal(homePage,this.getAttribute("idMeal"));
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
    node.appendChild(document.createTextNode(manager.sumKcal().toFixed(1)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
/**
 * Create meals table from global meals manager
 * @param homePage - if is true, table will be on homePage
 * @param date - optional, date of day when we can show global table and choice meals to this day.
 * @returns {Element} - HTML table
 */
function createGlobalMealsTable(homePage,date){
    var manager = globalMealsManager;
    var array = manager.getAllMeals();
    var tabMeals = document.createElement("table");
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
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }else{
            globalMealsManager.sortByNameFromZ();
            commonSort = "asc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("P"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByProteinAscending();
            commonSort = "desc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }else{
            globalMealsManager.sortByProteinDescending();
            commonSort = "asc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("C"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByCarbohydrateAscending();
            commonSort = "desc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }else{
            globalMealsManager.sortByCarbohydrateDescending();
            commonSort = "asc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("F"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByFatAscending();
            commonSort = "desc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }else{
            globalMealsManager.sortByFatDescending();
            commonSort = "asc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalMealsManager.sortByKcalAscending();
            commonSort = "desc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }else{
            globalMealsManager.sortByKcalDescending();
            commonSort = "asc";
            deleteShowTable("mealsBoard");
            showGlobalMeals(homePage);
        }
    };
    tr.appendChild(node);
    thead.appendChild(tr);
    tabMeals.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){  //show all meals in the day
        tr = document.createElement("tr");
        tr.setAttribute("idMeal","GM#"+array[j].id);
        if(date){
            tr.setAttribute("dateMeal",date);
            tr.onclick = function(){
                fillAddMeal(homePage,this.getAttribute("dateMeal"),this.getAttribute("idMeal"));
            };
        }else{
            tr.onclick = function(){
                fillEditMeal(homePage,this.getAttribute("idMeal"));
            };
        }
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
    node.appendChild(document.createTextNode(String(manager.sumKcal().toFixed(1))));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabMeals.appendChild(tfoot);
    return tabMeals;
}
/**
 * Create exercises table for particular day
 * @param homePage - if is true, table will be on homePage
 * @param day - particular day
 * @returns {Element} - HTML table
 */
function createDayExerciseTable(homePage,day){
    var manager = null;
    if(day){
        manager = day.exercisesManager;
    }else{
        console.error("Date must be set!");
        throw "invalid argument exception";
    }
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); 
    tabExercises.style.width = "100%";
    tabExercises.className = "dayTable" ;
    var caption = document.createElement("caption");
    caption.appendChild(document.createTextNode("Exercises"));
    caption.style.textAlign = "center";
    tabExercises.appendChild(caption);

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
    for(var j=0;j<array.length;j++){ 
        tr = document.createElement("tr");
        tr.setAttribute("idExercise","LE#"+day.date+"#"+array[j].id);
        tr.onclick = function(){
            fillEditExercise(homePage,this.getAttribute("idExercise"));
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
    node.appendChild(document.createTextNode('-'+manager.sumKcal().toFixed(1)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}
/**
 * Create exercises table from global exercises manager
 * @param homePage - if is true, table will be on homePage
 * @param date - optional, date of day when we can show global table and choice exercise to this day.
 * @returns {Element} - HTML table
 */
function createGlobalExercisesTable(homePage,date){
    var manager = globalExercisesManager;
    var array = manager.getAllExercises();
    var tabExercises = document.createElement("table"); 
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
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
        }else{
            globalExercisesManager.sortByNameFromZ();
            commonSort = "asc";
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
        }
    };
    tr.appendChild(node);
    node = document.createElement("th");
    node.appendChild(document.createTextNode("Kcal"));
    node.onclick = function(){
        if(commonSort=="asc"){
            globalExercisesManager.sortByKcalAscending();
            commonSort = "desc";
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
        }else{
            globalExercisesManager.sortByKcalDescending();
            commonSort = "asc";
            deleteShowTable("exercisesBoard");
            showGlobalExercises(homePage);
        }
    };
    tr.appendChild(node);
    thead.appendChild(tr);
    tabExercises.appendChild(thead);

    var tbody = document.createElement("tbody");
    for(var j=0;j<array.length;j++){
        tr = document.createElement("tr");
        tr.setAttribute("idExercise","GE#"+array[j].id);
        if(date){
            tr.setAttribute("dateExercise",date);
            tr.onclick = function(){
                fillAddExercise(homePage,this.getAttribute("dateExercise"),this.getAttribute("idExercise"));
            };
        }else{
            tr.onclick = function(){
                fillEditExercise(homePage,this.getAttribute("idExercise"));
            };
        }
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
    node.appendChild(document.createTextNode('-'+manager.sumKcal().toFixed(1)));
    tr.appendChild(node);
    tfoot.appendChild(tr);
    tabExercises.appendChild(tfoot);
    return tabExercises;
}