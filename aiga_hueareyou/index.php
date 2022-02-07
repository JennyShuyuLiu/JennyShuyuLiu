<?php
    require_once "./data/db.php";
    $arrH = ["305","320","340","360","20","53","75","140","160","183","224","240","260","275"];
    $arrS = ["95","85","70","60","50"];
    $arrL = ["40","45","60","70","80"];
    $arr = array();
    $sql = "select S,L,H,SP,LP,HP,tagGroup,hueTag,experience,design from answer where S IS NOT NULL";
    $query = mysqli_query($db,$sql);
    $res = mysqli_fetch_all($query,1);
    foreach($arrH as $k=>$rowH){
        $counter = 0;
        $arr[$rowH][$counter]['h'] = "";
        $arr[$rowH][$counter]['s'] = "";
        $arr[$rowH][$counter]['l'] = "";
        $arr[$rowH][$counter]['width'] = 0;
        foreach($arrS as $k1=>$rowS){
        foreach($arrL as $k2=>$rowL){
            
            
            
                $arr[$rowH][$counter]['h'] = $rowH;
                $arr[$rowH][$counter]['s'] = $rowS;
                $arr[$rowH][$counter]['l'] = $rowL;
                $arr[$rowH][$counter]['counter'] = 0;
                foreach($res as $row){
                    $s = $row['S'];
                    $l = $row['L'];
                    $h = $row['HP'];
                    if($h == $rowH && $l == $rowL && $s == $rowS){
                        $arr[$rowH][$counter]['counter'] = $arr[$rowH][$counter]['counter'] + 1;
                    }
                    
                }
                
                $counter++;
            }
            
        }
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Color</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
    <!-- <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet"> -->
    <!-- <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.1.0/js/bootstrap.min.js"></script> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <link href="./css/style.css">
    <script src="./javascript/index.js"></script>
    <style>
        .epBox:hover .epBox1{
            display:block
        }
    </style>
</head>

<body>
    <!-- <div class="container">
        <h1>Your Color</h1>
        <a href="./information.html">
            <button class="btn btn-primary">
                Get My Color
            </button>
        </a>
        
    </div> -->
    <div id="content" style="z-index:-1;overflow-y:visible">
    <div style='margin-top:300px;height:300px;display:flex;flex-direction:column;flex-wrap: wrap;'>
    <?php
        foreach($arr as $k=>$row){
           
            
            // echo '<div style="width:auto;height:auto;display:flex;flex-wrap:wrap;align-items:flex-end">';
            // echo '<div style="width:auto;height:300px;display:flex;height:auto;margin:0px;padding:0px;">';
            foreach($row as $kDetail=>$rowDetail){
                $width = 55;
                
                if($rowDetail['counter'] == 0){
                    echo "<div class='epBox' style='position:relative;margin-bottom:-1px;margin-right:-1px;background:rgba(243,243,243);border:1px solid #383333;text-align:center;line-height:".$width."px;color:white;width:".$width."px;height:".$width."px;'>
                    <div class='epBox1' style='display:none;z-index:99;position:absolute;left:-".(150-$width/2)."px;bottom:".$width."px;min-height:200px;min-width:300px;border-radius:10px;background:rgb(243,243,243);border:1px solid #383333;'>123</div>
                </div>";
                }else{
                    $precentage = $width;
                    if($rowDetail['counter'] > 100){
                        $precentage = $width*($rowDetail['counter'] / 100);
                    }
                    if($precentage > 1.5*$width){
                        $width = 1.5*$width;
                    }
                    if($precentage > 2*$width){
                        $width = 2*$width;
                    }
                    if($precentage > 2.5*$width){
                        $width = 2.5*$width;
                    }
                    if($precentage > 3*$width){
                        $width = 3*$width;
                    }

                    // $width = >(1.5*$width)?(1.5*$width):$precentage>(2*$width)?2*$width:$precentage>(2.5*$width)?2.5*$width:$precentage>(3*$width)?3*$width:$width;
                    
                    $height = $width;
                    echo "<div id='".$rowDetail['h']."-".$rowDetail['s']."-".$rowDetail['l']."' style='margin-bottom:-1px;margin-right:-1px;border:1px solid #383333;text-align:center;line-height:".$width."px;color:white;width:".$width."px;height:".$width."px;background:hsl(".$rowDetail['h'].",".$rowDetail['s']."%,".$rowDetail['l']."%)'>
                    ".$rowDetail['counter']."
                </div>";
                }
                
            }
            // echo '</div>';
            
        }
    ?>
    </div>
    
</div>
</body>

</html>
<script>
    // (function($){ $.fn.center = function(){ var top = ($(window).height() - this.height())/2; var left = ($(window).width() - this.width())/2; var scrollTop = $(document).scrollTop(); var scrollLeft = $(document).scrollLeft(); return this.css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show(); } })(jQuery)
    // left_w=($(document).width()-$('div').width())/2;top_w = $('html').scrollTop()+($(window).height()-$('div').height())/2;$('div').offset({top:top_w,left:left_w});
    var left = $("#140-70-60").offset().left;
    var windowWidth = $(window).width()/2;
    $("#140-70-60").addClass("animate__animated");
    $("#140-70-60").addClass("animate__heartBeat");
    $("#140-70-60").addClass("animate__infinite");
    // console.log(left)
   $("#content").scrollLeft(parseInt(left)-parseInt(windowWidth));
</script>
