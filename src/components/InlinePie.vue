<template>
  <div>
        <svg
            class="inline-pie"
            viewBox="-1 -1 2 2" 
            :style="'transform: rotate(' + rotate + ')'" 
            ref="svg"
            :width="width"
            :height="height"> 

            <path v-for="(s, i) in slices" :d="s.path" :fill="s.color" class="pie-slice" :key="`slice-${i}`" @mousemove="trackTooltip($event, s)" @mouseout="hideTooltip"></path>

            <text class="tooltip" ref="tooltip" :x="tooltipX" :y="tooltipY" :visibility="showTooltip" 
              :style="'font-size: 0.1px; transform: rotate(' + (-parseInt(rotate)) + 'deg)'">{{ tooltipText }}</text>

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
            width: { type: String, default: '100%' },
            height: { type: String, default: '100%' },
            rotate: { type: String, default: '-90deg'}
        },
        computed: {
            total() {
                let total = .0;
                this.slices.forEach(slice => total += slice.value);
                return total;
            }
        },
        data() {
            return {
                showTooltip: 'hidden',
                tooltipX: 0,
                tooltipY: 0,
                tooltipText: ''
            }
        },
        methods: {
            trackTooltip(event, slice) {

                var pt = this.$refs.svg.createSVGPoint();
                pt.x = event.clientX;
                pt.y = event.clientY;
                var svgP = pt.matrixTransform(this.$refs.svg.getScreenCTM().inverse());

                this.showTooltip = 'visible';
                this.tooltipX = svgP.y + 0.1;
                this.tooltipY = -svgP.x + 0.1;
                this.tooltipText = slice.value;
            },
            hideTooltip() {
                this.showTooltip = 'hidden';
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

<style lang="scss">

    $animation-duration: .1s;
    $animation-time: ease-in-out;

    .inline-pie {

        overflow: initial;

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

</style>
