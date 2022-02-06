<?php

    // 获取数据库配置
    require_once "./db.php";
    
    // 获取所有答案并降序显示
    $sql = "select * from answer where `S` IS NULL order by id asc";
    $query = mysqli_query($db,$sql);
    $res = mysqli_fetch_all($query,1);

    // 获取所有问题
    $sql = "select * from question";
    $query1 = mysqli_query($db,$sql);
    $res1 = mysqli_fetch_all($query1,1);

    // 获取h对应的值和类型
    $sql = "select * from h";
    $query2 = mysqli_query($db,$sql);
    $res2 = mysqli_fetch_all($query2,1);

    // 初始化一种h值对应的大类和小类以及S、L差异值  
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
    // 获取所有答案的和对应的id值
    $id = $row['id'];
    $q1 = $row['q1'];
    $q2 = $row['q2'];
    $q3 = $row['q3'];
    $q4 = $row['q4'];
    $q5 = $row['q5'];
    $q6 = $row['q6'];
    
    // 对答案根据符号“|”进行分割成数组
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

    // cal S 计算S的值
    $s = 95;
    if(count($q5Arr) >= 0 && count($q5Arr) <= 3){
        $s = 95;
    }
    if(count($q5Arr) >= 4 && count($q5Arr) <= 5){
        $s = 85;
    }
    if(count($q5Arr) >= 6 && count($q5Arr) <= 7){
        $s = 70;
    }
    if(count($q5Arr) >= 8 && count($q5Arr) <= 10){
        $s = 60;
    }
    if(count($q5Arr) > 10){
        $s = 50;
    }
    // cal L 计算L的值
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

    if($life == 0 && $work > 0){
        $l = 40;
    }
    if($work > $life){
        $l = 45;
    }
    if($work == $life){
        $l = 60;
    }
    if($work < $life){
        $l = 70;
    }
    if($life > 0 && $work == 0){
        $l = 80;
    }
    
    // exit();
    
    // cal H 计算H值
    $h = "";
    // 联合所哟
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
    $counter = array_count_values($counter);   // 统计数组中所有值出现的次数

    arsort($counter);                                   // 按照键值对数组进行降序排序
   
    $max_number = reset($counter);  
   
    $more_value = key($counter);           //出现次数最多的值
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