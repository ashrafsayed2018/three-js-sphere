import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import "./style.css"
import gsap from "gsap";



var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// scene 

const scene = new THREE.Scene();

// sphere 

const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
    color:"#00ff83",
    roughness:0.45
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// light 

const light =  new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0,10,10)
scene.add(light);

// camera 

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1,100)
camera.position.z = 20
scene.add(camera);

// render scene on screen

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width,sizes.height );
renderer.setPixelRatio(2)
renderer.render( scene ,camera);
document.body.appendChild(renderer.domElement);


// controls 
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotateSpeed = 5
// resize 

window.addEventListener("resize", () => {

    // update the width and height
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera 
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);

})


function loop() {
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}
loop();


// gsap timeline    

const tl = gsap.timeline({
    defaults: {
        duration: 1,
    }
});

tl.fromTo(mesh.scale,{z: 0, x: 0, y: 0},{z:1, x:1, y:1})
tl.fromTo("nav" , {y: "-100%"}, {y: "0%"})
tl.fromTo(".title" , {opacity: 0}, {opacity: 1});

// mouse animation color 

let mouseDown = false;

let rgb  = []

window.addEventListener("mousedown", () => mouseDown = true);
window.addEventListener("mouseup", () => mouseDown = false);

window.addEventListener("mousemove", (e) => {
    if(mouseDown) {

        rgb = [
            Math.round((e.pageX /sizes.width) * 255),
            Math.round((e.pageY /sizes.height) * 255),
            150
        ];
        
        // amiante with gsap
        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
        gsap.to(mesh.material.color, {
            r:newColor.r,
            g:newColor.g,
            b:newColor.b
        })
    }
})