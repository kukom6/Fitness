window.addEventListener(
    "load",
    function() {
       var revealers = document.querySelectorAll("div.menulist > menu > menuitem[aria-controls]");
       for (var i=0, max=revealers.length; i < max; ++i) {
          revealers[i].addEventListener(
              "click",
              function() {
                  revealPage(this.getAttribute("aria-controls"));
                  document.getElementById("sidebar_trigger").click();
              }
          );
       }
       /*set up hammer.js for support gestures*/
        var myElement = document.getElementById('allPage');
        var sidebarOn = new Hammer(myElement);
        sidebarOn.on("swiperight swipeleft", function(ev) {
            if(ev.type=="swipeleft") {
                if(document.querySelector(".sidebar").getAttribute("aria-expanded") === "true"){
                    toggleSidebarView();
                }
            }else{
                toggleSidebarView();
            }
        });
        myElement = document.getElementById('sidebar');
        var sidebarOff = new Hammer(myElement);
        sidebarOff.on("swipeleft", function(ev) {
            toggleSidebarView();
        });
    }
);
