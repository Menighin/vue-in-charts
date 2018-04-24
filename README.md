# vue-in-charts
Small Vue component to build simple small charts. Intended to be placed inline boxes and tables. :bar_chart: :chart_with_upwards_trend:  

## Install

Install via npm:

    $ npm install vue-in-chart

Install via bower:

    $ bower install vue-in-chart
    
## Usage

Import the chart you want to use
``` javascript
import InPieChart from 'vue-in-charts';
```
Use it on your template. Below you can find the options for each chart.

``` html
<in-pie-chart
    :slices="[
            { name: 'Slice 1', value: 90, color: '#F44336' },
            { name: 'Slice 2', value: 70, color: '#2196F3' },
            { name: 'Slice 3', value: 50, color: '#8BC34A' },
            { name: 'Slice 4', value: 20, color: '#FFC107' }
        ]"
    :diameter="'100'" />
```
