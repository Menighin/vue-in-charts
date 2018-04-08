<template>
    <div class="container">
        <h1>Vue Inline Charts</h1>

        <inline-pie-chart
            :slices="pieSlices"
            :diameter="'100'" />

        <hr>

        <inline-line-chart
            :data="[20, 1, 10, 5, 25, 10, 30, 12, 5, 20, 30, 23, 22]" />

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

</style>