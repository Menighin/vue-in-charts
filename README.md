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

### Line Chart (InLineChart)

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `width` | String | `false` | `'250'` | The width of the chart. |
| `height` | String | `false` | `'100'` | The height of the chart. |
| `show-points` | Boolean | `false` | `true` | Weather or not the points should be drawn. |
| `min-y` | Number | `false`   | `null` | The minimum value for the Y axis. If none is passed, the smaller value will be used. |
| `max-y` | Number | `false`   | `null` | The maximum value for the Y axis. If none is passed, the greater value will be used. |
| `lines` | Array (of line) | `true` |       | An array containing the several lines and its properties. |
| `line.data` | Array (of numbers) | `true` |     | An array of numbers representing the Y axis values for the line. |
| `line.pointRadius` | Number | `false` |  `3`   | The radius of the point on this line. Only applicable if `show-points` is `true`. |
| `line.pointColor` | String | `false` | `white` | The color for the points of this line. Only applicable if `show-points` is `true` |
| `line.strokeWidth` | Number | `false` |  `2`    | The stroke width for this line. |
| `line.strokeColor` | String | `true` |      | A color string fpr the line color. |
| `line.fillColor`   | String | `false` |      | A color string representing the color of the area below the line. |
| `line.fillColor` | Array | `false` |      | An array of color strings representing the gradient of the area below the line. |
