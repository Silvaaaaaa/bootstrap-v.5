// open & close cart 
let cartItem = document.querySelector("#cart-item");
let cart = document.querySelector(".cart");
let cartclose = document.querySelector("#cart-close");

cartItem.addEventListener("click" , function(){
   cart.classList.add("active");
})
cartclose.addEventListener("click" , function(){
    cart.classList.remove("active");
 })

// start with the document is ready ; 
if(document.readyState ==  "loading"){
    document.addEventListener("DOMContentLoaded" , start ) ;
}else{
    start();
}
// start #####################33
function start(){
    addevents()
}
// **********update *********
function update(){
    addevents()   
    updatetotal();  
}
// ********** add events ********
function addevents(){
 let cartremove_btns = document.querySelectorAll(".cart-remove")

    cartremove_btns.forEach((btn)=>{
     btn.addEventListener("click" , handle_events );
    })
// change item quatity 
let change_item = document.querySelectorAll(".cart-quantity");
change_item.forEach(input =>{
    input.addEventListener("change" , handle_changeitem)
})  
// add item to cart; 
let addcart = document.querySelectorAll(".add-cart");
// let cartbox = document.querySelector(".cart-content");
addcart.forEach(cartt =>{
  cartt.addEventListener("click", handle_cart)
})
// buy now 
let buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click" , handlebuy_btn); 
}
// handle events 
let itemadd =[]
function handle_cart(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgsrc = product.querySelector(".product-img").src;
  let newtoadd ={
      title , 
      price , 
      imgsrc , 
  }
//    handle item is already exist
 if(itemadd.find(el => el.title == newtoadd.title)){
        alert("this item is already exist");
        return // mean that get out and dont buy the cart
 }else{
    itemadd.push(newtoadd)
 }


  let change_cart = cartboxcontent(title , price , imgsrc) ;
  let newnode = document.createElement("div"); 
  newnode.innerHTML = change_cart; 
  let contentcart = document.querySelector(".cart-content");
  contentcart.appendChild(newnode);
update();

}
function handle_events(){
    this.parentElement.remove();  // delete cart 
    itemadd = itemadd.filter((el) =>{
        el.title != this.parentElement.querySelector(".cart-product-title").innerHTML;
})
   update() // ###################################################################
}
// handle-change-item 
function handle_changeitem(){ 
   if(isNaN(this.value) || this.value < 1 ){
     this.value = 1 ;
   }
   this.value =Math.floor(this.value);
   update()
}
// update total 
function updatetotal(){
let totalprice = document.querySelector(".total-price");
let cartboxs = document.querySelectorAll(".cart-box");
let total = 0 ; 
cartboxs.forEach((cartbox) =>{
    let cartprice  = cartbox.querySelector(".cart-product") ;
    let price = parseFloat(cartprice.innerHTML.replace("$" , ""));
    let quatity = cartbox.querySelector(".cart-quantity").value ; 
     total += price * quatity
})
// keep 2 digits after the decimal points 
total =total.toFixed(2)
// total = Math.round(total * 100 ) / 100 
totalprice.innerHTML = "$" + total ;    
}
//  change carte image 
function cartboxcontent(title , price , imgsrc) {
   return  `<div class="cart-box">
   <img src="${imgsrc}" alt="" class="cart-img">
<div class="detail-box">
 <div class="cart-product-title">${title}</div>
 <div class="cart-product">${price}</div>
 <input type="number" value="1" class="cart-quantity">
   </div>
   <!-- remove cart -->
   <i class='bx bxs-trash-alt cart-remove' ></i>
       </div>`
}
// buy 
function handlebuy_btn(){
    if(itemadd.length <= 0 ){
        alert("no card to buy it");
        return ;
    } 
    const  cartcontent =cart.querySelector(".cart-content");
    cartcontent.innerHTML = "";
    alert("your order is successfuly");
    itemadd = [] ;
    update();
}