<template>
  <div>
    <TresCanvas ref="canvas" window-size clear-color="#000" class="canvas" style="position: absolute; top: 0; left: 0">
      <!-- :fov="fov" -->
      <TresPerspectiveCamera :fov="fov" ref="camera" />
      <!-- OrbitControls 自由旋轉攝影機 -->
      <primitive :object="star" />
      <primitive :object="earth" />
      <primitive :object="cloud" :rotation-y="cloudRotationY" />
      <primitive :object="glow" />
      <primitive
        :object="point"
        :scale="scaleValue"
        v-always-look-at="new THREE.Vector3(0, 0, 0)"
        v-for="(position, i) in countryInfoMap"
        :key="i"
        :position="setPosition(position[1].cooradinates)"
        @click="openInfo(position[1].country)"
        @pointer-enter="pointerEnterHandler"
        @pointer-leave="pointerLeaveHandler"
      />
      <primitive :object="countryName" />
      <primitive :object="hemiLight" />
      <OrbitControls />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { vAlwaysLookAt } from '@tresjs/cientos';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import helvetikerRegular from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import { CountryEnum } from './enums/earth';

const router = useRouter();

const { useHotel } = useStore();
const hotelStore = useHotel();
const { allHotels } = storeToRefs(hotelStore);
const { getAllHotels } = hotelStore;
await getAllHotels();

const { onLoop, resume, pause } = useRenderLoop();

const { isDesktop } = useDevice();
const loader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(1, 600, 600);

// 不同版型鏡頭初始遠近調整
const fov = ref(0);
const handleFovResize = async () => {
  if (isDesktop) {
    fov.value = 25;
  } else {
    fov.value = 50;
  }
};

handleFovResize();

// all scene
const earth = ref();
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
const star = ref();
const cloud = ref();
const countryName = ref(new THREE.Group());
const point = ref();
const glow = ref();

// 地球渲染
const getEarthMesh = () => {
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: loader.load('/img/earth4.jpg'),
    blending: THREE.AdditiveBlending
    // transparent: true
    // opacity: 0.3
  });

  return new THREE.Mesh(geometry, earthMaterial);
};
earth.value = getEarthMesh();
// 背景星空渲染
const getStarfield = ({ numStars = 500 } = {}) => {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius
    };
  }
  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load('/img/circle.png')
  });
  const points = new THREE.Points(geo, mat);
  return points;
};
star.value = getStarfield({ numStars: 2500 });

// 雲層
const getCloudMesh = () => {
  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: loader.load('/img/earthcloudmap.jpg'),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Mesh(geometry, cloudMaterial);
};
// earthcloudmaplight
cloud.value = getCloudMesh();
cloud.value.scale.setScalar(1.009);

// 雲層流動動畫
const cloudRotationY = ref(0);
const cloudAnimation = () => {
  cloudRotationY.value += 0.0005;
};

// 光圈特效
const getFresnelMat = ({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) => {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 }
  };
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;
  const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending
    // wireframe: true,
  });

  return new THREE.Mesh(geometry, fresnelMat);
};
glow.value = getFresnelMat();
glow.value.scale.setScalar(1.01);

// 地球做標計算
const llaToEcef = (lat: number, lon: number, alt: number, rad: number) => {
  let f = 0;
  let ls = Math.atan((1 - f) ** 2 * Math.tan(lat));
  let x = rad * Math.cos(ls) * Math.cos(lon) + alt * Math.cos(lat) * Math.cos(lon);
  let y = rad * Math.cos(ls) * Math.sin(lon) + alt * Math.cos(lat) * Math.sin(lon);
  let z = rad * Math.sin(ls) + alt * Math.sin(lat);

  return new THREE.Vector3(x, y, z);
};
const lonLauToRadian = (lon: number, lat: number, rad = 50) =>
  llaToEcef((Math.PI * (0 - lat)) / 180, Math.PI * (lon / 180), 1, rad);

const setPosition = (coordinates: number[]) => {
  const position = lonLauToRadian(coordinates[0], coordinates[1], 0.01);
  return [position.x, -position.z, -position.y];
};

const countryInfoMap = computed(() => {
  const result = new Map<string, { country: keyof typeof CountryEnum; cooradinates: number[] }>();
  allHotels.value.forEach((hotel) => {
    if (!result.has(hotel.country)) {
      // setPosition([hotel.locations.coordinates[0], hotel.locations.coordinates[1]])
      result.set(hotel.country, {
        country: hotel.country as keyof typeof CountryEnum,
        cooradinates: hotel.locations.coordinates
      });
    }
  });

  return result;
});

// 創建標記點
const createPointMesh = () => {
  const geo = new THREE.CircleGeometry(0.015, 32);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff474c, side: THREE.DoubleSide, transparent: true });
  const point = new THREE.Mesh(geo, mat);
  console.log(point.material);
  return point;
};

point.value = createPointMesh();

// 國家名
const createCountryNameMesh = (text: string, position: number[]) => {
  const loader2 = new FontLoader();
  const font = loader2.parse(helvetikerRegular);
  const geometryCountryName = new TextGeometry(`${text}`, {
    font,
    size: 0.03,
    depth: 0.001
  });

  geometryCountryName.center();
  geometryCountryName.rotateY(Math.PI);

  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(geometryCountryName, mat);
  const getPosition = setPosition([position[0], position[1] - 3]);
  textMesh.position.x = getPosition[0];
  textMesh.position.y = getPosition[1];
  textMesh.position.z = getPosition[2];

  textMesh.lookAt(new THREE.Vector3(0, 0, 0));
  return textMesh;
};

countryInfoMap.value.forEach((country, i) => {
  countryName.value.add(createCountryNameMesh(CountryEnum[country.country], country.cooradinates));
});
// 閃爍動畫設定
const opacity = ref(1);
const scaleValue = ref(1.01);
const pointShineAnimation = () => {
  if (opacity.value > 0) {
    opacity.value = Number((opacity.value - 0.02).toFixed(2));
    point.value.material.opacity = opacity.value;
  } else {
    opacity.value = 1;
    point.value.material.opacity = opacity.value;
  }

  if (scaleValue.value < 2) {
    scaleValue.value += 0.02;
  } else {
    scaleValue.value = 1;
  }
};
// 啟動閃爍動畫

// 設定座標
// const ringPositionAry = [
//   [120.6667, 24.15],
//   [-71.0846, 42.3188]
// ];

// 線條動畫
// const linePoints = [new THREE.Vector3(0, 0, 0)];
// const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
// const getLineMesh = () => {
//   const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

//   return new THREE.Line(lineGeometry, material);
// };

// line.value = getLineMesh();

// function updateLine() {
//   const speed = 0.01;
//   // 慢慢增加線的長度
//   length += speed;

//   let newPoint;
//   const angle = THREE.MathUtils.degToRad(70);
//   if (length <= 1.2) {
//     const x = length * Math.cos(angle);
//     const y = length * Math.sin(angle);
//     newPoint = new THREE.Vector3(x, y, 0);
//     // newPoint = new THREE.Vector3(length, 0, 0);
//   } else if (length <= 2.2) {
//     // 30px後線轉向
//     const x = 1.2 * Math.cos(angle) + (length - 1.2);
//     const y = 1.2 * Math.sin(angle);
//     newPoint = new THREE.Vector3(x, y, 0);
//   } else {
//     // 當超過60px停止
//     // pause();
//     return;
//   }

//   linePoints.push(newPoint);
//   lineGeometry.setFromPoints(linePoints);
// }

const animate = () => {
  resume();

  onLoop(({ delta, elapsed, clock }) => {
    cloudAnimation();
    pointShineAnimation();
  });
};

animate();

const canvas = ref();
const openInfo = useDebounce((countryName: string) => {
  router.push({
    path: '/Hotels',
    query: {
      countryName
    }
  });
});

const pointerEnterHandler = useDebounce((e: PointerEvent) => {
  if (e.target) {
    (e.target as HTMLCanvasElement).style.cursor = 'pointer';
  }
}, 10);

const pointerLeaveHandler = useDebounce((e) => {
  if (e.target) {
    (e.target as HTMLCanvasElement).style.cursor = 'auto';
  }
}, 10);

onUnmounted(() => {
  pause();
});
</script>

<style>
.canvas {
  width: 100%;
  height: 100%;
}
.tag {
  font-size: 80px;
  color: #fff;
  z-index: 1000000;
}
</style>
