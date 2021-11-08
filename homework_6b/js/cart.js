/*This function is called when the user click add to cart button*/
function addToCart() {
    var nowcnt = 0;
    if (localStorage.getItem("cartCount") == null) {
        //previous no product in cart, so set the cart count to 1
        localStorage.setItem("cartCount", 1);
        nowcnt = 1;
    } else {
        //increase the previous count
        nowcnt = (Number)(localStorage.getItem("cartCount")) + 1;
        localStorage.setItem("cartCount", nowcnt);
    }
    var myElement = document.getElementById("cartCount");
    myElement.innerHTML = nowcnt;
    if (nowcnt == 0) {
        //if no product in cart, do not display the count element on cart
        myElement.style.display = "none";
    }else {
        myElement.style.display = "inline";
    }
}

/*when the page load, this function will check how many product in cart, and display the count on the cart*/
function load() {
    var myElement = document.getElementById("cartCount");
    if (localStorage.getItem("cartCount") == null || localStorage.getItem("cartCount")  == 0) {
        myElement.style.display = "none";
    } else {
        myElement.innerHTML = localStorage.getItem("cartCount");
        myElement.style.display = "inline";
    }
}

/*This function is called when the user click add to cart button, and will add product detail info to localStorage*/
/**
 * 
 * @param {*} shop_div, the shop div contains price, product name, product box size...etc...
 */
function addRecordToCart(shop_div) {
    //get the hidden product name
    var ps = shop_div.getElementsByTagName("p")
    var product_p = Array.prototype.slice.call(ps)[0];
    var productname = product_p.innerText;

    //get all selects element
    var selects = shop_div.getElementsByTagName("select");
    var array_selects = Array.prototype.slice.call(selects);

    //get box select
    var box_select = array_selects[0];
    //get which option user select, and get the price value
    var select_index = box_select.selectedIndex;
    var box_price = box_select.options[select_index].value; 
    var box_size = box_select.options[select_index].text;

    //get product type select
    var type_select = array_selects[1];
    //get which product type user select, and get img name
    select_index  = type_select.selectedIndex;
    var ptype = type_select.options[select_index].text; 
    var product_img_name = type_select.options[select_index].value;

    //get quantity select
    var quantity_select = array_selects[2];
    //get quantity 
    select_index  = quantity_select.selectedIndex;
    var cnt = (Number)(quantity_select.options[select_index].value); 
    var product = {name: productname, box: box_size, price: box_price, type: ptype, imgname: product_img_name, count: cnt};
    //check if the product array already store in local storage
    var pro = localStorage.getItem("product");
    var products = [product];
    if (pro != null) {
        var old_products  = JSON.parse(pro);
        old_products.push(product);
        products = old_products;
    }
    localStorage.setItem("product",  JSON.stringify(products));
}

function load_product() {
    var list_div = document.getElementById("cart-product-list");
    var total_div = document.getElementById("total");
    list_div.innerHTML = ""; //clear the products before 
    var total = 0;
    var htmlcontent = "";
    var pro = localStorage.getItem("product");
    var products = null;
    if (pro == null || JSON.parse(pro).length == 0) {
        list_div.innerHTML = "There is nothing in the cart yet! Go and select something you like ;D";
        total_div.innerHTML = total.toFixed(2);
        return;
    } else {
        products = JSON.parse(pro);
    }
    for(var i = 0; i < products.length; i++){
        var product = products[i];
        console.log(product);
        htmlcontent += "<div class=\"cartlist cart-content\">" + "" ;
        htmlcontent += `<p hidden>${i}<p>`
        htmlcontent += "<ul>" + "";
        htmlcontent += "<li> <img src=\"../images/" + product["imgname"] +"\" alt=\"product\">  </li>" + ""

        htmlcontent += "<li>";
        htmlcontent += "<span class=\"cart-mid-font\">" + product["name"] + " </span> <br>";
        htmlcontent += "<span class=\"product-type\"> " + product["box"] + "</span> x <span> " + product["type"] + "</span>";
        htmlcontent += "</li>";

        htmlcontent +="<li> $" + product["price"] + "</li>";
        var subtotal = (Number)(product["count"]) * (Number)(product["price"]);
        //sum the subtotal to total
        total += subtotal;
        htmlcontent +="<li>" + 
            `<input type=\"text\" name=\"prodcut-cnt\" placeholder=${product.count} onchange="changeProdcutNum(this.parentNode.parentNode.parentNode, this)"\/>` +
            "<button onclick=\"deleteProductFromCart(this.parentNode.parentNode.parentNode)\">remove</button></li>" + 
            "<li> $" + subtotal.toFixed(2) + "</li>" + 
            "</ul> <hr></div>";
        
    }
    list_div.innerHTML = htmlcontent;
    //we already get the total consume, and set it the div
    total_div.innerHTML = total.toFixed(2);
    
}

function changeProdcutNum(pdiv, inputtext) {
    var count_text = inputtext.value;
    //check if count_text can be convert to a nubmer
    var n = Number(count_text);
    if (isNaN(n) || n < 1 || n > 9)
    {
        alert("please input a number from 1 to 9");
        return
    }   
    //get the index of the current div in parent div,  that is also the delete product index of local storage array
    var child = pdiv;
    var i = 0;
    while( (child = child.previousSibling) != null ) {
        i++;
    }
    product_index = i;

    var pro = localStorage.getItem("product");
    products = JSON.parse(pro);
    var change_product = products[product_index];
    change_product.count = n;
    //store back to the localStorage after change a product count
    localStorage.setItem("product", JSON.stringify(products));
    //re-calculate the total, subtotal of the prooduct with product_index, we can load product to the cart again
    load_product();
}

function deleteProductFromCart(pdiv) {
    //get the index of the current div in parent div,  that is also the delete product index of local storage array
    var child = pdiv;
    var i = 0;
    while( (child = child.previousSibling) != null ) {
        i++;
    }
    product_index = i;
    console.log(product_index);


    //re-calculate the total, sub the delete product's subtotal
    var pro = localStorage.getItem("product");
    if (pro == null || JSON.parse(pro).length == 0) {
        alert("No such product");
        load_product();
        return;
    }
    products = JSON.parse(pro);
    var delete_product = products[product_index];
    var delete_subtotal = (Number)(delete_product["count"]) * (Number)(delete_product["price"]);
    var total_div = document.getElementById("total");
    var current_total = Number(total_div.innerHTML) - delete_subtotal;
    total_div.innerHTML = current_total.toFixed(2);

    //remove it from html
    pdiv.parentNode.removeChild(pdiv);

    // now delete it from the localStorage;
    products.splice(product_index, 1); //delete the product from array
    localStorage.setItem("product", JSON.stringify(products));
    
    if (products.length == 0){
        //if no product in cart, show the following content
        var list_div = document.getElementById("cart-product-list");
        list_div.innerHTML = "There is nothing in the cart yet! Go and select something you like ;D";
    }

    //decrease the product number on cart icon
    var now_cnt = 0;
    if (localStorage.getItem("cartCount") != null) {
        now_cnt = Number(localStorage.getItem("cartCount")) - 1;
        if (now_cnt < 0) {
            now_cnt = 0;
        }
        localStorage.setItem("cartCount", now_cnt);
    }
    var myElement = document.getElementById("cartCount");
    if ( now_cnt == 0) {
        myElement.style.display = "none";
    } else {
        myElement.innerHTML = now_cnt;
        myElement.style.display = "inline";
    }
}

/*when user select different box, the price will be changed*/
function changePrice(){
    var selector = document.getElementById("box-select");
    var price_off = document.getElementById("off-count");
    lastIndex = selector.selectedIndex;
    var price = selector.options[lastIndex].value;

    //update the price off text
    var off_count = ["20%", "25%", "50%"];
    console.log(lastIndex);
    if (lastIndex == 0) {
        //no price off for box 1
        price_off.parentNode.style.display = "none";
    } else {
        price_off.parentNode.style.display = "inline";
        price_off.innerHTML = off_count[lastIndex - 1];
    }

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
