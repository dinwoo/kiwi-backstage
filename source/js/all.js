// Example starter JavaScript for disabling form submissions if there are invalid fields
let apiDomain= 'https://test.com/';


function sendFormData(data) {
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
  console.log('formfata:'+json);

  $.ajax({
    url: `${apiDomain}${url}`,
    type: method,
    processData: false,
    contentType: false,
    data: formData,
  }).done(function (data) {
    console.log(data);
  }).fail(function (res) {
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
        }else{
          console.log("OK")
          event.preventDefault()
          event.stopPropagation()
          sendFormData(data)
        }

        form.classList.add('was-validated')
      }, false)
    })
}

function getUrlQuery(key) {
  let url = location.href;
  let val = "";

  if(url.indexOf('?')!=-1){
    let ary = url.split('?')[1].split('&');

    for(let i=0;i<=ary.length-1;i++){
      if(ary[i].split('=')[0] == key){
        val = ary[i].split('=')[1];
      }
    }
  }
  return val;
}