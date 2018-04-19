<template>
    <div class="container">
        <h1>Vue Inline Charts</h1>

        <inline-pie-chart
            :slices="pieSlices"
            :diameter="'100'" />

        <hr>

        <inline-line-chart
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
            }]"
            />

    </div>
</template>

<script>
    
    import InlinePieChart from './components/InlinePieChart.vue';
    import InlineLineChart from './components/InlineLineChart.vue';

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
            InlinePieChart,
            InlineLineChart
        }
    }

</script>

<style>

    body {
    }

</style>