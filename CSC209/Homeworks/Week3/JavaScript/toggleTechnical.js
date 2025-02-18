let toggle = document.getElementById('darkmodeToggle');
let themeLink = document.getElementById('themeMode');

if (localStorage.getItem('theme') == 'dark'){
    toggle.checked = true
    themeLink.setAttribute('href', "../CSSStyles/stylesDarkModeTechnical.css")
}
else {
    toggle.checked = false
    themeLink.setAttribute('href', "../CSSStyles/stylesLightMode.css")
}


toggle.addEventListener('change', function(){
    if (toggle.checked) {
        themeLink.setAttribute('href', "../CSSStyles/stylesDarkModeTechnical.css")
        localStorage.setItem('theme', 'dark')
    }
    else {
        themeLink.setAttribute('href', "../CSSStyles/stylesLightMode.css")
        localStorage.setItem('theme', 'light')
    }
})