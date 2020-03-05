import * as THREE from 'three';

import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

// import { getArticles } from './data';


export const initCreate3Drender = () => {
  window.create3Dglobe2 = data => {
  var table = data;
  console.log(table);
  var camera, scene, renderer;
  var controls;

  var objects = [];
  var targets = { table: [], sphere: [], helix: [], grid: [] };

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 40, 1, 1, 1000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    for ( var i = 0; i < table.length; i += 1 ) {

      var element = document.createElement( 'div' );
      element.className = 'element';
      // element.style.backgroundColor = `rgba(255,255,255, ${(Math.random() * (1 - 0.7) + 0.7).toFixed(2)})`;

      var title = document.createElement( 'div' );
      title.className = 'title';
      title.textContent = table[i].title;
      element.appendChild( title );

      var image = document.createElement( 'img' );
      image.className = 'image';
      image.src = table[i].image_url;
      image.style = 'width: 300px; height: 180px';
      element.appendChild( image );

      var details = document.createElement( 'div' );
      details.className = 'url';
      details.innerHTML = table[i].url;
      element.appendChild( details );

      var details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = table[i].description;
      element.appendChild( details );

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

      object.position.setFromSphericalCoords( 800, phi, theta );

      vector.copy( object.position ).multiplyScalar( 2 );

      object.lookAt( vector );

      targets.sphere.push( object );

    }

    // grid

    for ( var i = 0; i < objects.length; i ++ ) {
      var object = new THREE.Object3D();

      object.position.x = ( ( i % 5 ) * 400 ) - 800;
      object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
      object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

      targets.grid.push( object );
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

    var button = document.getElementById( 'grid' );
    button.addEventListener( 'click', function () {

      transform( targets.grid, 2000 );

    }, false );

    transform( targets.sphere, 2000 );

    //

    window.addEventListener( 'resize', onWindowResize, true );

  }


        // function resizeCanvasToDisplaySize() {
        //   const canvas = renderer.domElement;
        //   // look up the size the canvas is being displayed
        //   const width = canvas.clientWidth;
        //   const height = canvas.clientHeight;
        //   console.log(canvas.clientWidth, canvas.clientHeight);

        //   // adjust displayBuffer size to match
        //   if (canvas.width !== width || canvas.height !== height) {
        //     // you must pass false here or three.js sadly fights the browser
        //     renderer.setSize(width, height, false);
        //     camera.aspect = width / height;
        //     camera.updateProjectionMatrix();

        //     // update any render target sizes here
        //   }
        // }


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
        // added in
        // resizeCanvasToDisplaySize();
        // renderer.render(scene, camera);

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

  }


      // function animate(time) {
      // time *= 0.001;  // seconds

      // resizeCanvasToDisplaySize();

      // mesh.rotation.x = time * 0.5;
      // mesh.rotation.y = time * 1;

      // renderer.render(scene, camera);
      // requestAnimationFrame(animate);
      // }


  function render() {
    renderer.render( scene, camera );
  }

}
}
// async code
// getArticles().then(data => {
//   console.log(data[1].content);
//   create3Dglobe(data);
// });
