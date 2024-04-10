<!--
 * @Author: lwk
 * @Date: 2024-01-17 10:20:09
 * @LastEditors: lwk
 * @LastEditTime: 2024-01-31 16:11:10
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

// 创建立方体
const geometry = new THREE.BoxGeometry(1,1,1)
console.log(geometry,'--------------------------------');

// 创建材质
const material = new THREE.MeshPhongMaterial(
{
color:0x0099ff,
shininess:100 
}
)
// 创建网格将材质和几何体整合一起
const cube =  new THREE.Mesh(geometry,material)
cube.position.set(0,0.5,0)
// 箱子去接受光源
cube.receiveShadow = true
// 箱子去投射光源
cube.castShadow = true

scene.add(cube)

// 添加灯光
// 添加环境光
var ambient = new THREE.AmbientLight(0xffffff,1)
scene.add(ambient)
// 添加点光源
const light = new THREE.PointLight(0xffffff,100,100)
light.position.set(5,2,5);
light.castShadow = true;
scene.add(light)

const sqhereSize = 0.1
const pointLightHelper = new THREE.PointLightHelper(light,sqhereSize)
scene.add(pointLightHelper)

// 添加坐标辅助线
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
//创建地面
const meshfloor = new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshPhongMaterial({color:0x1B5E20}))
meshfloor.rotation.x -= Math.PI/2
// 地面同样设置去接受光源
meshfloor.receiveShadow = true
scene.add(meshfloor)


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
