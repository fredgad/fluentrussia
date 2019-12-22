
$(function () { 
    let educVertical = $('#educational_services'),
        educGorisontal = $('#education_hor_scroll'),
        go = 0,
        educChilds = educGorisontal.children(),
        educChildsWidth = 30;

    for(let x = 0; x < educChilds.length; x++) {
        let w = $(educChilds[x]).width() + parseInt($(educChilds[x]).css('margin-right'));
        educChildsWidth += w;
    }

    let pointWidth = $(window).width() / ((educChildsWidth+50)/100)

    $('#educ-point').width(pointWidth + '%')
    educGorisontal.width(educChildsWidth+50 + 'px')
    educGorisontal.css('min-width', educChildsWidth+50 + 'px')
    educVertical.height(educChildsWidth-200 + 'px')
    educVertical.css('min-height', educChildsWidth-200 + 'px')

$(window).on('scroll', ()=> {
    if($(window).width() > 1024) {
        let scrolled = window.pageYOffset || document.scrollTop,
            elTop = $('#educational_services').offset().top,
            partnersTop = $('#partners').offset().top;

        go =  go >= 0 ? scrolled - elTop : 0;


        if(scrolled > elTop && 
          go < $('#education_hor_scroll').width() - $(window).width() + 300) {
            $('#education_hor_scroll').css(
                'transform', `translate(-${go}px)`
            )
            let goLine = go / ((educGorisontal.width() + pointWidth + 400) / $(window).width());   
            $('#educ-point').css(
                'transform', `translate(${goLine}px)`
            )
        }
   } 
});




});