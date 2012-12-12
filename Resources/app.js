var global = require('globals');

var tabGroup = Titanium.UI.createTabGroup({barColor:'#000'});

global.tabgroup = tabGroup;

var myTMZ = new Date();
myTMZ =myTMZ.getTimezoneOffset();

// var win = Titanium.UI.createWindow({
        // // title:"New Year's Count Down",
		// // backgroundColor: '#000',
		// // url:'PST.js',
		// // barColor:'#000'
// // });
// 
// var tab1 = Titanium.UI.createTab({  
    // icon:'Pacific.png',
    // title:'Pacific',
    // window:win
// });
// 
// var win2 = Titanium.UI.createWindow({
        // // title:"New Year's Count Down",
		// // backgroundColor: '#000',
		// // url:'MST.js',
		// // barColor:'#000'
// // });
// 
// 
// var tab2 = Titanium.UI.createTab({  
    // icon:'Mountain.png',
    // title:'Mountain',
    // window:win2
// });
// 
// 
// var win3 = Titanium.UI.createWindow({
        // title:"New Year's Count Down",
		// backgroundColor: '#000',
		// url: 'CST.js',
		// barColor:'#000'
// 
    // });
// 
// 
// var tab3 = Titanium.UI.createTab({  
    // icon:'Central.png',
    // title:'Central',
    // window:win3
// });
// 
// 
// var win4 = Titanium.UI.createWindow({
        // title:"New Year's Count Down",
		// backgroundColor: '#000',
		// url: 'EST.js',
		// barColor:'#000'
// 
    // });
// 
// var tab4 = Titanium.UI.createTab({  
    // icon:'Eastern.png',
    // title:'Eastern',
    // window:win4
// });
// 
// 

// 
// tabGroup.addTab(tab1);  
// tabGroup.addTab(tab2);  
// tabGroup.addTab(tab3);  
// tabGroup.addTab(tab4); 
 
var otherWin = require('other');

var win2 = otherWin();

global.listWin = win2;
    
var tab2 = Titanium.UI.createTab({  
    icon:'world.png',
    title:'World',
    window:win2
});

tabGroup.addTab(tab2);

global.tab2 = tab2;

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
	   		var newwin = require('win');
			var win = newwin(data[i]);
	   		
	   		var tab = Titanium.UI.createTab({  
			    icon:'home.png',
			    title:'Home',
			    window:win
			});
			win.title = "New Year's Countdown";
			tabGroup.addTab(tab);
			
			global.tab1 = tab;
	   	} 
	   	
	   	
		  
	}
	if(set == false){
		set = true;
	   		var newwin = require('win');
			var win = newwin(data[17]);
	   		
	   		var tab = Titanium.UI.createTab({  
			    icon:'home.png',
			    title:'Home',
			    window:win
			});
			
			tabGroup.addTab(tab);
			
			global.tab1 = tab;
			alert("We were unable to determine your timezone.  Select your timezone from the 'World' list and set it as 'home'")
	}
}


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
