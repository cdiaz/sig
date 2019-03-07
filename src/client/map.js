const iconMarker = L.icon({
  iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
  iconSize:     [50, 50], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const map = L.map('map',{ center: [1.6157198,-75.6063165], zoom: 14});
var markers = [];
var layers = [];

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

fetch('http://localhost:3000/routes')
  .then(res => res.json())
  .then(out => {
    new L.geoJson(out, {
      onEachFeature: (feature, layer) =>  {
        layers.push(layer);
        for (const item in layer._layers) 
          layer._layers[item].options.color = 'green'; 
        layer.bindPopup(feature.properties.f2);
      }
    }).addTo(map)
  }).catch(err => { throw err });  

map.on('click',(e) => {
(async () => {
  if(markers.length < 2){
    let marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: iconMarker});
    marker.addTo(map);
    markers.push(marker);
    if(markers.length == 2) getRoute(e);
  } else {
    markers.map(marker => map.removeLayer(marker));
    markers = [];
  }
})();
});

const getRoute = async (e) => {
  fetch('check', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e.latlng)
  }).then(res => res.json())
  .then(out => {
    layers.map(layer => {
      if(layer.feature.properties.f1 == out.id){
        for (const item in layer._layers) 
          layer._layers[item].setStyle({ color: "#ff0000" })
      } else {
        for (const item in layer._layers) 
          layer._layers[item].setStyle({ color: "green" })
      }
    });
  })
  
}