const $base64 = new Base64()

if ($request.url.indexOf($base64.decode("c2VydmljZS5iZWlqaW5ndG9vbi5jb20vY3N0b29uLWhlYWx0aC1xdWVyeS9oZWFsdGgvcXVlcnlIZWFsdGhTdGF0ZQ==")) != -1) {
        $done({status: 200, headers: $response.headers, body: '{"meta":{"code":0,"message":"成功"},"data":{"result":null,"currentTime":1652463946775,"address":null,"unitname":null,"queryRecord":{"createTime":1652463746139,"updateTime":1652463746139,"deleteFlag":0,"createBy":"","updateBy":"","id":7294847,"userId":3869873,"queryName":"徐**","relation":"","photo":"","queryCertNo":"22**************18","whiteFlag":2,"onlyOnePhoneFlag":1,"lessThanSixteenFlag":1,"healthState":0,"queryTime":1652463746138,"expireTime":"2022-05-14 12:00","validState":1,"selfFlag":1,"healthStateSuccessList":null,"queryDay":"2022-05-14","nameCode":"0480BEEE393E11D1D0921C87EBD0641F660B343E249065AA7FD728657AEE8A6E64B476AF8E31B16B8F5EB4E91311F97294A6865D9D5AC6F9C7883181E109039AB6713ECA93369B96BCB41FAAA8ED5346A2727078C989908DC61B4E76DF351C7B3F3D85D39EF89C8FA59D","cartNoCode":"047EFA372C547258CAF194D9620DB290D7CD0138BC5EB0A060A71C9ABE44BB070ECDA3D0CBCB8B608FFE6E857C9881A1AB25AC5E365603886CD87C6D8FA19D5DFCD90E494DEF1D2344D27187636ABFF6B18661C82F5DA5B436D7483D0978B1EE4180AF1EA0E1FE75196B5F2A41217713A003680D10E190BBAE75E9F6C73186B4FFE2F39ECB9C82ED64298D0886A6827B8EF23C0AF001F22BA61234AE17A35A4FA6"}}}' })
}else{
    $done({})
}



function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
