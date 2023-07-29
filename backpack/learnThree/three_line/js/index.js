const renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
// 设置相机位置
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();
// 定义材质
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// 定义顶点 geometry (几何体);
const points = [];
// 设置向量
points.push(new THREE.Vector3(-50, 10, 0));
points.push(new THREE.Vector3(-30, 10, 0));
points.push(new THREE.Vector3(-10, 10, 0));
points.push(new THREE.Vector3(0, 20, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(30, 0, 0));
points.push(new THREE.Vector3(50, 0, 0));
// 带有一些顶点的几何体
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// 显示连续在每一对顶点之间, 而不是在第一个和最后一个顶点之间绘制线条

// 将点和材质组合起来
const line = new THREE.Line(geometry, material);

// 将线添加到场景里面
scene.add(line);
renderer.render(scene, camera);
