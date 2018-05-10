<template>
    <div class="in-bar-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height">

            <defs>
                <linearGradient v-for="(g, i) in gradients" :key="`gradient-${i}`" :id="`gradient-${i}`" :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2">
                    <stop v-for="(s, j) in g.stops" :key="`stop-${i}-${j}`" :offset="s.offset" :style="`stop-color:${s.color}`" />
                </linearGradient>
            </defs>

            <g class="bars-group">
                <rect class="bar" 
                    v-for="(b, i) in barsComp" :key="`bar-${i}`"
                    :x="b.x"
                    :y="b.y"
                    :fill="b.fillColor"
                    :height="b.height"
                    :width="b.width"
                    :stroke="strokeColor"
                    :stroke-width="strokeWidth"
                />
            </g>

            <polyline class="line-zero" :points="`0,${zeroHeight} ${width},${zeroHeight}`" stroke="#aaa" stroke-width="1" fill="none" stroke-dasharray="1, 2" />

        </svg>
    </div>
</template>

<script>

    import ChartUtils from '../utils/ChartUtils';

    export default {
        props: {
            width:       { type: String,  default:  '250'   },
            height:      { type: String,  default:  '100'   },
            bars:        { type: Array,   required: true    },
            fillColor:   {                default: 'tomato' },
            strokeWidth: { type: Number,  default:  1       },
            strokeColor: { type: String,  default:  '#333'  },
            padding:     { type: Number,  default:  0       },
        },
        data() {
            return {
                zeroHeight: 0,
                gradients: []
            }
        },
        methods: {
            
        },
        computed: {
            fillColorComp() {
                let fillColor = this.fillColor;
                return ChartUtils.getSvgColorProperty(fillColor, this.gradients);
            },
            barsComp() {
                let self = this;

                let maxValue = null;
                let minValue = null;
                const strokePadding = this.strokeWidth;

                // Color property
                const fillColor = this.fillColorComp;

                // Finding the min and max Y values to calculate the yFactor and zero line position
                minValue  =              this.bars.reduce((min, val) => val < min || min == null ? val : min, minValue);
                maxValue  = self.maxY || this.bars.reduce((max, val) => val > max || max == null ? val : max, maxValue);

                const h = parseInt(this.height) - 2 * strokePadding;
                const w = parseInt(this.width) - 2 * strokePadding;

                let yTranslate = this.minY || Math.min(0, minValue);

                // This is how much 1 unit represents in pixels
                let yFactor = h / (maxValue - yTranslate);

                // Calculating the height of the zero line
                this.zeroHeight = h - ((0 - yTranslate) * yFactor) + strokePadding;

                // Calculate the width of each bar
                let barWidth = w / this.bars.length;

                // Calculating the bars
                let bars = [];
                let xStep = barWidth;
                let xCurr = strokePadding;
                this.bars.forEach(b => {
                    bars.push({
                        width: barWidth - 2 * self.padding,
                        height: Math.abs(b * yFactor),
                        x: xCurr + self.padding,
                        y: b > 0 ? h - ((b - yTranslate) * yFactor) + strokePadding : self.zeroHeight,
                        fillColor: fillColor
                    });
                    xCurr += xStep;
                });

                return bars;
            }
        },
        beforeMount() {
            
        }
    }
</script>

<style lang="scss" scoped>

    .in-bar-wrapper {
        
    }

</style>
