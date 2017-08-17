function Gid(objectId) {
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        return document.getElementById(objectId);
    } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        return document.all(objectId);
    } else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        return document.layers[objectId];
    } else {
        return false;
    }
}

var DtaT = rili_json.nowdate.split("-");
var date1, date2, day, Oyear = DtaT[0],
	Omouth = DtaT[1],
	Oday = DtaT[2],
	Ohour = DtaT[3],
	st = 0;

Omouth = Omouth.length == 1 ? "0" + Omouth : Omouth;
Oday = Oday.length == 1 ? "0" + Oday : Oday;

//获取当前日期数据
var html = '',
	//yi, 
	//mi, 
	//di,
	arrs_h = [],
	arrs_n = [];

var today = new Date();
var hours = today.getHours(),
	minutes = today.getMinutes();
var UrlS = location.href;
var DtaId = location.href.split("/");

function getFullYear(d) {
    yr = d.getYear();
    if (yr < 1000) yr += 1900;
    return yr;
}

function JCalendar(year, month, date) {
    var _date = arguments.length == 0 ? new Date() : new Date(year, month - 1, date);
    //实例变量
    this.year = Oyear;
    this.month = Omouth;
    this.date = Oday;

    this.fday = new Date(this.year, this.month - 1, 1).getDay(); //每月第一天的前一天星期数
    this.dayNum = new Date(this.year, this.month, 0).getDate(); //每月的天数
    //成员变量，当前年月日
    JCalendar.cur_year = Oyear;
    JCalendar.cur_month = Omouth;
    //JCalendar.cur_date = _date.getDate();
    JCalendar.cur_date = Oday;
    setCurTime({
        //F: Gid("index_history"),
        Y: JCalendar.cur_year,
        M: JCalendar.cur_month,
        D: JCalendar.cur_date
    });
}
JCalendar.prototype.show = function () {
    var _th = this;
    var fday = new Date(this.year, this.month - 1, 1).getDay(); //每月第一天的星期数
    //日历里的每个单元格的数据，预先定义一段空数组，对应日历里第一周空的位置。[注意星期天对应的数是0]
    var date = new Array(fday > 0 ? fday : 0);
    var dayNum = new Date(this.year, this.month, 0).getDate(); //每月的天数
    var html_str = new Array(); //保存日历控件的HTML代码
    var date_index = 0; //date数组的索引
    var weekDay = ["一", "二", "三", "四", "五"];
    for (var j = 1; j <= this.dayNum; j++) { //初始化date数组
        date.push(j);
    }
    html_str.push("<table id='calendar' cellspacing='0' cellpadding='0' width=''>");
    html_str.push("<th colspan='7' style='border-bottom:1px solid #CDCFD3;background:#FFF;'><p title='上一月份' onclick=\"JCalendar.update(-1);return false\" style='float:left; display:none;' class='prev'><i class='icon iconfont'>&#xe601;</i></p><p id='calendar_title' style='float:left;color:#333;font-weight:normal;font-size:16px;'>" + _th.year + "年" + (parseInt(_th.month) < 10 ? ("0" + _th.month) : _th.month) + "月</p><p title='下一月份' onclick=\"JCalendar.update(1);return false\" style='float:right; display:none;' class='next'><i class='icon iconfont'>&#xe602;</i></p></th>");
    html_str.push("<tr>");
    html_str.push("<td style='background:#fff;'>日</td>");
    for (var i = 0; i < 5; i++) { //填充日历头
        html_str.push("<td style='background:#fff'>" + weekDay[i] + "</td>");
    }
    html_str.push("<td  style='background:#fff;'>六</td>");
    html_str.push("</tr>");
    //日历主体
    var tmp;
    for (var i = 0; i < 6; i++) { //填充日期，6行7列
        html_str.push("<tr>");
        for (var j = 0; j < 7; j++) {
            tmp = date[date_index++];
            tmp = tmp ? tmp : "";
            if (tmp == _th.date) {
                html_str.push("<td><div id='c_today' class='c_today' onmouseover='JCalendar.click(this)'>" + JCalendar.cur_date + "</div></td>");
            } else if (tmp == "") {
                html_str.push("<td></td>");
            } else {
                html_str.push("<td><div onmouseover='JCalendar.click(this)'>" + tmp + "</div></td>");
            }
            //console.log(tmp,date)
        }
        html_str.push("</tr>");
    }

    html_str.push("</table>");
    html_str.push("<table cellspacing='2' cellpadding='0' width='280'><tr><td colspan='7' style='background:#fff; display:none;'><p title='上一年份' onmouseover=\"this.style.color='#c00'\" onmouseout=\"this.style.color='#616161'\" onclick=\"JCalendar.update(-12);return false\" style='float:left;color:#616161;margin-right:4px;margin-left:4px;cursor:pointer;'><<上一年份</p><p title='下一年份' onclick=\"JCalendar.update(12);return false\"  onmouseover=\"this.style.color='#c00'\" onmouseout=\"this.style.color='#616161'\" style='float:right;margin-left:4px;color:#616161;cursor:pointer;'>下一年份>></p></td></tr></table>");
    return html_str.join("");
}

function rili_init() {
    document.getElementById("calendar_contain").innerHTML = new JCalendar().show();/*  |xGv00|106707c554d687c1a77addb2ae941bcc */

    var json = rili_json;
    for (var i = 0; i < json.list.length; i++) {
        if (Oyear == json.list[i].theyear) {
            for (var j = 0; j < json.list[i].data.length; j++) {
                if (Omouth == json.list[i].data[j].themonth) {
                    var dlen = new Date(Oyear, Omouth, 0).getDate();
                    for (var n = Oday; n <= dlen; n++) {
                        for (var k = 0; k < json.list[i].data[j].item.length; k++) {
                            if (n == json.list[i].data[j].item[k].thedate) {
                                var txtCount = json.list[i].data[j].item[k].info;
                                txtCount = txtCount.length > 59 ? txtCount.substring(0, 59) : txtCount;
                                if (json.list[i].data[j].item[k].url) {
                                    html = '<dt>' + json.list[i].data[j].themonth + '月' + json.list[i].data[j].item[k].thedate + '日</dt><dd><h3>' + json.list[i].data[j].item[k].title + '</h3><img src="' + json.list[i].data[j].item[k].imgurl + '" alt="" height="100" width="222"><p class="info">' + txtCount + '....</p><p class="f14"><a href="' + json.list[i].data[j].item[k].url + '" title="" target="_blank">了解更多 >></a></p></dd>';
                                } else {
                                    html = '<dt>' + json.list[i].data[j].themonth + '月' + json.list[i].data[j].item[k].thedate + '日</dt><dd><h3>' + json.list[i].data[j].item[k].title + '</h3><img src="' + json.list[i].data[j].item[k].imgurl + '" alt="" height="100" width="222"><p class="info">' + txtCount + '....</p></dd>';
                                }

                                arrs_h.push(html);
                                arrs_n.push(n);
                            }
                        }
                    }

                    for (var k = 0; k < json.list[i].data[j].item.length; k++) {
                        //活动添加class
                        jQuery("#calendar tr td div").each(function () {
                            var th = jQuery(this).html();
                            th = th.length == 1 ? "0" + th : th;
                            if (th == json.list[i].data[j].item[k].thedate) {
                                jQuery(this).addClass("has");
                            }
                            if (new Date(json.showdate).getDate() == th) {
                                jQuery(this).addClass("current");
                            }
                        });
                        if (arrs_h.length > 0) {
                            html = arrs_h[0];
                            jQuery("#calendar tr td div").eq(arrs_n[0] - 1).addClass("current");
                            st = 0;
                        } else if (json.list[i].data[j].themonth < 12 && arrs_h.length == 0 && j < json.list[i].data.length - 1) {
                            if (json.list[i].data[j + 1].item[0].url) {
                                html = '<dt>' + json.list[i].data[j + 1].themonth + '月' + json.list[i].data[j + 1].item[0].thedate + '日</dt><dd><h3>' + json.list[i].data[j + 1].item[0].title + '</h3><img src="' + json.list[i].data[j + 1].item[0].imgurl + '" alt="" height="100" width="222"><p class="info">' + json.list[i].data[j + 1].item[0].info + '</p><p class="f14"><a href="' + json.list[i].data[j + 1].item[0].url + '" title="" target="_blank">了解更多 >></a></p></dd>';
                            } else {
                                html = '<dt>' + json.list[i].data[j + 1].themonth + '月' + json.list[i].data[j + 1].item[0].thedate + '日</dt><dd><h3>' + json.list[i].data[j + 1].item[0].title + '</h3><img src="' + json.list[i].data[j + 1].item[0].imgurl + '" alt="" height="100" width="222"><p class="info">' + json.list[i].data[j + 1].item[0].info + '</p></dd>';
                            }

                            st = 1;
                        } else if (i < 10 && i < json.list.length - 1) {
                            if (json.list[i + 1].data[0].item[0].url) {
                                html = '<dt>' + json.list[i + 1].data[0].themonth + '月' + json.list[i + 1].data[0].item[0].thedate + '日</dt><dd><h3>' + json.list[i + 1].data[0].item[0].title + '</h3><img src="' + json.list[i + 1].data[0].item[0].imgurl + '" alt="" height="100" width="222"><p class="info">' + json.list[i + 1].data[0].item[0].info + '</p><p class="f14"><a href="' + json.list[i + 1].data[0].item[0].url + '" title="" target="_blank">了解更多 >></a></p></dd>';
                            } else {
                                html = '<dt>' + json.list[i + 1].data[0].themonth + '月' + json.list[i + 1].data[0].item[0].thedate + '日</dt><dd><h3>' + json.list[i + 1].data[0].item[0].title + '</h3><img src="' + json.list[i + 1].data[0].item[0].imgurl + '" alt="" height="100" width="222"><p class="info">' + json.list[i + 1].data[0].item[0].info + '</p></dd>';
                            }

                            st = 1;
                        }
                    }
                }
            }
        }
    }
    jQuery("#rili_info").html(html);
    //静态方法
    JCalendar.update = function (_month) {
        var date = new Date(JCalendar.cur_year, JCalendar.cur_month - 1 + _month, 1);
        var fday = date.getDay(); //每月第一天的星期数
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dayNum = new Date(JCalendar.cur_year, parseInt(JCalendar.cur_month) + _month, 0).getDate(); //每月的天数
        var tds = document.getElementById("calendar").getElementsByTagName("td");
        for (var i = 7; i < tds.length; i++) //清空日历内容
            tds[i].innerHTML = "";
        document.getElementById("calendar_title").innerHTML = year + "年" + (month < 10 ? ('0' + month) : month) + "月"; //更新显示年月
        //更新当前年月
        JCalendar.cur_year = year;
        JCalendar.cur_month = month;

        //alert(parseInt(month) == Omouth)
        //alert(JCalendar.cur_date)
        for (var j = 1; j <= dayNum; j++) {
            if (j == JCalendar.cur_date && year == DtaT[0] && month == DtaT[1]) {
                if (parseInt(month) == Omouth) {
                    tds[6 + fday + j].innerHTML = "<div class='c_today' onmouseover='JCalendar.click(this)'>" + Oday + "</div>";
                } else {
                    tds[6 + fday + j].innerHTML = "<div class='' onmouseover='JCalendar.click(this)'>" + JCalendar.cur_date + "</div>";
                }
            } else {
                tds[6 + fday + j].innerHTML = "<div onmouseover='JCalendar.click(this)'>" + j + "</div>";
            }
        }

        //获取日期数据状态
        for (var i = 0; i < json.list.length; i++) {
            if (JCalendar.cur_year == json.list[i].theyear) {
                for (var j = 0; j < json.list[i].data.length; j++) {
                    if (parseInt(JCalendar.cur_month) == json.list[i].data[j].themonth) {
                        for (var k = 0; k < json.list[i].data[j].item.length; k++) {
                            jQuery("#calendar tr td div").each(function () {
                                //console.log()
                                var th = jQuery(this).html();
                                th = th.length == 1 ? "0" + th : th;
                                if (th == json.list[i].data[j].item[k].thedate) {
                                    jQuery(this).addClass("has");
                                }
                            });
                            //alert(json.list[i].data[j].themonth,Omouth,st)

                            var dlen = new Date(Oyear, Omouth, 0).getDate();
                            for (var n = Oday; n <= dlen; n++) {
                                if (n == parseInt(json.list[i].data[j].item[k].thedate)) {
                                    arrs_n.push(n);
                                }
                            }
                            //alert(json.list[i].data[j].themonth == Omouth)
                            if (json.list[i].theyear == Oyear && json.list[i].data[j].themonth == Omouth && st == 0) {
                                jQuery("#calendar tr td div").each(function () {
                                    jQuery("#calendar tr td div").removeClass("current");
                                    jQuery("#calendar tr td div").eq(parseInt(arrs_n[0]) - 1).addClass("current");
                                });
                            } else if (json.list[i].theyear == Oyear && json.list[i].data[j].themonth == (Omouth + 1) && st == 1) {
                                jQuery("#calendar tr td div").each(function () {
                                    if (parseInt(jQuery(this).html()) == parseInt(json.list[i].data[j].item[0].thedate)) {
                                        jQuery("#calendar tr td div").removeClass("current");
                                        jQuery(this).addClass("current");
                                    }
                                });
                            } else if (json.list[i].theyear == (parseInt(Oyear) + 1) && Omouth == 12 && json.list[i].data[j].themonth == 1 && st == 1) {
                                jQuery("#calendar tr td div").each(function () {
                                    if (parseInt(jQuery(this).html()) == parseInt(json.list[i].data[0].item[0].thedate)) {
                                        jQuery("#calendar tr td div").removeClass("current");
                                        jQuery(this).addClass("current");
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
        JCalendar.onupdate(year, month, JCalendar.cur_date);
    }
    JCalendar.onupdate = function (year, month, date) { //日历更改时执行的函数，可以更改为自己需要函数,控件传递过来的参数为当前日期
        //alert(year + "年" + month + "月" + date + "日");
    }

    JCalendar.click = function (obj) {
        var tmp = document.getElementById("c_today");
        //tmp.innerHTML = "<div onmouseover=\"this.style.backgroundColor='#CCC'\" onmouseout=\"this.style.backgroundColor='#C4CCE8'\" onclick='JCalendar.click(this)'>" + tmp.innerHTML + "</div>";
        //JCalendar.cur_date = parseInt(obj.innerHTML);
        //obj.innerHTML = obj.innerHTML;
        if (jQuery(obj).hasClass("has")) {
            jQuery("#calendar div").removeClass("current");
            jQuery(obj).addClass("current");
            JCalendar.onclick(JCalendar.cur_year, JCalendar.cur_month, parseInt(obj.innerHTML));
        }

        //console.log(JCalendar.cur_date,parseInt(obj.innerHTML))
        //alert(tmp.parentNode.innerHTML)
    }

    JCalendar.onclick = function (year, month, date, _index) {
        if (!_index) {
            _index = 1;
        }

        var mo = today.getMonth() + 1;
        if (month.toString().length == 1) {
            month = "0" + month.toString();
        }
        if (date.toString().length == 1) {
            date = "0" + date.toString();
        }

        var ty = year.toString();
        var tm = month.toString();
        var td = date.toString();
        var url;

        var html = '';
        for (var i = 0; i < json.list.length; i++) {
            if (year == json.list[i].theyear) {
                for (var j = 0; j < json.list[i].data.length; j++) {
                    if (month == json.list[i].data[j].themonth) {
                        var subHtml = '', totalCount = 0, tempDate;
                        for (var k = 0; k < json.list[i].data[j].item.length; k++) {
                            if (date == json.list[i].data[j].item[k].thedate) {
                                totalCount++;
                                tempDate = json.list[i].data[j].item[k].thedate;
                                if (_index == totalCount) {
                                    var txtCount = json.list[i].data[j].item[k].info;
                                    txtCount = txtCount.length > 59 ? txtCount.substring(0, 59) : txtCount;
                                    subHtml += '<div class="dashiji_time">' + year + '年' + json.list[i].data[j].themonth + '月' + json.list[i].data[j].item[k].thedate + '日</div>' +
												'<div class="dashiji_box"><a href="' + json.list[i].data[j].item[k].url + '"><img src="' + json.list[i].data[j].item[k].imgurl + '" width="330" height="110" alt="" /></a><b><a href="' + json.list[i].data[j].item[k].url + '">' + json.list[i].data[j].item[k].title + '</a></b>' +
												'<p>' + txtCount + '....<a href="' + json.list[i].data[j].item[k].url + '">【查看详情】</a></p>' +
												'</div>';
                                    //subHtml += '<div class="tit0127"><span>' + json.list[i].data[j].themonth + '月' + json.list[i].data[j].item[k].thedate + '日</span><a href="' + json.list[i].data[j].item[k].url + '">' + json.list[i].data[j].item[k].title + '</a></div>' +
                                    //		'<div class="img0127"><a href="' + json.list[i].data[j].item[k].url + '"><img src="'+ json.list[i].data[j].item[k].imgurl + '" width="367" height="112" alt="" /></a></div>' +
                                    //		'<p>'+ json.list[i].data[j].item[k].info +'......<a href="' + json.list[i].data[j].item[k].url + '">【阅读全文】</a></p>';									
                                }
                            }
                        }
                        //<div class="dashiji_page"><span class="d_r2"></span><span class="d_l2"></span><i>1</i>/5</div>
                        if (_index > 1) {
                            html += '<div class="dashiji_page"><span class="d_l2" onclick="JCalendar.onclick(JCalendar.cur_year, JCalendar.cur_month, ' + tempDate + ', ' + (_index - 1) + ');"></span> ';
                        } else {
                            html += '<div class="dashiji_page"><span class="d_l2"></span> ';
                        }
                        if (_index < totalCount) {
                            html += '<span class="d_r2" onclick="JCalendar.onclick(JCalendar.cur_year, JCalendar.cur_month, ' + tempDate + ', ' + (_index + 1) + ');"></span> <i>' + _index + '</i>/' + totalCount + ' </div>';
                        } else {
                            html += ' <span class="d_r2"></span> <i>' + _index + '</i>/' + totalCount + '</div>';
                        }
                        html += subHtml;
                    }
                }
            }
        }
        jQuery("#rili_info").html(html);

        setCurTime({
            //F: Gid("index_history"),
            Y: ty,
            M: tm,
            D: td
        })
    }

    //初始化未来最近的显示数据
    var showdate = json.showdate.split("-");
    JCalendar.onclick(showdate[0], showdate[1], showdate[2], 1);
}
rili_init();

function setCurTime(a) {
    if (typeof a != "object") return;
    a.M = a.M.toString();
    a.D = a.D.toString();

    if (a.M.length == 1) {
        a.M = "0" + a.M;
    }
    if (a.D.length == 1) {
        a.D = "0" + a.D;
    }
    //var f = a.F;
    //setSelected(f.Year, a.Y);
    //setSelected(f.Month, a.M);
    if (a.D == "NaN") {
        a.D = Oday
    };
    //setSelected(f.Day, a.D);
    Gid("selected_date").innerHTML = a.Y + "-" + (a.M.length == 1 ? "0" + a.M : a.M) + "-" + (a.D.length == 1 ? "0" + a.D : a.D);
}

function setSelected(a, b) {
    if (!a || typeof a != "object") return;
    if (!b) return;
    a.value = b;
}
