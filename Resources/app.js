var tabGroup = Titanium.UI.createTabGroup();

var win = Titanium.UI.createWindow({
        title:"New Year's Count Down",
		backgroundColor: '#000',
		url:'PST.js',
		barColor:'#000'
});

var tab1 = Titanium.UI.createTab({  
    icon:'Pacific.png',
    title:'Pacific',
    window:win
});

var win2 = Titanium.UI.createWindow({
        title:"New Year's Count Down",
		backgroundColor: '#000',
		url:'MST.js',
		barColor:'#000'
});


var tab2 = Titanium.UI.createTab({  
    icon:'Mountain.png',
    title:'Mountain',
    window:win2
});


var win3 = Titanium.UI.createWindow({
        title:"New Year's Count Down",
		backgroundColor: '#000',
		url: 'CST.js',
		barColor:'#000'

    });


var tab3 = Titanium.UI.createTab({  
    icon:'Central.png',
    title:'Central',
    window:win3
});


var win4 = Titanium.UI.createWindow({
        title:"New Year's Count Down",
		backgroundColor: '#000',
		url: 'EST.js',
		barColor:'#000'

    });

var tab4 = Titanium.UI.createTab({  
    icon:'Eastern.png',
    title:'Eastern',
    window:win4
});


var win6 = Titanium.UI.createWindow({
        title:"New Year's Count Down",
		backgroundColor: '#000',
		url: 'other.js'

    });
    
   
var tab6 = Titanium.UI.createTab({  
    icon:'world.png',
    title:'World',
    window:win6
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4); 
tabGroup.addTab(tab6); 
 
if(Ti.Platform.osname !='android'){
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
} else {
	tabGroup.open();
}
Titanium.Media.audioSessionMode= Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;
var openDialog = Ti.UI.createAlertDialog({
	title:'Welcome to the New Years App',
	message:'Enjoy the New Year countdown in all 24 standard time zones.\n\nWhen the clock hits midnight\nAuld Lang Syne will start playing\n(if your sound is on) and the lyrics will appear on the screen.\n\nHave a great 2012 New Years Eve!', buttonNames:['Ok'], cancel:0
});

if(Ti.Platform.osname =='android'){
	openDialog.messsage = 'Enjoy the New Year countdown in all 24 standard time zones.\n\nWhen the clock hits midnight Auld Lang Syne will start playing (if your sound is on) and the lyrics will appear on the screen.\n\nHave a great 2012 New Years Eve!'
}

openDialog.show();
