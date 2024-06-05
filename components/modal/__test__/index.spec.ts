import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime'
import mergeWith from 'lodash/mergeWith';
import Modal from '../index.vue'

const createWrapper = async (override = {}) => {
    const defaultConfig = {
        global: {
            stubs: {
              teleport: true
            }
        }
    };
    const wrapper = await mountSuspended(Modal, mergeWith(defaultConfig, override));

    return wrapper;
};

describe('modal', () => {
    it('modal is shown', async () => {
        const wrapper = await createWrapper()
        wrapper.setProps({
            isOpen: true
        })

        await wrapper.vm.$nextTick()
        const modalShadow = wrapper.find('[data-test="modal-shadow"]')
        expect(modalShadow.exists()).toBe(true)
    })

    it('modal is hideen', async () => {
        const wrapper = await createWrapper()
        wrapper.setProps({
            isOpen: false
        })

        await wrapper.vm.$nextTick()
        const modalShadow = wrapper.find('[data-test="modal-shadow"]')
        expect(modalShadow.exists()).toBe(false)
    })

    it('title has been shown', async () => {
        const wrapper = await createWrapper({
            slots: {
                title: 'test title'
            }
        })
        wrapper.setProps({
            isOpen: true
        })

        await wrapper.vm.$nextTick()
        const title = wrapper.find('[data-test="modal-title"]')
        expect(title.text()).toBe('test title')
    })
    it('title has been shown', async () => {
        const wrapper = await createWrapper({
            slots: {
                title: 'test title'
            }
        })
        wrapper.setProps({
            isOpen: true
        })

        await wrapper.vm.$nextTick()
        const title = wrapper.find('[data-test="modal-title"]')
        expect(title.text()).toBe('test title')
    })

    it("body content", async () => {
        const wrapper = await createWrapper({
            slots: {
                default: h('div', 'content')
            }
        })

        wrapper.setProps({
            isOpen: true
        })

        await wrapper.vm.$nextTick()
        const title = wrapper.find('[data-test="modal-body"]')
        expect(title.html()).toContain('<div>content</div>')
    })
})