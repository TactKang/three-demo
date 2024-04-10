<!--
 * @Author: lwk
 * @Date: 2024-01-17 10:20:09
 * @LastEditors: lwk
 * @LastEditTime: 2024-03-23 20:07:05
 * @Description: 请填写简介
-->
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted } from "vue";
import dat from 'dat.gui'
// 创建gui控制对象
const controlData = {
  rotationSpeed:0.01,
  color:'#66ccff',
  wireframe:false,
  envMap:'无'
}
// 创建实例
const gui = new dat.GUI()
const f = gui.addFolder('配置')
f.add(controlData,'rotationSpeed').min(0.01).max(0.1).step(0.01)
// 颜色选择器
f.addColor(controlData,'color')
// 下拉列表
f.add(controlData,'envMap',['无','全反射','漫反射'])
// checkbox
f.add(controlData,'wireframe')

f.domElement.id = 'gui'
f.open()



// 创建场景
const scene = new THREE.Scene();
// 添加背景色
// scene.background = new THREE.Color(0x666666)
// 添加雾
// scene.fog = new THREE.Fog(0xcccccc, 10, 15);
// 添加背景图片
//  scene.background =  new THREE.CubeTextureLoader().setPath('/').load(['ocean2.png','ocean2.png','ocean2.png','ocean2.png','ocean2.png','ocean2.png'])
// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.y = 5;
camera.position.z = 10;

// 创建矩形
const geometry = new THREE.PlaneGeometry(3,3)
console.log(geometry,'--------------------------------');

// 创建纹理
const texture =  new THREE.TextureLoader().load('/textures/tree2.png')
// 定义UV像素的取值范围,左上 右上 左下 右下
const uv =  new Float32Array([
  0,0.5,
  0.5,0.5,
  0,0,
  0.5,0
])
geometry.attributes.uv = new THREE.BufferAttribute(uv,2)
// 创建基础网格材质
const material =  new THREE.MeshBasicMaterial({
  map:texture
})
// 创建网格将材质和几何体整合一起
const cube =  new THREE.Mesh(geometry,material)
scene.add(cube)
// 创建立体纹理
// const cubeTexture = new THREE.CubeTextureLoader().setPath('/textures/').load(['ocean2.png','ocean2.png','ocean2.png','ocean2.png','ocean2.png','ocean2.png'])
// 添加纹理
// scene.background = cubeTexture
// // 创建立方体
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // 赋予材质
// const material = new THREE.MeshBasicMaterial(
// { 
//   // color: 0x00ff00,
//   map:texture, // 纹理  
// }
// );

// // 创建一个球体
// const sphere = new THREE.SphereGeometry( 1 );
// const material = new THREE.MeshBasicMaterial(
// { 
//   // color: 0x00ff00,
//   envMap:cubeTexture, // 纹理
// })
// 网格
// const cube = new THREE.Mesh(geometry, material);
// 球体网格
// const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
// const vertices = new Float32Array( [
// 	-1.0, -1.0,  1.0,
// 	 1.0, -1.0,  1.0,
// 	 1.0,  1.0,  1.0,

// 	//  1.0,  1.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	// -1.0, -1.0,  1.0
// ] );

// itemSize = 3 因为每个顶点都是一个三元组。
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

// 另一种方式，首先确认几何体的顶点
// 利用索引来确认几何体的绘制方式
// const indexs=  new Uint16Array([
// 0,1,2,2,3,0
// ])
// geometry.index = new THREE.BufferAttribute(indexs,1)
  
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000,side: THREE.DoubleSide } );
// const cube = new THREE.Mesh( geometry, material );
// const cube = new THREE.Mesh(sphere, material);
// cube.position.set(1, 1, 1);
// scene.add(cube);
function moveCamera() {
  camera.position.y = 15;
  camera.position.x = 10;
  camera.lookAt(0,3,0)
}
function moveCube() {
  camera.position.y = 15;
  camera.position.x = 10;
  camera.lookAt(10,10,10)
}

onMounted(() => {
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  // 调整渲染器窗口大小
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(1200, 1200);
  // 将gui添加到页面
  document.getElementById('container')?.appendChild(f.domElement)
  // 将渲染器添加到页面
  document.getElementById("container")?.appendChild(renderer.domElement);
  // 添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 监听轨道控制器
  // controls.addEventListener('change',function() {
  //   console.log('触发');
  // })
  // 添加阻尼效果
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  // controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  // 最大垂直方向旋转度
  // controls.maxPolarAngle = 1
  // 添加坐标轴
  // const axesHelper  =  new THREE.AxesHelper( 5 );
  // axesHelper.position.y = 3
  // scene.add(axesHelper)
  // 进行渲染
  // renderer.render(scene,camera)

  // 让立方体动起来
  function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    cube.rotation.x += controlData.rotationSpeed
    material.wireframe = controlData.wireframe
    cube.material.color =new THREE.Color(controlData.color)
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
</script>

<template>
  <div id="container">
    <button style="width: 100px;height: 20px;" @click="moveCamera">移动相机</button>
    <button style="width: 100px;height: 20px;" @click="moveCube">移动物体</button>
  </div>
</template>

<style>
#gui {
position: absolute;
width: 300px;
right: 0;  

}
</style>
