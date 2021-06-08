// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  let apiDomain= 'https://test.com/';

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
            <div class="btn edit btn-primary">修改</div>
            <div class="btn btn-danger">刪除</div>
          </td>
        </tr>
      `
      $('table tbody').append(str)
    }
  }

  function bindEvent() {
    $('.edit').on('click',function () {
      console.log('edit')
    })
  }
  $(document).ready(function () {

    getList();

    
  })
})()