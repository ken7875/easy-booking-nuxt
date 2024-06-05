import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerEndpoint, mountSuspended } from '@nuxt/test-utils/runtime'
import Slider from '../Slider.vue'
import mergeWith from 'lodash/mergeWith';
import { allHotelData } from '~~/api/mocks/hotel'
import { flushPromises } from '@vue/test-utils';

const createWrapper = async (override = {}) => {
    const defaultConfig = {
      global: {},
    };
    const wrapper = await mountSuspended(Slider, mergeWith(defaultConfig, override));
  
    return wrapper;
};

describe('slider', () => {
    it('if data more then 9 then card amount should equal data', async () => {
        const wrapper = await createWrapper()
        wrapper.setProps({
            initData: allHotelData.data.data
        })

        await wrapper.vm.$nextTick()

        const sliderCards = wrapper.findAll('[data-test="slider-cards"]')
        expect(sliderCards.length).toBe(15)
    })

    it('if data length is 6 then data amount should be double utils amount more then 9', async () => {
        const wrapper = await createWrapper()
        wrapper.setProps({
            initData: allHotelData.data.data.slice(0, 6)
        })

        await wrapper.vm.$nextTick()

        const sliderCards = wrapper.findAll('[data-test="slider-cards"]')
        expect(sliderCards.length).toBe(12)
    })

    it('test change button', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: allHotelData.data.data
        })
        await wrapper.vm.$nextTick()
        const prevButton = wrapper.find('[data-test="prev-button"]')
        const nextButton = wrapper.find('[data-test="next-button"]')
        await prevButton.trigger('click')
        await nextButton.trigger('click')

        expect(wrapper.emitted()).toHaveProperty('change')
        expect(wrapper.emitted().change).toHaveLength(2)
    })

    it('curIdx less then 0 should change to last data lndex', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: allHotelData.data.data
        })
        wrapper.vm.curIdx.value = 0

        await wrapper.vm.$nextTick()
        const prevButton = wrapper.find('[data-test="prev-button"]')
        await prevButton.trigger('click')
        const curIdx = unref(wrapper.vm.curIdx)
        expect(curIdx).toBe(14)
    })

    it('curIdx more then data biggest index should change to 0', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: allHotelData.data.data
        })

        wrapper.vm.curIdx.value = allHotelData.data.data.length - 1
        await wrapper.vm.$nextTick()

        const prevButton = wrapper.find('[data-test="next-button"]')
        await prevButton.trigger('click')
        const curIdx = unref(wrapper.vm.curIdx)
        expect(curIdx).toBe(0)
    })

    it('curIdx normal prev trigger', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: allHotelData.data.data
        })

        wrapper.vm.curIdx.value = 10
        await wrapper.vm.$nextTick()

        const prevButton = wrapper.find('[data-test="prev-button"]')
        await prevButton.trigger('click')
        const curIdx = unref(wrapper.vm.curIdx)
        expect(curIdx).toBe(9)
    })

    it('curIdx normal next trigger', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: allHotelData.data.data
        })

        wrapper.vm.curIdx.value = 10
        await wrapper.vm.$nextTick()

        const prevButton = wrapper.find('[data-test="next-button"]')
        await prevButton.trigger('click')
        const curIdx = unref(wrapper.vm.curIdx)
        expect(curIdx).toBe(11)
    })

    it('no text is shown and slider should be hidden when data is empty', async () => {
        const wrapper = await createWrapper()

        wrapper.setProps({
            initData: [],
            noDataText: '暫無資料'
        })

        await wrapper.vm.$nextTick()

        const noDataText = wrapper.find('[data-test="no-data-text"]')
        const sliderCards = wrapper.find('[data-test="slider-cards"]')
        expect(noDataText.exists()).toBe(true)
        expect(sliderCards.exists()).toBe(false)
    })
})