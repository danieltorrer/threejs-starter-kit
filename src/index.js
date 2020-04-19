import {
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	PointLight,
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	DirectionalLight,
	MeshPhongMaterial
} from "three";

const container = document.body;
const renderer = new WebGLRenderer();

container.style.overflow = "hidden";
container.style.margin = 0;
container.appendChild(renderer.domElement);
renderer.setClearColor(0x3d3b33);

//
// Set camera

const fov = 75;
const near = 0.1;
const far = 5;
const camera = new PerspectiveCamera(
	fov,
	window.innerWidth / window.innerHeight,
	near,
	far
);
camera.position.z = 2;

//
// Scene

const scene = new Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new MeshPhongMaterial({ color: 0x44aa88 }); // #44aa88

renderer.render(scene, camera);

/* Various event listeners */
window.addEventListener("resize", onResize);

/**
  Resize canvas
*/
function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	composer.setSize(window.innerWidth, window.innerHeight);
}

//
// Lights

const color = 0xffffff;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function makeInstance(geometry, color, x) {
	const material = new MeshPhongMaterial({ color });

	const cube = new Mesh(geometry, material);
	scene.add(cube);

	cube.position.x = x;

	return cube;
}

const cubes = [
	makeInstance(geometry, 0x44aa88, 0),
	makeInstance(geometry, 0x8844aa, -2),
	makeInstance(geometry, 0xaa8844, 2)
];

function render(time) {
	time *= 0.001; // convert time to seconds

	cubes.forEach((cube, ndx) => {
		const speed = 1 + ndx * 0.1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	});

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

// onResize();
requestAnimationFrame(render);
