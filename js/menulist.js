window.addEventListener(
    "load",
    function() {
       var revealers = document.querySelectorAll("div.menulist > menuitem[aria-controls]");
       for (var i=0, max=revealers.length; i < max; ++i) {
          revealers[i].addEventListener(
              "click",
              function() {
                  revealPage(this.getAttribute("aria-controls"));
                  document.getElementById("sidebar_trigger").click();
              }
          );
       }
    }
);