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
      <TresGroup>
        <TresMesh
          @click="openInfo(item[1].country)"
          @pointer-enter="pointerEnterHandler"
          @pointer-leave="pointerLeaveHandler"
          v-always-look-at="new THREE.Vector3(0, 0, 0)"
          v-for="(item, i) in countryInfoMap"
          :key="i"
          :position="setPosition(item[1].cooradinates)"
          :scale="pointScale"
        >
          <TresCircleGeometry :args="[0.015, 32]" />
          <TresMeshBasicMaterial
            :transparent="true"
            :opacity="pointOpacity"
            :color="0xff474c"
            :side="THREE.DoubleSide"
          />
        </TresMesh>
      </TresGroup>
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

type CustomMeshType = THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> & {
  countryName?: keyof typeof CountryEnum;
};

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
let earth: any = null;
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
let star: any = null;
let cloud: any = null;
let countryName = new THREE.Group();
let pointGroup = new THREE.Group();
let glow: any = null;

// 地球渲染
const getEarthMesh = () => {
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: loader.load('/img/earth4.jpg'),
    blending: THREE.AdditiveBlending
  });

  return new THREE.Mesh(geometry, earthMaterial);
};
earth = getEarthMesh();
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
star = getStarfield({ numStars: 2500 });

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
cloud = getCloudMesh();
cloud.scale.setScalar(1.009);

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
glow = getFresnelMat();
glow.scale.setScalar(1.01);

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
  countryName.add(createCountryNameMesh(CountryEnum[country.country], country.cooradinates));
});

// 閃爍動畫設定
const pointOpacity = ref(1);
const pointScale = ref(1);

const pointShineAnimation = () => {
  if (pointOpacity.value > 0) {
    pointOpacity.value = Number((pointOpacity.value - 0.02).toFixed(2));
  } else {
    pointOpacity.value = 1;
  }

  if (pointScale.value < 2) {
    pointScale.value += 0.02;
  } else {
    pointScale.value = 1;
  }
};

const animate = () => {
  onLoop(() => {
    cloudAnimation();
    pointShineAnimation();
  });
};

animate();

const openInfo = useDebounce((countryName: string) => {
  router.push({
    path: '/Hotels',
    query: {
      countryName
    }
  });
});

const pointerEnterHandler = useDebounce(() => {
  let canvas: HTMLCanvasElement | null = document.querySelector('.canvas');
  if (canvas) {
    canvas.style.cursor = 'pointer';
  }

  canvas = null;
}, 10);

const pointerLeaveHandler = useDebounce((e) => {
  let canvas: HTMLCanvasElement | null = document.querySelector('.canvas');
  if (canvas) {
    canvas.style.cursor = 'auto';
  }

  canvas = null;
}, 10);
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
