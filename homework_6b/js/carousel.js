var productIndex = 1;

/*this function called when the page load, set the first product image to show*/
function  initShowSlide(){
    productIndex = 1;
    showSlides(productIndex);
}

/*when click on the right link, */
function scrollToRight(){
    nextNProduct(1);
}

function scrollToLeft(){
    nextNProduct(-1);
}


// show the product at next n postion, n can be negative
function nextNProduct(n) {
    showSlides(productIndex += n);
}

/*find the product div at position n, and make it to display*/
function showSlides(n) {

    var slides = document.getElementsByClassName("productSlides");
    //   console.log(slides);
    productIndex = n;
    if (n > slides.length) {productIndex = 1}
    if (n < 1) {productIndex = slides.length}
    var i;
    for (i = 0; i < slides.length; i++) {
        //set all div hidden
        slides[i].style.display = "none";
    }
    //set div display
    slides[productIndex - 1].style.display = "block";

    //set selected state for index-dot
    var indexs = document.getElementsByClassName("index-dot");
    for (i = 0; i < indexs.length; i++) {
        indexs[i].className = indexs[i].className.replace(" selected", "");
    }
    indexs[productIndex-1].className += " selected";
}

/*auto change to next slide*/
function auto_slide(){
    setInterval(scrollToRight, 5000); // scroll to next page every 5 seconds
}

