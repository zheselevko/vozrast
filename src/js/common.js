$(document).ready(function(){
	$('.slider').slider({
		full_width: false,
		height: 671,
		indicators: true,
		sliderNext: $('.prev')
	});
$('.next').click(function() {
   $('.slider').slider('next');
});
$('.prev').click(function() {
   $('.slider').slider('prev');
});
 $(".example").TimeCircles();

});
