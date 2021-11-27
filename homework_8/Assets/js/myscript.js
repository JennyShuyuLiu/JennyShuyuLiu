$(document).ready(function(){
    console.log("hello world! with JQuery ");
    function show_font() {
        //display the content of this font
        var id=$(this).attr("id");
        index = id.substring(9);
        console.log(index)
        fontDivID = "font-div-" + index;
        fontDiv =  $("#" + fontDivID)
        console.log(fontDivID);
        display_attr = fontDiv.css("display");
        console.log(display_attr);
        if (display_attr == "block") {
            //no need to change already display this font
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

    $("#font-bnt-1").click(show_font);
    $("#font-bnt-2").click(show_font);
    $("#font-bnt-3").click(show_font);
    $("#font-bnt-4").click(show_font);

    $("#reset-bnt").click(resetCard);
    $("#reavel-bnt").click(revealCard);

    $(".flip-box").click(flipCard);
});
