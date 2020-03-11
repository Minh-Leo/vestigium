import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import "../components/3Drenderers";
import "../components/compromise";

import { analyze } from '../components/sentiment';

import { initSortable } from '../plugins/init_sortable';
import { initMapbox } from '../plugins/init_mapbox';
import { initNotes } from '../plugins/init_notes';

initMapbox();
initNotes();
// initSortable();
