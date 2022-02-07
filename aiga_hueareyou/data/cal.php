<?php

    // ull data
    require_once "./db.php";
    
    // etrive all answers and sort z-a
    $sql = "select * from answer where `S` IS NULL order by id asc";
    $query = mysqli_query($db,$sql);
    $res = mysqli_fetch_all($query,1);

    // retrive all questions
    $sql = "select * from question";
    $query1 = mysqli_query($db,$sql);
    $res1 = mysqli_fetch_all($query1,1);

    // retrive h values and tags
    $sql = "select * from h";
    $query2 = mysqli_query($db,$sql);
    $res2 = mysqli_fetch_all($query2,1);

    // initializing values
    $hTextArr = array();
    foreach($res2 as $k => $row2){
        $hv = $row2['h'];
        $tag = $row2['tag'];
        $type = $row2['type'];
        $sValue = $row2['sValue'];
        $lValue = $row2['lValue'];
        $hTextArr[$hv]['tag'] = $tag;
        $hTextArr[$hv]['type'] = $type;
        $hTextArr[$hv]['sValue'] = $sValue;
        $hTextArr[$hv]['lValue'] = $lValue;
    }
    
    
    foreach($res as $row){
    // retrive all answers and their id
    $id = $row['id'];
    $q1 = $row['q1'];
    $q2 = $row['q2'];
    $q3 = $row['q3'];
    $q4 = $row['q4'];
    $q5 = $row['q5'];
    $q6 = $row['q6'];
    
    // split with |
    $q1Arr = array();
    if($q1 != ""){
        $q1Arr = explode("|",$q1);
    }
    
    $q2Arr = array();
    if($q2 != ""){
        $q2Arr = explode("|",$q2);
    }
    $q3Arr = array();
    if($q3 != ""){
        $q3Arr = explode("|",$q3);
    }
    $q4Arr = array();
    if($q4 != ""){
        $q4Arr = explode("|",$q4);
    }
    $q5Arr = array();
    if($q5 != ""){
        $q5Arr = explode("|",$q5);
    }
    $q6Arr = array();
    if($q6 != ""){
        $q6Arr = explode("|",$q6);
    }

    // cal S
    $s = 95;
    if(count($q5Arr) >= 0 && count($q5Arr) <= 2){
        $s = 95;
    }
    if(count($q5Arr) >= 3 && count($q5Arr) <= 4){
        $s = 85;
    }
    if(count($q5Arr) >= 5 && count($q5Arr) <= 6){
        $s = 70;
    }
    if(count($q5Arr) >= 7 && count($q5Arr) <= 8){
        $s = 60;
    }
    if(count($q5Arr) > 9){
        $s = 50;
    }
    // cal L
    $l = 0;
    $work = 0;
    $life = 0;
    $totalLArr = array_merge($q1Arr,$q4Arr);
    foreach($totalLArr as $LRow){
        foreach($res1 as $row1){
            if(trim($LRow) == trim($row1['answer'])){
                $type = $row1['type'];
                if($type == "Life"){
                    $life++;
                }else{
                    $work++;
                }
            }
        }
        
    }

    
    if($work > $life){
        $l = 40;
    }
    if($work == $life || ($life - $work) == 1){
        $l = 45;
    }
    if(($life - $work) == 2 || ($life - $work) == 3){
        $l = 60;
    }
    if(($life - $work) == 4 || ($life - $work) == 5){
        $l = 70;
    }
    if(($life - $work) >= 6){
        $l = 70;
    }
    
    // exit();
    
    // cal H 
    $h = "";
    // 联合所有数组
    $totalHArr = array_merge($q2Arr,$q3Arr,$q4Arr,$q5Arr,$q6Arr);
    $countArr = array();
    $counter = array();
    $total = 0;
    foreach($totalHArr as $rowH){
        $answerH = $rowH;
        foreach($res1 as $row1){
            if(trim($answerH) == trim($row1['answer'])){
                $Hvalue = $row1['H'];
                // var_dump($Htext);
                if($Hvalue != "" && $Hvalue != "Null"){
                   
                $Htext = $hTextArr[$Hvalue]['tag'];
                $Htype = $hTextArr[$Hvalue]['type'];
                
                $Htype = $hTextArr[$Hvalue]['type'];
                    if(!isset($countArr[$Hvalue])){
                        $countArr[$Hvalue]['count'] = 1;
                        $countArr[$Hvalue]['text'] = $Htext;
                        $countArr[$Hvalue]['type'] = $Htype;
                    }else{
                        $countArr[$Hvalue]['count'] = $countArr[$Hvalue]['count'] + 1 ; 
                    }
                    array_push($counter,$Hvalue);
                    $total = $total + 1;
                }
                
            }
        }
    }
    $counter = array_count_values($counter);   // count number of occurrence

    arsort($counter);                                   //sort z-a
   
    $max_number = reset($counter);  
   
    $more_value = key($counter);           //the most frequent value
    // echo $more_value."<br/>";
    if(count($countArr) != 0){
        $avg = $total / count($countArr);
        if($avg != $countArr[$more_value]['count']){
            $h = $more_value;
            $hSValue = $hTextArr[$more_value]['sValue'];
            $hLValue = $hTextArr[$more_value]['lValue'];
            $SP = $s;
            $LP = $l;
            if($hSValue != ""){
               
                $s = $s + $hSValue;
               
            }
            if($hLValue != ""){
                
                $l = $l + $hLValue;
                
            }
           
        }else{
            
            $h = array_rand($counter);
            $hSValue = $hTextArr[$more_value]['sValue'];
            $hLValue = $hTextArr[$more_value]['lValue'];
            $SP = $s;
            $LP = $l;
            if($hSValue != ""){
                
                $s = $s + $hSValue;
               
            }
            if($hLValue != ""){
                
                $l = $l + $hLValue;
                
            }
            
        }
        $HP = $h;
        $tagGroup = $countArr[$more_value]['type'];
        $hueTag = $countArr[$more_value]['text'];
        $sql = "update `answer` set `S` = '$s',`L` = '$l',`H` = '$h',`SP` = '$SP',`LP` = '$LP',`HP` = '$HP',
        `tagGroup` = '$tagGroup',`hueTag` = '$hueTag' where id = '$id'";
        mysqli_query($db,$sql); 
    }else{
        echo "countArr为空";
    }
   
    // var_dump(mysqli_error($db));
    

    }
    
    
?>