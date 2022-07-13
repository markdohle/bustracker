mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2RvaGxlIiwiYSI6ImNsNWJmNjU5aTA3MHgzam1peXhrbmwwd2wifQ.z-2dq-6YflJAJ6RcHFyTeg'

var busId = 1870


var startingLng = -71.104081
var startingLat = 42.357575

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [startingLng, startingLat],
  zoom: 14
})

var marker = new mapboxgl.Marker()
  .setLngLat([startingLng,startingLat])
  .addTo(map)

async function updateMarker() {
  busLocations = await getBusLocations()
  busLocations.forEach(element => {
        console.log(element[0])
        if (element[0] == busId) {
          marker.setLngLat([element[1],element[2]])
        } else {
          console.log('markers.includes method does not work as expected')
        }
    })

  };

async function run(){
  // get bus data    
const locations = await getBusLocations();
console.log(new Date()); //datestamp
console.log(locations)
updateMarker()
// timer
timer = 1000*15
setTimeout(run, timer);

}

async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
var busAttributes = []
const route1 = json.data
route1.forEach(element => busAttributes.push(Object.entries(element.attributes))
);
//console.log(busAttributes)
let r=0
let latitude = 0
let longitude = 0
let busID = ''
let busLocations =[]
for (let r = 0; r < busAttributes.length; r++) {
latitude = busAttributes[r][5][1];
longitude = busAttributes[r][6][1];
busLabel = busAttributes[r][4][1];
busLocations.push([busLabel, longitude, latitude])
}

return busLocations;

}