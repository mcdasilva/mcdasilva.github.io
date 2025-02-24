// #################################################################################

const WEEKS = ['Wed 1/29', 'Wed 2/5', 'Wed 12/5']
const TOPICS = ['Introduction to Web Programming: Basics of HTML and CSS.', 'HTML & CSS: Styling Web Pages and Layout Techniques.', 'JavaScript: Introduction'];
let slide = '';
let dots = '';

for(let i = 0; i < TOPICS.length; i++){
    slide += `<div class='mySlides fade'>
        <div class='numbertext'>` + (i+1) + '/' + TOPICS.length + `</div>
        <a href="./Topic` + (i+1) + `/topic` + (i+1) + `.html" target="_blank">
            <img src="../Images/topic` + (i+1) + `.jpg" style="width:100%; vertical-align: middle;">
        </a>
        <div class="text">Lecture ` + (i+1) + ' - ' + WEEKS[i] + ' - ' + TOPICS[i] + `</div>
    </div>` ;
}

slide += `<!-- Next and previous buttons -->
<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>`;


document.getElementById('slideshow').innerHTML = slide;

for(let i = 0; i < TOPICS.length; i++){
    dots += `<span class="dot" onclick="currentSlide(` + (i+1) + `)"></span>
    `;
}

document.getElementById('dots').innerHTML = dots;

// #################################################################################

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// #################################################################################

function switchModes(){
  let currentMode = document.getElementById('mode-switch').innerHTML;

  if (currentMode === 'SWITCH TO SLIDESHOW'){
    document.getElementById('table-mode').style.display = 'none';
    document.getElementById('slideshow-mode').style.display = 'block';
    document.getElementById('mode-switch').innerHTML = 'SWITCH TO TABLE'
  }
  else {
    document.getElementById('table-mode').style.display = 'block';
    document.getElementById('slideshow-mode').style.display = 'none';
    document.getElementById('mode-switch').innerHTML = 'SWITCH TO SLIDESHOW'
  }

}
