var win = Ti.UI.currentWindow;
	win.orientationModes = [
        Titanium.UI.PORTRAIT,
        Titanium.UI.LANDSCAPE_LEFT,
        Titanium.UI.LANDSCAPE_RIGHT];
        
win.barColor = '#000';

win.title = 'Select a Time Zone';



var mapView = Ti.UI.createImageView({
	image:'TMZMap.png',
	height:'auto',
	width:'auto'
});

var tapView = Ti.UI.createView({
	backgroundColor:'red',
	opacity:0.5,
	height:50,
	top:38,
	left:14,
	right:13
});

var tapViewBtm = Ti.UI.createView({
	backgroundColor:'red',
	opacity:0.5,
	height:50,
	bottom:28,
	left:14,
	right:13
});

var dialog = Ti.UI.createAlertDialog({
	title:'Select a Time Zone',
	message: 'Click in the red bar at the top or bottom of the map.'
});

win.addEventListener('open', function(){
	dialog.show();
});

win.addEventListener('focus', function(){
	
	
	setTimeout(function(){
		tapView.animate({opacity:0.7, duration:200});
	},200);
	
	setTimeout(function(){
		tapView.animate({opacity:0.5, duration:200});
	},400);
});


mapView.add(tapView);
mapView.add(tapViewBtm);
var zoom = 0.5;
if(Ti.Platform.osname == 'ipad')
{
	zoom = 1.0;
}
var scroll = Ti.UI.createScrollView({top:0, bottom:0, left:0, right:0, contentHeight:'auto', contentWidth:'auto', minZoomScale:0.5, maxZoomScale:3.0, zoomScale:zoom});

	scroll.add(mapView);

win.add(scroll);

var tmz = 0;
function tap(e){
	
	if (e.x>56 && e.x<134){
		tmz = -10;
	} else if(e.x>134 && e.x<211) {
		tmz = -9;
	}else if(e.x>211 && e.x<290) {
		tmz = -8;
	}else if(e.x>290 && e.x<367) {
		tmz = -7;
	}else if(e.x>367 && e.x<446) {
		tmz = -6;
	}else if(e.x>446 && e.x<523) {
		tmz = -5;
	}else if(e.x>523 && e.x<601) {
		tmz = -4;
	}else if(e.x>601 && e.x<680) {
		tmz = -3;
	}else if(e.x>680 && e.x<758) {
		tmz = -2;
	}else if(e.x>758 && e.x<836) {
		tmz = -1;
	}else if(e.x>836 && e.x<914) {
		tmz = 0;
	}
	else if(e.x>914 && e.x<992) {tmz = 1;}
	else if(e.x>992 && e.x<1070) {tmz = 2;}
	else if(e.x>1070 && e.x<1148) {tmz = 3;}
	else if(e.x>1148 && e.x<1226) {tmz = 4;}
	else if(e.x>1226 && e.x<1304) {tmz = 5;}
	else if(e.x>1304 && e.x<1382) {tmz = 6;}
	else if(e.x>1382 && e.x<1460) {tmz = 7;}
	else if(e.x>1460 && e.x<1538) {tmz = 8;}
	else if(e.x>1538 && e.x<1616) {tmz = 9;}
	else if(e.x>1616 && e.x<1692) {tmz = 10;}
	else if(e.x>1692 && e.x<1773) {tmz = 11;}
	else if(e.x>1773 && e.x<1808) {tmz = 12;}
	else if(e.x>1808 && e.x<1850) {tmz = -12;}
	else if(e.x>1850 && e.x<1874) {tmz = -11;}
	else if(e.x>15 && e.x<56) {tmz = -11;}
	var win = Ti.UI.createWindow({url:'TMZ.js', tmz:tmz, title: 'GMT '+tmz});
	
	Ti.UI.currentTab.open(win);
};

tapView.addEventListener('click', tap);
tapViewBtm.addEventListener('click', tap);

mapView.addEventListener('doubletap', function(e){
	if(scroll.zoomScale < zoom+0.5){
		
		scroll.zoomScale += zoom
		scroll.scrollTo((e.x-(Ti.Platform.displayCaps.platformWidth/2)),(e.y-(Ti.Platform.displayCaps.platformHeight/2)));

	} else {
		scroll.zoomScale = zoom
	}
});



