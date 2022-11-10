let navMenu = document.querySelector('.navMenu')
let iconClick = document.querySelector('#icon')
let menu = document.querySelector('#menu')
let shopData = document.querySelector('#shop-data-item1')
// let shopData2 = document.querySelector('#shop-data-item2')
let cartAmount = document.querySelector('.cartAmount')
let basket = JSON.parse(localStorage.getItem('key')) || []

iconClick.onclick = () =>{
    if (navMenu.style.right === '-250px'){
        navMenu.style.right = '0'
        menu.src = "./images/close.png"
    }else{
        navMenu.style.right = '-250px'
        menu.src = "./images/menu.png"
    }
}



let generate = () =>{
    return (shopData.innerHTML = shopItemsData1.map((x)=>{
        // we will use something called destructuring
        // note y i pass id into the increament and decrement function is for me to be able to identity the particular image or item i choose
        let {id, img, name, desc, price} = x
        let search = basket.find((x)=> x.id === id)|| []
        return ` <div class="cont" id="shop-data">
        <img src="${img}" alt=""> 
        <div class="timing">
            <h5>${desc}</h5> 
        <h3>${name}</h3>
        <p>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i> <br>
            </p>    
        </div>
        <div class="buttons">
        <span>$${price}</span> 
        <div>
        <i class="fa fa-minus" onclick = "decrement(${id})"></i>
        <span id = ${id} class="quantity">${search.item === undefined? 0: search.item}</span>
        <i class="fa fa-plus" onclick = "increament(${id})"></i>
        </div>
    </div>
    </div>`
    }).join(''))

    

}
generate()
// let rendershop2 = () =>{
//     return (shopData2.innerHTML = shopItemsData2.map((x)=>{
//         // we will use something called destructuring
//         // note y i pass id into the increament and decrement function is for me to be able to identity the particular image or item i choose
//         let {id, img, name, desc, price} = x
//         let search = basket.find((x)=> x.id === id)|| []
//         return ` <div class="cont" id="shop-data">
//         <img src="${img}" alt=""> 
//         <div>
//             <h5>${desc}</h5> 
//         <h3>${name}</h3>
//         <p>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i> <br>
//             </p>    
//         </div>
//         <div class="buttons">
//         <span>$${price}</span> 
//         <div>
//         <i class="fa fa-minus" onclick = "decrement(${id})"></i>
//         <span id = ${id} class="quantity">${search.item === undefined? 0: search.item}</span>
//         <i class="fa fa-plus" onclick = "increament(${id})"></i>
//         </div>
//     </div>
//     </div>`
//     }).join(''))

// }
// rendershop2()

let increament =(id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)
    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
           }) 
    }else{
        search.item += 1
    }
   update(selectedItem.id)
   localStorage.setItem('key', JSON.stringify(basket))
}
let decrement =(id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id)
    if(search === undefined)return
    else if (search.item === 0) return;
    else{
        search.item -= 1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0) 
 
    localStorage.setItem('key', JSON.stringify(basket))
}
let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).textContent = search.item
    calculate()
}
let calculate = () => {
    cartAmount.textContent = basket.map((x) => x.item).reduce((x,y)=>x + y, 0)
}
calculate()



