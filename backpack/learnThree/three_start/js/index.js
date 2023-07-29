/**
 * 创建一个场景
 * 1. 需要创建 场景 相机 渲染器 这三个对象
 */

const scene = new THREE.Scene(); // 场景
const camera = new THREE.PerspectiveCamera( // PerspectiveCamera 透视相机
  // 视野角度 : 在显示器上能够看到的场景范围, 单位是角度
  85,
  // 长宽比 : 一个物体的宽 除以他的高
  window.innerWidth / window.innerHeight,
  // 近截面 near
  0.9,
  // 远截面 far
  1000
); // 相机

const renderer = new THREE.WebGLRenderer(); // 渲染器
// 设置渲染器尺寸
// 可以设置为一半降低性能消耗
// setSize第三个参数updateStyle设为false, 将以一般的分辨率渲染, 但是程序尺寸不变
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器的显示场景放到html
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(); // 创建几何体
const material = new THREE.MeshBasicMaterial({ color: 0x00ff20 }); // 添加材质
const cube = new THREE.Mesh(geometry, material); // 创建立方体 网格 几何体 mesh材质
scene.add(cube); // 物体被添加到(0,0,0) 坐标
// 为了避免物体和相机重叠, 移动一下相机
// z轴 值越小距离物体越近
// 调节相机位置 可以从不同角度看见物体
camera.position.z = 6;
// camera.position.x = 1;
// camera.position.y = 1;

// 循环渲染
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
