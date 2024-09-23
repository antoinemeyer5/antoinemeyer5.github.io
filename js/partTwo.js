import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Cube } from "./cube.js";

// state
let width = 0
let height = 0
let intersects = []
let hovered = {}

// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xe6ddcf );

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 14

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

// raycaster
const raycaster = new THREE.Raycaster()

// mouse
const mouse = new THREE.Vector2()

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = false;
//controls.minDistance = 2;
//controls.maxDistance = 6;
controls.domElement.focus = null;

// center
const center_x = 0;
const center_y = -5;
const center_z = 0;

// bottom bar - border
const bottombar_border_left = new Cube(new THREE.BoxGeometry(1, 4, 1), 'black', null);
bottombar_border_left.position.set(center_x-9.5, center_y-1.5, center_z);
scene.add(bottombar_border_left);

const bottombar_border_right = new Cube(new THREE.BoxGeometry(1, 4, 1), 'black', null);
bottombar_border_right.position.set(center_x+9.5, center_y-1.5, center_z);
scene.add(bottombar_border_right);

const bottombar_border_top = new Cube(new THREE.BoxGeometry(18, 1, 1), 'black', null);
bottombar_border_top.position.set(center_x, center_y, center_z);
scene.add(bottombar_border_top);

const bottombar_border_bottom = new Cube(new THREE.BoxGeometry(18, 1, 1), 'black', null);
bottombar_border_bottom.position.set(center_x, center_y-3, center_z);
scene.add(bottombar_border_bottom);

// heart - border
const border_heart = new THREE.Group();

const heart_bottom = new Cube(new THREE.BoxGeometry(2, 1, 1), 'black', null);
heart_bottom.position.set(center_x, center_y+2, center_z);
border_heart.add( heart_bottom );

// heart bottom diagonal left and right
for (let i = 0; i < 4; i++) {
  const cube_left = new Cube(new THREE.BoxGeometry(1, 1, 1), 'black', null);
  cube_left.position.set(center_x-(1*(i+1))-0.5, center_y+3+i, center_z);
  border_heart.add( cube_left );

  const cube_right = new Cube(new THREE.BoxGeometry(1, 1, 1), 'black', null);
  cube_right.position.set(center_x+(1*(i+1))+0.5, center_y+3+i, center_z);
  border_heart.add( cube_right );
}

// heart vertical sides
const heart_side_left = new Cube(new THREE.BoxGeometry(1, 3, 1), 'black', null);
heart_side_left.position.set(center_x-5.5, center_y+8, center_z);
border_heart.add(heart_side_left);
const heart_side_right = new Cube(new THREE.BoxGeometry(1, 3, 1), 'black', null);
heart_side_right.position.set(center_x+5.5, center_y+8, center_z);
border_heart.add(heart_side_right);

// heart little top
const heart_little_top_left = new Cube(new THREE.BoxGeometry(1, 1, 1), 'black', null);
heart_little_top_left.position.set(center_x-4.5, center_y+10, center_z);
border_heart.add(heart_little_top_left);
const heart_little_top_right = new Cube(new THREE.BoxGeometry(1, 1, 1), 'black', null);
heart_little_top_right.position.set(center_x+4.5, center_y+10, center_z);
border_heart.add(heart_little_top_right);

// heart top
const heart_top_left = new Cube(new THREE.BoxGeometry(3, 1, 1), 'black', null);
heart_top_left.position.set(center_x-2.5, center_y+11, center_z);
border_heart.add(heart_top_left);
const heart_top_right = new Cube(new THREE.BoxGeometry(3, 1, 1), 'black', null);
heart_top_right.position.set(center_x+2.5, center_y+11, center_z);
border_heart.add(heart_top_right);
const heart_top_mid = new Cube(new THREE.BoxGeometry(2, 1, 1), 'black', null);
heart_top_mid.position.set(center_x, center_y+10, center_z);
border_heart.add(heart_top_mid);

scene.add( border_heart );

////////////////////////////////////////////////////////////////////////////////

const red_heart = new THREE.Group();

// enigme number 1 - 12 octobre
// bar
const oct_12_b = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xffffff, '10_octobre/12.html');
oct_12_b.position.set(center_x-8, center_y-1.5, center_z);
scene.add(oct_12_b);
// heart
const oct_12_h_1 = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
oct_12_h_1.position.set(center_x, center_y+4, center_z);
red_heart.add( oct_12_h_1 );
const oct_12_h_2 = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
oct_12_h_2.position.set(center_x-1, center_y+5, center_z);
red_heart.add( oct_12_h_2 );

// enigme number 2 -
// bar
const XXXXX = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xffbcbc, '10_octobre/18.html');
XXXXX.position.set(center_x-6, center_y-1.5, center_z);
scene.add(XXXXX);
// heart
// TODO

scene.add( red_heart );

////////////////////////////////////////////////////////////////////////////////

// responsive
function resize() {
  width = window.innerWidth
  height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

window.addEventListener('resize', resize)
resize()

// events
window.addEventListener('pointermove', (e) => {
  mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  intersects = raycaster.intersectObjects(scene.children, true)

  // If a previously hovered item is not among the hits we must call onPointerOut
  Object.keys(hovered).forEach((key) => {
    const hit = intersects.find((hit) => hit.object.uuid === key)
    if (hit === undefined) {
      const hoveredItem = hovered[key]
      if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
      delete hovered[key]
    }
  })

  intersects.forEach((hit) => {
    // If a hit has not been flagged as hovered we must call onPointerOver
    if (!hovered[hit.object.uuid]) {
      hovered[hit.object.uuid] = hit
      if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
    }
    // Call onPointerMove
    if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
  })
})

window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    // Call onClick
    if (hit.object.onClick) hit.object.onClick(hit)
  })
})

// render-loop, called 60-times/second
function animate(t) {
  controls.update(); //
  requestAnimationFrame(animate)
  red_heart.rotation.y += 0.01
  border_heart.rotation.y -= 0.005
  /*scene.traverse((obj) => {
    if (obj.render) obj.render(t)
  })*/
  renderer.render(scene, camera)
}

animate()
