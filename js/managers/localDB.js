/**
 * load global managers from upload file
 * @param jsonFiles
 */
function loadJSONasFile(jsonFiles){
    var reader = new FileReader();
    reader.onload = function(event) {
        var tempArr = JSON.parse(event.target.result);
        var saveJSON = {
            meals : tempArr['meals'],
            exercises : tempArr['exercises'],
            days : tempArr['days']
        };
        var data = JSON.stringify(saveJSON);
        localStorage.setItem('jsonData',data);
        var days = tempArr['daysContent'];
        var currentDate= null;
        for(var i= 0;i<days.length;i++){
            currentDate=days[i]['date'];
            saveJSON={
                date : currentDate,
                dayMeals : days[i]['dayMeals'],
                dayExercises : days[i]['dayExercises']
            };
            data = JSON.stringify(saveJSON);
            localStorage.setItem(currentDate,data);
        }
        localStorage.setItem('isInLocal',true);
        loadLocal();
        console.log("db was add from JSON file to local storage and loaded");
    };
    reader.readAsText(jsonFiles[0]);
}
/**
 * Load all global managers from local storage
 */
function loadLocal(){
    var data = localStorage.getItem('jsonData');
    var tempArr = JSON.parse(data);
    if(!parseJSONtoLocal(tempArr)){
        throw "DB unsuccessfully loaded from local DB";
    }
    if(globalMealsManager.isEmpty() && globalMealsManager.isEmpty() && globalDaysManager.isEmpty()){ //DB in local storage was been empty
        throw "DB in the local storage is empty!";
    }
    console.log("DB was successful loaded from local storage");
    return true;
}
/**
 * Save global managers to local storage
 */
function saveLocal(){
    var saveJSON = {
        meals : globalMealsManager.getAllMeals(),
        exercises : globalExercisesManager.getAllExercises(),
        days : globalDaysManager.getAllDays()
    };
    var data = JSON.stringify(saveJSON);
    localStorage.setItem('jsonData',data);
    var days = globalDaysManager.getAllDays();
    var         currentDate= null;
    for(var i= 0;i<days.length;i++){
        currentDate=days[i].date.toDateString();
        saveJSON={
            date : currentDate,
            dayMeals : days[i].mealsManager.getAllMeals(),
            dayExercises : days[i].exercisesManager.getAllExercises()
        };
        data = JSON.stringify(saveJSON);
        localStorage.setItem(currentDate,data);
    }
    localStorage.setItem('isInLocal',true);
    console.log("DB was saved");
}
/**
 * Export global managers to JSON file
 */
function saveJSON(){
    var saveJSON = {
        meals : globalMealsManager.getAllMeals(),
        exercises : globalExercisesManager.getAllExercises(),
        days : globalDaysManager.getAllDays(),
        daysContent : []
    };
    var days = globalDaysManager.getAllDays();
    var currentDate,day= null;
    for(var i= 0;i<days.length;i++){
        currentDate=days[i].date.toDateString();
        day={
            date : currentDate,
            dayMeals : days[i].mealsManager.getAllMeals(),
            dayExercises : days[i].exercisesManager.getAllExercises()
        };
        saveJSON.daysContent.push(day);
    }
    var data = 'data:text/json;charser=utf8,'+ encodeURIComponent(JSON.stringify(saveJSON));
    var local = null;
    if(device.platform=="Android") {
        checkPermission();
        if (cordova.file.externalRootDirectory == null) {
            local = cordova.file.dataDirectory;
        } else {
            local = cordova.file.externalRootDirectory;

        }
        var fileTransfer = new FileTransfer();
        fileTransfer.download(
            data,
            local + 'data.json',
            function (theFile) {
                alert("download complete: " + theFile.toURL());
                console.log("download complete: " + theFile.toURL());
            },
            function (error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code: " + error.code);
            },
            true
        );
    }else if(device.platform=="windows"){
        alert("Windows version doesn't support download yet");
    }else{//browser
        var a = document.createElement('a');
        a.style="display: none;";
        a.href = data;
        a.download = 'data.json';
        document.getElementById("downloadVisible").appendChild(a);
        a.click();
    }
}

function checkPermission(){
	var permissions = cordova.plugins.permissions;
	permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionCallback, null);

	function checkPermissionCallback(status) {
	if(!status.hasPermission) {
	var errorCallback = function() {
	  console.warn('Camera permission is not turned on');
	}

	permissions.requestPermission(
	  permissions.WRITE_EXTERNAL_STORAGE,
	  function(status) {
		if(!status.hasPermission) errorCallback();
	  },
	  errorCallback);
	}
}
}
/**
 * delete all data in the local storage and clean global managers
 */
function deleteLocal(){
    if(device.platform!="windows"){
        if (confirm("Delete local storage! Are you sure?") == true) {
            onConfirm(1);
        }
    }else {
        confirm(
            'Are you sure?',
            onConfirm,
            'Delete local storage!',
            ['Yes', 'No']
        );
    }
}

function onConfirm(buttonIndex) {
    if(buttonIndex==1){
        localStorage.clear();
        globalDaysManager = new DaysManager();
        globalExercisesManager = new ExercisesManager();
        globalMealsManager = new MealsManager();
        alert("Local storage was been deleted");
    }
}

/**
 * Parsing JSON to the local objects
 * @param tempArr - parse JSON
 * @returns {boolean}
 */
function parseJSONtoLocal(tempArr){
    if(tempArr == null){
        return false;
    }
    for(var i=0;i<tempArr["meals"].length;i++){ //load meals
        globalMealsManager.addMeal(new Meal(
            tempArr["meals"][i].name,
            tempArr["meals"][i].protein,
            tempArr["meals"][i].carbohydrate,
            tempArr["meals"][i].fat,
            tempArr["meals"][i].kcal,
            tempArr["meals"][i].method
        ));
    }
    for(i=0;i<tempArr["exercises"].length;i++){ //load exercises
        globalExercisesManager.addExercise(new Exercise(
            tempArr["exercises"][i].name,
            tempArr["exercises"][i].kcal));
    }
    var saveDay,storageDay,dayManagers,dayDate = null;
    var specificDay = []; // helpful variable
    for(i=0;i<tempArr["days"].length;i++){  //load days with days and exercises
        specificDay = tempArr["days"][i];
        dayDate = new Date(specificDay['date']);
        storageDay = localStorage.getItem(dayDate.toDateString());
        dayManagers= JSON.parse(storageDay);
        saveDay = new Day(dayDate);
        //todo add managers data
        for(var j=0;j<dayManagers['dayMeals'].length;j++){ //add all meals to day
            saveDay.mealsManager.addMeal(new Meal(
                dayManagers["dayMeals"][j].name,
                dayManagers["dayMeals"][j].protein,
                dayManagers["dayMeals"][j].carbohydrate,
                dayManagers["dayMeals"][j].fat,
                dayManagers["dayMeals"][j].kcal,
                dayManagers["dayMeals"][j].method,
                dayManagers["dayMeals"][j].partOfDay
            ));
        }
        for(j=0;j<dayManagers['dayExercises'].length;j++){ //add all exercises to day
            saveDay.exercisesManager.addExercise(new Exercise(
                dayManagers["dayExercises"][j].name,
                dayManagers["dayExercises"][j].kcal));
        }
        globalDaysManager.addDay(saveDay);
    }
    return true;
}
/**
 * test if web browser supported local storage
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}