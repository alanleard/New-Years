var win = Ti.UI.currentWindow;

function photoSuccess(event){
	win.orientationModes = [Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.LANDSCAPE_LEFT];
	if(Titanium.UI.orientation!=Titanium.UI.LANDSCAPE_RIGHT && Titanium.UI.orientation!=Titanium.UI.LANDSCAPE_LEFT){
		Titanium.UI.orientation = Titanium.UI.LANDSCAPE_RIGHT;
	}
	
	var overlayImage = Titanium.UI.createImageView({
		image:'photo.png',
		top:0,
		left:0, 
		right:0,
		bottom:0,
		touchEnabled:false
	});
	
	if(Ti.Platform.displayCaps.platformHeight>800 || Ti.Platform.osname == 'ipad'){
		overlayImage.image = 'photoIpad.png'
	}
	
	var factor = 2;
	// var imgHeight;
	// var imgWidth;
	// if(event.media.height>event.media.width){
		// imgHeight = Ti.Platform.displayCaps.platformHeight;
// 		
		// imgWidth = 'size';
		// //zoomView.zoomScale =Ti.Platform.displayCaps.platformHeight/event.media.height
	// } else {
		// imgWidth = Ti.Platform.displayCaps.platformWidth;
		// imgHeight = 'size';
		// //zoomView.zoomScale =Ti.Platform.displayCaps.platformWidth/event.media.width
	// }
	
	// alert('imgHeight: '+imgHeight+'imgWidth: '+imgWidth)
	var imageView = Ti.UI.createImageView({
		image:event.media,
		// height:imgHeight,
		// width:imgWidth,
		//center:{x:(event.media.width)/2, y:(event.media.height)/2}
		center:{x:(factor*event.media.width)/2, y:(factor*event.media.height)/2}
	});
	var zoomView = Ti.UI.createScrollView({
		contentHeight:event.media.height*factor, 
		contentWidth:event.media.width*factor,
		// contentHeight:'auto', 
		// contentWidth:'auto',
		top:20,
		left:20,
		right:20, 
		bottom:20, 
		zoomScale:1.0, 
		minZoomScale:0.01, 
		maxZoomScale:4.0,
		backgroundColor:'#000000'
	});
	
	// if(event.media.height>event.media.width){
		// zoomView.zoomScale =Ti.Platform.displayCaps.platformHeight/event.media.height
	// } else {
		// zoomView.zoomScale =Ti.Platform.displayCaps.platformWidth/event.media.width
	// }
	// if(event.media.width>Ti.Platform.displayCaps.platformWidth){
		// zoomView.zoomScale =Ti.Platform.displayCaps.platformWidth/event.media.width
		// alert("min: "+zoomView.zoomScale)
	// } else {
		// zoomView.zoomScale = (Ti.Platform.displayCaps.platformWidth)/event.media.width
		// alert("zoom:"+zoomView.zoomScale)	
	// }
	//zoomView.contentOffset = {x:((factor*event.media.width-Ti.Platform.displayCaps.platformWidth)/2), y:((factor*event.media.height-Ti.Platform.displayCaps.platformHeight)/2)}
	zoomView.contentOffset = {x:(((factor*event.media.width)/2)-(Ti.Platform.displayCaps.platformWidth/2)), y:(((factor*event.media.height)/2)-(Ti.Platform.displayCaps.platformHeight/2))}

	
	var photoView = Ti.UI.createView();

	zoomView.add(imageView);
	photoView.add(zoomView);
	photoView.add(overlayImage);
	win.add(photoView);
	
	var save = Ti.UI.createButton({
		title:'Save',
		bottom:5,
		right:5,
		width:'size',
		height:'size'
	});

	win.add(save);
	
	var cancel = Ti.UI.createButton({
		title:'Cancel',
		top:5,
		right:5,
		width:'size',
		height:'size',
		zIndex:1000
	});

	win.add(cancel);
	
	cancel.addEventListener('click', function(){

		win.close();
		
	});
	
	save.addEventListener('click', function(){

			Titanium.Media.saveToPhotoGallery(photoView.toImage());
			alert('Image saved to Gallery');
			win.close();
		
	});
	var alertDialog = Ti.UI.createAlertDialog({
		title:'Pinch and Zoom to adjust image.'
	});
	alertDialog.show();

}

function camera(){
	
Titanium.Media.showCamera({

	success:function(e){
		Titanium.Media.saveToPhotoGallery(e.media);
		photoSuccess(e)
	}
	,
	cancel:function()
	{
		win.close();
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
	mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
	autohide:true
	});
};

function gallery(){
	Titanium.Media.openPhotoGallery({

	success:photoSuccess
	,
	cancel:function()
	{
		win.close();
	},
	error:function(error)
	{
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		
			a.setMessage('Unexpected error: ' + error.code);
		
		a.show();
	},
	mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
	autohide:true 
	});
};

function selectImage(){

	if(Ti.Media.isCameraSupported){
		var dialog = Ti.UI.createOptionDialog({
			title: 'First, grab an image!',
			options:['Camera', 'Photo Gallery', 'Cancel'],
			buttonNames: ['Camera', 'Photo Gallery' ],
			cancel:2
		})
		dialog.show();
			
		dialog.addEventListener('click', function(e){
			switch(e.index)
			{
			case 0:
				camera();
			  break;
			case 1:
				gallery();
			  break;
			case 2:
			    win.close();
			}
		});
	} else {
		gallery();
	}
}
selectImage();
