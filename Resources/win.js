function newwin(offset){

function newyears(offset){
dateFuture = new Date(2011,11,31,23,59,59);
//dateFuture = new Date(2011,11,19,23,35,00);
//tzOffset = -8;
tzOffset = offset;

dx = dateFuture.toGMTString();
dx = dx.substr(0,dx.length -3);
tzCurrent=(dateFuture.getTimezoneOffset()/60)*-2;
dateFuture.setTime(Date.parse(dx))
dateFuture.setHours(dateFuture.getHours() + tzCurrent - tzOffset);
var label = Ti.UI.createLabel({color:'#fff',textAlign:'center', top:10, font:{fontSize:24, fontWeight:'bold'}, height:'auto', width:'auto', zIndex:100});
if(Ti.Platform.osname == 'ipad'){
	label.font = {fontSize:36, fontWeight:'bold'};
	label.top=50;
}
var out;
function GetCount(){


	dateNow = new Date();									
	amount = dateFuture.getTime() - dateNow.getTime();
	
	delete dateNow;

	
	if(amount < 0){
		
		music.play();
		musicBtn();
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
        
var modal = Ti.UI.createView({
		backgroundColor:'#000',
		top:0,
		bottom:0,
		left:0,
		right:0,
		borderRadius:10,
		visible:false,
		zIndex:0,
		opacity:0.01
   });
var countBack = Ti.UI.createView({
	backgroundColor:'#000',
	top:0, 
	height:70, 
	left:0, 
	right:0
});

var lyricTitle = Ti.UI.createLabel({
	text: 'Auld Lang Syne Lyrics',
	font:{fontWeight:'bold', fontSize:18},
	top:5,
	height:'auto',
	color:'#fff',
	textAlign:'center'
});
var lyrics = Ti.UI.createLabel({
   	text:"Should auld acquaintance be forgot,\nAnd never brought to mind?\nShould auld acquaintance be forgot,\nAnd auld lang syne!\n\n Chorus:\nFor auld lang syne, my dear,\n For auld lang syne.\nWe'll take a cup o' kindness yet,\nFor auld lang syne.",
	color:'#fff', 
	textAlign:'center',
	height:'auto', top:15, bottom:40, left:0, right:0});

var line = Ti.UI.createView({backgroundColor:'#fff', left:10, right:10, height:1, top:75});
var lyricView = Ti.UI.createView({layout:'vertical', height:'auto'});
   
var scroll = Ti.UI.createScrollView({width:'100%', height:'100%', contentWidth:'100%', contentHeight:'auto'});
lyricView.add(line);
lyricView.add(lyricTitle);
lyricView.add(lyrics);
scroll.add(lyricView);
modal.add(scroll);
modal.add(countBack);
win.add(modal);

var button = Titanium.UI.createButton({
	
  title:'Music',
  	image:'MusicOn.png',
   bottom:8,
   left:8
});

var photo = Ti.UI.createButton({
	image:'photoBtn.png',
	bottom:8,
	right:8
});
var Stopbutton = Titanium.UI.createButton({
  title:'Stop',
image:'MusicOff.png',
   bottom:8,
   left:8,
   visible:false
});


if(Ti.Platform.osname == 'ipad'){
	photo.image = 'photoBtn@2x.png';
	button.image = 'MusicOn@2x.png';
	Stopbutton.image = 'MusicOff@2x.png';
	lyrics.font = {fontSize:30};
	lyricTitle.font = {fontSize:40, fontWeight:'bold'};
	line.visible = false;
}
if(Ti.Media.isCameraSupported){
win.add(photo);
}
photo.addEventListener('click', function(){
	var win = Ti.UI.createWindow({
		url:'photo.js',
		fullscreen:true
	});
	win.open();
});


var music = Titanium.Media.createSound({
	url:'AuldLangSyne.mp3',
	looping:true,
	allowBackground:false});
function musicBtn(){
	setTimeout(function(){

if(music.playing){
	button.hide();
	Stopbutton.show();
	modal.show();
	modal.animate({opacity:0.85, duration:3000});
}else {
	Stopbutton.hide();
	button.show();
	modal.animate({opacity:0.01, duration:1000});
	setTimeout(function(){
		modal.hide();
	}, 1000);
	
	
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
