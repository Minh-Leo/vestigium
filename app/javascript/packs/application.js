import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import "../components/3Drenderers";
import "../components/compromise";
import { analyze } from '../components/sentiment';

import { initMapbox } from '../plugins/init_mapbox';

initMapbox();

// console.log(analyze("For 13 years, Puerto Rico has been in a man-made recession aggravated by natural disasters. In 2017 the island territory asked a federal court for bankruptcy protection, but its still grappling with $70 billion in debt "));

