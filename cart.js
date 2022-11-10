let Label = document.getElementById('label')
let Shoppingcart = document.querySelector('#shopping-cart')
let cartAmount = document.querySelector('.cartAmount')
// let displayAmount = document.querySelector('.display')
let navMenu = document.querySelector('.navMenu')
let iconClick = document.querySelector('#icon')
let menu = document.querySelector('#menu')




iconClick.onclick = () =>{
    if (navMenu.style.right === '-400px'){
        navMenu.style.right = '0'
        menu.src = "./images/close.png"
    }else{
        navMenu.style.right = '-400px'
        menu.src = "./images/menu.png"
    }
}
let basket = JSON.parse(localStorage.getItem('key')) || []

let calculate = () => {
    cartAmount.textContent = basket.map((x) => x.item).reduce((x,y)=>x + y, 0)
}
calculate()

let generatecartItems = () =>{
    if (basket.length !== 0){
        return (Shoppingcart.innerHTML = basket.map((x)=>{
            let {id, item} = x
            let search = shopItemsData1.find((y)=>y.id === id) || []
            return `
            <div class="cart-item">
        <img  width="100" src=${search.img}>
        <div class = "details">
            <div class = "title-price-x">
            <h4 class ="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$${search.price}</p>
            </h4>
            <i class="fa fa-times" onclick ="removeCart(${id})" ></i>
            </div>
            <div class="buttons" id="unisemester">
                    <i class="fa fa-minus" onclick = "decrement(${id})"></i>
                    <div id = ${id} class="quantity">${item}</div>
                    <i class="fa fa-plus" onclick = "increament(${id})"></i>
                </div>
            <h3>Total Price: $${item * search.price} </h3>
        </div>
            </div>`
        }).join(""))           
    }
    else{
        Shoppingcart.innerHTML = ''
        Label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html" class = "HomeBtn"> go back to home </a> `
    }
}

generatecartItems()
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
   generatecartItems()
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
    generatecartItems() 
    localStorage.setItem('key', JSON.stringify(basket))
}
let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).textContent = search.item
    calculate()
    TotalAmount()
}
// tthis function is to clear a single cart item
let removeCart = (id) =>{
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generatecartItems()
    TotalAmount()
    calculate()
    localStorage.setItem('key', JSON.stringify(basket))
 }

  let TotalAmount = ()=>{
     if(basket.length !== 0){
         let amount = basket.map((x)=>{
             let {id, item} = x
             let search = shopItemsData1.find((y) => y.id === id) || []
             return item * search.price
         }).reduce((x,y)=> x + y, 0)
          Label.innerHTML = `
              <div class="display">
              <h2>Total Amount: $${amount}</h2>
              <button onclick = "clearAll()" id ="clearing">Clear All</button>
              </div>`
     }
     else return
  }

 TotalAmount()

  let clearAll = () =>{
     basket = []
     generatecartItems()
     calculate()
     localStorage.setItem('key', JSON.stringify(basket))
   }