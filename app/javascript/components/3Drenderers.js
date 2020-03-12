import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { getArticles, checkSourceName } from './data';

const modalsContainer = document.getElementById('modals-container');

export const create3Dglobe = (data, radius) => {
  var table = data;
  var camera, scene, renderer;
  var controls;

  var objects = [];
  var targets = { table: [], sphere: [], helix: [], grid: [] };

  modalsContainer.innerHTML = '';
  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 40, 1, 1, 1000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    for ( var i = 0; i < table.length; i += 1 ) {

      var element = document.createElement( 'a' );
      element.className = 'element';
      element.setAttribute('data-toggle', "modal");
      element.setAttribute('data-target', `#news-modal-${i}`);
      element.id = `news-card-${i}`;
      element.target = '_blank';

      // Sentimental value display
      if (table[i].sentiment !== null) {
        if (table[i].sentiment <= -5) {
          element.style.border = `5px solid #FF0000`;
          element.classList.add('negative');
        } else if (table[i].sentiment > -5 && table[i].sentiment <= 2) {
          element.style.border = `5px solid #FFFF82`;
          element.classList.add('neutral');
        } else if (table[i].sentiment > 2) {
          element.style.border = `5px solid #087E8B`;
          element.classList.add('positive');
        }
      } else {
        element.style.border = `none`;
      }

      // element.style.backgroundColor = `rgba(255,255,255, ${(Math.random() * (1 - 0.7) + 0.7).toFixed(2)})`;

      var image = document.createElement( 'img' );
      image.className = 'image';
      image.src = table[i].image_url;
      image.style = 'width: 300px; height: 180px';
      element.appendChild( image );

      var title = document.createElement( 'div' );
      title.className = 'title';
      title.textContent = table[i].title;
      element.appendChild( title );

      var details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = table[i].description;
      element.appendChild( details );


      // let buttonToInsert = `
      // <button type="button" class="btn btn-primary btn-news-modal" data-toggle="modal" data-target="#news-modal-${i}">
      //       More info
      // </button>`;

      let modalToInsert = `
            <div class="modal fade" id="news-modal-${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">${table[i].title}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img src='${table[i].image_url}' style='width: 100%;'>
                    <h5>by: <strong>${table[i].author ? table[i].author : 'Author unknown'}</strong><h5>
                    <h5>Published at: <strong>${
                      table[i].source ? table[i].source : checkSourceName(table[i].source_id)
                    }</strong><br><strong>${table[i].publish_time.replace('T', ' __ ').replace('Z', '')}</strong><h5>
                    <p>${table[i].body ? table[i].body : table[i].description}<p>
                  </div>

                  <div class="modal-footer">
                    <a href="articles/${table[i].id}/favorites/new" type="button" class="btn btn-secondary add-to-favorite corner-left">Add to favorite</a>
                    <button type="button" class="btn btn-dark corner-right"><a href='${table[i].url}' target='_blank'>Read me</a></button>
                  </div>
                </div>
              </div>
            </div>
      `;
      // element.insertAdjacentHTML('beforeend', buttonToInsert);
      modalsContainer.insertAdjacentHTML('beforeend', modalToInsert);


      var object = new CSS3DObject( element );
      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;
      scene.add( object );

      objects.push( object );

      //

      var object = new THREE.Object3D();
      targets.table.push( object );

    }

    // sphere

    var vector = new THREE.Vector3();

    for ( var i = 0, l = objects.length; i < l; i ++ ) {

      var phi = Math.acos( - 1 + ( 2 * i ) / l );
      var theta = Math.sqrt( l * Math.PI ) * phi;

      var object = new THREE.Object3D();

      object.position.setFromSphericalCoords( radius, phi, theta );

      vector.copy( object.position ).multiplyScalar( 2 );

      object.lookAt( vector );

      targets.sphere.push( object );

    }

    //

    renderer = new CSS3DRenderer();
    // resizeCanvasToDisplaySize();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById( 'three-container' ).appendChild( renderer.domElement );


    controls = new TrackballControls( camera, renderer.domElement );
    controls.minDistance = 1000;
    controls.maxDistance = 4000;
    controls.addEventListener( 'change', render );

    var button = document.getElementById( 'table' );
    button.addEventListener( 'click', function () {

      transform( targets.table, 2000 );

    }, false );

    var button = document.getElementById( 'sphere' );
    button.addEventListener( 'click', function () {

      transform( targets.sphere, 2000 );

    }, false );

    transform( targets.sphere, 2000 );

    //
    window.addEventListener( 'resize', onWindowResize, true );
  }


  function transform( targets, duration ) {
    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

      var object = objects[ i ];
      var target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    }

    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate( render )
      .start();

  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
  }

  function animate() {
    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();
  }


  function render() {
    renderer.render( scene, camera );
  }

}
