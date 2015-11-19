
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.options.arrows===!0&&(c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove())),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var c=this,d=c.currentSlide;c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)
})):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this,b=a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),b&&a.$slideTrack.find(".slick-active").focus()},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
(function ($) {

  var methods = {

    init : function(options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function() {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('li');
        var $active_index = $slider.find('.active').index();
        var $active, $indicators, $interval;
        if ($active_index != -1) { $active = $slides.eq($active_index); }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("right-align")) {
            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("left-align")) {
            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length -1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                              complete: function() {
                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                              } });
            captionTransition($caption, options.transition);


            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).addClass('active');


            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height);
          }
          else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }


        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function( index ) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(
                function(){
                  $active_index = $slider.find('.active').index();
                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                  else $active_index += 1;

                  moveToSlide($active_index);

                }, options.transition + options.interval
              );
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        }
        else {
          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function() {
          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        });

        // auto scroll
        $interval = setInterval(
          function(){
            $active_index = $slider.find('.active').index();
            moveToSlide($active_index + 1);

          }, options.transition + options.interval
        );


        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
            prevent_default: false
        }).bind('pan', function(e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;

            $curr_slide = $slider.find('.active');
            $curr_slide.velocity({ translateX: x
                }, {duration: 50, queue: false, easing: 'easeOutQuad'});

            // Swipe Left
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
              swipeLeft = true;
            }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }


          }

        }).bind('panend', function(e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(
              function(){
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);

              }, options.transition + options.interval
            );
          }
        });

        $this.on('sliderPause', function() {
          clearInterval($interval);
        });

        $this.on('sliderStart', function() {
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);

            }, options.transition + options.interval
          );
        });

        $this.on('sliderNext', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });

      });



    },
    pause : function() {
      $(this).trigger('sliderPause');
    },
    start : function() {
      $(this).trigger('sliderStart');
    },
    next : function() {
      $(this).trigger('sliderNext');
    },
    prev : function() {
      $(this).trigger('sliderPrev');
    }
  };


    $.fn.slider = function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
      }
    }; // Plugin end
}( jQuery ));
(function ($) {

    var methods = {

        init : function(options) {
            var defaults = {
                time_constant: 200, // ms
                dist: -100, // zoom scale TODO: make this more intuitive as an option
                shift: 0, // spacing for center image
                padding: 0, // Padding between non center items
                full_width: false // Change to full width styles
            };
            options = $.extend(defaults, options);

            return this.each(function() {

                var images, offset, center, pressed, dim, count,
                    reference, referenceY, amplitude, target, velocity,
                    xform, frame, timestamp, ticker, dragged, vertical_dragged;

                // Initialize
                var view = $(this);
                // Don't double initialize.
                if (view.hasClass('initialized')) {
                    return true;
                }

                // Options
                if (options.full_width) {
                    options.dist = 0;
                    imageHeight = view.find('.carousel-item img').first().load(function(){
                        view.css('height', $(this).height());
                    });
                }

                view.addClass('initialized');
                pressed = false;
                offset = target = 0;
                images = [];
                item_width = view.find('.carousel-item').first().innerWidth();
                dim = item_width * 2 + options.padding;

                view.find('.carousel-item').each(function () {
                    images.push($(this)[0]);
                });

                count = images.length;


                function setupEvents() {
                    if (typeof window.ontouchstart !== 'undefined') {
                        view[0].addEventListener('touchstart', tap);
                        view[0].addEventListener('touchmove', drag);
                        view[0].addEventListener('touchend', release);
                    }
                    view[0].addEventListener('mousedown', tap);
                    view[0].addEventListener('mousemove', drag);
                    view[0].addEventListener('mouseup', release);
                    view[0].addEventListener('click', click);
                }

                function xpos(e) {
                    // touch event
                    if (e.targetTouches && (e.targetTouches.length >= 1)) {
                        return e.targetTouches[0].clientX;
                    }

                    // mouse event
                    return e.clientX;
                }

                function ypos(e) {
                    // touch event
                    if (e.targetTouches && (e.targetTouches.length >= 1)) {
                        return e.targetTouches[0].clientY;
                    }

                    // mouse event
                    return e.clientY;
                }

                function wrap(x) {
                    return (x >= count) ? (x % count) : (x < 0) ? wrap(count + (x % count)) : x;
                }

                function scroll(x) {
                    var i, half, delta, dir, tween, el, alignment, xTranslation;

                    offset = (typeof x === 'number') ? x : offset;
                    center = Math.floor((offset + dim / 2) / dim);
                    delta = offset - center * dim;
                    dir = (delta < 0) ? 1 : -1;
                    tween = -dir * delta * 2 / dim;

                    if (!options.full_width) {
                        alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
                        alignment += 'translateY(' + (view[0].clientHeight - item_width) / 2 + 'px)';
                    } else {
                        alignment = 'translateX(0)';
                    }

                    // center
                    el = images[wrap(center)];
                    el.style[xform] = alignment +
                        ' translateX(' + (-delta / 2) + 'px)' +
                        ' translateX(' + (dir * options.shift * tween * i) + 'px)' +
                        ' translateZ(' + (options.dist * tween) + 'px)';
                    el.style.zIndex = 0;
                    if (options.full_width) { tweenedOpacity = 1; }
                    else { tweenedOpacity = 1 - 0.2 * tween; }
                    el.style.opacity = tweenedOpacity;
                    half = count >> 1;

                    for (i = 1; i <= half; ++i) {
                        // right side
                        if (options.full_width) {
                            zTranslation = options.dist;
                            tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
                        } else {
                            zTranslation = options.dist * (i * 2 + tween * dir);
                            tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
                        }
                        el = images[wrap(center + i)];
                        el.style[xform] = alignment +
                            ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' +
                            ' translateZ(' + zTranslation + 'px)';
                        el.style.zIndex = -i;
                        el.style.opacity = tweenedOpacity;


                        // left side
                        if (options.full_width) {
                            zTranslation = options.dist;
                            tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
                        } else {
                            zTranslation = options.dist * (i * 2 - tween * dir);
                            tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
                        }
                        el = images[wrap(center - i)];
                        el.style[xform] = alignment +
                            ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' +
                            ' translateZ(' + zTranslation + 'px)';
                        el.style.zIndex = -i;
                        el.style.opacity = tweenedOpacity;
                    }

                    // center
                    el = images[wrap(center)];
                    el.style[xform] = alignment +
                        ' translateX(' + (-delta / 2) + 'px)' +
                        ' translateX(' + (dir * options.shift * tween) + 'px)' +
                        ' translateZ(' + (options.dist * tween) + 'px)';
                    el.style.zIndex = 0;
                    if (options.full_width) { tweenedOpacity = 1; }
                    else { tweenedOpacity = 1 - 0.2 * tween; }
                    el.style.opacity = tweenedOpacity;
                }

                function track() {
                    var now, elapsed, delta, v;

                    now = Date.now();
                    elapsed = now - timestamp;
                    timestamp = now;
                    delta = offset - frame;
                    frame = offset;

                    v = 1000 * delta / (1 + elapsed);
                    velocity = 0.8 * v + 0.2 * velocity;
                }

                function autoScroll() {
                    var elapsed, delta;

                    if (amplitude) {
                        elapsed = Date.now() - timestamp;
                        delta = amplitude * Math.exp(-elapsed / options.time_constant);
                        if (delta > 2 || delta < -2) {
                            scroll(target - delta);
                            requestAnimationFrame(autoScroll);
                        } else {
                            scroll(target);
                        }
                    }
                }

                function click(e) {
                    // Disable clicks if carousel was dragged.
                    if (dragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;

                    } else if (!options.full_width) {
                        var clickedIndex = $(e.target).closest('.carousel-item').index();
                        var diff = (center % count) - clickedIndex;

                        // Account for wraparound.
                        if (diff < 0) {
                            if (Math.abs(diff + count) < Math.abs(diff)) { diff += count; }

                        } else if (diff > 0) {
                            if (Math.abs(diff - count) < diff) { diff -= count; }
                        }

                        // Call prev or next accordingly.
                        if (diff < 0) {
                            $(this).trigger('carouselNext', [Math.abs(diff)]);

                        } else if (diff > 0) {
                            $(this).trigger('carouselPrev', [diff]);
                        }
                    }
                }

                function tap(e) {
                    pressed = true;
                    dragged = false;
                    vertical_dragged = false;
                    reference = xpos(e);
                    referenceY = ypos(e);

                    velocity = amplitude = 0;
                    frame = offset;
                    timestamp = Date.now();
                    clearInterval(ticker);
                    ticker = setInterval(track, 100);

                }

                function drag(e) {
                    var x, delta, deltaY;
                    if (pressed) {
                        x = xpos(e);
                        y = ypos(e);
                        delta = reference - x;
                        deltaY = Math.abs(referenceY - y);
                        if (deltaY < 30 && !vertical_dragged) {
                            // If vertical scrolling don't allow dragging.
                            if (delta > 2 || delta < -2) {
                                dragged = true;
                                reference = x;
                                scroll(offset + delta);
                            }

                        } else if (dragged) {
                            // If dragging don't allow vertical scroll.
                            e.preventDefault();
                            e.stopPropagation();
                            return false;

                        } else {
                            // Vertical scrolling.
                            vertical_dragged = true;
                        }
                    }

                    if (dragged) {
                        // If dragging don't allow vertical scroll.
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }

                function release(e) {
                    pressed = false;

                    clearInterval(ticker);
                    target = offset;
                    if (velocity > 10 || velocity < -10) {
                        amplitude = 0.9 * velocity;
                        target = offset + amplitude;
                    }
                    target = Math.round(target / dim) * dim;
                    amplitude = target - offset;
                    timestamp = Date.now();
                    requestAnimationFrame(autoScroll);

                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                xform = 'transform';
                ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
                    var e = prefix + 'Transform';
                    if (typeof document.body.style[e] !== 'undefined') {
                        xform = e;
                        return false;
                    }
                    return true;
                });



                window.onresize = scroll;

                setupEvents();
                scroll(offset);

                $(this).on('carouselNext', function(e, n) {
                    if (n === undefined) {
                        n = 1;
                    }
                    target = offset + dim * n;
                    if (offset !== target) {
                        amplitude = target - offset;
                        timestamp = Date.now();
                        requestAnimationFrame(autoScroll);
                    }
                });

                $(this).on('carouselPrev', function(e, n) {
                    if (n === undefined) {
                        n = 1;
                    }
                    target = offset - dim * n;
                    if (offset !== target) {
                        amplitude = target - offset;
                        timestamp = Date.now();
                        requestAnimationFrame(autoScroll);
                    }
                });

            });



        },
        next : function(n) {
            $(this).trigger('carouselNext', [n]);
        },
        prev : function(n) {
            $(this).trigger('carouselPrev', [n]);
        },
    };


    $.fn.carousel = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.carousel' );
        }
    }; // Plugin end
}( jQuery ));
/**
 * Basic structure: TC_Class is the public class that is returned upon being called
 * 
 * So, if you do
 *      var tc = $(".timer").TimeCircles();
 *      
 * tc will contain an instance of the public TimeCircles class. It is important to
 * note that TimeCircles is not chained in the conventional way, check the
 * documentation for more info on how TimeCircles can be chained.
 * 
 * After being called/created, the public TimerCircles class will then- for each element
 * within it's collection, either fetch or create an instance of the private class.
 * Each function called upon the public class will be forwarded to each instance
 * of the private classes within the relevant element collection
 **/
(function($) {

    var useWindow = window;
    
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function() {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                    dontEnums = [
                        'toString',
                        'toLocaleString',
                        'valueOf',
                        'hasOwnProperty',
                        'isPrototypeOf',
                        'propertyIsEnumerable',
                        'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }
    
    // Used to disable some features on IE8
    var limited_mode = false;
    var tick_duration = 200; // in ms
    
    var debug = (location.hash === "#debug");
    function debug_log(msg) {
        if (debug) {
            console.log(msg);
        }
    }

    var allUnits = ["Days", "Hours", "Minutes", "Seconds"];
    var nextUnits = {
        Seconds: "Minutes",
        Minutes: "Hours",
        Hours: "Days",
        Days: "Years"
    };
    var secondsIn = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
        Months: 2678400,
        Years: 31536000
    };

    /**
     * Converts hex color code into object containing integer values for the r,g,b use
     * This function (hexToRgb) originates from:
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {string} hex color code
     */
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    /**
     * Function s4() and guid() originate from:
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }

    /**
     * Creates a unique id
     * @returns {String}
     */
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Array.prototype.indexOf fallback for IE8
     * @param {Mixed} mixed
     * @returns {Number}
     */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                        this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    function parse_date(str) {
        var match = str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
        if (match !== null && match.length > 0) {
            var parts = str.split(" ");
            var date = parts[0].split("-");
            var time = parts[1].split(":");
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        }
        // Fallback for different date formats
        var d = Date.parse(str);
        if (!isNaN(d))
            return d;
        d = Date.parse(str.replace(/-/g, '/').replace('T', ' '));
        if (!isNaN(d))
            return d;
        // Cant find anything
        return new Date();
    }

    function parse_times(diff, old_diff, total_duration, units, floor) {
        var raw_time = {};
        var raw_old_time = {};
        var time = {};
        var pct = {};
        var old_pct = {};
        var old_time = {};

        var greater_unit = null;
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            var maxUnits;

            if (greater_unit === null) {
                maxUnits = total_duration / secondsIn[unit];
            }
            else {
                maxUnits = secondsIn[greater_unit] / secondsIn[unit];
            }

            var curUnits = (diff / secondsIn[unit]);
            var oldUnits = (old_diff / secondsIn[unit]);
            
            if(floor) {
                if(curUnits > 0) curUnits = Math.floor(curUnits);
                else curUnits = Math.ceil(curUnits);
                if(oldUnits > 0) oldUnits = Math.floor(oldUnits);
                else oldUnits = Math.ceil(oldUnits);
            }
            
            if (unit !== "Days") {
                curUnits = curUnits % maxUnits;
                oldUnits = oldUnits % maxUnits;
            }

            raw_time[unit] = curUnits;
            time[unit] = Math.abs(curUnits);
            raw_old_time[unit] = oldUnits;
            old_time[unit] = Math.abs(oldUnits);
            pct[unit] = Math.abs(curUnits) / maxUnits;
            old_pct[unit] = Math.abs(oldUnits) / maxUnits;

            greater_unit = unit;
        }

        return {
            raw_time: raw_time,
            raw_old_time: raw_old_time,
            time: time,
            old_time: old_time,
            pct: pct,
            old_pct: old_pct
        };
    }

    var TC_Instance_List = {};
    function updateUsedWindow() {
        if(typeof useWindow.TC_Instance_List !== "undefined") {
            TC_Instance_List = useWindow.TC_Instance_List;
        }
        else {
            useWindow.TC_Instance_List = TC_Instance_List;
        }
        initializeAnimationFrameHandler(useWindow);
    };
    
    function initializeAnimationFrameHandler(w) {
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !w.requestAnimationFrame; ++x) {
            w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
            w.cancelAnimationFrame = w[vendors[x] + 'CancelAnimationFrame'];
        }

        if (!w.requestAnimationFrame || !w.cancelAnimationFrame) {
            w.requestAnimationFrame = function(callback, element, instance) {
                if (typeof instance === "undefined")
                    instance = {data: {last_frame: 0}};
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - instance.data.last_frame));
                var id = w.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                instance.data.last_frame = currTime + timeToCall;
                return id;
            };
            w.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    };
    

    var TC_Instance = function(element, options) {
        this.element = element;
        this.container;
        this.listeners = null;
        this.data = {
            paused: false,
            last_frame: 0,
            animation_frame: null,
            interval_fallback: null,
            timer: false,
            total_duration: null,
            prev_time: null,
            drawn_units: [],
            text_elements: {
                Days: null,
                Hours: null,
                Minutes: null,
                Seconds: null
            },
            attributes: {
                canvas: null,
                context: null,
                item_size: null,
                line_width: null,
                radius: null,
                outer_radius: null
            },
            state: {
                fading: {
                    Days: false,
                    Hours: false,
                    Minutes: false,
                    Seconds: false
                }
            }
        };

        this.config = null;
        this.setOptions(options);
        this.initialize();
    };

    TC_Instance.prototype.clearListeners = function() {
        this.listeners = { all: [], visible: [] };
    };
    
    TC_Instance.prototype.addTime = function(seconds_to_add) {
        if(this.data.attributes.ref_date instanceof Date) {
            var d = this.data.attributes.ref_date;
            d.setSeconds(d.getSeconds() + seconds_to_add);
        }
        else if(!isNaN(this.data.attributes.ref_date)) {
            this.data.attributes.ref_date += (seconds_to_add * 1000);
        }
    };
    
    TC_Instance.prototype.initialize = function(clear_listeners) {
        // Initialize drawn units
        this.data.drawn_units = [];
        for(var i = 0; i < Object.keys(this.config.time).length; i++) {
            var unit = Object.keys(this.config.time)[i];
            if (this.config.time[unit].show) {
                this.data.drawn_units.push(unit);
            }
        }

        // Avoid stacking
        $(this.element).children('div.time_circles').remove();

        if (typeof clear_listeners === "undefined")
            clear_listeners = true;
        if (clear_listeners || this.listeners === null) {
            this.clearListeners();
        }
        this.container = $("<div>");
        this.container.addClass('time_circles');
        this.container.appendTo(this.element);
        
        // Determine the needed width and height of TimeCircles
        var height = this.element.offsetHeight;
        var width = this.element.offsetWidth;
        if (height === 0)
            height = $(this.element).height();
        if (width === 0)
            width = $(this.element).width();

        if (height === 0 && width > 0)
            height = width / this.data.drawn_units.length;
        else if (width === 0 && height > 0)
            width = height * this.data.drawn_units.length;
        
        // Create our canvas and set it to the appropriate size
        var canvasElement = document.createElement('canvas');
        canvasElement.width = width;
        canvasElement.height = height;
        
        // Add canvas elements
        this.data.attributes.canvas = $(canvasElement);
        this.data.attributes.canvas.appendTo(this.container);
        
        // Check if the browser has browser support
        var canvasSupported = isCanvasSupported();
        // If the browser doesn't have browser support, check if explorer canvas is loaded
        // (A javascript library that adds canvas support to browsers that don't have it)
        if(!canvasSupported && typeof G_vmlCanvasManager !== "undefined") {
            G_vmlCanvasManager.initElement(canvasElement);
            limited_mode = true;
            canvasSupported = true;
        }
        if(canvasSupported) {
            this.data.attributes.context = canvasElement.getContext('2d');
        }

        this.data.attributes.item_size = Math.min(width / this.data.drawn_units.length, height);
        this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width;
        this.data.attributes.radius = ((this.data.attributes.item_size * 0.8) - this.data.attributes.line_width) / 2;
        this.data.attributes.outer_radius = this.data.attributes.radius + 0.5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);

        // Prepare Time Elements
        var i = 0;
        for (var key in this.data.text_elements) {
            if (!this.config.time[key].show)
                continue;

            var textElement = $("<div>");
            textElement.addClass('textDiv_' + key);
            textElement.css("top", Math.round(0.35 * this.data.attributes.item_size));
            textElement.css("left", Math.round(i++ * this.data.attributes.item_size));
            textElement.css("width", this.data.attributes.item_size);
            textElement.appendTo(this.container);

            var headerElement = $("<h4>");
            headerElement.text(this.config.time[key].text); // Options
            headerElement.css("font-size", Math.round(this.config.text_size * this.data.attributes.item_size));
            headerElement.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px");
            headerElement.appendTo(textElement);

            var numberElement = $("<span>");
            numberElement.css("font-size", Math.round(3 * this.config.text_size * this.data.attributes.item_size));
            numberElement.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px");
            numberElement.appendTo(textElement);

            this.data.text_elements[key] = numberElement;
        }

        this.start();
        if (!this.config.start) {
            this.data.paused = true;
        }
        
        // Set up interval fallback
        var _this = this;
        this.data.interval_fallback = useWindow.setInterval(function(){
            _this.update.call(_this, true);
        }, 100);
    };

    TC_Instance.prototype.update = function(nodraw) {
        if(typeof nodraw === "undefined") {
            nodraw = false;
        }
        else if(nodraw && this.data.paused) {
            return;
        }
        
        if(limited_mode) {
            //Per unit clearing doesn't work in IE8 using explorer canvas, so do it in one time. The downside is that radial fade cant be used
            this.data.attributes.context.clearRect(0, 0, this.data.attributes.canvas[0].width, this.data.attributes.canvas[0].hright);
        }
        var diff, old_diff;

        var prevDate = this.data.prev_time;
        var curDate = new Date();
        this.data.prev_time = curDate;

        if (prevDate === null)
            prevDate = curDate;

        // If not counting past zero, and time < 0, then simply draw the zero point once, and call stop
        if (!this.config.count_past_zero) {
            if (curDate > this.data.attributes.ref_date) {
                for(var i = 0; i < this.data.drawn_units.length; i++) {
                    var key = this.data.drawn_units[i];

                    // Set the text value
                    this.data.text_elements[key].text("0");
                    var x = (i * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
                    var y = this.data.attributes.item_size / 2;
                    var color = this.config.time[key].color;
                    this.drawArc(x, y, color, 0);
                }
                this.stop();
                return;
            }
        }

        // Compare current time with reference
        diff = (this.data.attributes.ref_date - curDate) / 1000;
        old_diff = (this.data.attributes.ref_date - prevDate) / 1000;

        var floor = this.config.animation !== "smooth";

        var visible_times = parse_times(diff, old_diff, this.data.total_duration, this.data.drawn_units, floor);
        var all_times = parse_times(diff, old_diff, secondsIn["Years"], allUnits, floor);

        var i = 0;
        var j = 0;
        var lastKey = null;

        var cur_shown = this.data.drawn_units.slice();
        for (var i in allUnits) {
            var key = allUnits[i];

            // Notify (all) listeners
            if (Math.floor(all_times.raw_time[key]) !== Math.floor(all_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(all_times.time[key]), Math.floor(diff), "all");
            }

            if (cur_shown.indexOf(key) < 0)
                continue;

            // Notify (visible) listeners
            if (Math.floor(visible_times.raw_time[key]) !== Math.floor(visible_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(visible_times.time[key]), Math.floor(diff), "visible");
            }
            
            if(!nodraw) {
                // Set the text value
                this.data.text_elements[key].text(Math.floor(Math.abs(visible_times.time[key])));

                var x = (j * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
                var y = this.data.attributes.item_size / 2;
                var color = this.config.time[key].color;

                if (this.config.animation === "smooth") {
                    if (lastKey !== null && !limited_mode) {
                        if (Math.floor(visible_times.time[lastKey]) > Math.floor(visible_times.old_time[lastKey])) {
                            this.radialFade(x, y, color, 1, key);
                            this.data.state.fading[key] = true;
                        }
                        else if (Math.floor(visible_times.time[lastKey]) < Math.floor(visible_times.old_time[lastKey])) {
                            this.radialFade(x, y, color, 0, key);
                            this.data.state.fading[key] = true;
                        }
                    }
                    if (!this.data.state.fading[key]) {
                        this.drawArc(x, y, color, visible_times.pct[key]);
                    }
                }
                else {
                    this.animateArc(x, y, color, visible_times.pct[key], visible_times.old_pct[key], (new Date()).getTime() + tick_duration);
                }
            }
            lastKey = key;
            j++;
        }

        // Dont request another update if we should be paused
        if(this.data.paused || nodraw) {
            return;
        }
        
        // We need this for our next frame either way
        var _this = this;
        var update = function() {
            _this.update.call(_this);
        };

        // Either call next update immediately, or in a second
        if (this.config.animation === "smooth") {
            // Smooth animation, Queue up the next frame
            this.data.animation_frame = useWindow.requestAnimationFrame(update, _this.element, _this);
        }
        else {
            // Tick animation, Don't queue until very slightly after the next second happens
            var delay = (diff % 1) * 1000;
            if (delay < 0)
                delay = 1000 + delay;
            delay += 50;

            _this.data.animation_frame = useWindow.setTimeout(function() {
                _this.data.animation_frame = useWindow.requestAnimationFrame(update, _this.element, _this);
            }, delay);
        }
    };

    TC_Instance.prototype.animateArc = function(x, y, color, target_pct, cur_pct, animation_end) {
        if (this.data.attributes.context === null)
            return;

        var diff = cur_pct - target_pct;
        if (Math.abs(diff) > 0.5) {
            if (target_pct === 0) {
                this.radialFade(x, y, color, 1);
            }
            else {
                this.radialFade(x, y, color, 0);
            }
        }
        else {
            var progress = (tick_duration - (animation_end - (new Date()).getTime())) / tick_duration;
            if (progress > 1)
                progress = 1;

            var pct = (cur_pct * (1 - progress)) + (target_pct * progress);
            this.drawArc(x, y, color, pct);

            //var show_pct =
            if (progress >= 1)
                return;
            var _this = this;
            useWindow.requestAnimationFrame(function() {
                _this.animateArc(x, y, color, target_pct, cur_pct, animation_end);
            }, this.element);
        }
    };

    TC_Instance.prototype.drawArc = function(x, y, color, pct) {
        if (this.data.attributes.context === null)
            return;

        var clear_radius = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
        if(!limited_mode) {
            this.data.attributes.context.clearRect(
                    x - clear_radius,
                    y - clear_radius,
                    clear_radius * 2,
                    clear_radius * 2
                    );
        }
        
        if (this.config.use_background) {
            this.data.attributes.context.beginPath();
            this.data.attributes.context.arc(x, y, this.data.attributes.radius, 0, 2 * Math.PI, false);
            this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width;

            // line color
            this.data.attributes.context.strokeStyle = this.config.circle_bg_color;
            this.data.attributes.context.stroke();
        }

        // Direction
        var startAngle, endAngle, counterClockwise;
        var defaultOffset = (-0.5 * Math.PI);
        var fullCircle = 2 * Math.PI;
        startAngle = defaultOffset + (this.config.start_angle / 360 * fullCircle);
        var offset = (2 * pct * Math.PI);

        if (this.config.direction === "Both") {
            counterClockwise = false;
            startAngle -= (offset / 2);
            endAngle = startAngle + offset;
        }
        else {
            if (this.config.direction === "Clockwise") {
                counterClockwise = false;
                endAngle = startAngle + offset;
            }
            else {
                counterClockwise = true;
                endAngle = startAngle - offset;
            }
        }

        this.data.attributes.context.beginPath();
        this.data.attributes.context.arc(x, y, this.data.attributes.radius, startAngle, endAngle, counterClockwise);
        this.data.attributes.context.lineWidth = this.data.attributes.line_width;

        // line color
        this.data.attributes.context.strokeStyle = color;
        this.data.attributes.context.stroke();
    };

    TC_Instance.prototype.radialFade = function(x, y, color, from, key) {
        // TODO: Make fade_time option
        var rgb = hexToRgb(color);
        var _this = this; // We have a few inner scopes here that will need access to our instance

        var step = 0.2 * ((from === 1) ? -1 : 1);
        var i;
        for (i = 0; from <= 1 && from >= 0; i++) {
            // Create inner scope so our variables are not changed by the time the Timeout triggers
            (function() {
                var delay = 50 * i;
                var rgba = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + (Math.round(from * 10) / 10) + ")";
                useWindow.setTimeout(function() {
                    _this.drawArc(x, y, rgba, 1);
                }, delay);
            }());
            from += step;
        }
        if (typeof key !== undefined) {
            useWindow.setTimeout(function() {
                _this.data.state.fading[key] = false;
            }, 50 * i);
        }
    };

    TC_Instance.prototype.timeLeft = function() {
        if (this.data.paused && typeof this.data.timer === "number") {
            return this.data.timer;
        }
        var now = new Date();
        return ((this.data.attributes.ref_date - now) / 1000);
    };

    TC_Instance.prototype.start = function() {
        useWindow.cancelAnimationFrame(this.data.animation_frame);
        useWindow.clearTimeout(this.data.animation_frame)

        // Check if a date was passed in html attribute or jquery data
        var attr_data_date = $(this.element).data('date');
        if (typeof attr_data_date === "undefined") {
            attr_data_date = $(this.element).attr('data-date');
        }
        if (typeof attr_data_date === "string") {
            this.data.attributes.ref_date = parse_date(attr_data_date);
        }
        // Check if this is an unpause of a timer
        else if (typeof this.data.timer === "number") {
            if (this.data.paused) {
                this.data.attributes.ref_date = (new Date()).getTime() + (this.data.timer * 1000);
            }
        }
        else {
            // Try to get data-timer
            var attr_data_timer = $(this.element).data('timer');
            if (typeof attr_data_timer === "undefined") {
                attr_data_timer = $(this.element).attr('data-timer');
            }
            if (typeof attr_data_timer === "string") {
                attr_data_timer = parseFloat(attr_data_timer);
            }
            if (typeof attr_data_timer === "number") {
                this.data.timer = attr_data_timer;
                this.data.attributes.ref_date = (new Date()).getTime() + (attr_data_timer * 1000);
            }
            else {
                // data-timer and data-date were both not set
                // use config date
                this.data.attributes.ref_date = this.config.ref_date;
            }
        }

        // Start running
        this.data.paused = false;
        this.update.call(this);
    };

    TC_Instance.prototype.restart = function() {
        this.data.timer = false;
        this.start();
    };

    TC_Instance.prototype.stop = function() {
        if (typeof this.data.timer === "number") {
            this.data.timer = this.timeLeft(this);
        }
        // Stop running
        this.data.paused = true;
        useWindow.cancelAnimationFrame(this.data.animation_frame);
    };

    TC_Instance.prototype.destroy = function() {
        this.clearListeners();
        this.stop();
        useWindow.clearInterval(this.data.interval_fallback);
        this.data.interval_fallback = null;
        
        this.container.remove();
        $(this.element).removeAttr('data-tc-id');
        $(this.element).removeData('tc-id');
    };

    TC_Instance.prototype.setOptions = function(options) {
        if (this.config === null) {
            this.default_options.ref_date = new Date();
            this.config = $.extend(true, {}, this.default_options);
        }
        $.extend(true, this.config, options);

        // Use window.top if use_top_frame is true
        if(this.config.use_top_frame) {
            useWindow = window.top;
        }
        else {
            useWindow = window;
        }
        updateUsedWindow();
        
        this.data.total_duration = this.config.total_duration;
        if (typeof this.data.total_duration === "string") {
            if (typeof secondsIn[this.data.total_duration] !== "undefined") {
                // If set to Years, Months, Days, Hours or Minutes, fetch the secondsIn value for that
                this.data.total_duration = secondsIn[this.data.total_duration];
            }
            else if (this.data.total_duration === "Auto") {
                // If set to auto, total_duration is the size of 1 unit, of the unit type bigger than the largest shown
                for(var i = 0; i < Object.keys(this.config.time).length; i++) {
                    var unit = Object.keys(this.config.time)[i];
                    if (this.config.time[unit].show) {
                        this.data.total_duration = secondsIn[nextUnits[unit]];
                        break;
                    }
                }
            }
            else {
                // If it's a string, but neither of the above, user screwed up.
                this.data.total_duration = secondsIn["Years"];
                console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto");
            }
        }
    };

    TC_Instance.prototype.addListener = function(f, context, type) {
        if (typeof f !== "function")
            return;
        if (typeof type === "undefined")
            type = "visible";
        this.listeners[type].push({func: f, scope: context});
    };

    TC_Instance.prototype.notifyListeners = function(unit, value, total, type) {
        for (var i = 0; i < this.listeners[type].length; i++) {
            var listener = this.listeners[type][i];
            listener.func.apply(listener.scope, [unit, value, total]);
        }
    };

    TC_Instance.prototype.default_options = {
        ref_date: new Date(),
        start: true,
        animation: "smooth",
        count_past_zero: true,
        circle_bg_color: "#60686F",
        use_background: true,
        fg_width: 0.1,
        bg_width: 1.2,
        text_size: 0.07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: false,
        start_angle: 0,
        time: {
            Days: {
                show: true,
                text: "Days",
                color: "#FC6"
            },
            Hours: {
                show: true,
                text: "Hours",
                color: "#9CF"
            },
            Minutes: {
                show: true,
                text: "Minutes",
                color: "#BFB"
            },
            Seconds: {
                show: true,
                text: "Seconds",
                color: "#F99"
            }
        }
    };

    // Time circle class
    var TC_Class = function(elements, options) {
        this.elements = elements;
        this.options = options;
        this.foreach();
    };

    TC_Class.prototype.getInstance = function(element) {
        var instance;

        var cur_id = $(element).data("tc-id");
        if (typeof cur_id === "undefined") {
            cur_id = guid();
            $(element).attr("data-tc-id", cur_id);
        }
        if (typeof TC_Instance_List[cur_id] === "undefined") {
            var options = this.options;
            var element_options = $(element).data('options');
            if (typeof element_options === "string") {
                element_options = JSON.parse(element_options);
            }
            if (typeof element_options === "object") {
                options = $.extend(true, {}, this.options, element_options);
            }
            instance = new TC_Instance(element, options);
            TC_Instance_List[cur_id] = instance;
        }
        else {
            instance = TC_Instance_List[cur_id];
            if (typeof this.options !== "undefined") {
                instance.setOptions(this.options);
            }
        }
        return instance;
    };

    TC_Class.prototype.addTime = function(seconds_to_add) {
        this.foreach(function(instance) {
            instance.addTime(seconds_to_add);
        });
    };
    
    TC_Class.prototype.foreach = function(callback) {
        var _this = this;
        this.elements.each(function() {
            var instance = _this.getInstance(this);
            if (typeof callback === "function") {
                callback(instance);
            }
        });
        return this;
    };

    TC_Class.prototype.start = function() {
        this.foreach(function(instance) {
            instance.start();
        });
        return this;
    };

    TC_Class.prototype.stop = function() {
        this.foreach(function(instance) {
            instance.stop();
        });
        return this;
    };

    TC_Class.prototype.restart = function() {
        this.foreach(function(instance) {
            instance.restart();
        });
        return this;
    };

    TC_Class.prototype.rebuild = function() {
        this.foreach(function(instance) {
            instance.initialize(false);
        });
        return this;
    };

    TC_Class.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft();
    };

    TC_Class.prototype.addListener = function(f, type) {
        if (typeof type === "undefined")
            type = "visible";
        var _this = this;
        this.foreach(function(instance) {
            instance.addListener(f, _this.elements, type);
        });
        return this;
    };

    TC_Class.prototype.destroy = function() {
        this.foreach(function(instance) {
            instance.destroy();
        });
        return this;
    };

    TC_Class.prototype.end = function() {
        return this.elements;
    };

    $.fn.TimeCircles = function(options) {
        return new TC_Class(this, options);
    };
}(jQuery));
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