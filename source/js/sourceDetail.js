// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  function getList() {
    $.ajax({
      url: apiDomain+'/api/v1/index/source/detail/all',
      type: 'get',
      data:{
      },
      success: function (res) {
        // console.log(res);
        showList(res.data)
        bindEvent()
      },
      error: function (xhr) {
        console.log(xhr)
      }
    });
  }
  
  function showList(data) {
    let str = '';
    for (let i in data) {
      console.log(data[i])
      str=`
        <tr>
          <td scope="row">${parseInt(i)+1}</td>
          <td>${data[i].name}</td>
          <td>${data[i].description}</td>
          <td>${data[i].location}</td>
          <td><img src="${data[i].img}"></td>
          <td>${data[i].isEnable?'是':'否'}</td>
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
    $('.edit-btn').on('click',function () {
      // console.log($(this).data('key'))
      window.location.href = `sourceDetailForm.html?id=${$(this).data('key')}`;
    })
    $('.delete-btn').on('click',function () {
      // console.log($(this).data('key'))
      let isDelete = confirm(`是否刪除${$(this).data('key')}?`)
      if(isDelete){
        // alert("已刪除")
        deleteApi({
          apiUrl:`/api/v1/index/media/detail`,
          id:$(this).data('key')
        })
      }else{
        // alert("取消刪除")
      }
    })
  }
  $(document).ready(function () {

    getList();
    $('.add-btn').on('click',function () {
      // console.log($(this).data('key'))
      window.location.href = `sourceDetailForm.html`;
    })

    
  })
})()