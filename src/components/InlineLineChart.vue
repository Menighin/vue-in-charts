<template>
    <div class="inline-line-wrapper">
        <svg
            class="root"
            ref="svg"
            :width="width"
            :height="height">

            <svg class="croped" :width="width" :height="height">
                <defs>
                    <linearGradient v-for="(g, i) in gradients" :key="`gradient-${i}`" :id="`gradient-${i}`" :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2">
                        <stop v-for="(s, j) in g.stops" :key="`stop-${i}-${j}`" :offset="s.offset" :style="`stop-color:${s.color}`" />
                    </linearGradient>
                </defs>

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

                    <g v-if="showPoints">
                        <circle 
                            v-for="(p, j) in l.points" 
                            :key="`point-${i}-${j}`" 
                            :cx="p[0]" 
                            :cy="p[1]" 
                            :r="l.pointRadius || 4" 
                            :fill="l.pointColor || 'white'"
                            :stroke="l.strokeColor"
                            stroke-width="3"
                            class="line-point"
                            @mousemove="showTooltip(p)"
                            @mouseout="isShowingTooltip = false" />
                    </g>
                </g>
            </svg>

            <svg :x="tooltip.x" :y="tooltip.y" class="tooltip" ref="tooltip" :style="`visibility: ${isShowingTooltip ? 'visible' : 'hidden'}`">
                <g>
                    <rect :width="100" :height="10" />
                    <!-- <text ref="tooltipText" :style="`font-size: ${fontSize}`" :y="textY" :x="pixelToSvg(4)" alignment-baseline="central"> {{ tooltipText }} </text> -->
                </g>
            </svg>

        </svg>

    </div>
</template>

<script>
    export default {
        props: {
            width:         { type: String,  default:  '250'   },
            height:        { type: String,  default:  '100'   },
            data:          { type: Array,   required: false   },
            lines:         { type: Array,   required: true    },
            showPoints:    { type: Boolean, default:  true    },
            minY:          { type: Number,  default:  null    },
            maxY:          { type: Number,  defaukt:  null    }
        },
        data() {
            return {
                zeroHeight: 0,
                gradients: [],
                isShowingTooltip: false,
                tooltip: {
                    x: 0,
                    y: 0
                }
            }
        },
        methods: {
            showTooltip(point) {
                if (!this.isShowingTooltip) {
                    this.isShowingTooltip = true;
                    this.tooltip = {
                        x: point[0],
                        y: point[1] -20
                    }
                    console.log('show');
                }
            }
        },
        computed: {
            linesComp() {

                let self = this;

                let minValue = null;
                let maxValue = null;
                let maxRadius = 4;

                // Finding the maximum radius to pad the chart in order to not crop the circles
                maxRadius = this.lines.reduce((max, val) => val > max ? val : max, maxRadius);
                maxRadius += 3; // Add the stroke width

                // Finding the min and max Y values to calculate the yFactor and zero line position
                this.lines.forEach(l => {
                    minValue  =              l.data.reduce((min, val) => val < min || min == null ? val : min, l.data[0]);
                    maxValue  = self.maxY || l.data.reduce((max, val) => val > max || max == null ? val : max, l.data[0]);                    
                });

                const h = parseInt(this.height) - 2 * maxRadius;
                const w = parseInt(this.width) - 2 * maxRadius;

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
                    let xValue = maxRadius; // Start at maxRadius to pad the chart and dont crop the circle
                    l.data.forEach(d => {
                        let yValue = h - ((d - yTranslate) * yFactor) + maxRadius;
                        l.points.push([xValue, yValue]);
                        xValue += xStep;
                    });

                    l.fillPoints = [maxRadius, h + maxRadius].concat(l.points).concat([w + maxRadius, h + maxRadius]);

                    // Processing the fill ccolor
                    if (l.fillColor) {
                        // If it is just a string, then it is a solid color
                        if (typeof l.fillColor === 'string') {
                            l._fillColor = l.fillColor;
                        // Otherwise, it is a gradient and we need to create the necessary structure
                        } else if (l.fillColor.constructor === Object) {
                            l._fillColor = `url(#gradient-${self.gradients.length})`;

                            let gradient = { 
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
            overflow: initial;
            .croped {

                .line-point {
                    cursor: pointer;
                    transition: all .3s;

                    &:hover {
                        r: 5;
                    }

                }
            }

        }
    }

</style>
