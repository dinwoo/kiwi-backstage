// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let isAdd;

  $.mockjax({
      url:apiDomain+ 'api/getForm',
      status: 200,
      responseTime: 750,         
      responseText: {
        "success":true,
        "errorCode":200,
        "data":{
          avatar:'照片api',
          name:'姓名api',
          personaType:'性質api',
          rating: 2.6,
          text:'敘述api',
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
    bindEvent({
      isAdd,
      apiUrl:`feedbackDetailFormUrl`
    });
  }
  
  $(document).ready(function () {

    if(getUrlQuery('id')){
      isAdd = false;
      getForm();
    }else{
      isAdd = true;
    }
    
  })
})()