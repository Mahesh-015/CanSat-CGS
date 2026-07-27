// ==========================================
// CanSat Ground Control Station
// orientation.js
// ==========================================

// ------------------------------------------
// Scene
// ------------------------------------------

const scene = new THREE.Scene();

scene.background = null;


// ------------------------------------------
// Camera
// ------------------------------------------

const camera = new THREE.PerspectiveCamera(

    60,

    1,

    0.1,

    1000

);

camera.position.set(2.5, 2.5, 3.5);

camera.lookAt(0, 0, 0);


// ------------------------------------------
// Renderer
// ------------------------------------------

const renderer = new THREE.WebGLRenderer({

    antialias: true,

    alpha: true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(350, 350);

document
    .getElementById("orientation-view")
    .appendChild(renderer.domElement);


// ------------------------------------------
// Lights
// ------------------------------------------

const ambientLight = new THREE.AmbientLight(

    0xffffff,

    1.0

);

scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(

    0xffffff,

    1.5

);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);


// ------------------------------------------
// Grid
// ------------------------------------------

const grid = new THREE.GridHelper(

    4,

    8,

    0x00E5FF,

    0x444444

);

scene.add(grid);


// ------------------------------------------
// Coordinate Axes
// ------------------------------------------

const axes = new THREE.AxesHelper(2);

scene.add(axes);


// ------------------------------------------
// CanSat Body
// ------------------------------------------

const geometry = new THREE.BoxGeometry(

    0.8,

    0.4,

    1.2

);

const material = new THREE.MeshPhongMaterial({

    color: 0x00E5FF,

    shininess: 80

});

const cube = new THREE.Mesh(

    geometry,

    material

);

scene.add(cube);


// ------------------------------------------
// Direction Arrow
// ------------------------------------------

const arrowGeometry = new THREE.ConeGeometry(

    0.15,

    0.35,

    20

);

const arrowMaterial = new THREE.MeshPhongMaterial({

    color: 0xFF0000

});

const arrow = new THREE.Mesh(

    arrowGeometry,

    arrowMaterial

);

arrow.position.z = 0.75;

arrow.rotation.x = Math.PI / 2;

cube.add(arrow);


// ------------------------------------------
// Animation
// ------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();


// ==========================================
// Update Orientation
// ==========================================

function updateOrientation(roll, pitch, yaw) {

    cube.rotation.x = THREE.MathUtils.degToRad(pitch);

    cube.rotation.y = THREE.MathUtils.degToRad(yaw);

    cube.rotation.z = THREE.MathUtils.degToRad(roll);

}


// ==========================================
// Reset Orientation
// ==========================================

function resetOrientation() {

    cube.rotation.set(

        0,

        0,

        0

    );

}


// ==========================================
// Resize Viewer
// ==========================================

window.addEventListener("resize", () => {

    const container = document.getElementById("orientation-view");

    const width = container.clientWidth || 350;

    const height = 350;

    renderer.setSize(width, height);

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

});


// ==========================================
// Console
// ==========================================

console.log("Orientation Module Loaded");
