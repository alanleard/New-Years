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
	
	//var factor = 2.9;
	
	var imageView = Ti.UI.createImageView({
		image:event.media,
		height:'size',
		width:'size',
		//center:{x:(event.media.width)/2, y:(event.media.height)/2}
		// center:{x:(factor*event.media.width)/2, y:(factor*event.media.height)/2}
	});
	var zoomView = Ti.UI.createScrollView({
		// contentHeight:event.media.height*factor, 
		// contentWidth:event.media.width*factor,
		contentHeight:event.media.height, 
		contentWidth:event.media.width,
		top:20,
		left:20,
		right:20, 
		bottom:20, 
		zoomScale:1.0, 
		minZoomScale:0.2, 
		maxZoomScale:4.0,
		backgroundColor:'#000000'
	});
	// if(event.media.width>Ti.Platform.displayCaps.platformWidth){
		// zoomView.minZoomScale =( Ti.Platform.displayCaps.platformWidth/2 )/event.media.width
		// alert("min: "+zoomView.minZoomScale)
	// } else {
		// zoomView.zoomScale = (Ti.Platform.displayCaps.platformWidth)/event.media.width
		// alert("zoom:"+zoomView.zoomScale)	
	// }
	//zoomView.setContentOffset({x:((factor*event.media.width-Ti.Platform.displayCaps.platformWidth)/2), y:((factor*event.media.height-Ti.Platform.displayCaps.platformHeight)/2)})

	var photoView = Ti.UI.createView();

	zoomView.add(imageView);
	photoView.add(zoomView);
	photoView.add(overlayImage);
	win.add(photoView);
	
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
		bottom:5,
		right:75,
		width:60,
		height:30,
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
		

}

function camera(){
	
Titanium.Media.showCamera({

	success:photoSuccess
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
