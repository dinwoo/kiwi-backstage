"use strict";var apiDomain="https://test.com/";function sendFormData(t){console.log(t);var o=document.getElementById("dataForm"),a=new FormData(o),n=$("#dataForm").attr("action");console.log(n);t=$("#dataForm").attr("method");console.log(t);var e={};a.forEach(function(t,o){e[o]=t});o=JSON.stringify(e);console.log("formfata:"+o),$.ajax({url:"".concat(apiDomain).concat(n),type:t,processData:!1,contentType:!1,data:a}).done(function(t){console.log(t)}).fail(function(t){console.log(t),alert("操作失敗")})}function bindEvent(a){var t=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(t).forEach(function(o){o.addEventListener("submit",function(t){o.checkValidity()?(console.log("OK"),t.preventDefault(),t.stopPropagation(),sendFormData(a)):(t.preventDefault(),t.stopPropagation()),o.classList.add("was-validated")},!1)})}function getUrlQuery(t){var o=location.href,a="";if(-1!=o.indexOf("?"))for(var n=o.split("?")[1].split("&"),e=0;e<=n.length-1;e++)n[e].split("=")[0]==t&&(a=n[e].split("=")[1]);return a}
//# sourceMappingURL=all.js.map
