<template>
    <div class="inline-line-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height"
            :style="`padding-top: ${paddingTop}; padding-right: ${paddingRight}; padding-bottom: ${paddingBottom}; padding-left: ${paddingLeft};`">

            <g>
                <polygon 
                    v-for="(l, i) in linesComp"
                    v-if="l._fillColor"
                    :key="`line-fill-${i}`" 
                    :points="l.fillPoints" 
                    :fill="l._fillColor"
                    class="line-fill" />
            </g>

            <polyline :points="`0,${zeroHeight} ${width},${zeroHeight}`" stroke="#aaa" stroke-width="1" fill="none" stroke-dasharray="1, 2" />

            <g v-for="(l, i) in linesComp" :key="`line-stroke-${i}`" >
                <polyline 
                    :points="l.points" 
                    :stroke="l.strokeColor" 
                    stroke-width="3" 
                    fill="none"
                    class="line-stroke" />

                <g>
                    <circle 
                        v-for="(p, j) in l.points" 
                        :key="`point-${i}-${j}`" 
                        :cx="p[0]" 
                        :cy="p[1]" 
                        r="3" 
                        fill="blue" 
                        class="line-point" />
                </g>
            </g>

        </svg>

    </div>
</template>

<script>
    export default {
        props: {
            width:         { type: String, default: '250'  },
            height:        { type: String, default: '100'  },
            data:          { type: Array,  required: false },
            lines:         { type: Array,  required: true  },
            minY:          { type: Number, default:  null  },
            maxY:          { type: Number, defaukt:  null  },
            paddingTop:    { type: String, default:  '5px' },
            paddingRight:  { type: String, default:  '5px' },
            paddingBottom: { type: String, default:  '5px' },
            paddingLeft:   { type: String, default:  '5px' },
        },
        data() {
            return {
                zeroHeight: 0,
                gradients: []
            }
        },
        computed: {
            linesComp() {
                const h = parseInt(this.height);
                const w = parseInt(this.width);
                let self = this;

                let minValue = null;
                let maxValue = null;

                // Finding the min and max Y values to calculate the yFactor and zero line position
                this.lines.forEach(l => {
                    minValue =              l.data.reduce((min, val) => val < min || min == null ? val : min, l.data[0]);
                    maxValue = self.maxY || l.data.reduce((max, val) => val > max || max == null ? val : max, l.data[0]);
                });

                let yTranslate = this.minY || Math.min(0, minValue);

                let yFactor = h / (maxValue - yTranslate);

                // Calculating the height of the zero line
                this.zeroHeight = h - ((0 - yTranslate) * yFactor);

                // Generating the properties on each line to draw the chart
                let lines = [];
                this.lines.forEach(l => {
                    
                    const xStep = w / (l.data.length - 1);

                    // Calculating Y positions
                    l.points = [];
                    let xValue = 0;
                    l.data.forEach(d => {
                        let yValue = h - ((d - yTranslate) * yFactor);
                        l.points.push([xValue, yValue]);
                        xValue += xStep;
                    });

                    l.fillPoints = [0, parseInt(self.height)].concat(l.points).concat([parseInt(self.width), parseInt(self.height)]);

                    // Processing the fill ccolor
                    if (l.fillColor) {
                        // If it is just a string, then it is a solid color
                        if (typeof l.fillColor === 'string') {
                            l._fillColor = l.fillColor;
                        // Otherwise, it is a gradient and we need to create the necessary structure
                        } else if (l.fillColor.constructor === Object) {
                            l._fillColor = `url(#gradient-${self.gradients.length})`;

                            let gradient = { 
                                type: l.fillColor.type || 'linearGradient',
                                x1: l.fillColor.x1 || '0%',
                                x2: l.fillColor.x2 || '0%',
                                y1: l.fillColor.y1 || '0%',
                                y2: l.fillColor.y2 || '100%',
                                stops: [] 
                            };

                            // Stops may be defined as a simple array of colors and then they are equally distributed or with an offset property
                            l.fillColor.stops.forEach((s, i) => {
                                if (typeof s === 'string') {
                                    gradient.stops.push({
                                        offset: `${i * (100 / (l.fillColor.stops.length - 1))}%`, 
                                        color: s
                                    });
                                } else if (s.constructor === Object) {
                                    gradient.stops.push(s);
                                }
                            });

                            self.gradients.push(gradient);
                        }
                    }

                    lines.push(l);
                });
                console.log(this.gradients);
                return lines;
            }
        },
        beforeMount() {
            this.zeroHeight = this.height;
        }
    }
</script>

<style lang="scss" scoped>

    .inline-line-wrapper {
        .root {

            .line-point {
                cursor: pointer;
                transition: all .3s;

                &:hover {
                    r: 5;
                }

            }

        }
    }

</style>
