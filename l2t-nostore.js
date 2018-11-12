// uses http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css
// uses http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js


var myGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "ID": 2,
        "name": "secondname",
        "locN": "Mitte"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              8.8604736328125,
              52.679712548518395
            ],
            [
              9.2230224609375,
              52.42252295423907
            ],
            [
              9.684448242187498,
              52.67638208083924
            ],
            [
              8.8604736328125,
              52.679712548518395
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ID": 3,
        "name": "Walter",
        "locN": "Nord"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              9.91790771484375,
              52.87078763626816
            ],
            [
              10.05523681640625,
              52.97180028087255
            ],
            [
              9.832763671875,
              52.985030365232305
            ],
            [
              9.91790771484375,
              52.87078763626816
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ID": 1,
        "name": "firstname",
        "locN": "Süd"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              8.6737060546875,
              52.2378923494213
            ],
            [
              7.547607421875,
              51.5463350479341
            ],
            [
              9.0911865234375,
              51.37178037591737
            ],
            [
              8.6737060546875,
              52.2378923494213
            ]
          ]
        ]
      }
    }
  ]
} // end myGeoJSON

var map;

var tableLayout = [
	{ "fieldName": "ID", "heading": "ID" },
	{ "fieldName": "name", "heading": "Name" },
	{ "fieldName": "locN", "heading": "Location" },
];


var tableHeaderRowString;


$(document).ready(function () {

	map = L.map("map").setView([52, 9], 6);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);
	
	// generate table header
	
	tableHeaderRowString = "<tr>";
	
	for (var i=0;i<tableLayout.length;i++) {
		var n = tableLayout[i].fieldName;
		var h = tableLayout[i].heading
		tableHeaderRowString += "<th>"+h+"</th>";
		
	}		
	
	tableHeaderRowString += "</tr>";
	
	$('#r > table > thead').append(tableHeaderRowString);

	

	var jsonLayer = L.geoJson(myGeoJSON, {
	  onEachFeature: function(f, layer) {
		  
		  var tr_string = "<tr data-id=\""+f.properties.ID+"\">";
		  // find columns for the data table, add correct property to correct column
		  for (var i=0;i<tableLayout.length;i++) {
			  tr_string += "<td>"+ f.properties[ tableLayout[i].fieldName ]+"</td>"
		  }
		  tr_string += "</tr>";
		  
		  //create TR for feature
		  /*
		  "<tr data-id=\""+f.properties.ID+"\"><td>"+f.properties.ID+"</td>"+
		  "<td>"+f.properties.name+"</td></tr>"
		  */
		  var el = $(tr_string);
		  
		  // click handler on new TR element
		  el.on('click', function(evt) {
			// for debugging/other purposes  
			var id = evt.target.parentElement.getAttribute('data-id')
			console.log("clicked DOM element of feature "+id);
			// remove previous selection(s)
			$(".selected").removeClass("selected");
			// add selected to DOM element
			// the variable el is visible from onEachFeature
			el.addClass("selected");
			map.fitBounds( layer.getBounds() );
		  });
		  
		  // add TR element to table
		  $('#r > table > tbody:last-child').append(el);
		  
		  // click event on geo feature
		  layer.on('click', function(evt) {
			var tf = evt.target.feature;
			console.log("clicked map element of feature "+tf.properties.ID);
			// remove previous selection(s)
			$(".selected").removeClass("selected");
			// add selected to DOM element
			// the variable el is visible from onEachFeature
			el.addClass("selected");
		  });
		  
		}

	}).addTo(map);

}); // document.ready