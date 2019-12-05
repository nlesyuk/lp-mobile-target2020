$(document).ready(function() {

//scroll add .scroll to buttons for slowly move to anchor
$('.scroll').bind('click.smoothscroll',function (e) {
  e.preventDefault();
  
  var target = this.hash,
  $target = $(target);
  
  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
    window.location.hash = target;
  });
});

// counter of time and date, add to page <div id="CDT"></div>
/*   function CountdownTimer(elm,tl,mes){
   this.initialize.apply(this,arguments);
  }
  CountdownTimer.prototype={
   initialize:function(elm,tl,mes) {
    this.elem = document.getElementById(elm);
    this.tl = tl;
    this.mes = mes;
   },countDown:function(){
    var timer='';
    var today=new Date();
    var day=Math.floor((this.tl-today)/(24*60*60*1000));
    var hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
    var min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
    var sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
    var me=this;

    if( ( this.tl - today ) > 0 ){
     timer += '<div class="number-wrapper">\
					<div class="line">	</div>\
     				<span class="number">'+this.addZero(day)+'</span>\
     				<div class="caption">Дней</div>\
    			</div>';
     timer += '<div class="number-wrapper">\
					<div class="line">	</div>\
     				<span class="number">'+this.addZero(hour)+'</span>\
     				<div class="caption">Часов</div>\
    			</div>';
     timer += '<div class="number-wrapper">\
					<div class="line">	</div>\
     				<span class="number">'+this.addZero(min)+'</span>\
     				<div class="caption">Минут</div>\
    			</div>';
     timer += '<div class="number-wrapper last">\
					<div class="line">	</div>\
     				<span class="number">'+this.addZero(sec)+'</span>\
     				<div class="caption">секунд</div>\
    			</div>';
    // console.log("day: "+day+" hour: "+hour+" min: "+this.addZero(min))
     this.elem.innerHTML = timer;
     tid = setTimeout( function(){me.countDown();},10 );
    }else{
     this.elem.innerHTML = this.mes;
     return;
    }
   },addZero:function(num){ return ('0'+num).slice(-2); }
  }
  function CDT(){
   var tl = new Date('2019/12/09 00:00:00');

   var timer = new CountdownTimer('CDT',tl,'<span class="number-wrapper"><div class="line"></div><span class="number end">Time is up!</span></span>');
   timer.countDown();
   console.log
  }
  window.onload=function(){
   CDT();
  } */

  var owl = $('#owl_slider');
  owl.owlCarousel({
	  loop: true,
	  nav: true,
	  autoplay: true,
	  autoplayHoverPause: true,
	  autoplayTimeout: 3000,
	  margin: 5,
	  dots: false,
	  responsiveClass: true,
	  responsive: {
		  0:{
			  items: 1
		  },
		  600:{
			  items: 2
		  },
		  1000:{
			  items: 3
		  }
	  }
  });
  $('.customPrevBtn').click(function() {
	  owl.trigger('prev.owl.carousel', [250]);
  });
  $('.customNextBtn').click(function() {
	  owl.trigger('next.owl.carousel', [250]);
  });



// countdown
var timerConfig = {
  el: '#CDT',
  endTimer: new Date('2019/12/09 00:00:00')
};
var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer);
timer.countDown();

	
//end ready
});



	/* How use class countDownTimer
		new CountdownTimer({
			".countdown",
			Date.now() + 30000,
			"time is end"
		});
	 */
	function CountdownTimer(elem, time, message){
		this.initialize.apply(this, arguments);
	}

	CountdownTimer.prototype = {

		initialize: function(elem, time, message) {
			this.elems = document.querySelectorAll(elem);
			this.endTime 	= time;
			message = message || "00:00:00";
			this.message 	= '<span class="number-wrapper end">\
				<div class="line"></div>\
				<span class="number end">'+ message +'</span>\
			</span>';
		},

		countDown: function(){
			var today = new Date();
			var resultDate = this.endTime - today;
			var day   = Math.floor( resultDate / (24*60*60*1000));
			var hour  = Math.floor(( resultDate % (24*60*60*1000)) / (60*60*1000));
			var min   = Math.floor(( resultDate % (24*60*60*1000)) / (60*1000)) % 60;
			var sec   = Math.floor(( resultDate % (24*60*60*1000)) / 1000) % 60 % 60;
			var timer = '';
			var self  = this;

			if( resultDate > 0 ){
				// if you need 'day' just copy and paste html below in variable timer
        timer += '<div class="number-wrapper">\
              <div class="line">	</div>\
                <span class="number">'+this.addZero(day)+'</span>\
                <div class="caption">Дней</div>\
              </div>';
        timer += '<div class="number-wrapper">\
              <div class="line">	</div>\
                <span class="number">'+this.addZero(hour)+'</span>\
                <div class="caption">Часов</div>\
              </div>';
        timer += '<div class="number-wrapper">\
              <div class="line">	</div>\
                <span class="number">'+this.addZero(min)+'</span>\
                <div class="caption">Минут</div>\
              </div>';
        timer += '<div class="number-wrapper last">\
              <div class="line">	</div>\
                <span class="number">'+this.addZero(sec)+'</span>\
                <div class="caption">секунд</div>\
              </div>';

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = timer;
				}

				var id = setTimeout( function(){
					self.countDown();
				}, 10);
				
			} else {

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = this.message;
				}

			}
			
		},
		addZero: function(num){
			return ('0'+num).slice(-2);
		}
	}

// function declarations:

// cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	}
	}
	return "";
}
function checkCookie() {
	var user = getCookie("username");
	if (user != "") {
	alert("Welcome again " + user);
	} else {
	user = prompt("Please enter your name:", "");
	if (user != "" && user != null) {
		setCookie("username", user, 365);
	}
	}
}


