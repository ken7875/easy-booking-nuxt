import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import Waterfull from '../components/Waterfull.vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { allHotelData } from '~~/api/mocks/hotel';
import sinon from 'sinon';

const push = vi.fn();
const replace = vi.fn();
const { useRouterMock } = vi.hoisted(() => ({
  useRouterMock: vi.fn().mockImplementation(() => ({
    push,
    replace
  }))
}));

mockNuxtImport('useRouter', () => useRouterMock);

afterEach(() => {
  useRouterMock.mockReset();
});

const createWrapper = (override = {}) => {
  const wrapper = mount(Waterfull, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: sinon.spy,
          initialState: {
            hotelStore: {
              allHotels: allHotelData.data.data
            }
          }
        })
      ]
    }
  });

  return wrapper;
};

describe('waterfull', () => {
  it('link test', async () => {
    const wrapper = createWrapper();
    const routeButton = wrapper.find("[data-test='route-button']");
    await routeButton.trigger('click');

    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith('/Hotels');
  });

  it('waterfull background row amount', () => {
    const wrapper = createWrapper();
    wrapper.vm.$nextTick();
    const waterfullItem = wrapper.findAll("[data-test='waterfull-row']");

    expect(waterfullItem.length).toBe(6);
  });

  it('waterfull background col amount', () => {
    const wrapper = createWrapper();
    wrapper.vm.$nextTick();
    const waterfullItem = wrapper.findAll("[data-test='waterfull-row']");

    expect(waterfullItem.length).toBe(6);
  });
});
