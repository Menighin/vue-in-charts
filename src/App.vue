<template>
    <div class="container">
        <h1>Vue In Charts</h1>

        <in-pie-chart
            :slices="pieSlices"
            :diameter="'100'" />

        <hr>

        <in-line-chart
            width="100"
            height="50"
            :showPoints="true"
            :lines="[{
                strokeColor: 'rgb(80, 200, 80)',
                data: [1, 5, 3, 8, 10],
            },
            {
                strokeColor: 'rgb(200, 80, 80)',
                data: [-1, 8, 13, 4, 7, 5],
                fillColor: ['tomato', 'brown']
            }]"
        />

        <hr>

        <in-bar-chart
            width="100"
            height="50"
            :fill-color="['tomato', 'brown']"
            :bars="[-10, 20, 40, {value: 80, fillColor: ['DeepSkyBlue', 'DodgerBlue']}, -30, 10, 25]"
            :stroke-color="'#000'"
            :padding="0"
        />

    </div>
</template>

<script>
    
    import InPieChart  from './components/InPieChart.vue';
    import InLineChart from './components/InLineChart.vue';
    import InBarChart  from './components/InBarChart.vue';

    export default {
        data() {
            return {
                pieSlices: [
                    { name: 'Slice 1', value: 90, color: '#F44336' },
                    { name: 'Slice 2', value: 70, color: '#2196F3' },
                    { name: 'Slice 3', value: 50, color: '#8BC34A' },
                    { name: 'Slice 4', value: 20, color: '#FFC107' }
                ]
            }
        },
        components: {
            InPieChart,
            InLineChart,
            InBarChart
        }
    }

</script>

<style>

    body {
    }

</style>