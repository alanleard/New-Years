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
 

tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});


