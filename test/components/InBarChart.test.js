import { mount } from '@vue/test-utils';
import { render } from '@vue/server-test-utils'
import InBarChart from '../../src/components/InBarChart.vue';

describe('InBarChart', () => {

    const wrapper = mount(InBarChart, {
        propsData: {
            width: '100',
            height: '50',
            fillColor: ['tomato', 'brown'],
            bars: [-10, 20, 40, {value: 80, fillColor: ['DeepSkyBlue', 'DodgerBlue']}, -30, 10, 25]
        },
        attachToDocument: true
    });

    it('renders a SVG', () => {
        expect(wrapper.html()).toContain('<svg');
    });

    it('renders 7 bars', () => {
        expect(wrapper.findAll('.bar').length).toBe(7);
    });

    it('renders 2 gradients', () => {
        expect(wrapper.findAll('linearGradient').length).toBe(2);
    });

    it('draws tooltip', () => {
        expect(wrapper.find('.tooltip').isVisible()).toBe(false);
        wrapper.find('.bar').trigger('mousemove');
        expect(wrapper.find('.tooltip').isVisible()).toBe(true);
    });
});