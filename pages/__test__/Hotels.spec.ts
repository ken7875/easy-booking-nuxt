import { describe, it, expect, vi } from 'vitest';
import { registerEndpoint, mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import mergeWith from 'lodash/mergeWith';
import Hotels from '../Hotels.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store/index';
import Sinon from 'sinon';
import { storeToRefs } from 'pinia';
import { allHotelData } from '~~/api/mocks/hotel';

vi.mock('@/api/index', () => ({
  apiMethods: {
    hotel: {
      getAllHotels: () => Promise.resolve(allHotelData)
    }
  }
}));

const AsyncHotProducts = defineComponent({
  components: { Hotels },
  template: '<Suspense><Hotels/></Suspense>'
});
const createWrapper = (override = {}) => {
  const defaultConfig = {
    global: {
      mocks: {},
      plugin: [
        createTestingPinia({
          stubActions: false,
          createSpy: Sinon.spy
        })
      ],
      directives: {
        textSlice: vi.fn()
      }
    }
  };
  // const wrapper = await mountSuspended(AsyncHotProducts, mergeWith(defaultConfig, override));
  const wrapper = mount(Hotels, mergeWith(defaultConfig, override));
  return wrapper;
};

describe('hotProducts', () => {
  it('Test hotel count', async () => {
    const wrapper = createWrapper();

    const { useHotel } = useStore();
    const hotelsStore = useHotel();
    const { allHotels } = storeToRefs(hotelsStore);
    const { getAllHotels } = hotelsStore;

    await getAllHotels();
    await flushPromises();
    const li = wrapper.findAll('[data-test="hotelCards"]');
    await wrapper.vm.$nextTick();

    expect(li.length).toEqual(30);
  });
});
