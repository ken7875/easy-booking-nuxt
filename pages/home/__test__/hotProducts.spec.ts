import { describe, it, expect, vi } from 'vitest';
import { registerEndpoint, mountSuspended } from '@nuxt/test-utils/runtime';
import HotProducts from '~~/pages/home/components/HotProducts.vue';
import { allHotelData } from '~~/api/mocks/hotel';
import { flushPromises } from '@vue/test-utils';
import mergeWith from 'lodash/mergeWith';

const AsyncHotProducts = defineComponent({
  components: { HotProducts },
  template: '<Suspense><HotProducts/></Suspense>'
});

const createWrapper = async (override = {}) => {
  const defaultConfig = {
    global: {
      mocks: {},
      directives: {
        textSlice: vi.fn()
      }
    }
  };
  const wrapper = await mountSuspended(AsyncHotProducts, mergeWith(defaultConfig, override));

  return wrapper;
};

const getFakeCall = vi.fn();
const sliceHotelData: typeof allHotelData = {
  ...allHotelData,
  data: {
    data: allHotelData.data.data.slice(0, 6)
  }
};

registerEndpoint('/products/hotProducts', getFakeCall);

describe('hotProducts', () => {
  it('chinese title is shown', async () => {
    const wrapper = await createWrapper();
    await flushPromises();
    const chineseTitle = wrapper.find('[data-test="hot-product-title-chinese"]');

    expect(chineseTitle.text()).toBe('熱門飯店');
  });

  it('if data more then 9 then card amount should equal data', async () => {
    getFakeCall.mockImplementationOnce(() => allHotelData);

    const wrapper = await createWrapper();

    await flushPromises();
    const cardNums = wrapper.findAll('[data-test="card"]');
    expect(cardNums?.length).toBe(15);
  });

  it('if data length is 6 then data amount should be double utils amount more then 9', async () => {
    getFakeCall.mockImplementationOnce(() => sliceHotelData);

    const wrapper = await createWrapper();
    await flushPromises();
    const cardNums = wrapper.findAll('[data-test="card"]');

    expect(cardNums?.length).toBe(12);
  });
});
