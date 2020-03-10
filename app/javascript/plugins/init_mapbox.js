import mapboxgl from 'mapbox-gl';

const myMapAPI = process.env.MAPBOX_API_KEY;

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarker = (map, marker) => {
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([ marker.lng, marker.lat ]);
    map.fitBounds(bounds, { padding: 70, zoom: 7, duration: 3000 });
  };

  if (mapElement) {
    mapboxgl.accessToken = myMapAPI;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/minhbui/ck7460q0e2wqo1hk4zeujsi6f'
    });

    const marker = JSON.parse(mapElement.dataset.marker);

    new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);

    fitMapToMarker(map, marker);
  };
};

// //
const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

let locations, url, map;

// let displayMap = (coor) => {
//   mapboxgl.accessToken = myMapAPI;

//   map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: coor,
//     zoom: 16
//   });

//   new mapboxgl.Marker()
//     .setLngLat(coor)
//     .addTo(map);
// };


const getCoordinates = (address) => {
  locations = address.split(' ').join('%20');

  url = `${baseUrl}${locations}.json?access_token=${myMapAPI}`;

// for line 45 in news_main.js to work, have to return a promise here so that that line will wait for the promise to finished
  return fetch(url)
    .then(res => res.json())
    .then((data) => {
      return data.features[0].center;
      // displayMap(data.features[0].center);
    });
};
////

export { initMapbox, getCoordinates };
