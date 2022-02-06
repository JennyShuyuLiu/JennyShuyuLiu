// 与后台交互的js方法
function ajax(data, fn) {
    $.ajax({
        "url": "./api.php",
        "type": "post",
        "data": data,
        "dataType": "json",
        "timeout": "10000",
        "success": fn
    })
}

// 保存用户信息
function saveImformation() {
    var username = $("")
}