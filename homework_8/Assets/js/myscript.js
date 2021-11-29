$(document).ready(function(){
    console.log("hello world! with JQuery ");
    /**
     * This function will use to change the related div to display
     * if click on font-bnt-1. the button will change its color 
     * and font-div-1 will display, other font-div-2, font-div-3, font-div-4 will dispear
     * and for other buttons clicked, it will perform similarly.
     * @returns null
     */
    function show_font() {
        //display the content of this font
        var id=$(this).attr("id");
        index = id.substring(9);
        fontDivID = "font-div-" + index;
        fontDiv =  $("#" + fontDivID)
        display_attr = fontDiv.css("display");
        if (display_attr == "block") {
            //no need to change. already display this font div
            return;
        }
        //set all to not display
        $("#font-bnt-1").css("background-color", "#C4C4C4");
        $("#font-bnt-2").css("background-color", "#C4C4C4");
        $("#font-bnt-3").css("background-color", "#C4C4C4");
        $("#font-bnt-4").css("background-color", "#C4C4C4");

        $("#font-div-1").css("display", "none");
        $("#font-div-2").css("display", "none");
        $("#font-div-3").css("display", "none");
        $("#font-div-4").css("display", "none");
        //set this select font to display
        $(this).css("background-color", "#1A9054");;
        fontDiv.css("display", "block");

    }
    
    /*reset the card, the back card should be back, the question card display*/
    function resetCard() {
        $(".flip-item-front").each(
            function (){
                $(this).css({
                'transform': 'rotateY(0deg)',
                'z-index': '2'
                });
            }
        );

        $(".flip-item-back").each(
            function (){
                $(this).css({
                'transform': 'rotateY(180deg)',
                'z-index': '1'
                });
            }
        );
     
    }

    /*reveal the card, the back card should be set to display*/
    function revealCard() {
        $(".flip-item-front").each(
            function (){
                $(this).css({
                'transform': 'rotateY(180deg)',
                'z-index': '1'
                });
            }
        );

        $(".flip-item-back").each(
            function (){
                $(this).css({
                'transform': 'rotateY(0deg)',
                'z-index': '2'
                });
            }
        );
     
    }
    /*flip one card*/
    function flipCard() {
        fontcard = $(this).children(".flip-item-front");
        backcard = $(this).children(".flip-item-back");
        zindex = fontcard.css("z-index");
        console.log(zindex);
        if (zindex == 1) {
            //need to flip question to front
            fontcard.css({
                'transform': 'rotateY(0deg)',
                'z-index': '2'
            });
            backcard.css({
                'transform': 'rotateY(180deg)',
                'z-index': '1'
            });
        } else {
            //need to reveal the answer
            fontcard.css({
                'transform': 'rotateY(180deg)',
                'z-index': '1'
            });
            backcard.css({
                'transform': 'rotateY(0deg)',
                'z-index': '2'
            });
        }
    }

    function revealHistory() {
        //display the content of this font
        var id=$(this).attr("id");
        index = id.substring(4);
        historyDivID = "history-div-" + index;
        historyDiv =  $("#" + historyDivID);
        display_attr = historyDiv.css("display");
        if (display_attr == "block") {
            //no need to change. already display this font div
            return;
        }

        //remove the current class of other button
         $(".order_item").removeClass("current");;
        //set all to not display
        $(".history").css("display", "none");

        //set this select time history to display
        $(this).addClass("current");;
        historyDiv.css("display", "block");
        //add animater class to let the history div slide into
        if (index == "5") {
            historyDiv.removeClass("slide-in-right");
            historyDiv.addClass("slide-in-right");
        } else {
            historyDiv.removeClass("slide-in-left");
            historyDiv.addClass("slide-in-left");
        }
    }

    /*bing the 4 buttons on home page to show_font function*/
    $("#font-bnt-1").click(show_font);
    $("#font-bnt-2").click(show_font);
    $("#font-bnt-3").click(show_font);
    $("#font-bnt-4").click(show_font);

    /*bind reset all and reveal all button to related function*/
    $("#reset-bnt").click(resetCard);
    $("#reavel-bnt").click(revealCard);

    /*bind each flip box div to flipCard funtion*/
    $(".flip-box").click(flipCard);

    /*history time button*/
    $(".order_item").click(revealHistory);
});
