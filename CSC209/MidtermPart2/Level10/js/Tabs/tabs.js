function openPrintButton(evt, imgName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(imgName).style.display = "block";
    evt.currentTarget.className += " active";
}

function createTab(){
    const tab = document.getElementsByClassName('tab');

    for(let i = 0; i < window.NRIMAGES; i++){
        const button = document.createElement('button');
        button.classList.add('tablinks');
        button.setAttribute('onclick', `openPrintButton(event, 'image${i+1}')`);

        if (i == 0){
            button.id = "defaultOpen";
        }

        button.textContent = `Image ${i+1}`;

        tab[0].appendChild(button);
    }

}

function createTabContent(){

    const tabContentContainer = document.getElementById('tabcontent-container');

    for(let i = 0; i < window.NRIMAGES; i++){
        const tabContent = document.createElement('div');
        tabContent.id = `image${i+1}`;
        tabContent.classList.add("tabcontent");

        const printButton = document.createElement('button');
        printButton.classList.add(`printButton`);
        printButton.textContent = `Print Image ${i + 1}`;
        printButton.style.position = 'relative';
        printButton.style.padding = '10px';

        tabContent.appendChild(printButton);

        tabContentContainer.append(tabContent);

    }

}

function addDownloadEvent(){
    
    const printButtons = document.getElementsByClassName('printButton');

    Array.from(printButtons).forEach((button, i) => {

        button.addEventListener('click', function(){printImage(i)});
        
    });

}

function printImage(i){

    const originalContent = document.body.innerHTML;

    document.body.innerHTML = '';

    const img = document.createElement('img');

    img.src = `../../images/output${i + 1}.png`

    document.body.appendChild(img);

    setTimeout(() => {
        window.print();
        document.body.innerHTML = originalContent;
        addDownloadEvent();
    }, 200);

}


