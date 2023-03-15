import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();

//perspective camera mimics how the human eye sees things
//arguments: FOV, aspect ratio(browser ratio), view frustrum(what is visible to the camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
//full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
//draws the scene through the camera perspective
renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10,3,16,100);
//mesh standard: reacts to light
//mesh basic: simply the vertices
const material =  new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

//continuous loop recursive function
//updates scene constantly, re-renders
function animate() {
  //tells the browser you want to perform an animation
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();