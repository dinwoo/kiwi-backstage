"use strict";!function(){var t="https://test.com/";function n(){$.ajax({url:t+"api/test",type:"get",data:{},success:function(t){!function(t){var n,e="";for(n in t)console.log(t[n]),e='\n        <tr>\n          <td scope="row">'.concat(n,'</td>\n          <td><img src="').concat(t[n].avatar,'"></td>\n          <td>').concat(t[n].name,"</td>\n          <td>").concat(t[n].personaType,"</td>\n          <td>").concat(t[n].rating,"</td>\n          <td>").concat(t[n].text,'</td>\n          <td>\n            <div class="btn edit btn-primary">修改</div>\n            <div class="btn btn-danger">刪除</div>\n          </td>\n        </tr>\n      '),$("table tbody").append(e)}(t.data),$(".edit").on("click",function(){console.log("edit")})},error:function(t){console.log(t)}})}$.mockjax({url:t+"api/test",status:200,responseTime:750,responseText:{success:!0,errorCode:200,data:{1:{avatar:"https://fakeimg.pl/200x200/?text=Hello",name:"name",personaType:"personaType",rating:"rating",text:"text"},2:{avatar:"https://fakeimg.pl/200x200/?text=Hello",name:"name",personaType:"personaType",rating:"rating",text:"text"}}}}),$(document).ready(function(){n()})}();
//# sourceMappingURL=tableList.js.map
