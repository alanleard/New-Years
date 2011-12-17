function newwin(offset){

function newyears(offset){
dateFuture = new Date(2011,11,31,23,59,59);
//dateFuture = new Date(2011,10,28,20,13,00);
//tzOffset = -8;
tzOffset = offset;

dx = dateFuture.toGMTString();
dx = dx.substr(0,dx.length -3);
tzCurrent=(dateFuture.getTimezoneOffset()/60)*-2;
dateFuture.setTime(Date.parse(dx))
dateFuture.setHours(dateFuture.getHours() + tzCurrent - tzOffset);
var label = Ti.UI.createLabel({color:'#fff', textAlign:'center', top:10, font:{fontSize:24, fontWeight:'bold'}, height:'auto', width:'auto'});
if(Ti.Platform.osname == 'ipad'){
	label.font = {fontSize:36, fontWeight:'bold'}
	label.top=50;
}
var out;
function GetCount(){


	dateNow = new Date();									
	amount = dateFuture.getTime() - dateNow.getTime();
	
	delete dateNow;

	
	if(amount < 0){
		
		music.play();
		label.text="Happy New Year!";
		clearInterval(interval);
	}
	
	else{

		days=0;hours=0;mins=0;secs=0;out="";

		amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

		days=Math.floor(amount/86400);//days
		amount=amount%86400;

		hours=Math.floor(amount/3600);//hours
		amount=amount%3600;

		mins=Math.floor(amount/60);//minutes
		amount=amount%60;

		secs=Math.floor(amount);//seconds

		if(days != 0){out += days +" day"+((days!=1)?"s":"")+", ";}
		if(days != 0 || hours != 0){out += hours +" hour"+((hours!=1)?"s":"")+"\n";}
		if(days != 0 || hours != 0 || mins != 0){out += mins +" minute"+((mins!=1)?"s":"")+", ";}
		out += secs +" seconds";
		label.text = out;
	}
}

var interval = setInterval(function(){
	GetCount();
}, 1000);
GetCount();
return label;
}


var win = Titanium.UI.currentWindow;
win.backgroundImage = 'bg.png';


	win.orientationModes = [
        Titanium.UI.PORTRAIT,
        Titanium.UI.LANDSCAPE_LEFT,
        Titanium.UI.LANDSCAPE_RIGHT];

var button = Titanium.UI.createButton({
	
  title:'Music',
  	image:'MusicOn.png',
   bottom:4,
   left:8
});

var photo = Ti.UI.createButton({
	image:'photoBtn.png',
	bottom:4,
	right:8
});
//if(!Titanium.Media.NO_CAMERA){
win.add(photo);
//}
photo.addEventListener('click', function(){
	var win = Ti.UI.createWindow({
		url:'photo.js',
		fullscreen:true
	});
	win.open();
});
var Stopbutton = Titanium.UI.createButton({
  title:'Stop',
image:'MusicOff.png',
   bottom:4,
   left:8
});

Stopbutton.hide();

var music = Titanium.Media.createSound({
	url:'AuldLangSyne.mp3',
	looping:true,
	allowBackground:false});
function musicBtn(){
	setTimeout(function(){

if(music.playing){
	button.hide();
	Stopbutton.show();
}else {
	Stopbutton.hide();
	button.show();
}
}, 100);
}
button.addEventListener('click',function(e){
   music.play();
   musicBtn();
});
	
Stopbutton.addEventListener('click',function(a){
	music.stop(); 
	musicBtn(); 
});
	
win.addEventListener('blur',function(c){
	music.stop();
	musicBtn();
	
});
win.addEventListener('focus',function(c){
	musicBtn();
});

//Ti.include('ny.js');
win.add(button);
win.add(Stopbutton);
win.add(newyears(offset));
win.barColor = '#000000';
		barcolor = true;
return win;
}
