// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let isCreate;
  let apiUrl = $('.page-data').attr('data-apiUrl')
  let nextTo = $('.page-data').attr('data-nextTo')
  let isMainPage = parseInt($('.page-data').attr('data-isMainPage')) ? true : false;

  function getForm() {
    $('body').LoadingOverlay("show");
    $.ajax({
      url: `${apiDomain}${apiUrl}${isMainPage ? '/publish' : '/' + getUrlQuery('id')}`,
      type: 'get',
      data: {
      },
      success: function (res) {
        $('body').LoadingOverlay("hide");
        console.log(res);
        setForm(res.data)
        bindEvent({
          isCreate,
          isMainPage,
          apiUrl: `${apiUrl}${isMainPage ? '/create' : ''}`,
          nextTo: nextTo
        });
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
      console.log("------------------------------")
      console.log(key)
      console.log(data[key])
      if (key.indexOf('isEnable') >= 0) {
        if (data[key]) {
          $(`#${key}`).val('1')
        } else {
          $(`#${key}`).val('0')
        }
      } else if(key.indexOf('items')>= 0){
        $(`#${key}`).append($(`.hidde-box .${key}`).html())
        for (let i = 0; i < data[key].length; i++) {
          console.log(data[key][i])
          let inputItems = $(`#${key} .items`).eq(i).find('.form-bind-items-data');
          for (let j = 0; j < inputItems.length; j++) {
            console.log(data[key][i][$(inputItems[j]).attr('name')])
            $(inputItems[j]).attr('value',data[key][i][$(inputItems[j]).attr('name')])
            inputItems[j].nextElementSibling.setAttribute('src',data[key][i][$(inputItems[j]).attr('name')])
          }
        }
        $("input[type='file']").on('change', function () {
          // console.log("upload file")
          uploadFile($(this)[0])
        })
      }else {
        $(`#${key}`).val(data[key])
        $(`.${key}`).attr('src', data[key])
      }
    }
  }

  $(document).ready(function () {

    if (getUrlQuery('id')) {
      isCreate = false;
      getForm();
      $("input[name='id']").val(getUrlQuery('id'))
    } else if (isMainPage) {
      isCreate = false;
      getForm();
    } else {
      isCreate = true;
      $("input[type='file']").attr('required', 'required')
      bindEvent({
        isCreate,
        apiUrl: apiUrl,
        nextTo: nextTo
      });
    }

    $('.submit').on('click',function () {
      isPublish = true
    })

    $('.draft').on('click',function () {
      isPublish = false
    })

  })
})()