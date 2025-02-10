
const dataArr=[]
async function datahandler() {
    let promise= await fetch("https://fakestoreapi.com/products")
    let data= await promise.json()
     data.forEach((ele)=>{
        dataArr.push(ele)
     }) 
      cartpage(data)
      
 }
 datahandler()
 count = parseInt(localStorage.getItem("count"));
 document.querySelector(".count").textContent=count;
 let containerDivEle=document.querySelector(".cart-container")

function cartpage(data){

    let cart={}

    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"))
        CartItemsHandler(cart,data)
       
    }
    else{  
         empty()
    }

}   
     
function empty(){
    alert("cart is empty")
    const text=`<h4>Your Cart is Empty</h4>
    <a href="./index.html"> <ion-icon name="arrow-back-outline"></ion-icon> Continue Shopping</a>`
    containerDivEle.innerHTML=text
 }
function CartItemsHandler(cart,data){
   
    let items="" 
    
    for (let ele in cart){
        if (cart[ele].qty!==0){
            let key=cart[ele]
            let a=`${ele}`
            let item=`<div class="cart-item">
                    <img src="${key.image}" alt="Backpack">
                    <div class="item-details">
                       <div class="Title">
                           <h3> ${data[a-1].title}</h3>
                        </div>   
                        <div class="calc">
                        <div class="quantity">
                            <button class="minus" data-id=${ele}>-</button>
                            <span>${key.qty} </span>
                            <button class="addition" data-id=${ele}>+</button>
                        </div>
                        <p style="margin-left:21px">${key.qty} × $${key.price}</p>
                        </div>
                    </div>
                </div>`
            items+=item        
        }
        
        document.querySelector(".cartitems").innerHTML=items 
        cartcount() 
    }
    
     let products=0;
      for (let ele in cart){
        products+=cart[ele].qty
      }
      let sum=0;
      for (let ele in cart){
        sum+=cart[ele].qty*cart[ele].price
      }
      
       
        let summary=` 
                <h2>Order Summary</h2>
                <p>Products (${products}) <span>$${Math.floor(sum)}</span></p>
                <p>Shipping <span>$30</span></p>
                <p class="total">Total amount <span>$${Math.floor(sum)+30}</span></p>
                <button class="checkout">Go to checkout</button>
            `

    document.querySelector(".order-summary").innerHTML=summary

    const minusEle=document.querySelectorAll(".minus")
    minusEle.forEach((ele)=>{
        ele.addEventListener("click", (e)=>{
            let id =e.target.dataset.id
            if(id in cart){
                cart[id].qty--;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
           
            CartItemsHandler(cart,data)

        })
    })
    const AddEle=document.querySelectorAll(".addition")
    AddEle.forEach((ele)=>{
        ele.addEventListener("click", (e)=>{
            let id =e.target.dataset.id
            if(id in cart){
                cart[id].qty++;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            CartItemsHandler(cart,data)
        })
    })
    }

function cartcount(){
    cart=JSON.parse(localStorage.getItem("cart"))
    console.log(cart);
    
    cartArr=[]
    for(let ele in cart){
        cartArr.push(cart[ele])
    }
    
    let updatecount=cartArr.filter((ele)=>ele.qty!=0).length
    localStorage.setItem("count",updatecount)
    console.log(updatecount);
    
    if(updatecount==0){
        empty()
    }
        document.querySelector(".count").textContent=updatecount;
    
}