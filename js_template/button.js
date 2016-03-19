window.addEventListener(
    "load",
    function() {
        var button = document.getElementById("backHome");
        if (button) {
            button.addEventListener(
                "click",
                function() {
                    revealPage("homePage");
                }
            );
        }
        button = document.getElementById("cancelFoodAdd");
        if (button) {
            button.addEventListener(
                "click",
                function() {
                    revealPage(previousPage);
                }
            );
        }
        button = document.getElementById("cancelExerciseAdd");
        if (button) {
            button.addEventListener(
                "click",
                function() {
                    revealPage(previousPage);
                }
            );
        }
    }
);

var previousPage = "homePage";
function savePreviousPage(){
    var activePage=document.querySelector(".principal > div.pagebody[aria-expanded=true]");
    previousPage=activePage.getAttribute("id");
}