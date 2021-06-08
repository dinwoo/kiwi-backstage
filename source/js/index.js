// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  // $.mockjax({
  //     url:apiDomain+ 'api/getForm',
  //     status: 200,
  //     responseTime: 750,         
  //     responseText: {
  //       "success":true,
  //       "errorCode":200,
  //       "data":{
  //         meta_title:'meta標題api',
  //         meta_description:'meta描述api',
  //         meta_siteName:'meta網站名稱api',
  //         slogan_isEnabled: 0,
  //         slogan_title:'slogan標題api',
  //         slogan_subtitle:'子標題api',
  //       }
  //     }
  // });

  function getForm() {
    $.ajax({
      url: apiDomain+'/api/v1/index/publish',
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
      if(key.indexOf('_isEnable')>=0){
        if(data[key]){
          $(`#${key}`).val('1')
          console.log('顯示')
        }else{
          $(`#${key}`).val('0')
        }
      }else{
        $(`#${key}`).val(data[key])
      }
    }
    bindEvent();
  }
  
  $(document).ready(function () {

    getForm()

    $("input[type='file']").on('change',function () {
      console.log("upload file")
      uploadFile($(this)[0])
    })

    $('.testBtn').on('click',function () {
      $('#dataForm').submit()
    })
    
  })
})()