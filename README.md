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

## Properties

### Pie Chart (InPieChart)

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `diameter` | String | `false` | `'100%'` | The diameter of the pie. In other words, its width and height. |
| `rotate` | Number | `false` | `-90` | The rotation of the pie. -90 means the first slice will start at 90º |
| `slices` | Array (of slice) | `true`   |       | An array of objects. Each one representing a slice of the pie. |
| `slice.name` | String | `false` |       | The name of the `slice`. Will be displayed on hovering the chart |
| `slice.value` | Number | `true` |       | The value of the `slice`. Will be displayed on hovering the chart and also will be used to calculate the percentage |
| `slice.color` | String | `true` |       | Will be used to fill the slice with the color. |
