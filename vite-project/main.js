import './style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

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
//mesh basic: simply the edges, no light source required
const material =  new THREE.MeshStandardMaterial({color:0xCC8899});
const torusKnot = new THREE.Mesh(geometry, material);

//must add everything to the scene to be rendered
scene.add(torusKnot);

//add light source
//point light emits in all directions, light a light bulb
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xfffff);
scene.add(ambientLight);

//helpers can show the position of light source and display a grid
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//orbit controls allow you to move around intuitively with mouse controls
//listens to dom events on the mouse and update camera position
const controls = new OrbitControls(camera, renderer.domElement);

//continuous loop recursive function
//updates scene constantly, re-renders
function animate() {
  //tells the browser you want to perform an animation
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.001
  torusKnot.rotation.y += 0.001

  controls.update();

  renderer.render(scene, camera);
}

animate();