let navMenu = document.querySelector('.navMenu')
let iconClick = document.querySelector('#icon')
let menu = document.querySelector('#menu')

iconClick.onclick = () =>{
    if (navMenu.style.right === '-250px'){
        navMenu.style.right = '0'
        menu.src = "./images/close.png"
    }else{
        navMenu.style.right = '-250px'
        menu.src = "./images/menu.png"
    }
}
