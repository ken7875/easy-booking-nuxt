export default (service: string) => {
  let iconStr = '';
  switch (service) {
    case '游泳池':
      iconStr = 'person-swimming';
      break;
    case '健身房':
      iconStr = 'dumbbell';
      break;
    case '停車場':
      iconStr = 'square-parking';
      break;
    case '機場接送':
      iconStr = 'car-side';
      break;
    case '酒吧':
      iconStr = 'martini-glass';
      break;
    case '溫泉':
      iconStr = 'hot-tub';
      break;
    case '禁菸房':
      iconStr = 'smoking';
      break;
    case '景觀':
      iconStr = 'mountain';
      break;
    case '提供早餐':
      iconStr = 'utensils';
      break;
    case '免費網路':
      iconStr = 'wifi';
      break;
    default:
      iconStr = 'wifi';
      break;
  }
  return iconStr;
};
