// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let isCreate;
  let apiUrl = $('.page-data').attr('data-apiUrl')
  let nextTo = $('.page-data').attr('data-nextTo')
  let isMainPage = parseInt($('.page-data').attr('data-isMainPage'))?true:false;

  console.log(nextTo)

  function getForm() {
    $('body').LoadingOverlay("show");
    $.ajax({
      url: `${apiDomain}${apiUrl}${isMainPage?'/publish':'/'+getUrlQuery('id')}`,
      type: 'get',
      data:{
      },
      success: function (res) {
        $('body').LoadingOverlay("hide");
        console.log(res);
        setForm(res.data)
      },
      error: function (xhr) {
        $('body').LoadingOverlay("hide");
        console.log(xhr)
      }
    });
  }

  function setForm(data) {
    // console.log(data)
    for (const key in data) {
      // console.log(key)
      // console.log(data[key])
      if(key.indexOf('isEnable')>=0){
        if(data[key]){
          $(`#${key}`).val('1')
        }else{
          $(`#${key}`).val('0')
        }
      }else{
        $(`#${key}`).val(data[key])
        $(`.${key}`).attr('src',data[key])
      }
    }
    bindEvent({
      isCreate,
      isMainPage,
      apiUrl:`${apiUrl}${isMainPage?'/create/publish':''}`,
      nextTo: nextTo
    });
  }
  
  $(document).ready(function () {

    if(getUrlQuery('id')){
      isCreate = false;
      getForm();
      $("input[name='id']").val(getUrlQuery('id'))
    }else if(isMainPage){
      isCreate = false;
      getForm();
    }else{
      isCreate = true;
      bindEvent({
        isCreate,
        apiUrl:apiUrl,
        nextTo: nextTo
      });
    }
    
  })
})()