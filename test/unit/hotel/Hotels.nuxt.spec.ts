// @vitest-environment nuxt

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
// import Hotels from '~~/pages/Hotels.vue';

it('check text has been render', () => {
  // const wrapper = mount(Hotels, {
  //   global: {
  //     mocks: {
  //       mapData: {
  //         markers: []
  //       },
  //       getSpecifyDate: vi.fn()
  //     }
  //   }
  // });

  expect(wrapper.text()).toContain('查看房間詳情');
});

// import { describe, test, expect, beforeEach, vi } from 'vitest';
// import { setActivePinia, createPinia } from 'pinia';
// import { shallowMount } from '@vue/test-utils';
// import { createTestingPinia } from '@pinia/testing';
// import flushPromises from 'flush-promises';
// import Hotels from '~~/pages/Hotels.vue';
// import { useHotel } from '~~/store/hotel';
// import throttle from '~~/utils/throttle.ts';
// let wrapper;
// let store;

// vi.stubGlobal('definePageMeta', vi.fn());
// vi.stubGlobal(
//   'useRuntimeConfig',
//   vi.fn(() => ({ public: { baseUrl: '' } }))
// );

// vi.stubGlobal(
//   'useDevice',
//   vi.fn(() => ({
//     isMobile: true,
//     isTablet: true,
//     isDesktop: true
//   }))
// );

// vi.stubGlobal('getAllHotels', vi.fn());

// vi.mock('~~/utils/throttle.ts');

// describe('Hotel views test', async () => {
//   beforeEach(() => {
//     // setActivePinia(createPinia());
//     // wrapper = shallowMount(Hotels, {
//     //   globals: {
//     //     plugins: [
//     //       createTestingPinia({
//     //         createSpy: vi.fn(),
//     //         stubActions: false
//     //       })
//     //     ]
//     //   }
//     // });
//   });

//   test('asd', async () => {
//     const wrapper = shallowMount(Hotels, {
//       global: {
//         plugins: [
//           createTestingPinia({
//             createSpy: vi.fn(),
//             stubActions: true
//           })
//         ],
//         mocks: {
//           getAllHotelsHandler: vi.fn(),
//           getAllHotels: vi.fn()
//         }
//       }
//     });

//     // await flushPromises();

//     store = useHotel();
//     console.log(store.getAllHotels);
//     expect(throttle).toHaveBeenCalledTimes(1);
//     expect(store.allHotels).toHaveLength(10);
//     // expect(wrapper.vm.getAllHotelsHandler).toHaveBeenCalledTimes(1);
//   });
// });
