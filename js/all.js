"use strict";var apiDomain="http://kiwi.ponitor.com.tw";function sendFormData(t){console.log(t);var o=document.getElementById("dataForm"),a=new FormData(o),t=$("#dataForm").attr("action");console.log(t);o=$("#dataForm").attr("method");console.log(o);var n={};a.forEach(function(t,o){n[o]=t});a=JSON.stringify(n);console.log("formfata:"+a),console.log(JSON.stringify(a)),$.ajax({url:"".concat(apiDomain).concat(t),type:o,dataType:"json",contentType:"application/json; charset=utf-8",data:a}).done(function(t){console.log(t)}).fail(function(t){console.log(t),alert("操作失敗")})}function bindEvent(a){var t=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(t).forEach(function(o){o.addEventListener("submit",function(t){o.checkValidity()?(console.log("OK"),t.preventDefault(),t.stopPropagation(),sendFormData(a)):(t.preventDefault(),t.stopPropagation()),o.classList.add("was-validated")},!1)})}function getUrlQuery(t){var o=location.href,a="";if(-1!=o.indexOf("?"))for(var n=o.split("?")[1].split("&"),e=0;e<=n.length-1;e++)n[e].split("=")[0]==t&&(a=n[e].split("=")[1]);return a}function uploadFile(o){var t=new FormData;t.append("file",o.files[0],"json.png");$.ajax({url:"http://kiwi.ponitor.com.tw/api/v1/file/upload",method:"POST",timeout:0,processData:!1,mimeType:"multipart/form-data",contentType:!1,data:t}).done(function(t){return o.nextElementSibling.value=JSON.parse(t).data.img,JSON.parse(t).data.img}).fail(function(t){console.log(t),alert("操作失敗")})}$(document).ready(function(){var t=localStorage.getItem("user");console.log(t),null==t&&window.location.pathname.indexOf("login.html")<0&&(window.location.href="login.html")});
//# sourceMappingURL=all.js.map