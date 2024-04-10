<!--
 * @Author: lwk
 * @Date: 2024-01-17 10:20:09
 * @LastEditors: lwk
 * @LastEditTime: 2024-02-05 21:00:27
 * @Description: 请填写简介
-->
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { onMounted } from "vue";
import dat from 'dat.gui'
import { version } from "vue";
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


// 创建一个三维向量
const vector = new THREE.Vector3(1,1,1)
console.log(vector,'99');


// 创建立方体
const geometry = new THREE.BoxGeometry(1,1,1)

// 创建材质
const material = new THREE.MeshBasicMaterial(
{
color:0x00ff00,
}
)
// 创建网格将材质和几何体整合一起
const cube =  new THREE.Mesh(geometry,material)
cube.position.set(0,3,0)
scene.add(cube)
cube.position.add(vector)
// 添加坐标辅助线
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// cube.scale = new THREE.Vector3(1,1,1) // 这种写法是错误的，属性是只读的。
// cube.scale.set(1,2,1) // 缩放
// cube.translateX(3) // 平移
cube.rotation.x  = Math.PI / 99999;
// cube.rotation.set(Math.PI / 3, 0, 0)
// 显示与隐藏
// cube.visible =false
// 多个cube
// const cubeA = new THREE.Mesh( geometry, material );
// cubeA.position.set( 10, 5, 0 );

// const cubeB = new THREE.Mesh( geometry, material );
// // cubeB.position.set( -100, -100, 0 );

// //create a group and add the two cubes
// //These cubes can now be rotated / scaled etc as a group
// const group = new THREE.Group();
// group.add( cubeA );
// group.add( cubeB );
// console.log(group,'group');

// scene.add( group )
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
    // cube.rotation.x += controlData.rotationSpeed
    material.wireframe = controlData.wireframe
    cube.material.color =new THREE.Color(controlData.color)
    controls.update();
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera);

  }
  animate();
});
</script>

<template>
  <div id="container">
  </div>
</template>

<style>
#gui {
position: absolute;
width: 300px;
right: 0;  

}
</style>
