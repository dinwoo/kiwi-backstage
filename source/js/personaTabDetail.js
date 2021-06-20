// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  function getList() {
    $('body').LoadingOverlay("show");
    $.ajax({
      url: apiDomain + '/api/v1/index/personatab/detail/all',
      type: 'get',
      data: {
      },
      success: function (res) {
        $('body').LoadingOverlay("hide");
        // console.log(res);
        showList(res.data)
        bindEvent()
      },
      error: function (xhr) {
        $('body').LoadingOverlay("hide");
        console.log(xhr)
      }
    });
  }

  function showList(data) {
    let str = '';
    for (let i in data) {
      console.log(data[i])
      str = `
        <tr>
          <td scope="row">${parseInt(i) + 1}</td>
          <td>${data[i].eventId}</td>
          <td>${data[i].title}</td>
          <td>${data[i].url}</td>
          <td>${data[i].isCheaper? '是' : '否'}</td>
          <td>${data[i].detail_savePrice}</td>
          <td><div style="width:50px;height:50px;background-color:${data[i].color}"></div></td>
          <td>${data[i].detail_title}</td>
          <td>${data[i].detail_buttonText}</td>
          <td>${data[i].detail_exampleTitle}</td>
          <td>${data[i].detail_exampleDetail}</td>
          <td>${data[i].detail_featureBullets}</td>
          <td>${data[i].detail_featuresTitle}</td>
          <td><img src="${data[i].icon}"></td>
          <td>${data[i].isEnable ? '是' : '否'}</td>
          <td>
            <div class="btn edit-btn btn-primary" data-key="${data[i].id}">修改</div>
            <div class="btn delete-btn btn-danger" data-key="${data[i].id}">刪除</div>
          </td>
        </tr>
      `
      $('table tbody').append(str)
    }
  }

  function bindEvent() {
    $('.edit-btn').on('click', function () {
      // console.log($(this).data('key'))
      window.location.href = `personaTabDetailForm.html?id=${$(this).data('key')}`;
    })
    $('.delete-btn').on('click', function () {
      // console.log($(this).data('key'))
      let isDelete = confirm(`是否刪除?`)
      if (isDelete) {
        // alert("已刪除")
        deleteApi({
          apiUrl: `/api/v1/index/personatab/detail`,
          id: $(this).data('key')
        })
      } else {
        // alert("取消刪除")
      }
    })
  }
  $(document).ready(function () {

    getList();
    $('.add-btn').on('click', function () {
      // console.log($(this).data('key'))
      window.location.href = `personaTabDetailForm.html`;
    })


  })
})()