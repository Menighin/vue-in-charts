<template>
  <div>
        <svg
            class="root"
            viewBox="-1 -1 2 2" 
            ref="svg"
            :width="diameter"
            :height="diameter"> 

            <g class="inline-pie" :transform="`rotate(${parseInt(rotate)})`">
                <path v-for="(s, i) in slices" :d="s.path" :fill="s.color" class="pie-slice" :key="`slice-${i}`" @mousemove="trackTooltip($event, s)" @mouseout="hideTooltip"></path>
            </g>

            <svg :x="-tooltipX" :y="tooltipY" class="tooltip" ref="tooltip" :style="`visibility: ${showTooltip}`">
                <rect :width="tooltipWidth" :height="tooltipHeight"></rect>
                <text ref="tooltipText" :style="`font-size: ${fontSize}`" :y="textY" :x="pixelToSvg(4)" alignment-baseline="central"> {{ tooltipText }} </text>
            </svg>

        </svg>
  </div>
</template>

<script>
    export default {
        props: {
            slices: { type: Array, default: () => [
                { name: 'Pie-to-eat', value: 90, color: '#e06557' },
                { name: 'Pie-eaten', value: 10, color: '#f3f3f3' },
            ]},
            diameter: { type: String, default: '100%' },
            rotate: { type: Number, default: -90},
        },
        computed: {
            total() {
                let total = .0;
                this.slices.forEach(slice => total += slice.value);
                return total;
            },
            tooltipTransform() {
                return `rotate(${parseInt(this.rotate)}) translate(${this.tooltipX}, ${this.tooltipY})`;
            },
            fontSize() {
                return this.desiredFontSize / this.diameter;
            },
            textY() {
                return this.desiredFontSize / this.diameter / 2 + this.pixelToSvg(12);
            }
        },
        data() {
            return {
                showTooltip: 'hidden',
                tooltipX: 0,
                tooltipY: 0,
                tooltipText: '',
                desiredFontSize: 28,
                tooltipWidth: 0,
                tooltipHeight: 0
            }
        },
        watch: {
            tooltipText() {
                this.tooltipWidth = this.$refs.tooltipText.getBBox().width + this.pixelToSvg(8);
                this.tooltipHeight = this.$refs.tooltipText.getBBox().height + this.pixelToSvg(2);
            }
        },
        methods: {
            trackTooltip(event, slice) {
                var pt = this.$refs.svg.createSVGPoint();
                pt.x = event.clientX;
                pt.y = event.clientY;
                var svgP = pt.matrixTransform(this.$refs.svg.getScreenCTM().inverse());

                this.showTooltip = 'visible';
                this.tooltipX = -svgP.x - this.pixelToSvg(15);
                this.tooltipY = svgP.y - this.pixelToSvg(20);
                this.tooltipText = slice.value;
            },
            hideTooltip() {
                this.showTooltip = 'hidden';
            },
            pixelToSvg(p) {
                return p / this.diameter;
            }
        },
        beforeMount() {
            let total = this.total;

            let cumulativePercent = 0;
            var self = this;
            this.slices.forEach(slice => {
                let percent = slice.value / total;

                const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                
                // each slice starts where the last slice ended, so keep a cumulative percent
                cumulativePercent += percent;
                
                const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

                // if the slice is more than 50%, take the large arc (the long way around)
                const largeArcFlag = percent > .5 ? 1 : 0;

                // create an array and join it just for code readability
                const pathData = [
                    `M ${startX} ${startY}`, // Move
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                    `L 0 0`, // Line
                ].join(' ');
                
                slice.path = pathData;
                slice.percentage = percent;
            
            });
        }
    }

    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }

</script>

<style lang="scss" scoped>

    $animation-duration: .1s;
    $animation-time: ease-in-out;

    .root {

        overflow: initial;
        
        .inline-pie {

            .pie-slice {
                cursor: pointer;
                transform: scale(.95, .95);

                &:hover {
                    transform: scale(1, 1);
                    opacity: 1;
                    box-shadow: 3px 3px;
                }

            }

            &:hover > * {
                opacity: 0.7;
                transition: opacity $animation-duration $animation-time, transform $animation-duration $animation-time;
            }
        }

        .tooltip {
            overflow: initial;

            rect {
                fill: rgba(255, 255, 255, 0.8);
            }

            text {
                fill: black;
                font-family: sans-serif;
            }
        }
    }

</style>
