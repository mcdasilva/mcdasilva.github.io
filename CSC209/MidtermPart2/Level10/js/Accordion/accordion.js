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


function addSections(){

    const acc = document.getElementById('accordion-container');

    for (let i = 0; i < window.NRIMAGES; i++){
        addSection(i, acc);
    }
}


function addSection(i, acc) {
    const button = document.createElement('button');
    button.setAttribute('class', 'accordion');
    button.textContent = `Download image ${i + 1}`;

    const panel = document.createElement('div');
    panel.setAttribute('class', 'panel');

    const link = document.createElement('a');
    link.setAttribute('href', `../../images/output${i + 1}.png`);
    link.setAttribute('download', `Image${i + 1}`);
    link.textContent = `Click here to download Image ${i + 1}`;

    panel.appendChild(link);

    acc.appendChild(button);
    acc.appendChild(panel);
}

