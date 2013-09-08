$(document).bind("mobileinit", function(){
	//apply overrides here
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.defaultPageTransition = 'fade';
	$.mobile.transitionFallbacks.slideout = "none"
});

function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}
 
function downloadFile(){
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT, 0, 
		function onFileSystemSuccess(fileSystem) {
			fileSystem.root.getFile(
				"dummy.html", {create: true, exclusive: false}, 
				function gotFileEntry(fileEntry){
					var sPath = fileEntry.fullPath.replace("dummy.html","");
					var fileTransfer = new FileTransfer();
					fileEntry.remove();		
					fileTransfer.download("http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",sPath + "theFile.pdf",
						function(theFile) {
							console.log("download complete: " + theFile.toURL());
							showLink(theFile.toURL());
						},
						function(error) {
							console.log("download error source " + error.source);
							console.log("download error target " + error.target);
							console.log("upload error code: " + error.code);
						}
					);
				},fail
			);
		},fail
	);
}

function showLink(url){
	alert(url);
	var divEl = document.getElementById("ready");
	var aElem = document.createElement("a");
	aElem.setAttribute("target", "_blank");
	aElem.setAttribute("href", url);
	aElem.appendChild(document.createTextNode("Ready! Click To Open."))
	divEl.appendChild(aElem);

}
 

function fail(evt) {
	console.log(evt.target.error.code);
}
 
/* When this function is called, PhoneGap has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */
function onDeviceReady(){
	navigator.splashscreen.hide();
	document.addEventListener("backbutton", onBackClickEvent, false); // Adding the back button listener    

	downloadFile();
}

