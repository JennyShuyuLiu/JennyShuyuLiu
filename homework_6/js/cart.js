/*This function is called when the user click add to cart button in product detail page*/
function addToCart() {
    if (!sessionStorage.cartCount) {
        //previous no product in cart, so set the cart count to 1
        sessionStorage.cartCount = 1;
    } else {
        //increase the previous count
        sessionStorage.cartCount=Number(sessionStorage.cartCount) +1;
    }
    var myElement = document.getElementById("cartCount");
    myElement.innerHTML = sessionStorage.cartCount;
    if (sessionStorage.cartCount == 0) {
        //if no product in cart, do not display the count element on cart
        myElement.style.display = "none";
    }else {
        myElement.style.display = "inline";
    }
}

/*when the page load, this function will check how many product in cart, and display the count on the cart*/
function load() {
    var myElement = document.getElementById("cartCount");
    if (!sessionStorage.cartCount) {
        myElement.style.display = "none";
    } else {
        myElement.innerHTML = sessionStorage.cartCount;
        myElement.style.display = "inline";
    }
}

/*when user select different box, the price will be changed*/
function changePrice(){
    var selector = document.getElementById("box-select");
    lastIndex = selector.selectedIndex;
    var price = selector.options[lastIndex].value;

    //set the price text to the value
    var priceElement = document.getElementById("productPrice");
    priceElement.innerHTML = price;
}

/*when user select different type of the product, the img of the product changed*/
function changeProductInfo(){
    var selector = document.getElementById("product-type-select");
    lastIndex = selector.selectedIndex;
    var imgname = selector.options[lastIndex].value;

    //set the img to the value
    var imgProduct = document.getElementById("productImg");
    imgProduct.src = "./../images/" + imgname;
}

function showBigImg(imgname){
    var imgProduct = document.getElementById("productImg");
    console.log(imgname);
    imgProduct.src =  "./../images/" + imgname;
}

/*This is the function to execute when the mouse hover on the question mart
  When hover, let the other div display the detail content
*/
function titleMouseOver(){
    var title = document.getElementById("float-describe");
    title.style.display = "block";
}

/*This is the function to execute when the mouse move out the question mart
  When hover, let the other div be hidden
*/
function titleMouseOut(){
    var title = document.getElementById("float-describe");
    title.style.display = "none";
}
