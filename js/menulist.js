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
        var myElement = document.getElementById('allPage');

        // create a simple instance
        // by default, it only adds horizontal recognizers
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
