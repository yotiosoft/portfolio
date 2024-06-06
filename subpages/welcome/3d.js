import * as THREE from 'three';

window.addEventListener('load', () => {
    const width = 300;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animate );

    const geometry_yellow = new THREE.BoxGeometry(1, 2.5, 0.1);
    const material_yellow = new THREE.MeshBasicMaterial({ color: 0xfff200 });
    const wall_yellow = new THREE.Mesh(geometry_yellow, material_yellow);
    wall_yellow.position.set(-0.5, 0, 0);
    scene.add(wall_yellow);

    const geometry_green = new THREE.BoxGeometry(1, 2, 0.1);
    const material_green = new THREE.MeshBasicMaterial({ color: 0x23b14b });
    const wall_green = new THREE.Mesh(geometry_green, material_green);
    wall_green.position.set(-0.25, 0, 0.5);
    scene.add(wall_green);

    const geometry_red = new THREE.BoxGeometry(1, 1.5, 0.1);
    const material_red = new THREE.MeshBasicMaterial({ color: 0xed2324 });
    const wall_red = new THREE.Mesh(geometry_red, material_red);
    wall_red.position.set(0, 0, 1);
    scene.add(wall_red);

    const geometry_blue = new THREE.BoxGeometry(1, 1, 0.1);
    const material_blue = new THREE.MeshBasicMaterial({ color: 0x00a2e8 });
    const wall_blue = new THREE.Mesh(geometry_blue, material_blue);
    wall_blue.position.set(0.25, 0, 1.5);
    scene.add(wall_blue);

    camera.position.z = 5;

    function animate() {

        wall_yellow.rotation.y += 0.01;
        wall_green.rotation.y += 0.01;
        wall_red.rotation.y += 0.01;
        wall_blue.rotation.y += 0.01;

        renderer.render( scene, camera );

    }
});
