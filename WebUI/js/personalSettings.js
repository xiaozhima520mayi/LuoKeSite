function personSetting() {
    $.ajax({
        type: "GET",
        url: "http://192.168.1.160:8080/CulturalServiceCloud/queryReaderUser.html?readerUserOid=26561490BD014C278FC5E4EC9A3298D9",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}

