function toggleCSSStyle(){

    let toggle = document.getElementById('darkmodeToggle');
    let themeLink = document.getElementById('themeMode');

    if (localStorage.getItem('theme') == 'dark'){
        toggle.checked = true
        themeLink.setAttribute('href', "../CSSStyles/stylesDarkMode.css")
    }
    else {
        toggle.checked = false
        themeLink.setAttribute('href', "../CSSStyles/stylesLightMode.css")
    }


    toggle.addEventListener('change', function(){
        console.log('HERE')

        console.log("Current theme link:", themeLink.href);

        if (toggle.checked) {
            console.log('TOGGLE CHECKED')
            themeLink.setAttribute('href', "../CSSStyles/stylesDarkMode.css")
            localStorage.setItem('theme', 'dark')
        }
        else {
            console.log('TOGGLE NOT CHECKED')
            themeLink.setAttribute('href', "../CSSStyles/stylesLightMode.css")
            localStorage.setItem('theme', 'light')
        }
    })
}