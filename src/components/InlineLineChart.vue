<template>
    <div class="inline-line-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height"
            :style="`padding-top: ${paddingTop}; padding-right: ${paddingRight}; padding-bottom: ${paddingBottom}; padding-left: ${paddingLeft};`">

            <polyline :points="points" stroke="black" stroke-width="3" fill="none" />

            <polyline :points="`0,${zeroHeight} ${width},${zeroHeight}`" stroke="#aaa" stroke-width="1" fill="none" stroke-dasharray="1, 2" />

            <g>
                <circle v-for="(p, i) in points" :key="`point-${i}`" :cx="p[0]" :cy="p[1]" r="3" fill="blue" />
            </g>

        </svg>

    </div>
</template>

<script>
    export default {
        props: {
            width:         { type: String, default: '250'  },
            height:        { type: String, default: '100'  },
            data:          { type: Array,  required: true  },
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
            pointsStr() {
                let pointsStr = '';
                this.points.forEach(p =>{
                    pointsStr += `${p[0]},${p[1]} `;
                });

                return pointsStr;
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
            background: oldlace;
        }
    }

</style>
