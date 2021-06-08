// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  $.mockjax({
      url:apiDomain+ 'api/getForm',
      status: 200,
      responseTime: 750,         
      responseText: {
        "success":true,
        "errorCode":200,
        "data":{
          meta_title:'meta標題api',
          meta_description:'meta描述api',
          meta_siteName:'meta網站名稱api',
          slogan_isEnabled: 0,
          slogan_title:'slogan標題api',
          slogan_subtitle:'子標題api',
        }
      }
  });

  function getForm() {
    $.ajax({
      url: apiDomain+'api/getForm',
      type: 'get',
      data:{
      },
      success: function (res) {
        console.log(res);
        setForm(res.data)
      },
      error: function (xhr) {
        console.log(xhr)
      }
    });
  }

  function setForm(data) {
    console.log(data)
    for (const key in data) {
      console.log(key)
      console.log(data[key])
      $(`#${key}`).val(data[key])
    }
    bindEvent();
  }
  
  $(document).ready(function () {

    getForm()
    
  })
})()