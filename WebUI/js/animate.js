/// <reference path="jquery-1.9.1.min.js" />
function shink() {
    /*********************************猜你喜欢移上去效果*****************************************************/
    var mm;
    $(".like_prolist li").mouseover(function () {
        mm = $(this).find("div");
        mm.stop(false, false).animate({
            bottom: 0+"px"
        })
    }).mouseleave(function () {
        mm.stop(false, false).animate({
            bottom: -80 + "px"
        })
    })
}

/*浮层区域*/
function onscrolls(backtop) {
    var Lefts = document.getElementById("content").offsetLeft;
    if (document.documentElement.scrollTop + document.body.scrollTop > 89) {
        var leftHeight = $("#leftNav li").height() * $("#leftNav li").length;
        var rightHeight = $(".rightCont").height();
        if ((rightHeight - leftHeight) > 0) {
            $("#leftNav li").height(rightHeight);
            //backtop.style.position = "relative";
            //backtop.style.top = 0 + "px";
            //backtop.style.left = 0 + "px";
        }
        else {
            $("#leftNav li").height(leftHeight);
            //backtop.style.position = "fixed";
            //backtop.style.top = 0 + "px";
            //backtop.style.left = Lefts + "px";
        }
        var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
        if (isIE6) {
            backtop.style.position = "absolute";
            backtop.style.top = (document.documentElement.scrollTop) + 0 + "px";
            backtop.style.left = "0px";
        }
        else {
            backtop.style.position = "fixed";
            backtop.style.top = 0 + "px";
            backtop.style.left = Lefts + "px";
        }
    }
    else {
        backtop.style.position = "relative";
        backtop.style.top = 0 + "px";
        backtop.style.left = 0 + "px";
    }
}
function onscrolls2() {
    var leftHeight = $("#leftNav li").height() * $("#leftNav li").length;
    var rightHeight = $(".rightCont").height();
    if ((rightHeight - leftHeight) > 0) {
        $("#leftNav").height(rightHeight);
    }
    else {
        $("#leftNav").height(leftHeight);
    }
}
//获取ID
function getById(acre) {
    return document.getElementById(acre);
}

//获取ClassName
function getByclass(trav_all) {
    var ele = []; all = document.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == trav_all) {
            ele[ele.length] = all[i];
        }
    }
    return ele;
}