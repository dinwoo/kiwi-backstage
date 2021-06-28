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
        // console.log(res);
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
      // console.log("------------------------------")
      // console.log(key)
      // console.log(Array.isArray(data[key]))
      if (key.indexOf('isEnable') >= 0) {
        if (data[key]) {
          $(`#${key}`).val('1')
        } else {
          $(`#${key}`).val('0')
        }
      } else if(key.indexOf('year_items') >= 0) {
        $(`#year_items`).html('')
        for (let i = 0; i < data[key].length; i++) {
          $(`#year_items`).append($(`.hidde-box .year_items`).html())
          $(`#year_items .years`).eq(i).find("input[name='year_item_year']").val(data[key][i].year_item_year)
          $(`#year_items .years`).eq(i).find('.months-box').html('')
          let monthsData = data[key][i].year_item_itmes
          for (let j = 0; j < monthsData.length; j++) {
            $(`#year_items .years`).eq(i).find('.months-box').append($(`.hidde-box .month_items`).html())
            let monthsItems = $(`#year_items .years`).eq(i).find('.months-box .months').eq(j).find('.form-bind-months-data')
            for (let k = 0; k < monthsItems.length; k++) {
              $(monthsItems[k]).attr('value',monthsData[j][$(monthsItems[k]).attr('name').replace('year_item_item_','')])
            }
          }
        }
      } else if(Array.isArray(data[key])){
        $(`#${key}`).html('')
        for (let i = 0; i < data[key].length; i++) {
          $(`#${key}`).append($(`.hidde-box .${key}`).html())
          console.log(data[key])
          let inputItems = $(`#${key} .items`).eq(i).find('.form-bind-items-data');
          for (let j = 0; j < inputItems.length; j++) {
            // console.log(data[key][i][$(inputItems[j]).attr('name')])
            $(inputItems[j]).attr('value',data[key][i][$(inputItems[j]).attr('name')])
            inputItems[j].nextElementSibling.setAttribute('src',data[key][i][$(inputItems[j]).attr('name')])
          }
          let inputSelects = $(`#${key} .items`).eq(i).find('.form-bind-items-select');
          for (let j = 0; j < inputSelects.length; j++) {
            if(data[key][i][$(inputSelects[j]).attr('name')]){
              $(inputSelects[j]).val('1')
            }else{
              $(inputSelects[j]).val('0')
            }
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