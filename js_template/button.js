var previousPage = "homePage";
function savePreviousPage(){
    var activePage=document.querySelector(".principal > div.pagebody[aria-expanded=true]");
    previousPage=activePage.getAttribute("id");
}