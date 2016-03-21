var previousPages =[];
previousPages.push("homePage");

function savePreviousPage(){
    var activePage=document.querySelector(".principal > div.pagebody[aria-expanded=true]");
    previousPages.push(activePage.getAttribute("id"));
}