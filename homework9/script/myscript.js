$(document).ready(function(){
    console.log("hello world! with JQuery ");

    /*add click animatation for the divs */
    var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
    $('#click1').click(function () { 
        $(this).removeClass('rotate-in-center')
        $(this).addClass('rotate-in-center');
        $(this).one(animationEvent, function(event) {
            //remove the animation class, so we can trigger it next click
            $(this).removeClass('rotate-in-center')
        });
    }); 

    /*add click animatation for the divs */
    var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
    $('#click2').click(function () { 
        $(this).removeClass('blink-1')
        $(this).addClass('blink-1');
        $(this).one(animationEvent, function(event) {
            //remove the animation class, so we can trigger it next click
            $(this).removeClass('blink-1')
        });
    }); 


    /*add click animatation for the divs */
    var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
    $('#click3').click(function () { 
        $(this).removeClass('flip-in-ver-left')
        $(this).addClass('flip-in-ver-left');
        $(this).one(animationEvent, function(event) {
            //remove the animation class, so we can trigger it next click
            $(this).removeClass('flip-in-ver-left')
        });
    }); 
});