var globalChart = null;

function showGraph(type, numberOfDaySelection){
    if (type.value === 'multi') {
        showMultipleGraph(numberOfDaySelection);
    } else {
        showTypeOfGraph(type, numberOfDaySelection);
    }
}

function showTypeOfGraph(type, numberOfDaySelection){
    console.log("Show graph with type: '" + type.value + "' and number of day is: " + numberOfDaySelection.value);
    var title = "Undefined type of meal";
    var color='rgba(153, 102, 255, 0.7)';
    switch (type.value) {
        case "protein":
            title = "Protein";
            color = 'rgba(54, 162, 235, 0.7)';
            break;
        case "carbohydrate":
            title = "Carbohydrate";
            color = 'rgba(255, 99, 132, 0.7)';
            break;
        case "fat":
            title = "Fat";
            color = 'rgba(75, 192, 192, 0.7)';
            break;
        case "kcal":
            title = "Kcal";
            color = 'rgba(255, 159, 64, 0.7)';
            break;
    }
    var today = new Date();
    var data = [];
    var dates = [];
    var day = null;
    for (var i = 0; i < numberOfDaySelection.value; i++) {
        var actualDay = new Date(today - (86400000 * i));
        try {
            day = globalDaysManager.getDayByDate(actualDay);
            if (day.isEmpty()) {
                data.push(0);
                dates.push(day.date.toLocaleDateString());
            } else {
                switch (type.value) {
                    case "protein":
                        dates.push(day.date.toLocaleDateString());
                        data.push(Number(day.mealsManager.sumProtein().toFixed(0)));
                        break;
                    case "carbohydrate":
                        dates.push(day.date.toLocaleDateString());
                        data.push(Number(day.mealsManager.sumCarbohydrate().toFixed(0)));
                        break;
                    case "fat":
                        dates.push(day.date.toLocaleDateString());
                        data.push(Number(day.mealsManager.sumFat().toFixed(0)));
                        break;
                    case "kcal":
                        dates.push(day.date.toLocaleDateString());
                        data.push(Number(globalDaysManager.totalKcal(actualDay).toFixed(0)));
                        break;
                }
            }
        } catch (ex) { //if day is not in the DB manager
            dates.push(actualDay.toLocaleDateString());
            data.push(0);
        }
    }
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext('2d');
    if(globalChart!=null){
        globalChart.destroy();
    }
    globalChart=new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: title,
                backgroundColor: color,
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function showMultipleGraph(numberOfDaySelection) {
    var today = new Date();
    var dates = [];
    var day = null;
    var proteins = [];
    var carbohydrates = [];
    var fats= [];
    for (var i = 0; i < numberOfDaySelection.value; i++) {
        var actualDay = new Date(today - (86400000 * i));
        try {
            day = globalDaysManager.getDayByDate(actualDay);
            if (day.isEmpty()) {
                dates.push(day.date.toLocaleDateString());
                proteins.push(0);
                carbohydrates.push(0);
                fats.push(0);
            } else {
                dates.push(day.date.toLocaleDateString());
                proteins.push(Number(day.mealsManager.sumProtein().toFixed(0)));
                carbohydrates.push(Number(day.mealsManager.sumCarbohydrate().toFixed(0)));
                fats.push(Number(day.mealsManager.sumFat().toFixed(0)));
            }
        }catch (ex) { //if day is not in the DB manager
            dates.push(day.date.toLocaleDateString());
            proteins.push(0);
            carbohydrates.push(0);
            fats.push(0);
        }
    }

    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext('2d');
    if(globalChart!=null){
        globalChart.destroy();
    }
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Protein",
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                data: proteins
            },
            {
                label: "Carbohydrate",
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                data: carbohydrates
            },
            {
                label: "Fat",
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                data: fats
            }
        ]
    };
    globalChart=new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}