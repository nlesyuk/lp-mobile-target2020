
$(document).ready(function() {

// counter of time and date, add to page <div id="CDT"></div>
if( $("#CDT") != null ){
  function CountdownTimer(elm,tl,mes){
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
     				<span class="number">'+day+'</span>\
     				<div class="caption">Дней</div>\
    			</div>';
     timer += '<div class="number-wrapper">\
					<div class="line">	</div>\
     				<span class="number">'+hour+'</span>\
     				<div class="caption">Часов</div>\
    			</div>';
     timer += '<div class="number-wrapper last">\
					<div class="line">	</div>\
     				<span class="number">'+this.addZero(min)+'</span>\
     				<div class="caption">Минут</div>\
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
   var tl = new Date('2018/12/09 00:00:00');

   var timer = new CountdownTimer('CDT',tl,'<span class="number-wrapper"><div class="line"></div><span class="number end">Time is up!</span></span>');
   timer.countDown();
   console.log
  }
  window.onload=function(){
   CDT();
  }
}else{
  console.log("none CDT");
}







	
//end ready
});




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


