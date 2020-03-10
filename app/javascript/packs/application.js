import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import "../components/3Drenderers";

import { analyze } from '../components/sentiment';

import { initMapbox } from '../plugins/init_mapbox';

import { initNotes } from '../plugins/init_notes';

initMapbox();
initNotes();

import { initSortable } from '../plugins/init_sortable';

initSortable();


console.log(analyze("For 13 years, Puerto Rico has been in a man-made recession aggravated by natural disasters. In 2017 the island territory asked a federal court for bankruptcy protection, but its still grappling with $70 billion in debt. Puerto Ricos fiscal fiasco offers a By trying to tax its way out of fiscal disaster, the state makes matters worse. There’s a simple solution "));
