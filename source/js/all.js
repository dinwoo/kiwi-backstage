// Example starter JavaScript for disabling form submissions if there are invalid fields
let apiDomain = 'http://kiwi.ponitor.com.tw';
let isPreview = false;
let isPublish;
let apiUrl = '';


function sendFormData(data) {
  // console.log(data)
  apiUrl = data.apiUrl;
  let isCreate = data.isMainPage ? "" : data.isCreate ? '/create' : "/update";
  let method = data.isCreate || data.isMainPage ? 'post' : "put";

  // let dataForm = document.getElementById('dataForm');
  // let formData = new FormData(dataForm);

  // //檢查formdata值
  // let object = {};
  // formData.forEach((value, key) => { object[key] = value });
  // let json = JSON.stringify(object);
  // console.log('formfata:'+json);


  let formData = {};
  if(data.isMainPage){
    formData.isPublish=isPublish
    formData.isDraft=!isPublish
  }
  for (let i = 0; i < $('.form-bind-data').length; i++) {
    formData[$('.form-bind-data').eq(i).attr('name')] = $('.form-bind-data').eq(i).val()
  }

  // 抓items用的
  for (let i = 0; i < $('.items-box').length; i++) {
    // 將每個items-box抓出來，宣告陣列
    let itemBoxKey = $('.items-box').eq(i).attr('data-itemKey')
    formData[itemBoxKey] = []
    for (let j = 0; j < $('.items-box').eq(i).find('.items').length; j++) {
      // 將items-box裡面有幾個items抓出來，並宣告物件
      formData[itemBoxKey][j] = {}
      let formBindItems = $('.items-box').eq(i).find('.items').eq(j).find('.form-bind-items-data')
      for (let k = 0; k < formBindItems.length; k++) {
        // 抓出items裡面有幾個需綁定的.form-bind-items-data，並綁定到該位置
        formData[itemBoxKey][j][formBindItems.eq(k).attr('name')] = formBindItems.eq(k).val()
      }
    }
  }
  for (let i = 0; i < $('select').length; i++) {
    formData[$('select').eq(i).attr('name')] = parseInt($('select').eq(i).val()) ? true : false;
  }
  console.log(formData)

  $('body').LoadingOverlay("show");
  $.ajax({
    url: `${apiDomain}${apiUrl}${isCreate}`,
    type: method,
    dataType: 'json', // 預期從server接收的資料型態
    contentType: 'application/json; charset=utf-8', // 要送到server的資料型態
    data: JSON.stringify(formData),
  }).done(function (res) {
    $('body').LoadingOverlay("hide");
    console.log(res);
    window.location.href = data.nextTo;
  }).fail(function (res) {
    $('body').LoadingOverlay("hide");
    console.log(res);
    alert('操作失敗');
  });
}

function bindEvent(data) {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          form.classList.add('was-validated')
        } else {
          console.log("OK")
          event.preventDefault()
          event.stopPropagation()
          sendFormData(data)
        }

      }, false)
    })
}

function getUrlQuery(key) {
  let url = location.href;
  let val = "";

  if (url.indexOf('?') != -1) {
    let ary = url.split('?')[1].split('&');

    for (let i = 0; i <= ary.length - 1; i++) {
      if (ary[i].split('=')[0] == key) {
        val = ary[i].split('=')[1];
      }
    }
  }
  return val;
}

function uploadFile(fileInput) {
  if (!fileInput.files[0]) return false
  var form = new FormData();
  form.append("file", fileInput.files[0], fileInput.files[0].name);

  var settings = {
  };
  $('body').LoadingOverlay("show");

  $.ajax({
    "url": "http://kiwi.ponitor.com.tw/api/v1/file/upload",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  }).done(function (data) {
    $('body').LoadingOverlay("hide");
    $(fileInput).attr('required', false)
    fileInput.nextElementSibling.value = JSON.parse(data).data.img
    console.log($(`.${$(fileInput).attr('imgClass')}`))
    $(fileInput).parent('.col-md-12').find(`.${$(fileInput).attr('imgClass')}`).attr('src', JSON.parse(data).data.img)
    return JSON.parse(data).data.img
  }).fail(function (res) {
    $('body').LoadingOverlay("hide");
    console.log(res);
    alert('操作失敗');
  });
}

function deleteApi(params) {
  $('body').LoadingOverlay("show");
  $.ajax({
    url: `${apiDomain}${params.apiUrl}/${params.id}`,
    type: 'delete',
    dataType: 'json', // 預期從server接收的資料型態
    contentType: 'application/json; charset=utf-8', // 要送到server的資料型態
  }).done(function (res) {
    $('body').LoadingOverlay("hide");
    console.log(res);
    location.reload();
  }).fail(function (res) {
    $('body').LoadingOverlay("hide");
    console.log(res);
    alert('操作失敗');
  });
}

$(document).ready(function () {
  let user = localStorage.getItem('user');

  if (user == null && window.location.pathname.indexOf('login.html') < 0) {
    window.location.href = `login.html`;
  } else {
    $('header .user-name span').text(user)
  }

  $("input[type='file']").on('change', function () {
    console.log("upload file")
    uploadFile($(this)[0])
  })

  $('header .logout').on('click', function () {
    localStorage.removeItem('user');
    window.location.href = `login.html`;
  })

  $('.btn-add').on('click', function () {
    // console.log($(`.hidde-box .${$(this).data('copy')}`).html())
    // console.log($(this).prev('.items-box'))
    $(this).prev('.items-box').append($(`.hidde-box .${$(this).data('copy')}`).html())
    $("input[type='file']").on('change', function () {
      // console.log("upload file")
      uploadFile($(this)[0])
    })
  })

})