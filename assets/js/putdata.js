Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


$.getJSON("./data/data-dashboard.json", function (data){
        document.getElementById("all1").innerHTML=data["总收入"]["Total"]
        document.getElementById("all2").innerHTML=data["总利润"]["Total"]
        document.getElementById("all3").innerHTML=data["合同数量"]["Total"]
        document.getElementById("all4").innerHTML=data["客户数量"]["Total"]
    })

var today = (new Date()).Format("yyyy-MM-dd");
var date = new Date();
date.setDate(date.getDate()-1);
var yestoday = date.Format("yyyy-MM-dd");  
var day8 = today
var day7 = yestoday
date.setDate(date.getDate()-1);
var day6 = date.Format("yyyy-MM-dd");
date.setDate(date.getDate()-1);
var day5 = date.Format("yyyy-MM-dd");
date.setDate(date.getDate()-1);
var day4 = date.Format("yyyy-MM-dd");
date.setDate(date.getDate()-1);
var day3 = date.Format("yyyy-MM-dd");
date.setDate(date.getDate()-1);
var day2 = date.Format("yyyy-MM-dd");
date.setDate(date.getDate()-1);
var day1 = date.Format("yyyy-MM-dd");


function color(value,day){
    if(value<0){
        document.getElementById(day).style.color = "red"
        document.getElementById(day).innerHTML = value
    }else{
        document.getElementById(day).style.color = "lightgreen"
        document.getElementById(day).innerHTML = "+"+value
        
    }
}

$.ajax({
    url:"./data/"+today+".json",
    dataType:"json",
    success:function(data){
        document.getElementById("today1").innerHTML=data["总收入"]["Total"]
        document.getElementById("today2").innerHTML=data["总利润"]["Total"]
        document.getElementById("today3").innerHTML=data["合同数量"]["Total"]
        document.getElementById("today4").innerHTML=data["客户数量"]["Total"]
        $.ajax({
            url:"./data/"+yestoday+".json",
            dataType:"json",
            success:function(data1){
                var D_value1 = data["总收入"]["Total"]-data1["总收入"]["Total"]
                var D_value2 = data["总利润"]["Total"]-data1["总利润"]["Total"]
                var D_value3 = data["合同数量"]["Total"]-data1["合同数量"]["Total"]
                var D_value4 = data["客户数量"]["Total"]-data1["客户数量"]["Total"]
                color(D_value1,"today1a")
                color(D_value2,"today2a")
                color(D_value3,"today3a")
                color(D_value4,"today4a")
            },
            statusCode: {
                404: function() {
                var D_value1 = data["总收入"]["Total"]-0
                var D_value2 = data["总利润"]["Total"]-0
                var D_value3 = data["合同数量"]["Total"]-0
                var D_value4 = data["客户数量"]["Total"]-0
                color(D_value1,"today1a")
                color(D_value2,"today2a")
                color(D_value3,"today3a")
                color(D_value4,"today4a")
                }
            },
            error:function(err){
                console.log(err);
            }
    });
    },
    statusCode: {
        404: function() {
        document.getElementById("today1").innerHTML=0
        document.getElementById("today2").innerHTML=0
        document.getElementById("today3").innerHTML=0
        document.getElementById("today4").innerHTML=0
        $.ajax({
            url:"./data/"+yestoday+".json",
            dataType:"json",
            success:function(data1){
                var D_value1 = 0-data1["总收入"]["Total"]
                var D_value2 = 0-data1["总利润"]["Total"]
                var D_value3 = 0-data1["合同数量"]["Total"]
                var D_value4 = 0-data1["客户数量"]["Total"]
                color(D_value1,"today1a")
                color(D_value2,"today2a")
                color(D_value3,"today3a")
                color(D_value4,"today4a")
            },
            statusCode: {
                404: function() {
                var D_value1 = 0
                var D_value2 = 0
                var D_value3 = 0
                var D_value4 = 0
                color(D_value1,"today1a")
                color(D_value2,"today2a")
                color(D_value3,"today3a")
                color(D_value4,"today4a")
                }
            },
            error:function(err){
                console.log(err);
            }
    });
        }
    },
    error:function(err){
        console.log(err);
    }
});