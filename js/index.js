"use strict";!function(){function i(){$.ajax({url:apiDomain+"/api/v1/index/publish",type:"get",data:{},success:function(i){console.log(i),function(i){for(var n in i)0<=n.indexOf("_isEnable")?i[n]?$("#".concat(n)).val("1"):$("#".concat(n)).val("0"):$("#".concat(n)).val(i[n]);bindEvent()}(i.data)},error:function(i){console.log(i)}})}$(document).ready(function(){i(),$("input[type='file']").on("change",function(){console.log("upload file"),uploadFile($(this)[0])}),$(".submit").on("click",function(){isPreview=!1,apiUrl="/api/v1/index/create/publish"}),$(".preview").on("click",function(){isPreview=!0,apiUrl="/api/v1/index/create/draft"})})}();
//# sourceMappingURL=index.js.map
