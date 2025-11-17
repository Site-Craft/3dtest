// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
// Add the canvas to the HTML body
document.body.appendChild(renderer.domElement);

// Add lighting (models are black without light)
scene.add(new THREE.AmbientLight(0xffffff, 0.8)); // Overall soft light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7); // Position the light source
scene.add(directionalLight);

// Set the background color
scene.background = new THREE.Color(0xdddddd);

// Initialize the GLTF Loader
const loader = new THREE.GLTFLoader();
let carModel; // Variable to hold the loaded model

// Load your 'car.glb' model
loader.load(
    // The path to your model file
    'car.glb', 
    
    // Success callback function
    function (gltf) {
        carModel = gltf.scene;
        scene.add(carModel);
        
        // Optional: Center the model in the scene (important for proper viewing)
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);

        console.log('car.glb loaded successfully!');
    },
    
    // Progress callback (optional)
    undefined, 
    
    // Error callback
    function (error) {
        console.error('Error loading car.glb:', error);
    }
);

// Position the camera back from the center
camera.position.z = 5;

// Animation/Render Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Optional: Rotate the car slightly on the Y-axis so you can see it spinning
    if (carModel) {
        carModel.rotation.y += 0.005; 
    }
    
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
