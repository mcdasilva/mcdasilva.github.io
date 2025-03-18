const TITLES = ['Cliffs and Rocks', 'Cosmic Reflections', 'Entangled']

const DESC = ['My artwork reinterprets <em>The League Long Breakers Thundering on the Reef,</em> by William Trost Richards, painted in 1887. \
    The reinterpretation simplifies the natural beauty of the cliffs, waves, and rocks into geometric shapes, focusing on abstraction rather than \
    realism. I chose a minimalist style to highlight the composition and balance of the scene, using shapes like rectangles, ellipses, and polygons \
    to capture the rocks, water, and cliffs. The palette retains a connection to the original, with earthy tones and oceanic hues, but introduces \
    modern digital texture.', 

    '<em>Cosmic Reflections</em> explores the convergence of harmony and chaos in the universe. The flowing, radiant curves represent the balance between \
    structure and unpredictability, inviting viewers to reflect on the unseen forces that shape our reality. This piece aims to capture the feeling \
    of staring into the infinite, where movement and stillness coexist in a delicate dance.',

    '<em>Entangled</em> explores the infinite possibilities woven into the fabric of existence. The chaotic yet deliberate lines represent the countless \
    paths a life can take, intersecting and diverging in an endless dance of choice and chance. This piece invites reflection on the unseen \
    connections that shape who we are and who we might become.'];


let galleryHTML = '';
let slide = '';
let dots = '';

for(let i = 0; i < TITLES.length; i++){
    galleryHTML += `
    <div class="gallery-item">
        <img src="../Images/output${i+1}.png" alt="${TITLES[i]}">
        <div class="gallery-text">
            <h2>${TITLES[i]}</h2>
            <h3>By Matheus Coutinho da Silva</h3>
            <p>${DESC[i]}</p>
        </div>
    </div>`;

    slide += `
    <div class='mySlides fade'>
        <div class='numbertext'>` + (i+1) + '/' + TITLES.length + `</div>
        <div class="gallery-item">
            <img src="../Images/output` + (i+1) + `.png" alt="` + TITLES[i] +`">
            <div class="gallery-text">
                <p>` + DESC[i] + `</p>
            </div>
            <div class="text creative">
                <em>` + TITLES[i] + `</em>, by Matheus Coutinho da Silva
            </div>
        </div>
    </div>`;
}

document.getElementById('list-mode').innerHTML = galleryHTML;

slide += `<!-- Next and previous buttons -->
<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>`;

document.getElementById('slideshow').innerHTML = slide;

for(let i = 0; i < TITLES.length; i++){
    dots += `<span class="dot creative" onclick="currentSlide(` + (i+1) + `)"></span>
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
    document.getElementById('list-mode').style.display = 'none';
    document.getElementById('slideshow-mode').style.display = 'block';
    document.getElementById('mode-switch').innerHTML = 'SWITCH TO LIST'
  }
  else {
    document.getElementById('list-mode').style.display = 'block';
    document.getElementById('slideshow-mode').style.display = 'none';
    document.getElementById('mode-switch').innerHTML = 'SWITCH TO SLIDESHOW'
  }

}