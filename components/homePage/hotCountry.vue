<template>
  <section class="h-screen w-screen bg-white relative z-[100] pt-[6.5rem]" ref="scrollWrap">
    <div class="absolute top-0 left-[20%] z-1 h-full">
      <div class="h-full w-[1px] bg-black hidden lg:block" v-border></div>
    </div>
    <div class="bg-white relative left-0 z-10 flex items-center flex-col">
      <div class="h-[1px] w-full bg-black" v-border></div>
      <h2 class="lg:text-[3.4rem] text-[2rem] py-[1rem] whitespace-nowrap storke-text">
        <strong class="mr-[2rem]">熱門旅遊國家</strong>
        <strong class="mr-[2rem]">熱門旅遊國家</strong>
        <strong class="mr-[2rem]">熱門旅遊國家</strong>
        <strong class="mr-[2rem]">熱門旅遊國家</strong>
        <strong class="mr-[2rem]">熱門旅遊國家</strong>
      </h2>
      <div class="h-[0.5px] w-full bg-black" v-border></div>
    </div>
    <div class="flex h-[calc(100%-6.5rem)] py-[2.5rem]">
      <div class="w-[20%] h-full hidden md:block">
        <ul class="flex flex-col justify-between h-full">
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2.5rem] text-[1.5rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            台灣
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2.5rem] text-[1.5rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            日本
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2.5rem] text-[1.5rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            美國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2.5rem] text-[1.5rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            韓國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2.5rem] text-[1.5rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            法國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
        </ul>
      </div>
      <div class="w-[100%] lg:ml-[10%] ml-[5%] overflow-hidden">
        <ul class="flex flex-nowrap lg:w-[400%] w-[1100vw] h-full lg:translate-x-[10%] translate-x-[5%]">
          <!-- "w-[18vw] h-[18vw] -->
          <li
            v-for="(country, idx) in hotCountryMap"
            :key="idx"
            class="lg:w-[8%] lg:h-[20vw] w-[30vw] h-[80vw] bg-cover bg-center bg-no-repeat relative lg:mr-[3%] mr-[98%] mr-[7%] even:top-[6vw]"
            ref="countryList"
            @click="changeCardAnimation(country.id)"
            @mouseover="hvoerCard(country.id, 'on')"
            @mouseout="hvoerCard(country.id, 'leave')"
          >
            <!-- card front -->
            <div
              :class="[country.img, 'absolute top-0 left-0 lg:w-[20vw] w-[80vw] h-full z-20 rounded-[16px]']"
              ref="frontCard"
            >
              <p class="text-[1.8rem] text-white">{{ country.name }}</p>
              <!-- <img src="" alt="" /> -->
              <p>2000</p>
              <button></button>
            </div>
            <!-- card back -->
            <div
              :class="[
                'absolute lg:w-[20vw] w-[80vw] h-full z-10 bg-black rounded-[16px] duration-300 origin-bottom-left translate-x-[50px] translate-y-[20px] overflow-hidden'
              ]"
              ref="backCard"
            >
              <p class="text-white p-[15px]">
                {{ country.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHotel } from '@/store/hotel';
import { Hotel } from '@/model/hotel';
import { storeToRefs } from 'pinia';
import throttle from '@/utils/throttle';
import gsap from 'gsap';

const hotelStore = useHotel();

const { getAllHotels } = hotelStore;

const { allHotels } = storeToRefs(hotelStore);
getAllHotels();

interface HotCountry {
  id: number;
  name: string;
  products: Hotel[];
  description: string;
  img: string;
}

interface HotCountryMap {
  台灣: HotCountry;
  美國: HotCountry;
  日本: HotCountry;
  加拿大: HotCountry;
  韓國: HotCountry;
  中國: HotCountry;
}

const hotCountryMap = ref<HotCountryMap>({
  台灣: {
    id: 0,
    name: '台灣',
    products: [],
    description:
      'The Heart of Asia 旅行台灣 就是現在臺灣以高山聳立聞名國際，是個有名的『高山島嶼』。三千公尺以上的高山，比比皆是，而將近四千公尺的玉山，更是東北亞的第一高峰。也因地理資源的豐沛，臺灣擁有許多特殊地形及奇特的地理景觀。除了高山外，還有優美的海岸風光。北起擁有各類特殊海岸地形的東北角暨宜蘭海岸國家風景區、北海岸及觀音山國家風景區，沿途山青水秀、天藍海深，廣闊的海天視野乃是此段的特色。',
    img: 'bg-[url("/img/hotCountryTW.jpg")]'
  },
  美國: {
    id: 1,
    name: '美國',
    products: [],
    description:
      '美國的觀光景點非常豐富多樣，有紐約市的摩天大樓、萬家燈火，也有大峽谷和阿拉斯加的自然奇景，還有加州、佛羅里達、夏威夷陽光明媚的海灘。不論你想探索大城市、還是欣賞自然奇觀，在美國的留學期間，你絕對不會無聊。',
    img: 'bg-[url("/img/hotCountryAM.jpg")]'
  },
  日本: {
    id: 2,
    name: '日本',
    products: [],
    description:
      '日本旅遊觀光資訊。日本旅遊景點推薦。日本列島地處亞洲東部太平洋中，東西狹長，跨越亞寒帶和亞熱帶。日本四季分明，自然環境優美，旅遊資源豐富。日本的主要旅遊城市有東京、大阪、京都、橫濱、鐮倉、名古屋、奈良、神戶、廣島、福岡、北海道、沖繩等地。著名旅遊風景區和溫泉地有富士山、箱根、伊豆半島、日光、草津、南紀白濱、別府等地。',
    img: 'bg-[url("/img/hotCountryJP.jpg")]'
  },
  加拿大: {
    id: 3,
    name: '加拿大',
    products: [],
    description:
      '加拿大，全球面積第二大的國家，位於北美洲北部，擁有森林、冰川、瀑布、島嶼等豐富多樣的自然景觀。溫哥華，曾經的奧林匹克運動會舉辦地，通常可以作為旅行的中轉站，放慢腳步體會城市風光。多倫多因尼亞加拉大瀑布、楓葉大道和城市魅力被人熟知，世界七大奇景之一的尼亞加拉大瀑布是不可錯過的風景之一。蒙特利爾則是一個充滿浪漫藝術氣息的城市，可以沿著聖羅倫斯河漫步，拜訪下諾特丹聖母大教堂，也可以在6月舉辦的音樂節體驗到爵士音樂的魅力。加拿大更有廣闊的領土位於北極地區，西面是雄偉的高山，中部是廣闊的凍土，常常寸草難生，保留著自然的原始風貌，冬季夜晚還可以看到神奇的極光。',
    img: 'bg-[url("/img/hotCountryCA.jpg")]'
  },
  韓國: {
    id: 4,
    name: '韓國',
    products: [],
    description:
      '位於漢江之濱的首爾是韓國的首都，也是韓國的文化、經濟中心。韓國近一半的人口生活在包括首爾、仁川和京畿道在內的首都圈內[8]。首爾是座歷史悠久的古今並存的大都會，市中心保留著朝鮮王朝的四大宮殿（景福宮、德壽宮、昌德宮和昌慶宮）。其中昌德宮為聯合國教科文組織制定的世界文化遺產。昌德宮的後苑是典型的韓國古典園林。首爾另一處世界文化遺產宗廟是供奉朝鮮歷代國王牌位和舉行祭祀的地方。這裡很好地保留著韓國古老的祭禮、祭禮樂等傳統及習俗',
    img: 'bg-[url("/img/hotCountryKR.jpg")]'
  },
  中國: {
    id: 5,
    name: '中國',
    products: [],
    description:
      '上海的外灘、北京的萬里長城、杭州的西湖都是中國熱門的旅遊景點，但如果你愛看自然景觀的話，喜愛拍照，不妨離開觀光人潮的地方，來到九寨溝、西藏布達拉宮、四川海螺溝，這些地方會讓你驚訝大自然的美麗，讓人引不住要多拍幾張照片',
    img: 'bg-[url("/img/hotCountryCN.jpg")]'
  }
});
type CountryName = keyof HotCountryMap;

const setHotCountry = computed(() => {
  allHotels.value.forEach((hotel: Hotel) => {
    let name: CountryName = hotel.country;
    if (hotCountryMap.value[name]?.products?.length < 3) {
      hotCountryMap.value[name]?.products.push(hotel);
    }
  });
});

// horizational scrolling animation
let tl: GSAPTimeline | null = null; // scrollwrap水平捲動
let tl2: GSAPTimeline | null = null; // 卡片放大
let tl3: GSAPTimeline | null = null; // 卡片橫移

let scrollWrap = ref<HTMLElement | null>(null);
let countryList = ref(null);

let frontCard = ref<HTMLElement[] | null>(null);
let backCard = ref<HTMLElement[] | null>(null);

const device = useDevice();
// 橫向移動動畫
const horizatialScrollAnimation = () => {
  let countryListAry: HTMLElement[] = gsap.utils.toArray(countryList.value); // 國家卡片
  const endTimes = device.isMobile ? 2.5 : 1;
  let endPos = (scrollWrap.value?.offsetWidth as number) * endTimes || 100; // 水平捲動結束位置
  let end = `+=${endPos}`;

  tl = useScrollAnimation({
    pin: true,
    // snap: 1 / countryListAry.length,
    start: '+=5%',
    end,
    trigger: scrollWrap.value,
    scrub: 1
  });

  const xPercent = (device.isMobile ? -350 : -100) * countryListAry.length - 50;

  tl?.to(countryListAry, { xPercent });
  // tl2?.fromTo(backCard.value![0], { x: 0, y: 0 }, { x: 20, y: 20, duration: 0.3 }, '-=15%');
  // tl2?.fromTo(backCard.value![1], { x: 0, y: 0 }, { x: 20, y: 20, duration: 0.3 }, '-=30%');
  // tl2?.fromTo(backCard.value![2], { x: 0, y: 0 }, { x: 20, y: 20, duration: 0.3 }, '-=50%');
  // tl2?.fromTo(backCard.value![3], { x: 0, y: 0 }, { x: 20, y: 20, duration: 0.3 }, '-=50%');
  // tl2?.fromTo(backCard.value![4], { x: 0, y: 0 }, { x: 20, y: 20, duration: 0.3 }, '-=50%');
};

const isFlip = ref<number[]>([]); // 紀錄已經翻到背面的牌

// 換牌動畫
let flipCardTl = gsap.timeline();

// 翻到後面的牌
const changeCardAnimation = (idx: number) => {
  if (frontCard.value && backCard.value) {
    // let targetCard = isFlip.value.includes(idx) ? frontCard.value[idx] : backCard.value[idx];
    // let isBack = isFlip.value.includes(idx) ? frontCard.value[idx] : backCard.value[idx];

    flipCardTl.to(backCard.value[idx], {
      rotate: '50deg',
      x: '250px',
      duration: 0.1
    });

    flipCardTl.to(backCard.value[idx], {
      rotate: '0',
      x: '50px',
      y: '20px',
      zIndex: isFlip.value.includes(idx) ? 10 : 30,
      duration: 0.1
    });
  }

  if (!isFlip.value.includes(idx)) {
    isFlip.value.push(idx);
  } else {
    isFlip.value.splice(isFlip.value.indexOf(idx), 1);
  }
};

const hvoerCard = (idx: number, options: 'on' | 'leave') => {
  throttle(() => {
    if (frontCard.value && backCard.value) {
      let rotate = options === 'on' ? '5deg' : '0';

      flipCardTl.to(backCard.value[idx], {
        rotate,
        duration: 0.1,
        transformOrigin: 'left bottom'
      });
    }
  })();
};

onMounted(() => {
  horizatialScrollAnimation();
});

onBeforeUnmount(() => {
  tl?.kill();
  tl = null;
});
</script>
