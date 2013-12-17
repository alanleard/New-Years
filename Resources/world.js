var global = require('globals');
function worldWindow(){
	var win = Ti.UI.createWindow();
	   
	win.barColor = '#000';
	
	win.title = 'Select a Time Zone';
	
	function showMap(){
		if(Ti.Platform.osname!= 'android'){
			var map = Ti.UI.createImageView({
				image:'map.gif',
				height:'fill',
				width:'size'
			});
				// var tapView = Ti.UI.createView({
				// backgroundColor:'red',
				// opacity:0.5,
				// height:50,
				// top:38,
				// left:14,
				// right:13,
				// width:1873
			// });
		// 	
			// var tapViewBtm = Ti.UI.createView({
				// backgroundColor:'red',
				// opacity:0.5,
				// height:50,
				// width:1873,
				// bottom:28,
				// left:14,
				// right:13
			// });
		// 	
			// var dialog = Ti.UI.createAlertDialog({
				// title:'Select a Time Zone',
				// message: 'Click in the red bar at the top or bottom of the map.',
				// buttonNames:['Ok'],
				// cancel:0
			// });
		// 	
			// win.addEventListener('open', function(){
				// dialog.show();
			// });
			// mapView.add(tapView);
			// mapView.add(tapViewBtm);
				// var anim1 = Ti.UI.createAnimation({
					// duration:1000,
					// opacity:0.75
				// });
				// var anim2 = Ti.UI.createAnimation({
					// duration:1000,
					// opacity:0.3
				// });
		// 		
			// tapView.animate( anim1 );
		// 	
			// anim2.addEventListener('complete',function(){
				// tapView.animate( anim1 );
			// });
			// anim1.addEventListener('complete',function(){
				// tapView.animate( anim2 );
			// });
			// var zoom = 0.5;
			// if(Ti.Platform.osname == 'ipad')
			// {
				// zoom = 1.0;
			// }
			var mapView = Ti.UI.createScrollView({top:0, bottom:0, left:0, right:0, contentHeight:'auto', contentWidth:'auto', minZoomScale:0.5, maxZoomScale:3.0, zoomScale:1.0});
			
				mapView.add(map);
			
			// var tmz = 0;
			// function tap(e){
		// 	
					// //tapView.animate({opacity:0.9, duration:50});
		// 		
				// if (e.x>56 && e.x<134){
					// tmz = -10;
				// } else if(e.x>134 && e.x<211) {
					// tmz = -9;
				// }else if(e.x>211 && e.x<290) {
					// tmz = -8;
				// }else if(e.x>290 && e.x<367) {
					// tmz = -7;
				// }else if(e.x>367 && e.x<446) {
					// tmz = -6;
				// }else if(e.x>446 && e.x<523) {
					// tmz = -5;
				// }else if(e.x>523 && e.x<601) {
					// tmz = -4;
				// }else if(e.x>601 && e.x<680) {
					// tmz = -3;
				// }else if(e.x>680 && e.x<758) {
					// tmz = -2;
				// }else if(e.x>758 && e.x<836) {
					// tmz = -1;
				// }else if(e.x>836 && e.x<914) {
					// tmz = 0;
				// }
				// else if(e.x>914 && e.x<992) {tmz = 1;}
				// else if(e.x>992 && e.x<1070) {tmz = 2;}
				// else if(e.x>1070 && e.x<1148) {tmz = 3;}
				// else if(e.x>1148 && e.x<1226) {tmz = 4;}
				// else if(e.x>1226 && e.x<1304) {tmz = 5;}
				// else if(e.x>1304 && e.x<1382) {tmz = 6;}
				// else if(e.x>1382 && e.x<1460) {tmz = 7;}
				// else if(e.x>1460 && e.x<1538) {tmz = 8;}
				// else if(e.x>1538 && e.x<1616) {tmz = 9;}
				// else if(e.x>1616 && e.x<1692) {tmz = 10;}
				// else if(e.x>1692 && e.x<1773) {tmz = 11;}
				// else if(e.x>1773 && e.x<1808) {tmz = 12;}
				// else if(e.x>1808 && e.x<1850) {tmz = -12;}
				// else if(e.x>1850 && e.x<1874) {tmz = -11;}
				// else if(e.x>15 && e.x<56) {tmz = -11;}
				// var win = Ti.UI.createWindow({url:'TMZ.js countdown', tmz:tmz, title: 'GMT '+tmz});
		// 		
				// Ti.UI.currentTab.open(win);
			// }
		// 	
			// tapView.addEventListener('click', tap);
			// tapViewBtm.addEventListener('click', tap);
		// 	
			// mapView.addEventListener('doubletap', function(e){
				// if(scroll.zoomScale < zoom+0.5){
		// 			
					// scroll.zoomScale += zoom;
		// 	
				// } else {
					// scroll.zoomScale = zoom;
				// }
			// });
		// 
		// 
		} else {
			var mapView = Ti.UI.createWebView({html:"<html><img src='map.gif'></html>"});
		}
		var mapWin = Ti.UI.createWindow();
		mapWin.add(mapView);
		global.tab2.open(mapWin)
	}	
	var searchBar = Ti.UI.createSearchBar({
		barColor:'#000', 
	    showCancel:true,
	    //height:43,
	    top:0
	})
	
	var tableview = Ti.UI.createTableView({
		backgroundColor:'#000',
		color:'#fff',
		data:global.data,
		search:searchBar,
		filterAttribute:'search'
	});
	
	if(Ti.Platform.osname != 'android'){
		var mapBtn = Ti.UI.createButton({
			title:'map'
		});
		win.rightNavButton = mapBtn;
		mapBtn.addEventListener('click', showMap);
	} else {
		var activity = win.activity;
		activity.onCreateOptionsMenu = function(e){
		  var menu = e.menu;
		  var mapBtn = menu.add({ title: "Map" });
		  mapBtn.icon = "world.png";
		  mapBtn.addEventListener('click', showMap);
		};
	}
	
	
	win.add(tableview);
	tableview.addEventListener('click', function(e){
	//if(e.rowData.tmz){
		// var timewin = Ti.UI.createWindow({url:'TMZ.js', tmz:e.rowData.tmz, title: e.rowData.title});
		
		var newwin = require('win');
		var timewin = new newwin(e.rowData);
		timewin.backButtonTitle = 'back'
		global.tab2.open(timewin);
		
		if(Ti.Platform.osname != 'android'){
			var setHome = Ti.UI.createButton({title:'Home'});
		
			timewin.rightNavButton = setHome;
			setHome.addEventListener('click', homeFunc);
		} else {
			var activity = timewin.activity;
			activity.onCreateOptionsMenu = function(e){
			  var menu = e.menu;
			  var setHome = menu.add({ title: "Set as Home" });
			  setHome.icon = "home.png";
			  setHome.addEventListener('click', homeFunc);
			};
		}
		
		function homeFunc(){
			
			if(global.homeID && global.data[global.homeID].title.split("Current").length == 1){
				tableview.updateRow(global.homeID, global.data[global.homeID])
			}
			var id = e.rowData.id;
			global.homeID = id
			
			if(global.data[global.homeID].title.split("Current").length == 1){
				e.rowData.title = "Home: "+global.data[id].title;
			}
			
			
			var homeWin = newwin(global.data[id]);
			
			homeWin.title = "New Year's Countdown";
			
			global.homeWin = homeWin;
			
			var newTab = Titanium.UI.createTab({  
			    icon:'home.png',
			    title:'Home',
			    window:homeWin
			});
			timewin.close();
			
			global.tab1.window = global.homeWin
			global.tabgroup.removeTab(global.tab1);

			global.tab1 = newTab;
			global.tabgroup.addTab(global.tab1);
			global.tabgroup.setActiveTab(global.tab1)
			alert('New home countdown set.');	
			
			
		};
	// } else{
		// var mapwin = Ti.UI.createWindow();
		// mapwin.add(mapView);
		// Ti.UI.currentTab.open(mapwin);
	// }
	});
	//}
	return win;
}

module.exports = worldWindow;





