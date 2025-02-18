function readMe(section) { 
    if (document.getElementById("buttonReadMe").innerHTML == 'Read Me') {

        if (section === 'schedule'){
            document.getElementById("readMe").innerHTML = `<pre>1. Only "schedule" and "syllabus" in the navigation bar have links. The others 
are placeholders.

2. The technical part of HW3 is the slideshow that appears when you click on 
the 'SWITCH TO SLIDESHOW' button.</pre>`;
        }
        else {
            document.getElementById("readMe").innerHTML = `<pre>I used Lorem Ipsum as a placeholder for the actual syllabus.</pre>`;
        }
        
        document.getElementById("readMe").style.display = 'inline-block';

        document.getElementById("buttonReadMe").innerHTML = 'Hide me'
    }
    else {
        document.getElementById("buttonReadMe").innerHTML = 'Read Me'
        document.getElementById("readMe").style.display = 'none';
    }

}