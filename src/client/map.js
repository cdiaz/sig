const iconMarker = L.icon({
  iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
  iconSize:     [50, 50], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const map = L.map('map',{ center: [1.6157198,-75.6063165], zoom: 14});
var markers = [];

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

fetch('http://localhost:3000/routes')
  .then(res => res.json())
  .then((out) => {
    new L.geoJson(out,{
      onEachFeature: (feature, layer) =>  {
        console.log(feature)
        layer.bindPopup(feature.properties.f2);
      }
      
    }).addTo(map)
  })
  .catch(err => { throw err });

  

map.on('click',(e) => {
(async () => {
  if(markers.length < 2){
    let marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: iconMarker});
    marker.addTo(map);
    markers.push(marker);
    if(markers.length == 2) getRoute();
  } else {
    markers.map(marker => map.removeLayer(marker));
    markers = [];
  }
  /*const rawResponse = await fetch('check', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e.latlng)
  });
  const content = await rawResponse.json();*/

  //console.log(content);
})();
    
  let coords = e.latlng //Cordenadas recibidas del evento click
});

const getRoute = () => {

}