 const myMapData = JSON.parse(window.localStorage.getItem('myMapData'));
 console.log(myMapData);

 const initializeGlobalMap = () => {
  var earth = new WE.map('earth_div');
  WE.tileLayer('https://www.api.maptiler.com/maps/hybrid/style.json?key=OCqiqCtCXYr78LgkUxzF').addTo(earth);

  initializeMarkers(myMapData, earth);
  // var marker = WE.marker([51.5, -0.09]).addTo(earth);
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

  // var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
  // marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});
  // var marker3 = WE.marker([40.058056, 41.228889]).addTo(earth);
  // marker2.bindPopup("<b>testttt</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});

  // var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);

  earth.setView([30.2744, 75.7751], 3);
}

const initializeMarkers = (mapData, earth) => {
  mapData.forEach(data => {
    let marker = WE.marker([data.coor[1], data.coor[0]]).addTo(earth);
    marker.bindPopup(`<b>${data.title}</b><img src='${data.image_url}' style='width: 100%; border-radius:10px;'><a href='${data.url}' target='_blank' class='btn-news-on-map' style=''>Read me</a>`, {maxWidth: 150, closeButton: true});
  })
}

console.log('from map');
initializeGlobalMap();
