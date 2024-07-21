import DatePicker from '../DatePicker.vue';
import { mount } from '@vue/test-utils';
import sinon from 'sinon';
import { createTestingPinia } from '@pinia/testing';
describe('date picker test', () => {
  const createWrapper = (override = {}) => {
    const wrapper = mount(DatePicker, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: sinon.spy,
            initialState: {}
          })
        ]
      }
    });

    return wrapper;
  };

  test('date picker test', () => {
    const wrapper = createWrapper({});
    wrapper.vm.firstCalendarDate.year = 2024;
    wrapper.vm.firstCalendarDate.month = 0;
    wrapper.vm.firstCalendarDate.date = 1;
    wrapper.vm.firstCalendarDate.day = 1;
    wrapper.vm.firstCalendarDate.hour = 1;

    wrapper.vm.adjustDateStrategy.goNextDate();

    expect(wrapper.vm.firstCalendarDate).toEqual({
      year: 2024,
      month: 1,
      date: 1,
      day: 1,
      hour: 1
    });
  });
});
