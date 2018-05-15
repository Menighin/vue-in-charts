[![Build Status](https://travis-ci.org/Menighin/vue-in-charts.svg?branch=master)](https://travis-ci.org/Menighin/vue-in-charts)
[![Coverage Status](https://coveralls.io/repos/github/Menighin/vue-in-charts/badge.svg?branch=master)](https://coveralls.io/github/Menighin/vue-in-charts?branch=master)

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

## Example
Check a working fiddle: https://jsfiddle.net/menighin/fvqb90uf/

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

| Property | Sub-Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `width` | | String | `false` | `'250'` | The width of the chart. |
| `height` | | String | `false` | `'100'` | The height of the chart. |
| `show-points` | | Boolean | `false` | `true` | Weather or not the points should be drawn. |
| `min-y` | | Number | `false`   | `null` | The minimum value for the Y axis. If none is passed, the smaller value will be used. |
| `max-y` | | Number | `false`   | `null` | The maximum value for the Y axis. If none is passed, the greater value will be used. |
| `show-tooltip` | | Boolean | `false`   | `true` | Wether to show or not the tooltip on hover |
| `lines` | | Array (of line) | `true` |       | An array containing the several lines and its properties. A line is defined as below |
| `line` | | Object | `true` |       | Object that defines a line. Should be used in am array with the `lines` property above. |
| | `data` | Array (of numbers) |  |     | An array of numbers representing the Y axis values for the line. |
| | `pointRadius` | Number | `false` |  `3`   | The radius of the point on this line. Only applicable if `show-points` is `true`. |
| | `pointColor` | String | `false` | `white` | The color for the points of this line. Only applicable if `show-points` is `true` |
| | `strokeWidth` | Number | `false` |  `2`    | The stroke width for this line. |
| | `strokeColor` | String | `true` |      | A color string fpr the line color. |
| | `fillColor` | String | `false` |      | A color string representing the color of the area below the line. |
| | `fillColor` | Array | `false` |      | An array of color strings representing the gradient of the area below the line. |
| | `fill-color`| Object | `false`   |  | An object that defines the gradient for the fill color. The properties are listed as follow. |
| | `.x1` | String | true |  | The x1 coordinate for the SVG direction. |
| | `.x2` | String | true |  | The x2 coordinate for the SVG direction. |
| | `.y1` | String | true |  | The y1 coordinate for the SVG direction. |
| | `.y2` | String | true |  | The y2 coordinate for the SVG direction. |
| | `.stops` | Array (of stop) | true |  | An array of stops.  |
| | `.stop.offset` | String | true |  | Percentage of the gradient.  |
| | `.stop.color` | String | true |  | Color of the stop.  |

### Bar Chart (InBarChart)

| Property | Sub-Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `width` | | String | `false` | `'250'` | The width of the chart. |
| `height` | | String | `false` | `'100'` | The height of the chart. |
| `min-y` | | Number | `false`   | `null` | The minimum value for the Y axis. If none is passed, the smaller value will be used. |
| `max-y` | | Number | `false`   | `null` | The maximum value for the Y axis. If none is passed, the greater value will be used. |
| `show-tooltip` | | Boolean | `false`   | `true` | Wether to show or not the tooltip on hover. |
| `stroke-width` | | Number | `false`   | `1` | The stroke width for the bars. |
| `stroke-color` | | String | `false`   | `#333` | The stroke color for the bars. |
| `padding` | | Number | `false` | `0` | The padding among the bars. |
| `fill-color` | | String | `false`   | `tomato` | The general color for each bar. |
| `fill-color` | | Array | `false`   |  | An array of string of colors. The colors will be drawn as a vertical gradient. |
| `fill-color` | | Object | `false`   |  | An object that defines the gradient for the fill color. The properties are listed as follow. |
| | `.x1` | String | true |  | The x1 coordinate for the SVG direction. |
| | `.x2` | String | true |  | The x2 coordinate for the SVG direction. |
| | `.y1` | String | true |  | The y1 coordinate for the SVG direction. |
| | `.y2` | String | true |  | The y2 coordinate for the SVG direction. |
| | `.stops` | Array (of stop) | true |  | An array of stops.  |
| | `.stop.offset` | String | true |  | Percentage of the gradient.  |
| | `.stop.color` | String | true |  | Color of the stop.  |
| `bars` | | Array (of numbers) | `true` |       | Array of numbers representing the values for the bars |
| `bars` | | Array (of objects) | `true` |       | Array of objects representing the values for the bars. A bar is defined as below |
| `bar` | | Object |  |       | Object that defines a bar. Should be used in am array with the `bars` property above. |
| | `value` | Number | `true` |     | The value for the bar. |
| | `fill-color` | | |     | This is a specific color for the bar. It overrides the `fill-color` property above and accept any format as described above |
