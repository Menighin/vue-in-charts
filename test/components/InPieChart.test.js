import { mount } from '@vue/test-utils';
import { render } from '@vue/server-test-utils'
import InPieChart from '../../src/components/InPieChart.vue';

describe('InPieChart', () => {

    const wrapper = mount(InPieChart, {
        propsData: {
            diameter: '100',
            slices: [
                { name: 'Slice 1', value: 90, color: '#F44336' },
                { name: 'Slice 2', value: 70, color: '#2196F3' },
                { name: 'Slice 3', value: 50, color: '#8BC34A' },
                { name: 'Slice 4', value: 20, color: '#FFC107' }
            ]
        },
        attachToDocument: true
    });

    it('renders a SVG', () => {
        expect(wrapper.html()).toContain('<svg');
    });

    it('received parameters', () => {
        expect(wrapper.props().slices.length).toBe(4);
        expect(wrapper.props().slices[0].name).toBe('Slice 1');
        expect(wrapper.props().slices[1].value).toBe(70);
        expect(wrapper.props().diameter).toBe('100');
    });

    it('renders 4 slices', () => {
        let template = wrapper.html();

        let pieSliceCount = 0;

        while (template.indexOf('pie-slice') !== -1) {
            pieSliceCount++;
            template = template.slice(template.indexOf('pie-slice') + 1);
        }

        expect(pieSliceCount).toBe(4);

    });
});