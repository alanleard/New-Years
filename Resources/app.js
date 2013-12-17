var global = require('globals');

var tabGroup = Titanium.UI.createTabGroup({barColor:'#000'});

global.tabgroup = tabGroup;

var myTMZ = new Date();
myTMZ =myTMZ.getTimezoneOffset();

if(global.homeWin){
	var tab = Titanium.UI.createTab({  
			    icon:'world.png',
			    title:data[i].title,
			    window:global.homeWin
			});
	tabGroup.addTab(tab);
	global.tab1 = tab;
	
	
} else {
	var data = global.data;
	var set = false;
	for(var i = 0, l = data.length; i<l; i++){
	
	   	if(myTMZ == (data[i].tmz*60*-1)){
	   		set = true;
	   		
	   		var newWin = require('win');
			var win = newWin(data[i]);
	   		var currentTitle = global.data[i].title 
	   		global.data[i].title = "Current: "+ currentTitle;
	   		var tab = Titanium.UI.createTab({  
			    icon:'home.png',
			    title:'Home',
			    window:win
			});
			win.title = "New Year's Countdown";
			
			global.tab1 = tab;
	   	} 
	   	
	   	
		  
	}
	if(set == false){
		set = true;
	   		var newWin = require('win');
			var win = newWin(data[17]);
			var currentTitle = global.data[i].title 
	   		global.data[i].title = "Current: "+ currentTitle;
	   		var tab = Titanium.UI.createTab({  
			    icon:'home.png',
			    title:'Home',
			    window:win
			});
			
			global.tab1 = tab;
			alert("We were unable to determine your timezone.  Select your timezone from the 'World' list and set it as 'home'")
	}
}

var worldWin = require('world');

var win2 = worldWin();

global.worldWin = win2;
    
var tab2 = Titanium.UI.createTab({  
    icon:'world.png',
    title:'World',
    window:win2
});

tabGroup.addTab(tab2);

global.tab2 = tab2;
tabGroup.addTab(tab);

tabGroup.setActiveTab(global.tab1)

if(Ti.Platform.osname !='android'){
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
} else {
	tabGroup.open();
}
Titanium.Media.audioSessionMode= Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;
var openDialog = Ti.UI.createAlertDialog({
	title:"Welcome to the New Year's App",
	message:"Enjoy the New Year's countdown in 43 different time zones.\n\nWhen the clock hits midnight\nAuld Lang Syne will start playing\n(if your sound is on) and the lyrics will appear on the screen.\n\nHave a great 2013 New Year's Eve!", buttonNames:['Ok'], cancel:0
});

if(Ti.Platform.osname =='android'){
	openDialog.messsage = "Enjoy the New Year countdown in 43 different time zones.\n\nWhen the clock hits midnight Auld Lang Syne will start playing (if your sound is on) and the lyrics will appear on the screen.\n\nHave a great 2013 New Year's Eve!";
}

// win.addEventListener('open', function(){
	openDialog.show();
// })
