const secEle=document.querySelector(".detailsDiv")
const btns=document.querySelectorAll(".LP_buttons")
const mainEle=document.querySelector(".mainsection")
const prodEle=document.querySelector(".products")
const sugEle=document.querySelector(".suggestion")
const detailBtnEle=document.querySelector(".detailsBtn")
console.log(btns);

let prodlocal=localStorage.getItem("id")
let sourceArr=[];
async function datahandler(){
        let response= await fetch("https://fakestoreapi.com/products")
        let data=await response.json()
        data.forEach((ele)=>{
            sourceArr.push(ele)
        })
       console.log(data);
       if(prodlocal=="details"){
         allhandler(data)
       }   
       else{
        details(data,prodlocal)
       }     
       
}
datahandler()



    function allhandler(source){
        let  allitems=""
        source.forEach(ele => {
          let imgdiv=`<div class="itemsdiv">
                    <img src=${ele.image} class="images">
                     <br><br>
                    <aside>${ele.title} </aside>
                     <p>${ele.description}</p>
                     <br>
                     <hr>$
                     ${ele.price}
                     <hr>
                     <br>
                     <br>
                     <a data-id=${ele.id} class="detailsBtn" onclick="window.location.href='./Product_Details.html'" >Details</a>
                    <a class="cartBtn" data-id=${ele.id} data-title=${ele.title} data-price=${ele.price} data-img=${ele.image} >Add to Cart</a>
                </div>`
            allitems+=imgdiv      
        })
        secEle.innerHTML=allitems
        let btnEles=document.querySelectorAll(".detailsBtn")
         
        btnEles.forEach((ele)=>{
            ele.addEventListener("click",(e)=>{
                localStorage.setItem("id",e.target.dataset.id)
                let filterDetail=source.filter((element)=>{
                    return element.id==e.target.dataset.id
                })
                console.log(filterDetail);
                
            let filterDiv=      `<div class=fltrdetails>    
                                    <div class="imgdiv1">
                                        <img src=${filterDetail[0].image} class="images">
                                    </div>
                                    <br><br>
                                    <div class="contentDiv1">
                                        <h2>${filterDetail[0].category}</h2>
                                        <br>
                                        <aside>${filterDetail[0].title} </aside>
                                        <br>
                                        <span>${filterDetail[0].rating.rate} <ion-icon name="star"></ion-icon></span>
                                        <br>
                                        <p>${filterDetail[0].description}</p>
                                        <br>
                                        <aside>$ ${filterDetail[0].price} </aside>                               
                                        <br>
                                        <br>
                                        <a class="cartBtn" data-id=${filterDetail[0].id} data-title=${filterDetail[0].title} data-price=${filterDetail[0].price} data-img=${filterDetail[0].image}  >Add to Cart</a>
                                        <a>Go to Cart </a>
                                    </div>
                                </div>`      
                mainEle.innerHTML=filterDiv  

                let suggestion=source.filter((ele)=>{return ele.category==filterDetail[0].category})
                console.log(suggestion);
                suggestionhandler(suggestion);                
            })
        })  
        const cartBtns=document.querySelectorAll(".cartBtn")  
        cartHandler(cartBtns)
        
    }
   
     
    function details(source,prodlocal){
       let y= source.filter((ele)=>{return ele.id==prodlocal})
       
       let electronicsdiv=  `<div class=fltrdetails>    
                                    <div class="imgdiv1">
                                        <img src=${y[0].image} class="images">
                                    </div>
                                    <br><br>
                                    <div class="contentDiv1">
                                        <h2>${y[0].category}</h2>
                                        <br>
                                        <aside>${y[0].title} </aside>
                                        <br>
                                        <span>${y[0].rating.rate} <ion-icon name="star"></ion-icon></span>
                                        <br>
                                        <p>${y[0].description}</p>
                                        <br>
                                        <aside>$ ${y[0].price} </aside>                               
                                        <br>
                                        <br>
                                        <a class="cartBtn" data-id=${y[0].id} data-title=${y[0].title} data-price=${y[0].price} data-img=${y[0].image}>Add to Cart</a>
                                        <a href="./cart.html" style="background-color:black;color:white">Go to Cart </a>
                                    </div>
                                </div>`
        mainEle.innerHTML=electronicsdiv  
      console.log(y);
      
      let suggestion=source.filter((ele)=>{return ele.category==y[0].category})
      console.log(suggestion);
      suggestionhandler(suggestion) 
      const detailCartBtn=document.querySelectorAll(".cartBtn")
      console.log(detailCartBtn);
      
      cartHandler(detailCartBtn)
    }

    
    btns.forEach((button)=>{
        button.addEventListener("click",()=>{
            let category=button.getAttribute("data-category")
             if(category==="All"){
               allhandler(sourceArr) 
            }
            else{
               let FilterProducts= sourceArr.filter((ele)=>{
                return ele.category===category
               })
               console.log(FilterProducts);
               
               allhandler(FilterProducts)
            }
        })
    })

    
prodEle.addEventListener("click",(e)=>{
    let value=e.target.dataset.id 
    localStorage.setItem("id",value)   
})
  

// detailBtnEle.addEventListener("click",()=>{
//     let value=e.target.dataset.id
//     console.log(value);  
//     localStorage.setItem("id",value)
//     console.log(localStorage.getItem("id"));
// })


function suggestionhandler(source){
    let  allitems=""
    source.forEach(ele => {
      let imgdiv=`<div class="itemsdiv1">
                    <img src=${ele.image} class="images">
                    <br><br>
                    <aside>${ele.title} </aside>
                    <br>
                    <br>
                    <a data-id=${ele.id} class="detailsBtn" onclick="window.location.href='./Product_Details.html'" >Details</a>
                    <a class="cartBtn" data-id=${ele.id} data-title=${ele.title} data-price=${ele.price} data-img=${ele.image}>Add to Cart</a>
                </div>`
        allitems+=imgdiv 
               
    })
    sugEle.innerHTML=allitems
    const suggCartBtns=document.querySelectorAll(".cartBtn")
    cartHandler(suggCartBtns)
    const suggBtns=document.querySelectorAll(".detailsBtn")
    suggBtns.forEach((ele)=>{
        ele.addEventListener("click",(e)=>{
           localStorage.setItem("id",e.target.dataset.id)
           const id=localStorage.getItem("id")
        //    if(id!="details"){
             details(sourceArr,id) 
        //    }
        })
    })
}


    
function cartHandler(cartBtns){
    let sum=0;
        let count=0;
        let img=""
        let cart={};

        if(localStorage.getItem("count")){
                count = parseInt(localStorage.getItem("count"));
        }
        if(localStorage.getItem("price")){
            price= parseInt(localStorage.getItem("price"));
        }
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart")); 
        }
        updateCart()
        
        cartBtns.forEach((ele)=>{
                ele.addEventListener("click", addtocart)
        })
            

        function addtocart(event){
            let price =event.target.dataset.price
            let id=event.target.dataset.id
            let image =event.target.dataset.img 
            let title=event.target.dataset.title
            console.log("id");

            

            if(id in cart){
                if(cart[id].qty==0){
                    count++;
                  }
                cart[id].qty++;  
            }
            else{
                let cartItem={
                    title: title,
                    price: price,
                    image: image,
                    id:id,
                    qty: 1
                };
                cart[id]=cartItem
                count++;
            }
            
            sum+=price;
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(localStorage.getItem("cart"));
            updateCart();
        }

        function updateCart(){
            document.querySelector(".count").textContent=count;
            localStorage.setItem("count",count)
            // localStorage.setItem("price",price) 
        }      
}
    


