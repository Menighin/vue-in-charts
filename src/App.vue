<template>
    <div class="container">
        <h1>Vue Inline Charts</h1>

        <inline-pie-chart
            :slices="pieSlices"
            :diameter="'100'" />

        <hr>

        <inline-line-chart
            :lines="[{
                fillColor: 'red',
                strokeColor: 'tomato',
                data: [1, 10, 100]
            },
            {
                fillColor: 'blue',
                strokeColor: 'cyan',
                data: [100, 10, 1]
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