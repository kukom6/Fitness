/**
 * Created by mkralik on 9/1/16.
 */
function showGraph(type, numberOfDaySelection){
    console.log("Show graph with type: '"+type.value+"' and number of day is: "+numberOfDaySelection.value);
    var title="Undefined type of meal";
    switch(type.value) {
        case "protein":
            title="Protein";
            break;
        case "carbohydrate":
            title="Carbohydrate";
            break;
        case "fat":
            title="Fat";
            break;
        case "kcal":
            title="Kcal";
            break;
    }
    var today = new Date();
    var data = [];
    var day = null;
    for(var i=0;i<numberOfDaySelection.value;i++){
        var actualDay = new Date(today - (86400000*i));
        try{
            day = globalDaysManager.getDayByDate(actualDay);
            if(day.isEmpty()){
                data.push({label: day.date.toLocaleDateString(), y: 0});
            }else{
                switch(type.value) {
                    case "protein":
                        data.push({label: day.date.toLocaleDateString(), y: Number(day.mealsManager.sumProtein().toFixed(0))});
                        break;
                    case "carbohydrate":
                        data.push({label: day.date.toLocaleDateString(), y: Number(day.mealsManager.sumCarbohydrate().toFixed(0))});
                        break;
                    case "fat":
                        data.push({label: day.date.toLocaleDateString(), y: Number(day.mealsManager.sumFat().toFixed(0))});
                        break;
                    case "kcal":
                        data.push({label: day.date.toLocaleDateString(), y: Number(globalDaysManager.totalKcal(actualDay).toFixed(0))});
                        break;
                }
            }
        }catch(ex){ //if day is not in the DB manager
            data.push({label: actualDay.toLocaleDateString(), y: 0});
        }
    }


    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "theme2",//theme1
        title:{
            text: title
        },
        animationEnabled: true,
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: data
            }
        ]
    });
    chart.render();
}