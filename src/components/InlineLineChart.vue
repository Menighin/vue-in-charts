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
                    :key="`line-fill-${i}`" 
                    :points="l.fillPoints" 
                    :fill="l.fillColor"
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
                zeroHeight: 0
            }
        },
        computed: {
            linesComp() {
                const h = parseInt(this.height);
                const w = parseInt(this.width);
                let self = this;

                let lines = [];

                this.lines.forEach(l => {
                    
                    const xStep = w / (l.data.length - 1);

                    let minValue = self.minY || l.data.reduce((min, val) => val < min ? val : min, l.data[0]);
                    let maxValue = self.maxY || l.data.reduce((max, val) => val > max ? val : max, l.data[0]);

                    let yFactor = h / (maxValue - Math.min(0, minValue));

                    // Calculating Y positions
                    l.points = [];
                    let xValue = 0;
                    l.data.forEach(d => {
                        let yValue = h - ((d - Math.min(0, minValue)) * yFactor);
                        l.points.push([xValue, yValue]);
                        xValue += xStep;
                    });

                    l.fillPoints = [0, parseInt(self.height)].concat(l.points).concat([parseInt(self.width), parseInt(self.height)]);

                    // Calculating the height of the zero line
                    // this.zeroHeight = h - ((0 - Math.min(0, minValue)) * yFactor);

                    lines.push(l);

                });

                return lines;
            },
            points() {
                const h = parseInt(this.height);
                const w = parseInt(this.width);
                const xStep = w / (this.data.length - 1);

                let minValue = this.minY || this.data.reduce((min, val) => val < min ? val : min, this.data[0]);
                let maxValue = this.maxY || this.data.reduce((max, val) => val > max ? val : max, this.data[0]);

                let yFactor = h / (maxValue - Math.min(0, minValue));

                // Calculating Y positions
                let points = [];
                let xValue = 0;
                this.data.forEach(d => {
                    let yValue = h - ((d - Math.min(0, minValue)) * yFactor);
                    points.push([xValue, yValue]);
                    xValue += xStep;
                });

                // Calculating the height of the zero line
                this.zeroHeight = h - ((0 - Math.min(0, minValue)) * yFactor);

                return points;
            },
            pointsPolygon() {
                return [0, parseInt(this.height)].concat(this.points).concat([parseInt(this.width), parseInt(this.height)])
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
