<template>
    <div class="in-bar-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height">

            <g class="bars-group">
                <rect class="bar" 
                    v-for="(b, i) in barsComp" :key="`bar-${i}`"
                    :x="b.x"
                    :y="b.y"
                    :height="b.height"
                    :width="b.width"
                />
            </g>

            <polyline class="line-zero" :points="`0,${zeroHeight} ${width},${zeroHeight}`" stroke="#aaa" stroke-width="1" fill="none" stroke-dasharray="1, 2" />

        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            width:      { type: String,  default:  '250' },
            height:     { type: String,  default:  '100' },
            bars:       { type: Array,   required: true  },
        },
        data() {
            return {
                zeroHeight: 0,
            }
        },
        methods: {
            
        },
        computed: {
            barsComp() {
                let self = this;

                let maxValue = null;
                let minValue = null;

                // Finding the min and max Y values to calculate the yFactor and zero line position
                minValue  =              this.bars.reduce((min, val) => val < min || min == null ? val : min, minValue);
                maxValue  = self.maxY || this.bars.reduce((max, val) => val > max || max == null ? val : max, maxValue);

                const h = parseInt(this.height);
                const w = parseInt(this.width);

                let yTranslate = this.minY || Math.min(0, minValue);

                // This is how much 1 unit represents in pixels
                let yFactor = h / (maxValue - yTranslate);

                // Calculating the height of the zero line
                this.zeroHeight = h - ((0 - yTranslate) * yFactor);

                // Calculate the width of each bar
                let barWidth = w / this.bars.length;

                // Calculating the bars
                let bars = [];
                let xStep = barWidth;
                let xCurr = 0;
                this.bars.forEach(b => {
                    bars.push({
                        width: barWidth,
                        height: Math.abs(b * yFactor),
                        x: xCurr,
                        y: b > 0 ? h - ((b - yTranslate) * yFactor) : self.zeroHeight
                    });
                    xCurr += xStep;
                });

                console.log(bars);
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
