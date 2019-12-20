
$(function () {
    
window.addEventListener('scroll', ()=> {
    if($(window).width() < 1024) {
        let scrolled = window.pageYOffset || document.scrollTop;
        console.log('asdsad')
        if($('#numbers').offsetTop()) {
            console.log($('#numbers').offsetTop())
        }
   } 
});




});