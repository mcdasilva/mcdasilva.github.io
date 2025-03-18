function addToggleEvent(){

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", toggleFunction);
    }

    function toggleFunction(event){

        let currentAcc = event.currentTarget;
    
        currentAcc.classList.toggle("active");
    
        var panel = currentAcc.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    }

}