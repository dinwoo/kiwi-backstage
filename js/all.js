"use strict";var apiDomain="http://kiwi.ponitor.com.tw",isPreview=!1,apiUrl="";function sendFormData(e){apiUrl=e.apiUrl;for(var t=e.isCreate?"create":"update",a=e.isCreate?"post":"put",o={},n=0;n<$(".form-bind-data").length;n++)o[$(".form-bind-data").eq(n).attr("name")]=$(".form-bind-data").eq(n).val();for(var i=0;i<$(".items-box").length;i++){var l=$(".items-box").eq(i).attr("data-itemKey");o[l]=[];for(var r=0;r<$(".items-box").eq(i).find(".items").length;r++){o[l][r]={};for(var c=$(".items-box").eq(i).find(".items").eq(r).find(".form-bind-items-data"),s=0;s<c.length;s++)o[l][r][c.eq(s).attr("name")]=c.eq(s).val()}}for(var d=0;d<$("select").length;d++)o[$("select").eq(d).attr("name")]=!!parseInt($("select").eq(d).val());console.log(o),$.ajax({url:"".concat(apiDomain).concat(apiUrl,"/").concat(t),type:a,dataType:"json",contentType:"application/json; charset=utf-8",data:JSON.stringify(o)}).done(function(t){console.log(t),window.location.href=e.nextTo}).fail(function(t){console.log(t),alert("操作失敗")})}function bindEvent(a){var t=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(t).forEach(function(e){e.addEventListener("submit",function(t){e.checkValidity()?(console.log("OK"),t.preventDefault(),t.stopPropagation(),console.log(isPreview),sendFormData(a)):(t.preventDefault(),t.stopPropagation(),e.classList.add("was-validated"))},!1)})}function getUrlQuery(t){var e=location.href,a="";if(-1!=e.indexOf("?"))for(var o=e.split("?")[1].split("&"),n=0;n<=o.length-1;n++)o[n].split("=")[0]==t&&(a=o[n].split("=")[1]);return a}function uploadFile(e){var t=new FormData;t.append("file",e.files[0],"json.png");$.ajax({url:"http://kiwi.ponitor.com.tw/api/v1/file/upload",method:"POST",timeout:0,processData:!1,mimeType:"multipart/form-data",contentType:!1,data:t}).done(function(t){return e.nextElementSibling.value=JSON.parse(t).data.img,console.log($(".".concat($(e).attr("imgClass")))),$(e).parent(".col-md-12").find(".".concat($(e).attr("imgClass"))).attr("src",JSON.parse(t).data.img),JSON.parse(t).data.img}).fail(function(t){console.log(t),alert("操作失敗")})}function deleteApi(t){$.ajax({url:"".concat(apiDomain).concat(t.apiUrl,"/").concat(t.id),type:"delete",dataType:"json",contentType:"application/json; charset=utf-8"}).done(function(t){console.log(t),location.reload()}).fail(function(t){console.log(t),alert("操作失敗")})}$(document).ready(function(){null==localStorage.getItem("user")&&window.location.pathname.indexOf("login.html")<0&&(window.location.href="login.html"),$("input[type='file']").on("change",function(){console.log("upload file"),uploadFile($(this)[0])}),$("header .logout").on("click",function(){localStorage.removeItem("user"),window.location.href="login.html"}),$(".btn-add").on("click",function(){$(this).prev(".items-box").append($(".hidde-box .".concat($(this).data("copy"))).html()),$("input[type='file']").on("change",function(){uploadFile($(this)[0])})})});
//# sourceMappingURL=all.js.map
