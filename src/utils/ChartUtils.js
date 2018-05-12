export default class ChartUtils {

    /**
     * Gets a color property and transforms it, if necessary, into a gradient adding it to the array
     * @param {(string|string[]|Object)} colorProp The color property to be transformed
     * @param {array} gradients The current array of gradients to be appended to
     */
    static getSvgColorProperty(colorProp, gradients) {

        if (typeof colorProp === 'string') {
            return colorProp;
        } else if (colorProp.constructor === Array) {
            let gradient = { 
                x1: colorProp.x1 || '0%',
                x2: colorProp.x2 || '0%',
                y1: colorProp.y1 || '0%',
                y2: colorProp.y2 || '100%',
                stops: []
            };

            colorProp.forEach((s, i) => {
                gradient.stops.push({
                    offset: `${i * (100 / (colorProp.length - 1))}%`, 
                    color: s
                });
            });

            let gradientId = `url(#gradient-${gradients.length})`;

            gradients.push(gradient);

            return gradientId;
        } else if (colorProp.constructor === Object) {
            let gradientId = `url(#gradient-${gradients.length})`;
            gradients.push(colorProp);
            return gradientId;
        }
    }
}