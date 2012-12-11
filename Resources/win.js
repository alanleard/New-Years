var global = require('globals');
/////////////////////////////////





/////////////////////////////////
function newwin(data){
	var win = Titanium.UI.createWindow({
		title:data.title?data.title:"New Year's Count Down",
		backgroundImage:'bg.png',
		barColor:'#000000'
	});
	function populateWindow(){
		function newyears(data){
			
			var year = "2013"
			var month = 0;     
			var day = '1';       
			var hour = 0;   
			var tz = data.tmz;             
			// var dateFuture = new Date(2013,0,1,00,00,01);
			// //dateFuture = new Date(2012,11,31,23,59,59);
			// //tzOffset = {hour:4, minute:-30};
			// var tzOffset = data.tmz;
// 			
			// var dx = dateFuture.toGMTString();
			// dx = dx.substr(0,dx.length -3);
			// var tzCurrent=dateFuture.getTimezoneOffset();
// 			
			// dateFuture.setTime((Date.parse(dx)+(tzCurrent*60*1000)))
// 			
			// dateFuture.setHours(dateFuture.getHours() - tzOffset.hour);
			// if(tzOffset.minute){
				// dateFuture.setMinutes(dateFuture.getMinutes()-tzOffset.minute)
			// }
			
			var label = Ti.UI.createLabel({color:'#fff',textAlign:'center', top:10, font:{fontSize:24, fontWeight:'bold'}, height:'size', width:'size', zIndex:100});
			if(Ti.Platform.osname == 'ipad'){
				label.font = {fontSize:36, fontWeight:'bold'};
				label.top=50;
			}
			
			//////////////////////////////////////////
			function start() {displayTZCountDown(setTZCountDown(month,day,hour,tz));}

			    // **    The start function can be changed if required   **
			
			////////// DO NOT EDIT PAST THIS LINE //////////////////
			
			function setTZCountDown(month,day,hour,tz) 
			{
				var toDate = new Date();
				
				toDate.setYear(year);
				toDate.setMonth(month);
					
				if (day.substr(0,1) == '+') 
				{	
					var day1 = parseInt(day.substr(1));
					toDate.setDate(toDate.getDate()+day1);
				} 
				else{
					toDate.setDate(day);
				
				}
				
				toDate.setHours(hour);
			
				toDate.setMinutes(0-(tz*60));
			
				toDate.setSeconds(0);
			
				var fromDate = new Date();
			
				fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
			
				var diffDate = new Date(0);
			
				diffDate.setMilliseconds(toDate - fromDate);
			
				return Math.floor(diffDate.valueOf()/1000);
			}
			
			function displayTZCountDown(countdown) 
			{
				if (countdown < 0) 
				{
					label.text = "Happy New Year!!!"; 
					music.play();
					musicBtn();
					
					// clearInterval(interval);
				}
				else {
					var secs = countdown % 60; 
					
					if (secs < 10) {
						secs = '0'+secs;
					}
			
					var countdown1 = (countdown - secs) / 60;
			
					var mins = countdown1 % 60; 
			
					if (mins < 10) {
						mins = '0'+mins;
					}
			
					countdown1 = (countdown1 - mins) / 60;
			
					var hours = countdown1 % 24;
			
					var days = (countdown1 - hours) / 24;
					var out;
					if(days != 0){out += days +" day"+((days!=1)?"s":"")+", ";}
					if(days != 0 || hours != 0){out += hours +" hour"+((hours!=1)?"s":"")+"\n";}
					if(days != 0 || hours != 0 || mins != 0){out += mins +" minute"+((mins!=1)?"s":"")+", ";}
					out += secs +" seconds";
					label.text = out;
					
					//label.text = days + " day" + (days == 1 ? '' : 's') + ' + ' +hours+ 'h : ' +mins+ 'm : '+secs+'s';
					setTimeout(function(){
						displayTZCountDown((countdown-1))
					},999);
				}
			}
			start();
			//////////////////////////////////////////
			// var out;
			// function GetCount(){
// 			
// 			
				// // var dateNow = new Date();									
				// // var amount = dateFuture.getTime() - dateNow.getTime();
// // 				
				// // delete dateNow;
// 			
// 				
				// if(amount < 0){
// 					
					// music.play();
					// musicBtn();
					// label.text="Happy New Year!";
					// clearInterval(interval);
				// }
// 				
				// else{
// 					
					// var days=0,hours=0,mins=0,secs=0,out="";
// 			
					// amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs
// 			
					// days=Math.floor(amount/86400)-1
				// ;//days
					// amount=amount%86400;
// 			
					// hours=Math.floor(amount/3600);//hours
					// amount=amount%3600;
// 			
					// mins=Math.floor(amount/60);//minutes
					// amount=amount%60;
// 			
					// secs=Math.floor(amount);//seconds
// 			
					// if(days != 0){out += days +" day"+((days!=1)?"s":"")+", ";}
					// if(days != 0 || hours != 0){out += hours +" hour"+((hours!=1)?"s":"")+"\n";}
					// if(days != 0 || hours != 0 || mins != 0){out += mins +" minute"+((mins!=1)?"s":"")+", ";}
					// out += secs +" seconds";
					// label.text = out;
// 					
				// }
			// }
// 			
			// // var interval = setInterval(function(){
				// // GetCount();
			// // }, 1000);
			// // GetCount();
			
			return label;
		}
		        
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
			height:'size',
			color:'#fff',
			textAlign:'center',
			width:'100%'
		});
		var lyrics = Ti.UI.createLabel({
		   	text:"Should auld acquaintance be forgot,\nAnd never brought to mind?\nShould auld acquaintance be forgot,\nAnd auld lang syne!\n\n Chorus:\nFor auld lang syne, my dear,\n For auld lang syne.\nWe'll take a cup o' kindness yet,\nFor auld lang syne.",
			color:'#fff', 
			textAlign:'center',
			height:'size', top:15, bottom:40, left:0, right:0, width:'100%'});
		
		var line = Ti.UI.createView({backgroundColor:'#fff', left:10, right:10, height:1, top:75});
		var lyricView = Ti.UI.createView({layout:'vertical', height:'size'});
		   
		var scroll = Ti.UI.createScrollView({top:10, bottom:10, contentWidth:'auto', contentHeight:'auto'});
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
		//if(Ti.Media.isCameraSupported){
		win.add(photo);
		//}
		photo.addEventListener('click', function(){
			var win = Ti.UI.createWindow({
				url:'photo.js',
				fullscreen:true,
				//backgroundColor:'#000000'
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
		
		win.add(button);
		win.add(Stopbutton);
		win.add(newyears(data.tmz));
		win.barColor = '#000000';
	}
	win.addEventListener('open', populateWindow);
	return win;
}
module.exports = newwin;