import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Cube extends THREE.Mesh {
  constructor(color) {
    super()
    this.geometry = new THREE.BoxGeometry()
    this.material = new THREE.MeshBasicMaterial({ color: color })
    this.cubeSize = 0
    this.cubeActive = false
  }

  render() {
    this.rotation.x = this.rotation.y += 0.01
  }

  onResize(width, height, aspect) {
    this.cubeSize = width / 9 // 1/5 of the full width
    this.scale.setScalar(this.cubeSize * (this.cubeActive ? 2 : 1))
  }

  /*onPointerOver(e) {
    this.material.color.set('blue')
    //this.material.color.convertSRGBToLinear()
  }

  onPointerOut(e) {
    this.material.color.set( 'red' )
    this.material.color.convertSRGBToLinear()
  }*/

  onClick(e) {
    this.cubeActive = !this.cubeActive
    this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
  }
}

// state
let width = 0
let height = 0
let intersects = []
let hovered = {}

let controls;

// setup
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x4fb9c9 );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// controls
controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = false;
controls.minDistance = 4;
controls.maxDistance = 10;
//controls.maxPolarAngle = Math.PI / 2;
//

// view
const be1 = new Cube('black')
be1.position.set(-2, 0, 0)
const be2 = new Cube('yellow')
be2.position.set(0, 0, 0)
const be3 = new Cube('red')
be3.position.set(2, 0, 0)
scene.add(be1)
scene.add(be2)
scene.add(be3)

/*
const fr1 = new Cube('blue')
fr1.position.set(2, 0, -4)
const fr2 = new Cube('white')
fr2.position.set(2, 0, -2)

scene.add(fr1)
scene.add(fr2)
*/


const ambientLight = new THREE.AmbientLight()
const pointLight = new THREE.PointLight()
pointLight.position.set(10, 10, 10)
scene.add(ambientLight)
scene.add(pointLight)

// responsive
function resize() {
  width = window.innerWidth
  height = window.innerHeight
  camera.aspect = width / height
  const target = new THREE.Vector3(0, 0, 0)
  const distance = camera.position.distanceTo(target)
  const fov = (camera.fov * Math.PI) / 180
  const viewportHeight = 2 * Math.tan(fov / 2) * distance
  const viewportWidth = viewportHeight * (width / height)
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  scene.traverse((obj) => {
    if (obj.onResize) obj.onResize(viewportWidth, viewportHeight, camera.aspect)
  })
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

/*window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    // Call onClick
    if (hit.object.onClick) hit.object.onClick(hit)
  })
})*/

// render-loop, called 60-times/second
function animate(t) {
  controls.update(); //
  requestAnimationFrame(animate)
  scene.traverse((obj) => {
    if (obj.render) obj.render(t)
  })
  renderer.render(scene, camera)
}

animate()
