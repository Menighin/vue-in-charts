import ChartUtils from '../src/utils/ChartUtils.js';

describe('ChartUtils', () => {

    let   gradients = [];
    const simpleColor = '#BADA55';
    const simpleArray = ['tomato', 'brown', '#BABACA'];
    const gradient    = {
        x1: '3%',
        x2: '100%',
        y1: '0%',
        y2: '100%',
        stops: [
            {
                color: 'tomato',
                offset: '15%'
            },
            {
                color: 'tomato',
                offset: '75%'
            }
        ]
    };

    const color1 = ChartUtils.getSvgColorProperty(simpleColor, gradients);
    const color2 = ChartUtils.getSvgColorProperty(simpleArray, gradients);
    const color3 = ChartUtils.getSvgColorProperty(gradient,    gradients);
    let gradient1 = gradients[0];
    let gradient2 = gradients[1];

    it('created 2 gradients', () => {
        expect(gradients.length).toBe(2);
    });

    it('kept the simple color', () => {
        expect(color1).toBe(simpleColor);
    });

    it('created the right gradient for array', () => {
        expect(color2).toContain('url(');
        expect(gradient1.x1).toBeDefined();
        expect(gradient1.x2).toBeDefined();
        expect(gradient1.y1).toBeDefined();
        expect(gradient1.y2).toBeDefined();
        expect(gradient1.stops.length).toBe(3);
        expect(gradient1.stops[0].offset).toBe('0%');
        expect(gradient1.stops[1].offset).toBe('50%');
        expect(gradient1.stops[2].offset).toBe('100%');
    });

    it('created the right gradient for object', () => {
        expect(color3).toContain('url(');
        expect(gradient2).toBe(gradient)
    });

});