

	
var app_id = "KzuG8zCWXrYwMGq7dsQY",
app_code = "Anm4bD03Oq9aUMG8wThpYw",
app_id_cors = "KzuG8zCWXrYwMGq7dsQY",
app_code_cors = "Anm4bD03Oq9aUMG8wThpYw",
app_id_jp = "KzuG8zCWXrYwMGq7dsQY",
app_code_jp = "Anm4bD03Oq9aUMG8wThpYw",

api_key = "vLvpnTOeHS2jlIN1_ZBMl8UE1CcieEEvcHT-nmSQ2po",
api_key_jp = "vLvpnTOeHS2jlIN1_ZBMl8UE1CcieEEvcHT-nmSQ2po";


/**
 * Calculates and displays a car route from the Brandenburg Gate in the centre of Berlin
 * to Friedrichstraße Railway Station.
 *
 * A full list of available request parameters can be found in the Routing API documentation.
 * see:  http://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-route.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */
var weekday = new Date().getDay();
var pattern_time = Math.trunc(new Date().getHours() * 4 + new Date().getMinutes() / 15);
var trafficPatternHashMap;
var currentLayers = [];

// time slider initialization
var slider = document.createElement('input');
slider.setAttribute('type', 'range');
slider.setAttribute('orient', 'horizontal');
slider.min = 0;
slider.max = 240;
slider.style.width = "240px";
slider.style.cursor = "pointer";
bar.appendChild(slider);
slider.onchange    = function() { updateSliderText(slider.value, true ) };
slider.onmousemove = function() { updateSliderText(slider.value, false) };
slider.value = 240 * pattern_time / 96;
  patternTimeText.innerHTML = "Time: " + new Date().getHours() + ":" + Math.floor(new Date().getMinutes() / 15) * 15 + ". <b><font color=red>Loading Traffic Pattern curves...</font></b>";
  document.getElementById("day").value = weekday;

  function updateSliderText (pos, refreshDisplay) {
      t = (Math.ceil(pos / 240 * 96) / 4);
      hour = Math.floor(t);
      h = t.toFixed(2);
      minutes = (h % 1) * 60;
      pattern_time = Math.ceil(pos / 240 * 96);
      if (pattern_time >= 96) pattern_time = 95;
      if(hour < 10) hour = "0" + hour; // add leading zero to minutes string
      if(minutes === 0) minutes = "00"; // format minutes from 0 to 00
      patternTimeText.innerHTML = "Time: " + hour + ":" + minutes;
      if (refreshDisplay) {		
        requestTrafficPattern();
      }
}

document.getElementById("day").onchange = function(sel) {
  weekday = parseInt(sel.srcElement.value);			
  requestTrafficPattern();
};
 function exampleSelect(){
  console.log("exampleSelect");
  calculateRouteFromAtoB (platform)
}

function calculateRouteFromAtoB (platform) {
  
  console.log("calculateRouteFromAtoB!!! ");
  var e = document.getElementById("exampleSelector");
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;
  console.log(value);
  console.log(text);
  if (value=="firestaion") {
    org='49.495995,8.429165'
  } else if (value=="tor13") {
    org='49.527669,8.409879'
  } else {
    org='49.495995,8.429165'
  }

  console.log(org)
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {

        //routingMode: 'fast',
        //transportMode: 'truck',
        waypoint0: org, // BASF Feuerwache
        //origin: '49.527669,8.409879', // BASF Tor 13
        
        waypoint1: '49.521326,8.446628',  // Friesenheimer Insel

        mode: 'truck;fastest;traffic:disabled',
        
        'legAttributes': 'li',
        'linkAttributes': 'ds,sh',
        'routeAttributes' : 'lg,bb',
        'representation': 'display'

        //return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
      };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}
/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
  
  //var route = result.routes[0];
  var route = result.response.route[0];
  console.log(route)
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route);
  //addManueversToMap(route);
  //addWaypointsToPanel(route);
  //addManueversToPanel(route);
  //addSummaryToPanel(route);
  // ... etc.

  console.log("linkids Route: " + link_ids.length);
  var link_ids_clean = link_ids.map(e => e.replace('+', '')).map(e => e.replace('-', '')).sort();
  console.log(link_ids_clean); 
  console.log("")
  console.log("link_ids_pattern: " + link_ids_pattern.length)
  console.log(link_ids_pattern.sort()); 

  console.log("dict_pattern: " + dict_pattern.length)
  console.log(dict_pattern.sort());
  
  console.log("current_speed: " + sum_speed);
  console.log("curret_time:" + sum_time); 

  var a1 = ["cat", "sum", "fun", "hut"]
  var a2 = ["bat", "cat", "dog", "sun", "hut", "gut"];
  
  var dic=[];
  dic.push({key:   "1000044299",value: 30});



  
  sum_pattern=0
  // loop through historic pattern link ids
  for (const akey in dict_pattern) {
    // check if the property/key is defined in the object itself, not in parent
    if (dict_pattern.hasOwnProperty(akey)) {           
      // check if historic link id exists in current route  
      if(link_ids_clean.indexOf(dict_pattern[akey].key) !== -1){
          sum_pattern+=dict_pattern[akey].value;
          dic.push(dict_pattern[akey].key)
        } else{
          //console.log("Value does not exists!")
        }
    }
}
  console.log(dic.sort())
  console.log('sum_pattern: ' + sum_pattern);
  createSimulationElement();
  console.log("------------------------")

}

function createSimulationElement(){
  var container = document.getElementById('simulation');
  //var newElm = document.createElement('span');
  
  let s_sim = 'Historic Pattern: ' + sum_pattern + ' / Current Situation: ' + sum_time
  if (sum_pattern>0) {
    container.innerText = s_sim;
  }  
  //container.appendChild(newElm);
}
function intersect_arrays(a, b) {
  console.log("intersect_arrays")
  var sorted_a = a.concat().sort();
  var sorted_b = b.concat().sort();
  var common = [];
  var a_i = 0;
  var b_i = 0;

  while (a_i < a.length
         && b_i < b.length)
  {
      if (sorted_a[a_i] === sorted_b[b_i]) {
          common.push(sorted_a[a_i]);
          a_i++;
          b_i++;
      }
      else if(sorted_a[a_i] < sorted_b[b_i]) {
          a_i++;
      }
      else {
          b_i++;
      }
  }
  return common;
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Can\'t reach the remote server');
}

/**
 * Boilerplate map initialization code starts below:
 */

// set up containers for the map  + panel
var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: "vLvpnTOeHS2jlIN1_ZBMl8UE1CcieEEvcHT-nmSQ2po",app_id: "KzuG8zCWXrYwMGq7dsQY", app_code: "Anm4bD03Oq9aUMG8wThpYw"
});

// Check whether the environment should use hi-res maps
var hidpi = ('devicePixelRatio' in window && devicePixelRatio > 1);

var defaultLayers = platform.createDefaultLayers();
var maptypes = platform.createDefaultLayers(hidpi ? 512 : 256, hidpi ? 320 : null);


//Step 2: initialize a map - this map is centered over Ludwigshafen
//var rc =H.Map.Group()
//map.addObject(rc)

var greyTileLayer = platform.getMapTileService({type: 'base'}).createTileLayer('maptile', 'normal.day.grey', hidpi ? 512 : 256, 'png8', null);

var map = new H.Map(mapContainer,greyTileLayer,
  maptypes.normal.map,{
  center: {lat:49.521326, lng:8.446628},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});

// groups for routes
var routeGroup = new H.map.Group();
map.addObject(routeGroup);

// group for manouvers
var manGroup = new H.map.Group();

// group for traffic pattern
var patternGroup = new H.map.Group();
map.addObject(patternGroup);

// global varibales storing information for traffic
var link_ids=[];
var link_ids_pattern=[];
var sum_speed=0;
var sum_time=0;
var dict_pattern =[];
var sum_pattern=0;

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var PDE_ENDPOINT = document.getElementById('endpoint').value;
var drivingSidesByIsoCountryCode = {};
//console.log(PDE_ENDPOINT)
// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}


/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addRouteShapeToMap(route){
  routeGroup.removeAll();
  console.log("addRouteShapetoMap");
  //debugger

  link_ids=[]
  sum_time=0;
  sum_speed=0;
  var linkAttributes=route.leg[0].link;
  var linkCount = linkAttributes.length;
  for(var i=0;i<linkCount;i++){
      var strip = new H.geo.Strip();
      var linkAttribute = linkAttributes[i];
      var shape = linkAttribute.shape;
      var shapeLength = shape.length;
      link_ids.push(linkAttributes[i].linkId);
      sum_speed+=linkAttribute.dynamicSpeedInfo.trafficSpeed;
      sum_time+=linkAttribute.dynamicSpeedInfo.trafficTime;
      

      for(var j = 0; j < shapeLength; j++)
      {
        strip.pushLatLngAlt.apply(strip, shape[j].split(',').map(function(item) { return parseFloat(item); }));
      }
      
      var dynamicSpeedInfo = linkAttribute.dynamicSpeedInfo;
      var jamFactor = dynamicSpeedInfo.jamFactor;
      // color for polyline is updated based on JamFactor
      var polyline = new H.map.Polyline(strip,
      {
        style:
        {
          lineWidth: 10,
          strokeColor: getColorForJF(jamFactor),
        }
      });
      polyline.$JF = jamFactor;
      polyline.$BaseSpeed = dynamicSpeedInfo.baseSpeed;
      polyline.$TrafficSpeed = dynamicSpeedInfo.trafficSpeed;
      
      // onclick show jam factor, base speed and traffic speed values
      polyline.addEventListener('pointerdown', function (e) {
          clearBubbles();
          
          var html =  '<div>'+
            '<p class="form-control">JamFactor: ' + e.target.$JF +'</p>'+
            '<p class="form-control">Base Speed: ' + Math.round(parseFloat(e.target.$BaseSpeed)) +'m/s </p>'+
            '<p class="form-control">Traffic Speed: ' + Math.round(parseFloat(e.target.$TrafficSpeed)) +'m/s </p>'+
            '</div>';
          var pos = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
          infoBubble = new H.ui.InfoBubble(pos, { content: html });
          ui.addBubble(infoBubble);
      });
      //debugger
      //map.addObject(polyline);
      routeGroup.addObject(polyline);

      
  }
  
  //routeGroup.addObject(polyline);
  map.setViewBounds(routeGroup.getBounds(), true);


}

function showHideRoute() {
  console.log("showHideRoute")
  if (document.getElementById("showroute").checked) {
    console.log("if");
    //map.addLayer   (truckOverlayLayer);
    //onSuccess;
    //addRouteShapeToMap(route);
    calculateRouteFromAtoB (platform);
  }
  else {
    routeGroup.removeAll();
    console.log("else");
  }
}

Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
}
var server_rr = 0;
var truckOverlayProvider = new H.map.provider.ImageTileProvider(
  {
  label: "Tile Info Overlay",
  descr: "",
  min: 12,
  max: 20,
  getURL: function(col, row, level) {
      server_rr++;
      if (server_rr > 4) server_rr = 1;
      return ["https://",
          server_rr,
          ".base.maps.api.here.com/maptile/2.1/truckonlytile/newest/normal.day/",
          level,
          "/",
          col,
          "/",
          row,
          "/256/png8",
          "?style=fleet",
          "&app_code=",
          app_code,
          "&app_id=",
          app_id
      ].join("");
  }
});
var truckOverlayLayer = new H.map.layer.TileLayer(truckOverlayProvider);
map.addLayer(truckOverlayLayer);
//debugger


//map.addLayer(defaultLayers.vector.normal.trafficincidents);
/**
* Show and hide truck restrictions
*/
function showHideTruckMapDisplay() {
  console.log("showHideTruckMapDisplay")
  if (document.getElementById("truckrestr").checked) map.addLayer   (truckOverlayLayer);
  else                                              try {  map.removeLayer(truckOverlayLayer); } catch (exc) {console.log("Failed to remove truck overlay layer: " + exc);}
}
/**
 * Color based on JamFactor
 **/
getColorForJF = function(jamFactor)
{
  transp=0.5;
  if(jamFactor < 2.0)
    return 'rgb(0,0,255,0.9)';
    else if(jamFactor < 4.0)
    return 'rgb(80,198,80,0.9)';
    else if(jamFactor < 6.5)
    return 'rgb(254,212,3)';
  else if(jamFactor < 8.0)
    return 'rgb(254,153,37)';
  else if(jamFactor < 10.0)
    return 'rgb(227,15,56)';
  else if (jamFactor == 10.0 || jamFactor > 10.0)
    return 'rgba(0,0,0)';
}

var clearBubbles = function() {
  ui.getBubbles().forEach(function (bubble) {
    ui.removeBubble(bubble);
  });
}

function splitMultiDigitized(fc, strip, data) {

  function shift(strip, dist) {
    var shifted = new H.geo.Strip();
    var lastShifted;
    for (var i = 0; i < strip.getPointCount() - 1; i++) {
      var p0 = strip.extractPoint(i);
      var p1 = strip.extractPoint(i + 1);
      var bearing = p0.bearing(p1) + 90;
      var p0shifted = p0.walk(bearing, dist);
      if (lastShifted) {
        p0shifted =p0shifted.walk(p0shifted.bearing(lastShifted), p0shifted.distance(lastShifted) / 2);
      }
      shifted.pushPoint(p0shifted);
      lastShifted = p1.walk(bearing, dist);
      if (i + 1 === strip.getPointCount() - 1) shifted.pushPoint(lastShifted);
    }
    return shifted;
  }

  var travelDirection = data['LINK_ATTRIBUTE_FC' + fc].TRAVEL_DIRECTION;
  var drivingSide = drivingSidesByIsoCountryCode[data['LINK_ATTRIBUTE_FC' + fc].ISO_COUNTRY_CODE] || 'R';
  var fromRefDist = drivingSide === 'R' ? 4 : -4;
  if (travelDirection === 'B') {
    return { fromRef: shift(strip, fromRefDist), toRef: shift(strip, -fromRefDist) };
  } else if (travelDirection === 'F') {
    return {single: shift(strip, fromRefDist)};
  } else if (travelDirection === 'T') {
    return {single: shift(strip, -fromRefDist)};
  }
}

var bubble = new H.ui.InfoBubble({lat: 0, lng: 0}, {content: ''});
bubble.close();
ui.addBubble(bubble);

function showBubble(fc, e, data) {
  var p = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
  var trafficLayer = 'TRAFFIC_PATTERN_FC' + fc;
  var content = ('<table class="speed-record">' +
  '<tr><td>LINK_ID</td><td>{linkId}</td></tr>' +
  '<tr><td>FROM_REF_KMH</td><td>{fromRefFlow}</td></tr>' +
  '<tr><td>TO_REF_KMH</td><td>{toRefFlow}</td></tr>' +
  '<tr><td>FREE_FLOW_KMH</td><td>{avgFlow}</td></tr>' +
  '</table>')
      .replace('{linkId}', data[trafficLayer].LINK_ID)
      .replace('{fromRefFlow}', getSpeed(fc, 1, data) || 'n/a')
      .replace(  '{toRefFlow}', getSpeed(fc, 2, data) || 'n/a')
      .replace(    '{avgFlow}', getSpeed(fc, 0, data) || 'n/a');
  bubble.setPosition(p);
  bubble.setContent(content);
  bubble.open();
}

function trafficBasedStyle(fc, data) {
  var trafficLayer = 'TRAFFIC_PATTERN_FC' + fc;
  var trafficData = data[trafficLayer];
  if (!trafficData || !trafficPatternHashMap) return null; // at startup it takes 1 - 2 minutes to load the pattern content
  //console.log(data)
  //console.log(JSON.stringify(data));



  //console.log(link_ids)
  //debugger
  
  var freeFlowSpeed   = getSpeed(fc, 0, data); 
  var fromRefSpeedKmh = getSpeed(fc, 1, data);
  var toRefSpeedKmh = getSpeed(fc, 2, data);
  //console.log(fromRefSpeedKmh)
  
  if (!fromRefSpeedKmh && !toRefSpeedKmh) return null;
  var speedKmh = 0;
  if (data.processedKey === 'single') { // check which fields the object got created by the "splitMultiDigitized()" postProcess function
      speedKmh = (fromRefSpeedKmh && toRefSpeedKmh) ? Math.min(fromRefSpeedKmh, toRefSpeedKmh) : (fromRefSpeedKmh ? fromRefSpeedKmh : toRefSpeedKmh);
    } else if (data.processedKey === 'fromRef') {
      speedKmh = fromRefSpeedKmh;
    } else if (data.processedKey === 'toRef') {
      speedKmh = toRefSpeedKmh;
    }
  
  //console.log("array replaced")
  link_ids = link_ids.map(e => e.replace('+', '')).map(e => e.replace('-', ''))
  //console.log(link_ids)
  //console.log(trafficData.LINK_ID);
  //console.log(speedKmh);
  // Check if a value exists in the array
  cnt=0
  if(link_ids.indexOf(trafficData.LINK_ID) !== -1){
    //console.log("Value exists!")
    link_ids_pattern.push(trafficData.LINK_ID)
  } else{
    //console.log("Value does not exists!")
  }

  dict_pattern.push({
    key:   trafficData.LINK_ID,
    value: freeFlowSpeed
  });

  //console.log("in array")
  //console.log(link_ids_pattern)
  if (freeFlowSpeed <= 0) freeFlowSpeed = 1; // avoid division by zero
  var speedFactor = speedKmh / freeFlowSpeed; // coloring is subject to customer preferences
    var                           color = '#61ba72'; // green
    if      (speedFactor <= 0.50) color = '#ea232d'; // red
    else if (speedFactor <= 0.75) color = '#fecf00'; // yellow
    return { strokeColor: color, lineWidth: 8 - fc }
  
}

function getSpeed(fc, mode, data) { // 0 = free flow speed, 1 = from ref speed, 2 = to ref speed
  var trafficLayer = 'TRAFFIC_PATTERN_FC' + fc;
  var trafficData = data[trafficLayer];
  if (!trafficData || !trafficPatternHashMap) return null; // at startup it takes a moment to load the pattern content
  if (mode == 0) { // Free flow = Average across the weekdays of the maximum speed of each day. Customers do it differetnly, this is just one possibility.
    var weekdayList = trafficData.F_WEEKDAY ? trafficData.F_WEEKDAY : trafficData.T_WEEKDAY; // take ony for the free flow computation
    var freeFlowSpeed = 0;
    for (var w = 0; weekdayList && w < 7; w++) {
        var pattern = weekdayList.split(',')[w];
        var maxSpeedOfDay = 0;
        for (var d = 0; pattern && d < 96; d++) {
          if (trafficPatternHashMap[pattern][d] > maxSpeedOfDay) maxSpeedOfDay = trafficPatternHashMap[pattern][d];
        }
    freeFlowSpeed += maxSpeedOfDay/7;
    }
    return Math.trunc(freeFlowSpeed);
  }
  
  var weekdayList = mode == 1 ? trafficData.F_WEEKDAY : trafficData.T_WEEKDAY;
  var pattern = weekdayList ? weekdayList.split(',')[weekday] : null;
  return pattern ? trafficPatternHashMap[pattern][pattern_time] : null;
}

function requestTrafficPattern() {
  
  console.log("requestTrafficPattern!!!")
  currentLayers.forEach(function (l) {
    map.removeLayer(l);
  });
  for (var fc = 1; fc <= 5; fc++) {
    var layer = new H.map.layer.ObjectLayer(createPdeObjectProvider(map, {
      min: 11 + fc,
      layer: 'ROAD_GEOM_FC' + fc,
      dataLayers: [ {layer: 'TRAFFIC_PATTERN_FC' + fc}, {layer: 'LINK_ATTRIBUTE_FC' + fc, cols: ['LINK_ID', 'ISO_COUNTRY_CODE', 'TRAVEL_DIRECTION']} ],
      level: 8 + fc,
      postProcess: splitMultiDigitized.bind(null, fc),
      tap: showBubble.bind(null, fc),
      polylineStyle: trafficBasedStyle.bind(null, fc)
    }));
    //patternGroup.addObject(layer);
    //debugger
  map.addLayer(layer);
  
  currentLayers.push(layer);
  }
  console.log(link_ids_pattern.sort()); 
}



function showHideTrafficPattern() {
  console.log("showHideTrafficPattern")
  if (document.getElementById("PatternOn").checked) {
    requestTrafficPattern()
  } 
  else {
    currentLayers.forEach(function (l) {
      map.removeLayer(l);
    });
  }                                                  
}

function gotStaticContentTrafficPattern(response)	{
  if (response.error != undefined) {
  alert(response.error);
  return;
  }
  if (response.responseCode != undefined) {
  alert (response.message);
  return;
  }
  trafficPatternHashMap = new Object();
  for (var r = 0; r < response.Rows.length; r++) {
      trafficPatternHashMap[response.Rows[r].PATTERN_ID] = response.Rows[r].SPEED_VALUES.split(',');
  }
  requestTrafficPattern();

  patternTimeText.innerHTML = "Time: " + new Date().getHours() + ":" + Math.floor(new Date().getMinutes() / 15) * 15;
  }

  // load the static layer TRAFFIC_PATTERN
  var url = document.getElementById('endpoint').value + "/1/static.json?content=TRAFFIC_PATTERN&app_id=" + app_id + "&app_code=" + app_code + "&callback=gotStaticContentTrafficPattern";
  var script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);


H.geo.Point.prototype.bearing = function (to) {
  'use strict';
  var lngTo = to.lng * (Math.PI / 180);
  var lngFrom = this.lng * (Math.PI / 180);
  var latTo = to.lat * (Math.PI / 180);
  var latFrom = this.lat * (Math.PI / 180);
  var lngDelta = (lngTo - lngFrom);
  var y = Math.sin(lngDelta) * Math.cos(latTo);
  var x = Math.cos(latFrom) * Math.sin(latTo) - Math.sin(latFrom) * Math.cos(latTo) * Math.cos(lngDelta);
  var brng = Math.atan2(y, x);
  return (brng >= 0 ? brng : (2 * Math.PI + brng)) * (180 / Math.PI);
};


// Now use the map as required...
calculateRouteFromAtoB (platform);


