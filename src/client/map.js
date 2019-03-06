const map = L.map('map',{ center: [1.6157198,-75.6063165], zoom: 14});

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
  const rawResponse = await fetch('check', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e.latlng)
  });
  const content = await rawResponse.json();

  console.log(content);
})();
    
  let coords = e.latlng //Cordenadas recibidas del evento click
});