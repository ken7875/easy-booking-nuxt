<template>
  <section class="lg:h-[100vh] h-auto w-full bg-white relative z-[100] pt-[6.5rem]" ref="scrollWrap">
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
    <div class="lg:flex lg:h-[calc(100%-4.5rem)] h-auto pt-[0.6rem] 2xl:pt-[1.5rem] px-[15px] lg:px-0">
      <airplaneSvg class="airplaneSvg w-[100px] h-[100px] translate-x-[-100%] hidden lg:block" />
      <div class="w-[20%] h-full hidden md:block">
        <!-- <client-only>
          <airplaneSvg />
        </client-only> -->
        <ul class="flex flex-col justify-between h-[90%]">
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            台灣
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            日本
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            美國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            韓國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
          <li
            class="group hover:scale-[1.2] transition-transform duration-500 lg:text-[2rem] lg:px-[3rem] px-[0.8rem] whitespace-nowrap cursor-pointer menuList"
          >
            法國
            <div
              class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
            ></div>
          </li>
        </ul>
      </div>
      <div class="w-[100%] lg:ml-[8%] overflow-hidden">
        <ul class="lg:flex lg:flex-nowrap lg:w-[400%] w-full h-full lg:translate-x-[10%]">
          <!-- "w-[18vw] h-[18vw] -->
          <li
            v-for="(country, idx) in hotCountryMap"
            :key="idx"
            class="lg:w-[8%] w-full lg:px-[20px] lg:relative lg:mr-[8%] lg:even:top-[16%] 2xl:even:top-[30%] mb-[80px] lg:mb-0"
            ref="countryList"
          >
            <div
              :class="[
                '2xl:w-full lg:absolute lg:w-[30vw] w-full z-10 rounded-[16px] duration-300 lg:translate-x-[50px] lg:flex'
              ]"
            >
              <h3 class="text-[3.5rem] mr-[10px] font-bold lg:self-end">{{ country.name }}</h3>
              <p class="text-[1.2rem]">{{ country.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Hotel } from '~~/model/hotel';
import gsap from 'gsap';
// import { CSSPlugin } from 'gsap-trial/CSSPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
// https://stackoverflow.com/questions/73917316/how-to-add-inline-svgs-in-a-nuxt3-vite-project
import airplaneSvg from '~~/assets/svg/airplane.svg?component';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type HotCountry = Pick<Hotel, 'name' | 'description' | 'images'> & { id: number };

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
    description:
      'The Heart of Asia 旅行台灣 就是現在臺灣以高山聳立聞名國際，是個有名的『高山島嶼』。三千公尺以上的高山，比比皆是，而將近四千公尺的玉山，更是東北亞的第一高峰。也因地理資源的豐沛，臺灣擁有許多特殊地形及奇特的地理景觀。除了高山外，還有優美的海岸風光。北起擁有各類特殊海岸地形的東北角暨宜蘭海岸國家風景區、北海岸及觀音山國家風景區，沿途山青水秀、天藍海深，廣闊的海天視野乃是此段的特色。',
    images: ['bg-[url("/img/hotCountryTW.jpg")]']
  },
  美國: {
    id: 1,
    name: '美國',
    description:
      '美國的觀光景點非常豐富多樣，有紐約市的摩天大樓、萬家燈火，也有大峽谷和阿拉斯加的自然奇景，還有加州、佛羅里達、夏威夷陽光明媚的海灘。不論你想探索大城市、還是欣賞自然奇觀，在美國的留學期間，你絕對不會無聊。紐約是一座令人驚嘆的城市，擁有壯觀的天際線、無窮無盡的觀光活動、豐富的歷史。不論你要欣賞百老匯演出、參觀博物館、漫步在歷史巷弄中、還是用餐小酌，紐約市應有盡有、老少咸宜',
    images: ['bg-[url("/img/hotCountryAM.jpg")]']
  },
  日本: {
    id: 2,
    name: '日本',
    description:
      '日本，一個四季都適合旅遊的國家，春日賞櫻、夏日花火、秋季賞楓、冬季玩雪，總有一項適合你。日本列島地處亞洲東部太平洋中，東西狹長，跨越亞寒帶和亞熱帶。日本四季分明，自然環境優美，旅遊資源豐富。日本的主要旅遊城市有東京、大阪、京都、橫濱、鐮倉、名古屋、奈良、神戶、廣島、福岡、北海道、沖繩等地。著名旅遊風景區和溫泉地有富士山、箱根、伊豆半島、日光、草津、南紀白濱、別府等地。',
    images: ['bg-[url("/img/hotCountryJP.jpg")]']
  },
  加拿大: {
    id: 3,
    name: '加拿大',
    description:
      '加拿大，全球面積第二大的國家，位於北美洲北部，擁有森林、冰川、瀑布、島嶼等豐富多樣的自然景觀。多倫多因尼亞加拉大瀑布、楓葉大道和城市魅力被人熟知，世界七大奇景之一的尼亞加拉大瀑布是不可錯過的風景之一。蒙特利爾則是一個充滿浪漫藝術氣息的城市，可以沿著聖羅倫斯河漫步，拜訪下諾特丹聖母大教堂。加拿大更有廣闊的領土位於北極地區，西面是雄偉的高山，中部是廣闊的凍土，保留著自然的原始風貌，冬季夜晚還可以看到神奇的極光。',
    images: ['bg-[url("/img/hotCountryCA.jpg")]']
  },
  韓國: {
    id: 4,
    name: '韓國',
    description:
      '位於漢江之濱的首爾是韓國的首都，也是韓國的文化、經濟中心。韓國近一半的人口生活在包括首爾、仁川和京畿道在內的首都圈內[8]。首爾是座歷史悠久的古今並存的大都會，市中心保留著朝鮮王朝的四大宮殿（景福宮、德壽宮、昌德宮和昌慶宮）。其中昌德宮為聯合國教科文組織制定的世界文化遺產。昌德宮的後苑是典型的韓國古典園林。首爾另一處世界文化遺產宗廟是供奉朝鮮歷代國王牌位和舉行祭祀的地方。這裡很好地保留著韓國古老的祭禮、祭禮樂等傳統及習俗',
    images: ['bg-[url("/img/hotCountryKR.jpg")]']
  },
  中國: {
    id: 5,
    name: '中國',
    description:
      '中國的地形西高東低，西部有世界的屋脊青藏高原，也是世界的古文明知一，青藏高原更孕育了中國的三大河流，長江流域、黃河流域與瀾滄江，除瀾滄江流到中南半島之外，長江、黃河兩河流，最後由東部海岸，注入到太平洋；半島地形有雷州半島、山東半島、遼東半島，還有世界第二大沙漠，塔克拉瑪干沙漠，及牧草可以外銷世界第一草原的，內蒙古呼倫貝爾大草原，期間穿插著中國四大盆地，塔里木盆地、準格爾盆地、柴達木盆地與四川盆地，還有無數的山巒。',
    images: ['bg-[url("/img/hotCountryCN.jpg")]']
  }
});
// type CountryName = keyof HotCountryMap;

// const setHotCountry = computed(() => {
//   allHotels.value.forEach((hotel: Hotel) => {
//     let name: CountryName = hotel.country;
//     if (hotCountryMap.value[name]?.products?.length < 3) {
//       hotCountryMap.value[name]?.products.push(hotel);
//     }
//   });
// });

// horizational scrolling animation
let tl: GSAPTimeline | null = null; // scrollwrap水平捲動
let tl2: GSAPTimeline | null = null; // 卡片放大
let tl3: GSAPTimeline | null = null; // 卡片橫移

let scrollWrap = ref<HTMLElement | null>(null);
let countryList = ref(null);

const { isDesktop, isMobile } = useDevice();
// 橫向移動動畫
const horizatialScrollAnimation = () => {
  let countryListAry: HTMLElement[] = gsap.utils.toArray(countryList.value); // 國家卡片
  let endPos = (scrollWrap.value?.offsetWidth as number) || 100; // 水平捲動結束位置
  let end = `+=${endPos}`;

  tl = useScrollAnimation({
    pin: true,
    // snap: 1 / countryListAry.length,
    // +=5%
    start: '+=1%',
    end,
    trigger: scrollWrap.value,
    scrub: 1
  });

  tl2 = useScrollAnimation({
    // snap: 1 / countryListAry.length,
    start: '-=20%',
    end,
    trigger: scrollWrap.value
  });

  tl2?.fromTo(countryListAry[0], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[1], { scale: 0 }, { scale: 1 }, '-=20%');
  tl2?.fromTo(countryListAry[2], { scale: 0 }, { scale: 1 }, '-=20%');
  tl2?.fromTo(countryListAry[3], { scale: 0 }, { scale: 1 }, '-=20%');
  tl2?.fromTo(countryListAry[4], { scale: 0 }, { scale: 1 }, '-=20%');
  tl2?.fromTo(countryListAry[5], { scale: 0 }, { scale: 1 }, '-=20%');

  const xPercent = -160 * countryListAry.length - 50;

  tl?.to(countryListAry, { xPercent });
};

const mobileScrollAnimation = () => {
  let countryListAry: HTMLElement[] = gsap.utils.toArray(countryList.value); // 國家卡片
  tl2 = useScrollAnimation({
    // snap: 1 / countryListAry.length,
    start: '+=5%',
    trigger: scrollWrap.value
  });

  tl2?.fromTo(countryListAry[0], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[1], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[2], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[3], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[4], { scale: 0 }, { scale: 1 });
  tl2?.fromTo(countryListAry[5], { scale: 0 }, { scale: 1 });
};

// 飛機動畫
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

let airplaneTl;
let airplaneScrollTl;

const airplaneSvgDom = ref<HTMLElement | null>(null);
const AirplaneAnimation = () => {
  let countryListAry: HTMLElement[] = gsap.utils.toArray(countryList.value); // 國家卡片
  let endPos = (scrollWrap.value?.offsetWidth as number) || 100; // 水平捲動結束位置
  let end = `+=${endPos}`;

  airplaneTl = gsap.timeline();

  const airplanePath = {
    duration: 10,
    repeat: 12,
    repeatDelay: 3,
    ease: 'power1.inOut',
    motionPath: {
      autoRotate: true,
      path: [
        { x: 100, y: 20 },
        { x: 300, y: 150 },
        { x: 500, y: 240 },
        { x: 750, y: 30 },
        { x: 350, y: 0 },
        { x: 600, y: 180 },
        { x: 800, y: 80 },
        { x: window.innerWidth + 100, y: 100 } // 全部螢幕寬度 + 飛機寬度
      ]
    }
    // motionPath:{
    //   path: "#path",
    //   align: "#path",
    //   autoRotate: true,
    //   alignOrigin: [0.5, 0.5]
    // }
  };

  airplaneScrollTl = useScrollAnimation({
    pin: true,
    // snap: 1 / countryListAry.length,
    start: '0%',
    end,
    trigger: scrollWrap.value,
    scrub: 1
  });

  airplaneScrollTl?.to('.airplaneSvg', {
    motionPath: {
      autoRotate: true,
      path: [
        { x: 100, y: 20 },
        { x: 300, y: 100 },
        { x: 500, y: 180 },
        { x: 750, y: 10 },
        { x: 350, y: 0 },
        { x: 600, y: 150 },
        { x: 800, y: 50 },
        { x: window.innerWidth, y: 100 }
      ]
    }
  });
};

onMounted(() => {
  if (isDesktop) {
    horizatialScrollAnimation();
    AirplaneAnimation();
  } else {
    mobileScrollAnimation();
  }
});

onBeforeUnmount(() => {
  tl?.kill();
  tl = null;
  tl2?.kill();
  tl2 = null;
});
</script>
