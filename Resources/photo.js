var win = Ti.UI.currentWindow;
// win.orientationModes = [
        // Titanium.UI.LANDSCAPE_LEFT]
// Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT;
win.fullscreen = true;
var newYearPhoto = 'photo.png';


var t3 = Ti.UI.create2DMatrix();
	t3 = t3.rotate(-90);
var santa = Titanium.UI.createImageView({
	image:'photo.png',
	width:480,
	height:320,
	transform:t3
	
});

if(Ti.Platform.osname == 'ipad'){
	santa.image ='photoIpad.png';
	santa.height = 768;
	santa.width = 1024;
}

var close = Ti.UI.createButton({
	title:'Back',
	height:30,
	width:50,
	bottom:20,
	left:5,
	transform:t3
});


var button = Titanium.UI.createButton({
	top:70,
	right:-45,
	height:30,
	width:150,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Take Picture',
	transform:t3
});


var overlay = Titanium.UI.createView();


overlay.add(santa);
overlay.add(close);
overlay.add(button);
//win.add(overlay);
// 
// 
button.addEventListener('click',function()
{
	//Ti.Media.vibrate();
	Ti.Media.takePicture();
	
});

close.addEventListener('click', function(){
	Ti.Media.hideCamera();
	win.close();
});


Titanium.Media.showCamera({

	success:function(event)
	{
		win.orientationModes = [
        Titanium.UI.LANDSCAPE_LEFT]
		Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT;
		win.fullscreen = true;
	
		var santa2 = Titanium.UI.createImageView({
			image:'photo.png',
			width:480,
			height:320
		});
		if(Ti.Platform.osname == 'ipad'){
			santa2.image ='photoIpad.png';
			santa.height = 768;
			santa.width = 1024;
		}
		var view = Ti.UI.createView({top:0, left:0, right:0, bottom:0});
		// place our picture into our window
		var imageView = Ti.UI.createImageView({
			image:event.media,
			width:win.width,
			height:win.height
		});
		view.add(imageView);
		
		
		view.add(santa2);
		win.add(view);
		
		// programatically hide the camera
		//Ti.Media.hideCamera();
		
		var save = Ti.UI.createButton({
			title:'Save',
			bottom:5,
			right:5,
			width:60,
			height:30
		});
		
		win.add(save);
		
		var cancel = Ti.UI.createButton({
			title:'Cancel',
			top:5,
			left:5,
			width:60,
			height:30
		});
		
		win.add(cancel);
		
		save.addEventListener('click', function(){
			Titanium.Media.saveToPhotoGallery(view.toImage());
			win.close();
			var aDialog = Ti.UI.createAlertDialog({title:"New Year's Image Saved", message:"Your picture was saved in the \nphoto gallery."});
			aDialog.show();
		});
		
		cancel.addEventListener('click', function(){
			win.close();
		});
		Ti.Media.hideCamera();
	},
	cancel:function()
	{
	},
	error:function(error)
	{
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Sorry, you need a camera.');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	overlay:overlay,
	showControls:false,	// don't show system controls
	mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
	autohide:false // tell the system not to auto-hide and we'll do it ourself
	});
	
