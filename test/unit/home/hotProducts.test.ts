import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerEndpoint, mountSuspended } from '@nuxt/test-utils/runtime'
import HotProducts from '~~/pages/home/components/HotProducts.vue';
import { productsData1, productsData2 } from './mockData';
import { flushPromises } from '@vue/test-utils';
import mergeWith from 'lodash/mergeWith';
import { apiMethods } from '~/api';

const AsyncHotProducts = defineComponent({
  components: { HotProducts },
  template: '<Suspense><HotProducts/></Suspense>'
})

const createWrapper = async (override = {}) => {
  const defaultConfig = {
    global: {
      mocks: {
          sessionStorage: vi.fn()
      },
      directives: {
        textSlice: vi.fn()
      }
    },
  };
  const wrapper = await mountSuspended(AsyncHotProducts, mergeWith(defaultConfig, override));

  return wrapper;
};

const getFakeCall = vi.fn();
registerEndpoint('/products/hotProducts', getFakeCall)

describe('test', () => {
  it('chinese title is shown', async () => {
    const wrapper = await createWrapper()
    await flushPromises();
    const chineseTitle = wrapper.find('[data-test="hot-product-title-chinese"]')

    expect(chineseTitle.text()).toBe('熱門飯店')
  })

  it('if data more then 9 then card amount should equal data1', async () => {
    getFakeCall.mockImplementationOnce(() => productsData1)
    
    const wrapper = await createWrapper()
    
    await flushPromises();
    const cardNums = wrapper.findAll('[data-test="card"]')
    expect(cardNums?.length).toBe(15)
  })

  it('if data length is 6 then data amount should be double utils amount more then 9', async () => {
    getFakeCall.mockImplementationOnce(() => productsData2);

    const wrapper = await createWrapper()
    await flushPromises();
    const cardNums = wrapper.findAll('[data-test="card"]')

    expect(cardNums?.length).toBe(12)
  })
})
