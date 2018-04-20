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
        let template = wrapper.html();

        let linesCount = 0;

        while (template.indexOf('line-stroke') !== -1) {
            linesCount++;
            template = template.slice(template.indexOf('line-stroke') + 1);
        }
        expect(linesCount).toBe(2);
    });

    it('renders 10 points', () => {
        let template = wrapper.html();

        let pointsCount = 0;

        while (template.indexOf('line-point') !== -1) {
            pointsCount++;
            template = template.slice(template.indexOf('line-point') + 1);
        }
        expect(pointsCount).toBe(10);
    });

    it('renders 2 fills', () => {
        let template = wrapper.html();

        let fillCount = 0;

        while (template.indexOf('line-fill') !== -1) {
            fillCount++;
            template = template.slice(template.indexOf('line-fill') + 1);
        }
        expect(fillCount).toBe(2);
    });

    it('creates 1 linearGradient', () => {
        let template = wrapper.html();

        let gradientCount = 0;

        while (template.indexOf('<linearGradient') !== -1) {
            gradientCount++;
            template = template.slice(template.indexOf('<linearGradient') + 1);
        }
        expect(gradientCount).toBe(1);
    });

    it('received parameters', () => {
        expect(wrapper.props().width).toBe('100');
        expect(wrapper.props().height).toBe('50');
        expect(wrapper.props().showPoints).toBe(true);
        expect(wrapper.props().lines.length).toBe(2);
        expect(wrapper.props().lines[0].data.length).toBe(5);
        expect(wrapper.props().lines[0].data[0]).toBe(1);
    });

});