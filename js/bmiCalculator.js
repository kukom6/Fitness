/**
 * Bmi calculator
 */
function calculateBmi(){

    var form=document.getElementById("bmiForm");
    var showNumber=document.getElementById("resultBMI");
    if(showNumber.firstChild){
        showNumber.removeChild(showNumber.firstChild);
    }
    if(!validateBmiForm(form[0].value)){
        return;
    }
    var height = parseFloat(form[0].value).toFixed(2);
    if(form[1].value==='feet'){ //convert to cm
        height = height * 30.40;
        height=height.toFixed(1);
    }
    height /= 100;
    if(!validateBmiForm(form[2].value)){
        return
    }
    var weight = parseFloat(form[2].value).toFixed(1);
    if(form[3].value==='lbs'){ //convert to kg
        weight =  weight / 2.2046;
        weight = weight.toFixed(1);
    }
    var result = (weight/(height*height)).toFixed(1);
    showNumber.innerText=result;
    if(result>=40) showNumber.style.color='red';
    else if(result>35)  showNumber.style.color='orangered';
    else if(result>30)  showNumber.style.color='purple';
    else if(result>25)  showNumber.style.color='darkgoldenrod';
    else if(result>18.5)  showNumber.style.color='greenyellow';
    else if(result<18.5)  showNumber.style.color='red';
}

function refreshHeightPlaceholder() {
    var form = document.getElementById("bmiForm");
    form[0].value=null;
    if (form[1].value === 'feet') {
        form[0].placeholder='5.9';
    }else{
        form[0].placeholder='180';
    }
}

function refreshWeightPlaceholder(){
    var form=document.getElementById("bmiForm");
    form[2].value=null;
    if(form[3].value==='lbs'){
        form[2].placeholder='165';
    }else{
        form[2].placeholder='75';
    }
}
function validateBmiForm(value){
    var isOnlyNumber = function(value){ //test if value from form is only number
        return (/^[0-9.]*$/).test(value) ;
    };
    var containsComma = function(value){
        return value.indexOf(',') !== -1;
    };
    if(value==null||value==""){
        alert("Values must be filled");
        return false;
    }
    if(!isOnlyNumber(value)){
        alert("Height/weight must contains only numbers!");
        return false;
    }
    if(containsComma(value)){
        alert("Please use a period instead of comma in the decimal numbers!");
        return false;
    }
    return true;
}