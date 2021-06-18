// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let isCreate;

  function getForm() {
    $('body').LoadingOverlay("show");
    $.ajax({
      url: `${apiDomain}/api/v1/index/feedback/detail/${getUrlQuery('id')}`,
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
    console.log(data)
    for (const key in data) {
      console.log(key)
      console.log(data[key])
      $(`#${key}`).val(data[key])
      $(`.${key}`).attr('src',data[key])
    }
    bindEvent({
      isCreate,
      apiUrl:`/api/v1/index/feedback/detail`,
      nextTo: 'feedbackDetail.html'
    });
  }
  
  $(document).ready(function () {

    if(getUrlQuery('id')){
      isCreate = false;
      getForm();
      $("input[name='id']").val(getUrlQuery('id'))
    }else{
      isCreate = true;
      bindEvent({
        isCreate,
        apiUrl:`/api/v1/index/feedback/detail`,
        nextTo: 'feedbackDetail.html'
      });
    }
    
  })
})()