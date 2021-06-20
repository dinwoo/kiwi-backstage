// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let apiDomain = 'http://kiwi.ponitor.com.tw';


  function login(data) {
    console.log(data)
    let dataForm = document.getElementById('dataForm');
    let formData = new FormData(dataForm);

    let url = $('#dataForm').attr('action')
    console.log(url)
    let method = $('#dataForm').attr('method')
    console.log(method)

    //檢查formdata值
    let object = {};
    formData.forEach((value, key) => { object[key] = value });
    let json = JSON.stringify(object);
    console.log('formfata:' + json);
    console.log(JSON.stringify(json));

    $('body').LoadingOverlay("show");
    $.ajax({
      url: `${apiDomain}${url}`,
      type: method,
      dataType: 'json', // 預期從server接收的資料型態
      contentType: 'application/json; charset=utf-8', // 要送到server的資料型態
      data: json,
    }).done(function (data) {
      $('body').LoadingOverlay("hide");
      console.log(data.data);
      if (data.code == 200) {
        localStorage.setItem('user', data.data.name);
        window.location.href = `index.html`;
      } else {
        alert(data.message)
      }
    }).fail(function (res) {
      $('body').LoadingOverlay("hide");
      console.log(res);
      alert('操作失敗');
    });
  }

  $(document).ready(function () {

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
            login()
          }

        }, false)
      })

  })
})()