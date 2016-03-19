/**
 * Created by mkralik on 3/19/16.
 */
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
                    revealPage("homePage");
                }
            );
        }
        button = document.getElementById("cancelExerciseAdd");
        if (button) {
            button.addEventListener(
                "click",
                function() {
                    revealPage("homePage");
                }
            );
        }
    }
);
