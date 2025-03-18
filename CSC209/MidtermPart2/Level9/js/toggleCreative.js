let toggle = document.getElementById('darkmodeToggle');
let themeLink = document.getElementById('themeMode');

if (localStorage.getItem('theme') == 'dark'){
    toggle.checked = true
    themeLink.setAttribute('href', "../css/Photos/stylesDarkMode.css")
}
else {
    toggle.checked = false
    themeLink.setAttribute('href', "../css/stylesLightMode.css")
}


toggle.addEventListener('change', function(){
    if (toggle.checked) {
        themeLink.setAttribute('href', "../css/Photos/stylesDarkMode.css")
        localStorage.setItem('theme', 'dark')
    }
    else {
        themeLink.setAttribute('href', "../css/stylesLightMode.css")
        localStorage.setItem('theme', 'light')
    }
})