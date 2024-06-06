import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.addEventListener('load', () => {
    const width = 150;
    const height = 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize( width, height );

    camera.position.z = 1.7;
    
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 2;
    directionalLight.position.set(0, 0, 6);
    scene.add(directionalLight);
    
    scene.background = new THREE.Color(0x273c75);

    const loader = new GLTFLoader();
    loader.load('/img/3d_icon.glb', function (gltf) {
        scene.add(gltf.scene);
        
        renderer.setAnimationLoop( animate );
        function animate() {
            gltf.scene.rotation.y += 0.03;
            renderer.render( scene, camera );
        }
    }, undefined, function (error) {
        console.error(error);
    });
});
