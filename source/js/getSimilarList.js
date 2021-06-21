// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  function getList() {
    $('body').LoadingOverlay("show");
    $.ajax({
      url: apiDomain + '/api/v1/greenpower/detail/similarpost/all',
      type: 'get',
      data: {
      },
      success: function (res) {
        $('body').LoadingOverlay("hide");
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          $('select.form-bind-items-data').append(`
            <option value=${res.data[i].id}>
              ${res.data[i].name}
            </option>
          `)
        }
      },
      error: function (xhr) {
        $('body').LoadingOverlay("hide");
        console.log(xhr)
      }
    });
  }

  $(document).ready(function () {

    getList();

  })
})()