<template>
    <div class="inline-line-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height">

            <polyline :points="points" stroke="black" stroke-width="2" fill="none" />

            <g>
                <circle v-for="(p, i) in points" :key="`point-${i}`" :cx="p[0]" :cy="p[1]" r="2" fill="blue" />
            </g>

        </svg>

    </div>
</template>

<script>
    export default {
        props: {
            width:  { type: String, default: '250' },
            height: { type: String, default: '100' },
            data:   { type: Array,  required: true }
        },
        computed: {
            points() {
                const h = parseInt(this.height);
                const w = parseInt(this.width);
                const xStep = w / (this.data.length - 1);

                let minValue = this.data.reduce((min, val) => val < min ? val : min, this.data[0]);
                let maxValue = this.data.reduce((max, val) => val > max ? val : max, this.data[0]);

                let yFactor = h / maxValue;

                let points = [];
                let xValue = 0;
                this.data.forEach(d => {
                    let yValue = h - (d * yFactor);
                    points.push([xValue, yValue]);
                    xValue += xStep;
                });

                return points;
            },
            pointsStr() {
                let pointsStr = '';
                this.points.forEach(p =>{
                    pointsStr += `${p[0]},${p[1]} `;
                });

                return pointsStr;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .inline-line-wrapper {
        .root {
            background-color: tomato;
        }
    }

</style>
