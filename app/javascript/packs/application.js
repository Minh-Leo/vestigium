import "bootstrap";
import "../components/3Drenderers";
import { initCreate3Drender } from "../components/3DrenderersDatabase";
import { analyze } from '../components/sentiment';

import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import { initMapbox } from '../plugins/init_mapbox';

initMapbox();

// init the create3Dglobe on window object
initCreate3Drender();
