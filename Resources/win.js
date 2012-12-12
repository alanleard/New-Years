var global = require('globals');

function newwin(data){
	var win = Titanium.UI.createWindow({
		title:data.title?data.title:"New Year's Count Down",
		backgroundImage:'bg.png',
		barColor:'#000000'
	});
		
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
		
		var line = Ti.UI.createView({backgroundColor:'#fff', left:10, right:10, height:1, top:65});
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
				fullscreen:true
			});
			win.open();
		});
		
		
		var music = Titanium.Media.createSound({
			url:'AuldLangSyne.mp3',
			looping:true,
			allowBackground:false});
		function musicBtn(status){
			//setTimeout(function(){
		if(status && status == 'start'){
			button.hide();
			Stopbutton.show();
			modal.show();
			modal.animate({opacity:0.85, duration:3000});
		} else if (status && status == 'stop'){
			Stopbutton.hide();
			button.show();
			modal.animate({opacity:0.01, duration:1000}, function(){
				modal.hide();
			});
		} else if(!status){
			setTimeout(function(){
				if(music.playing){
					button.hide();
					Stopbutton.show();
					modal.show();
					modal.animate({opacity:0.85, duration:3000});
				}else {
					Stopbutton.hide();
					button.show();
					modal.animate({opacity:0.01, duration:1000}, function(){
						modal.hide();
					});
			
				}
			}, 300);
		}

		}
		
		
		button.addEventListener('click',function(e){
		   music.play();
		   musicBtn('start');
		   
		});
			
		Stopbutton.addEventListener('click',function(a){
			music.stop(); 
			musicBtn('stop'); 
		});
			
		win.addEventListener('blur',function(c){
			music.stop();
			musicBtn('stop');
			
		});
		win.addEventListener('focus',function(c){
			musicBtn();
		});
		
		win.add(button);
		win.add(Stopbutton);
		win.add(countdownFunc(data.tmz));
		win.barColor = '#000000';
		
		function countdownFunc(){
			
			var year = "2013"
			var month = 0;     
			var day = '1';       
			var hour = 0;   
			var minutes = 0;
			var tz = data.tmz;    
			
			var label = Ti.UI.createLabel({color:'#fff',textAlign:'center', top:10, font:{fontSize:24, fontWeight:'bold'}, height:'size', width:'size', zIndex:100});
			if(Ti.Platform.osname == 'ipad'){
				label.font = {fontSize:36, fontWeight:'bold'};
				label.top=50;
			}
			
			displayTZCountDown(setTZCountDown(month,day,hour,tz));
			
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
			
				toDate.setMinutes(minutes-(tz*60));
			
				toDate.setSeconds(0);
			
				return toDate;
				
				// var fromDate = new Date();
// 			
				// fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
// 			
				// var diffDate = new Date(0);
// 			
				// diffDate.setMilliseconds(toDate - fromDate);
// 			
				// return Math.floor(diffDate.valueOf()/1000);
			}
			
			function displayTZCountDown(toDate) 
			{
				var fromDate = new Date();
			
				fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
			
				var diffDate = new Date(0);
			
				diffDate.setMilliseconds(toDate - fromDate);

				var countdown = Math.floor(diffDate.valueOf()/1000);
				
				if (countdown < 1) 
				{
					label.font = {fontSize:30, fontWeight:'bold'}
					if(Ti.Platform.osname == 'ipad'){
						label.font = {fontSize:46, fontWeight:'bold'};
						label.top=50;
					}
					label.text = "Happy New Year!!!"; 
					music.play();
					musicBtn();
					
					// clearInterval(interval);
				}
				else {
					var secs = countdown % 60; 
					
					var countdown1 = (countdown - secs) / 60;
			
					var mins = countdown1 % 60; 
			
					countdown1 = (countdown1 - mins) / 60;
			
					var hours = countdown1 % 24;
			
					var days = (countdown1 - hours) / 24;
					var display = '';
					if(days != 0){display += days +" day"+((days!=1)?"s":"")+", ";}
					if(days != 0 || hours != 0){display += hours +" hour"+((hours!=1)?"s":"")+"\n";}
					if(days != 0 || hours != 0 || mins != 0){
						if(mins!=0){
							display += mins +" minute"+((mins!=1)?"s":"");
						}
					}
				
					if(days == 0 && hours == 0 && mins == 0 && secs == 59){
						var fontSize = label.font.fontSize;
						label.font = {fontSize:fontSize+10, fontWeight:'bold'};
						display += secs +" seconds";
					} else if(days == 0 && hours == 0 && mins == 0 && secs == 10){
						var fontSize = label.font.fontSize;
						label.font = {fontSize:fontSize+10, fontWeight:'bold'};
						display += secs;
					} else if(days == 0 && hours == 0 && mins == 0 && secs<10){
						display += secs;
					} else if(mins != 0&&secs!=0){
						display += ", "+secs +" seconds";
					} else if(secs!=0){
						display += secs +" seconds";
					}
					
					label.text = display;
					
					setTimeout(function(){
						displayTZCountDown(toDate);
					},999);
				}
			}
			
			return label;
		}
		        
	return win;
}
module.exports = newwin;