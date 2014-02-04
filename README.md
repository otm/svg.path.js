svg.path.js
===========

This is a plugin for the [svg.js](http://svgjs.com) library to which provides helper functions when drawing paths.

svg.path.js is licensed under the terms of the MIT License.

## Usage

Include this plugin after including svg.js in your html document.

## Examples
There are live examples at http://otm.github.io/svg.path.js/

## Introduction

Paths consist of combinations the following elements:

* Moveto
* Lineto
* Curveto
* Arcto
* ClosePath

The different commands are case-sensitive; an upper-case command specifies its arguments as absolute positions, while a lower-case command specified points relative to the current position. It is always possible to specify a negative value as an argument to a command: negative angles will be anti-clockwise, absolute x and y positions will be taken as negative coordinates, negative relative x values will move to the left, and negative relative y values will move upwards.

## Futher reading
For more information regarding drawing paths the following resources are quite good:
* http://commons.oreilly.com/wiki/index.php/SVG_Essentials/Paths
* https://developer.mozilla.org/en-US/docs/SVG/Attribute/d


## Moveto
Moveto elements can be thought of as picking up the drawing instrument and setting it down somewhere else. There is no line drawn between the previous point and the specified point. It is good practice to open all paths with a Moveto command, because without an initial Moveto, commands will be executed with the starting point at wherever it happened to be previously, possibly resulting in undefined behaviour.

### M({x, y})
Two parameters are required `x` and `y` and they are absolute coordinates:

```javascript
var rect = draw.path().M({x: 100, y: 100})
```

### m({dx, dy})
Two parameters are required `dx` and `dy` and they are relative coordinates:

```javascript
var rect = draw.path().m({x: 100, y: 100})
```

## Lineto
Lineto elements will draws a straight line. This line moves from the current position to the specified location.

### L({x, y})
Two parameters are required `x` and `y` and they are absolute coordinates:

```javascript
var rect = draw.path().M({x: 100, y: 100}).L({x: 150, y: 150})
```

### l({dx, dy})
Two parameters are required `dx` and `dy` and they are relative coordinates:

```javascript
var rect = draw.path().m({x: 100, y: 100}).l({x: 150, y: 150})
```

### H(x)
This is a special version of the Lineto which specifies a Horizontal movement. One parameter `x` is required and is absolute.

```javascript
var rect = draw.path().m({x: 100, y: 100}).H(150)
```

### h(dx)
This is a special version of the Lineto which specifies a Horizontal movement. One parameter `dx` is required and is relative movement to the right.

```javascript
var rect = draw.path().m({x: 100, y: 100}).h(150)
```

### V(y)
This is a special version of the Lineto which specifies a Vertival movement. One parameter `y` is required and is absolute.

```javascript
var rect = draw.path().m({x: 100, y: 100}).V(150)
```

### v(dy)
This is a special version of the Lineto which specifies a Vertival movement. One parameter `dy` is required and is the relative movement up.

```javascript
var rect = draw.path().m({x: 100, y: 100}).v(150)
```

## Curveto
Curveto commands specify a Bezier curve. There are two types of Bezier curves: Cubic and Quadratic. Quadratic Bezier curves are a special case of the Cubic bezier curves, in that the control point for each end is the same.

### C({c1x, c1y}, {c2x, c2y}, {x, y})
Cubic Bezier curves takes three objects. The two first objects are control points for the initial point and end point respectively in absolute coordinates. The last object is is the end point of the curveto segment.

```javascript
var rect = draw.path().m({x: 100, y: 100}).C({x: 100, y: 200}, {x: 200, y: 2oo}, {x: 200, y: 100})
```

### c({dc1x, dc1y}, {dc2x, dc2y}, {dx, dy})
Cubic Bezier curves in relative form takes three objects as inputs. The two first objects are control points for the initial point and end point respectively in relative coordinates. The last object is is the end point of the curveto segment. The two control points are both relative to the initial point, not the end point. dx and dy are the distance to the right and down respectively.

```javascript
var rect = draw.path().M({x: 100, y: 100}).c({x: 0, y: 100}, {x: 100, y: 100}, {x: 100, y: 0})
```

### Q({cx, cy}, {x, y})
Quadratic Bezier curves are a special case of the Cubic bezier curves, in that the control point for each end is the same. `cx` and `cy` are the absolute coordinates of the control point, and `x` and `y` are absolute coordinates of the end point.

```javascript
var rect = draw.path().M({x: 100, y: 100}).Q({x: 100, y: 200}, {x: 200, y: 100})
```

### q({dcx, dcy}, {dx, dy})
Quadratic Bezier curve in the relative form. `dcx` and `dcy` are the direction in the `x` and `y` directions of the control point. `dx` and `dy` are the distances in the x and y directions, respectively, of the end point.

```javascript
var rect = draw.path().M({x: 100, y: 100}).q({x: 50, y: 100}, {x: 100, y: 0})
```

### S({x, y}, {x, y})
For chains of smooth Bezier curves, the T and S commands are available. Their syntax is simpler than the other Curveto commands because it is assumed that the first control point is the reflection about the previous point from the previous control point, or that it actually IS the previous point if there was no previous control point. The S function will draw a Cubic Bezier segment where the two arguments are the second and third parameter in the `C` function respectively.



```javascript
var rect = draw.path()
	.M({x: 100, y: 100})
	.C({x: 100, y: 200}, {x: 200, y: 2oo}, {x: 200, y: 100})
	.S({x: 300, y:200}, {x: 300, y: 100}) // The "reflected control point will be `{x:200, y:100}`
```

 ### T({x, y})
As the `S` function is a convenience function for drawing Cubic Bezier is the `T` function a convenience function for drawing Quadratic Bezier curves. The point argument is the endpoint of the curve. The control point will be the reflectins of the previous control point, or the previous point if no control point excists.

## Arcto
The Arcto will create an elliptical curve rather than a Bezier curve. The center of the arc is calculated from the other variables. The declaration of an arcto is relatively complicated: (rp, xAxisRotate, largeArcFlag, sweepFlag, p). Where `rp` is the radius in x and y directions respectively; the `largeArcFlag` has a value of 0 or 1, and determines whether the smallest (0) or largest (1) arc possible is drawn; the `sweepFlag` is either 0 or 1, and determines if the arc should be swept in a clockwise (1) or anti-clockwise (0) direction. `p` are the end point of the path. For more informatin see [SVG Essentials](http://commons.oreilly.com/wiki/index.php/SVG_Essentials/Paths#Elliptical_Arc)

### A(rx, ry, xAxisRotate, largeArcFlag, sweepFlag, p)
```javascript
var rect = draw.path()
	.M({x: 125, y: 75})
	.A(100, 50, 0, 0, 0, {x: 225, y: 125})
```
### a(rx, ry, xAxisRotate, largeArcFlag, sweepFlag, p)
Please note that the only relative coordinate is `p`

```javascript
var rect = draw.path()
	.M({x: 125, y: 75})
	.a(100, 50, 0, 0, 0, {x: 100, y: 50})
```

## Closepath
The ClosePath command will simply draw a straight line from the current position to the first point in the path. It is the simplest command, and takes no parameters. It will take the shortest linear path to the starting point, intersecting other paths if they fall in the way.

### Z()

```javascript
var rect = draw.path()
	.M({x: 100, y: 100})
	.L({x: 150, y: 150})
	.L({x: 100, y: 150})
	.Z()
```

## Utility functions

### clear()
Clear the path from all segments.

### getSegmentCount()
Get the segment count from the path

```javascript
var rect = draw.path()
.M(10, 10)
.L(150, 10)
.L({x:150, y:150})
.Z()

console.log('Segment count: ' + rect.getSegmentCount(1))
```

### getSegment(index)
Get the segment with index `index` from the path

```javascript
var rect = draw.path()
.M(10, 10)
.L(150, 10)
.L({x:150, y:150})
.Z()

var lineSegment = rect.getSegment(1)
```

### removeSegment(index)
Remove the segement with index `index` in the path.

```javascript
var rect = draw.path()
.M(10, 10)
.L(150, 10)
.L({x:150, y:150})
.Z()

rect.removeSegment(3)
```

### replaceSegment(index, segment)
Replace a segment in the path with a new segment. 


```javascript
var rect = draw.path()
.M(10, 10)
.L(150, 10)
.L({x:150, y:150})
.Z()

var lineSegment = rect.getSegment(1)
rect.replaceSegment(1, rect.getSegment(2))
rect.replaceSegment(2, lineSegment)
```

### drawAnimated(options)
Animates the drawing of the path. It takes an optional options object which can have 
three arguments, `duration`, `delay` and `easing`. `duration` and `delay` is in milliseconds, `easing` can 
be one of the following:
 *	<>: ease in and out
 *	>: ease out
 *	<: ease in
 *	-: linear
 *	=: external control
 *	a function

You can find more documentation regarfing the easing functionality in the main svg.js documentation.

```javascript
var rect = draw.path()
.M(10, 10)
.L(150, 10)
.L({x:150, y:150})
.Z()
.drawAnimated({
	delay: 3000
})
```

### update(autoredraw)
Get and set if the path should auto redraw when updated.

```javascript
var rect = draw.path()
	.update(false)
	.M({x: 100, y: 100})
	.L({x: 150, y: 150})
	.L({x: 100, y: 150})
	.Z()

	// nothing happens until we call redraw manually
	rect.redraw()
```

### redraw()
Redraw the path manually


```javascript
var rect = draw.path()
	.update(false)
	.M({x: 100, y: 100})
	.L({x: 150, y: 150})
	.L({x: 100, y: 150})
	.Z()

	// nothing happens until we call redraw manually
	rect.redraw()
```

Copyright: Creative Commons: Attribution-Sharealike license
Attributions: [MDN](https://developer.mozilla.org/en-US/docs/SVG/Attribute/d)
