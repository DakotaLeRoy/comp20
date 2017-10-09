var map;
var myLat = 0;
var myLng = 0;

window.addEventListener('load', findCoords);
	function initMap() {

		map = new google.maps.Map(document.getElementById("map"), {
			zoom: 12,
			center: {lat: 42.364506, lng: -71.038887},
		});
}

function findCoords() {

	function getMyLocation(pos) {
		// The navigator.geolocation object is supported on your browser
		if (navigator.geolocation) {
			myLat = pos.coords.latitude;
			myLng = pos.coords.longitude;
			renderMap(myLat, myLng);
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}
	navigator.geolocation.getCurrentPosition(getMyLocation);
}


function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);
	
	// Create a marker
	marker = new google.maps.Marker({
		position: {lat: myLat, lng: myLng},
		size: new google.maps.Size(3, 3),
		icon: 'me.png'
	});
	marker.setMap(map);
					
	var infowindow = new google.maps.InfoWindow();
	// Open info window on click of marker

	getData(myLat, myLng);
}

function getData(myLat, myLng) {

	var request = new XMLHttpRequest();
	// Step 1: set up HTTP request. Three required arguments...:
	// ...HTTP method (string), URL (string), asynch (boolean)
<<<<<<< HEAD
<<<<<<< HEAD
	request.open("POST", "https://warm-shelf-33452.herokuapp.com/submit", true);
=======
	request.open("POST", "https://dwarm-shelf-33452.herokuapp.com/submit", true);
>>>>>>> 3e0c99e04f90e883af8dec625130a82db336f27b
=======
	request.open("POST", "https://warm-shelf-33452.herokuapp.com/submit", true);
>>>>>>> 2bb0ed46112d3ada0c90f2875d176576adc2dc91

	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	// Step 2: Set up callback function to deal with HTTP response data
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			// Reponse data
			var data = request.responseText;
			// Turns data into an object
			var locations = JSON.parse(data);
			placeMarkers(myLat, myLng, locations);
		}
	};
	// Step 3: trigger the HTTP request
	// The argument for send() --data that you want to send to web server
	request.send("username=GOCK80Ii&lat=" + myLat + "&lng=" + myLng);
}

function placeMarkers(myLat, myLng, locations)
{
	var infowindow = new google.maps.InfoWindow();
	var i;
	if (locations.vehicles) {
		for (i = 0; i < locations.vehicles.length; i++) {  
        	marker = new google.maps.Marker({
        		position: new google.maps.LatLng(locations.vehicles[i].lat, locations.vehicles[i].lng),
        		icon: 'black_car.png',
        		size: new google.maps.Size(3, 3),
        		map: map
      		});

	      	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        	return function() {
	        		var username = locations.vehicles[i].username;
	        		var theirLat = locations.vehicles[i].lat;
	        		var theirLng = locations.vehicles[i].lng;
	        		var distance = getDistance(myLat, myLng, theirLat, theirLng);
	        		var content = "<div><p>Username: "+ username + "</p><p>Miles from me: "+ distance + "</p></div>";
	          		infowindow.setContent(content);
	          		infowindow.open(map, marker);
	        	}
	      	})(marker, i));
	    }
	}
	else {
		for (i = 0; i < locations.passengers.length; i++) {  
        	marker = new google.maps.Marker({
        	position: new google.maps.LatLng(locations.passengers[i].lat, locations.passengers[i].lng),
        	icon: 'user.png',
        	size: new google.maps.Size(3, 3),
        	map: map
      		});

       		google.maps.event.addListener(marker, 'click', (function(marker, i) {
         		return function() {
           			var username = locations.vehicles[i].username;
	        		var theirLat = locations.vehicles[i].lat;
	        		var theirLng = locations.vehicles[i].lng;
	        		var distance = getDistance(myLat, myLng, theirLat, theirLng);
	        		var content = "<div><p>Username: "+ username + "</p><p>Miles from me: " + distance + "</p></div>";
	          		infowindow.setContent(content);
           			infowindow.open(map, marker);
         		}
      		})(marker, i));
        }
	}
}

function getDistance(myLat, myLng, theirLat, theirLng){
	Number.prototype.toRad = function() {
   return this * Math.PI / 180;
	}

	var lat2 = myLat; 
	var lon2 = myLng; 
	var lat1 = theirLat; 
	var lon1 = theirLng;

	var R = 6371;
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var distance = R * c; 
	// Convert to miles
	distance = distance * 0.62137;
	return distance;
}

