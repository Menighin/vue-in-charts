import { mount } from '@vue/test-utils';
import { render } from '@vue/server-test-utils'
import InLineChart from '../../src/components/InLineChart.vue';

describe('InLineChart', () => {

    const wrapper = mount(InLineChart, {
        propsData: {
            width: '100',
            height: '50',
            showPoints: true,
            lines: [
                {
                    strokeColor: 'rgb(80, 200, 80)',
                    data: [1, 5, 3, 8, 10],
                    fillColor: 'rgba(100, 100, 0, 0.5)'
                },
                {
                    strokeColor: 'rgb(200, 80, 80)',
                    data: [-1, 8, 13, 4, 7],
                    fillColor: {
                        stops: ['red', 'blue']
                    }
                }
            ]
        },
        attachToDocument: true
    });

    it('renders a SVG', () => {
        expect(wrapper.html()).toContain('<svg');
    });

    it('renders 2 lines', () => {
        expect(wrapper.findAll('.line-stroke').length).toBe(2);
    });

    it('renders 10 points', () => {
        expect(wrapper.findAll('.line-point').length).toBe(10);
    });

    it('renders 2 fills', () => {
        expect(wrapper.findAll('.line-fill').length).toBe(2);
    });

    it('creates 1 linearGradient', () => {
        expect(wrapper.findAll('linearGradient').length).toBe(1);
    });

    it('received parameters', () => {
        expect(wrapper.props().width).toBe('100');
        expect(wrapper.props().height).toBe('50');
        expect(wrapper.props().showPoints).toBe(true);
        expect(wrapper.props().lines.length).toBe(2);
        expect(wrapper.props().lines[0].data.length).toBe(5);
        expect(wrapper.props().lines[0].data[0]).toBe(1);
    });

    it('draws tooltip', () => {
        expect(wrapper.find('.tooltip').isVisible()).toBe(false);
        wrapper.find('.line-point').trigger('mousemove');
        expect(wrapper.find('.tooltip').isVisible()).toBe(true);
    });

});