// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

  function bindMonthEvent() {
    $('.btn-add-month').unbind('click')
    $('.btn-add-month').on('click', function () {
      $(this).prev('.months-box').append($(`.hidde-box .${$(this).data('copy')}`).html())
    })

    
  }

  $(document).ready(function () {
    bindMonthEvent()
    $('.btn-add-year').on('click', function () {
      $(this).prev('.years-box').append($(`.hidde-box .${$(this).data('copy')}`).html())
      bindMonthEvent()
    })
  })
})()