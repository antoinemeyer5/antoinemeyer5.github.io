import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import { Cube } from "./cube.js";

// state
let width = 0
let height = 0
let intersects = []
let hovered = {}

// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xc7f2d2 );

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

// enigme number 1 - 5 novembre
// bar
const AAA = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xffffff, '11_novembre/5.html');
AAA.position.set(center_x-8, center_y-1.5, center_z);
scene.add(AAA);
// heart
const AAAaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
AAAaaa.position.set(center_x, center_y+4, center_z);
red_heart.add( AAAaaa );
const AAAbbb = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
AAAbbb.position.set(center_x-1, center_y+5, center_z);
red_heart.add( AAAbbb );

// enigme - 10 novembre
// bar
const BBB = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xffbcbc, '11_novembre/10.html');
BBB.position.set(center_x-6, center_y-1.5, center_z);
scene.add(BBB);
// heart
const BBBaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
BBBaaa.position.set(center_x-2, center_y+6, center_z);
red_heart.add( BBBaaa );
const BBBbbb = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
BBBbbb.position.set(center_x+1, center_y+5, center_z);
red_heart.add( BBBbbb );

// enigme - 15 novembre
// bar
const CCC = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff7f7f, '11_novembre/15.html');
CCC.position.set(center_x-4, center_y-1.5, center_z);
scene.add(CCC);
// heart
const CCCaaa = new Cube(new THREE.BoxGeometry(3, 1, 1), 'red', null);
CCCaaa.position.set(center_x+0.5, center_y+6, center_z);
red_heart.add( CCCaaa );

// enigme - 20 novembre
// bar
const DDD = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff4747, '11_novembre/20.html');
DDD.position.set(center_x-2, center_y-1.5, center_z);
scene.add(DDD);
// heart
const DDDaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
DDDaaa.position.set(center_x-3, center_y+7, center_z);
red_heart.add( DDDaaa );
const DDDbbb = new Cube(new THREE.BoxGeometry(1, 1, 1), 'red', null);
DDDbbb.position.set(center_x-3.5, center_y+8, center_z);
red_heart.add( DDDbbb );

// enigme - 25 novembre
// bar
const EEE = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff0000, '11_novembre/25.html');
EEE.position.set(center_x-0, center_y-1.5, center_z);
scene.add(EEE);
// heart
const EEEaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
EEEaaa.position.set(center_x-1, center_y+7, center_z);
red_heart.add( EEEaaa );
const EEEbbb = new Cube(new THREE.BoxGeometry(1, 1, 1), 'red', null);
EEEbbb.position.set(center_x-2.5, center_y+8, center_z);
red_heart.add( EEEbbb );

// enigme - 30 novembre
// bar
const FFF = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff0045, '11_novembre/30.html');
FFF.position.set(center_x+2, center_y-1.5, center_z);
scene.add(FFF);
// heart
const FFFaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
FFFaaa.position.set(center_x-2, center_y+9, center_z);
red_heart.add( FFFaaa );
const FFFbbb = new Cube(new THREE.BoxGeometry(1, 1, 1), 'red', null);
FFFbbb.position.set(center_x-1.5, center_y+8, center_z);
red_heart.add( FFFbbb );

// enigme - 5 decembre
// bar
const GGG = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff007c, '12_decembre/5.html');
GGG.position.set(center_x+4, center_y-1.5, center_z);
scene.add(GGG);
// heart
const GGGaaa = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
GGGaaa.position.set(center_x+1, center_y+7, center_z);
red_heart.add( GGGaaa );
const GGGbbb = new Cube(new THREE.BoxGeometry(1, 1, 1), 'red', null);
GGGbbb.position.set(center_x+2.5, center_y+6, center_z);
red_heart.add( GGGbbb );

// enigme - 10 decembre
// bar
const HHH = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff00b8, '12_decembre/10.html');
HHH.position.set(center_x+6, center_y-1.5, center_z);
scene.add(HHH);
// heart
const HHHaaa = new Cube(new THREE.BoxGeometry(3, 1, 1), 'red', null);
HHHaaa.position.set(center_x+0.5, center_y+8, center_z);
red_heart.add( HHHaaa );

// enigme - 15 decembre
// bar
const III = new Cube(new THREE.BoxGeometry(2, 2, 1), 0xff00e6, '12_decembre/15.html');
III.position.set(center_x+8, center_y-1.5, center_z);
scene.add(III);
// heart
const IIIaaa = new Cube(new THREE.BoxGeometry(2, 2, 1), 'red', null);
IIIaaa.position.set(center_x+3, center_y+7.5, center_z);
red_heart.add( IIIaaa );
const IIIbbb = new Cube(new THREE.BoxGeometry(2, 1, 1), 'red', null);
IIIbbb.position.set(center_x+2, center_y+9, center_z);
red_heart.add( IIIbbb );

scene.add( red_heart );

// letter O
let materials = [
  new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
  new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
];
const loader = new FontLoader();
loader.load( '/fonts/gentilis_bold.typeface.json', function ( font ) {

	const textGeo = new TextGeometry( 'O 3rtt3l', {
		font: font,
		size: 1,
		depth: 1,
		curveSegments: 2,
		bevelEnabled: true,
		bevelThickness: 0.02,
		bevelSize: 0.02,
		bevelOffset: 0.02,
		bevelSegments: 1
	} );

  textGeo.computeBoundingBox();

  const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

  let textMesh1 = new THREE.Mesh( textGeo, materials );

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = 2;
  textMesh1.position.z = -1;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  scene.add( textMesh1 );
} );

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
  //red_heart.rotation.y += 0.005
  border_heart.rotation.y -= 0.005
  renderer.render(scene, camera)
}

animate()
