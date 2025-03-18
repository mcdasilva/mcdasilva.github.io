let navItems = document.querySelectorAll("nav ul li a")

navItems.forEach(item => {
    item.addEventListener('click', function(){

        navItems.forEach(item => {
            item.classList.remove('active')
        })

        item.classList.add('active')
    })
})


let icBarActive = document.getElementsByClassName("icBar-active");
let galleryButton = document.getElementById("galleryButton");

icBarActive[0].addEventListener('click', function(){

    navItems.forEach(item => {
        item.classList.remove('active')
    })

    galleryButton.classList.add('active')
})

