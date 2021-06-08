// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  $.mockjax({
      url:apiDomain+ 'api/test',
      status: 200,
      responseTime: 750,         
      responseText: {
        "success":true,
        "errorCode":200,
        "data":{
          1:{
            avatar:'https://fakeimg.pl/200x200/?text=Hello',
            name: 'name',
            personaType: 'personaType',
            rating: 'rating',
            text: 'text',
          },
          2:{
            avatar:'https://fakeimg.pl/200x200/?text=Hello',
            name: 'name',
            personaType: 'personaType',
            rating: 'rating',
            text: 'text',
          }
        }
      }
  });

  function getList() {
    $.ajax({
      url: apiDomain+'api/test',
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
          <td scope="row">${i}</td>
          <td><img src="${data[i].avatar}"></td>
          <td>${data[i].name}</td>
          <td>${data[i].personaType}</td>
          <td>${data[i].rating}</td>
          <td>${data[i].text}</td>
          <td>
            <div class="btn edit-btn btn-primary" data-key="${i}">修改</div>
            <div class="btn delete-btn btn-danger" data-key="${i}">刪除</div>
          </td>
        </tr>
      `
      $('table tbody').append(str)
    }
  }

  function bindEvent() {
    $('.edit-btn').on('click',function () {
      // console.log($(this).data('key'))
      window.location.href = `feedbackDetailForm.html?id=${$(this).data('key')}`;
    })
    $('.delete-btn').on('click',function () {
      // console.log($(this).data('key'))
      let isDelete = confirm(`是否刪除${$(this).data('key')}?`)
      if(isDelete){
        alert("已刪除")
      }else{
        alert("取消刪除")
      }
    })
  }
  $(document).ready(function () {

    getList();
    $('.add-btn').on('click',function () {
      // console.log($(this).data('key'))
      window.location.href = `feedbackDetailForm.html`;
    })

    
  })
})()