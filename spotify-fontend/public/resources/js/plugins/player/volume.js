/* 
Rotative knob, as used in Open Stage Control 
https://github.com/jean-emmanuel/Open-Stage-Control
(copyleft © jean-emmanuel // GNU/GPL3)

This is just just a sample showing the knob widget. It's meant to be used in a chrome based application, hence compatibility issues were not taken into account.
*/


(function($) {
    
        $.event.special.drag = {
        setup: function() {
            var element = $(this),
                previousEvent = null,
                $document = $(document)

            var mousemove = function(e) {
                e.pageX = e.pageX || e.layerX
                e.pageY = e.pageY || e.layerY
                e.speedX = e.pageX - previousEvent.pageX
                e.speedY = e.pageY - previousEvent.pageY
                e.deltaX = e.speedX + previousEvent.deltaX
                e.deltaY = e.speedY + previousEvent.deltaY


                element.trigger("drag",e)
                previousEvent = e
            }
            var mouseup = function(e) {
                $document.off("mouseup")
                $document.off("mousemove")

                e.pageX = e.pageX || e.layerX 
                e.pageY = e.pageY || e.layerY 
                e.speedX = e.pageX - previousEvent.pageX
                e.speedY = e.pageY - previousEvent.pageY
                e.deltaX = e.deltaX + previousEvent.deltaX
                e.deltaY = e.deltaY + previousEvent.deltaY

                element.trigger("dragend", e)
            }
            var touchend = function(e) {
                e.preventDefault()

                e.offsetX = e.pageX-getOffset(e.target).left
                e.offsetY = e.pageY-getOffset(e.target).top
                e.speedX = e.pageX - previousEvent.pageX
                e.speedY = e.pageY - previousEvent.pageY
                e.deltaX = e.deltaX + previousEvent.deltaX
                e.deltaY = e.deltaY + previousEvent.deltaY

                element.trigger("dragend", e)
            }

            function getOffset(obj) {
                var offsetLeft = 0;
                var offsetTop = 0;
                do {
                    if (!isNaN(obj.offsetLeft)) {
                        offsetLeft += obj.offsetLeft;
                    }
                    if (!isNaN(obj.offsetTop)) {
                        offsetTop += obj.offsetTop;
                    }
                } while(obj = obj.offsetParent );

                return {left: offsetLeft, top: offsetTop};
            }

            element.on("touchstart.drag mousedown.drag", function(e) {
                e.preventDefault()

                if (!e.originalEvent.changedTouches) {
                    // mouse
                    $document.on("mousemove", mousemove)
                    $document.on("mouseup", mouseup)
                }
                e.pageX = e.pageX || e.layerX ||  e.originalEvent.changedTouches[0].pageX
                e.pageY = e.pageY || e.layerY ||  e.originalEvent.changedTouches[0].pageY
                e.offsetX = e.offsetX || e.pageX-getOffset(e.target).left
                e.offsetY = e.offsetY || e.pageY-getOffset(e.target).top


                e.speedX = 0
                e.speedY = 0
                e.deltaX = 0
                e.deltaY = 0

                element.trigger("draginit", e)
                previousEvent = e
            })
            element.on("touchmove.drag", function(e) {
                e.preventDefault()

                e.pageX = e.pageX || e.layerX ||  e.originalEvent.changedTouches[0].pageX
                e.pageY = e.pageY || e.layerY ||  e.originalEvent.changedTouches[0].pageY
                e.offsetX = e.pageX-getOffset(e.target).left
                e.offsetY = e.pageY-getOffset(e.target).top
                e.speedX = e.pageX - previousEvent.pageX
                e.speedY = e.pageY - previousEvent.pageY
                e.deltaX = e.speedX + previousEvent.deltaX
                e.deltaY = e.speedY + previousEvent.deltaY

                // do now allow two touch points to drag the same element
                if (e.originalEvent.targetTouches.length > 1) return

                element.trigger("drag",e)
                previousEvent = e

            })
            element.on("touchend.drag", touchend)
            element.on("touchcancel.drag", touchend)


        },
        teardown: function() {
            var element = $(this)
            element.off("touchstart.drag")
            element.off("touchmove.drag")
            element.off("touchend.drag")
            element.off("touchcancel.drag")
            element.off("mousedown.drag")
            element.off("mouseup.drag")
        }
    }

    init = function(){

        var widget = $('.widget'),
            wrapper = widget.find('.knob-wrapper'),
            knob = widget.find('.knob'),
            handle = widget.find('.handle'),
            input = widget.find('input'),
            range = {
                min: 0,
                max: 1
            },
            absolute = true

        knob.rotation = 0

        var offR = 0,
            offX = 0,
            offY = 0;

        wrapper.on('draginit', function(e, data) {

            var w = data.target.clientWidth,
                h = data.target.clientHeight,
                x = data.offsetX - w / 2,
                y = data.offsetY - h / 2,
                angle = Math.atan2(-y, -x) * 180 / Math.PI + 45,
                r = angle < -90 ? angle + 360 : angle

            r = (angle > -90 && angle < -45) ? 270 : r
            r = clip(r, [0, 270])

            offX = x
            offY = y

            knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            knob.rotation = r

            if (r > 180) {
                knob.addClass('d3')
            } else if (r > 90) {
                knob.removeClass('d3').addClass('d2')
            } else {
                knob.removeClass('d3 d2')
            }

            var v = mapToScale(r, [0, 270], [range.min, range.max])

            widget.trigger('sync')
            widget.showValue(v)


            offR = knob.rotation
        })

        wrapper.on('drag', function(e, data) {


            var w = data.target.clientWidth,
                h = data.target.clientHeight,
                x = data.deltaX + offX,
                y = data.deltaY + offY,
                angle = Math.atan2(-y, -x) * 180 / Math.PI + 45,
                r = angle < -90 ? angle + 360 : angle
            r = (angle > -90 && angle < -45) ? 270 : r
            r = clip(r, [0, 270])

            knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            knob.rotation = r

            if (r > 180) {
                knob.addClass('d3')
            } else if (r > 90) {
                knob.removeClass('d3').addClass('d2')
            } else {
                knob.removeClass('d3 d2')
            }

            var v = mapToScale(r, [0, 270], [range.min, range.max])

            widget.trigger('sync')
            widget.showValue(v)

        })

        widget.getValue = function() {
            return mapToScale(knob.rotation, [0, 270], [range.min, range.max])
        }

        widget.setValue = function(v, send, sync) {
            var r = mapToScale(v, [range.min, range.max], [0, 270])
            knob.rotation = r

            if (r > 180) {
                knob.addClass('d3')
            } else if (r > 90) {
                knob.removeClass('d3').addClass('d2')
            } else {
                knob.removeClass('d3 d2')
            }

            knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
            var v = widget.getValue() || v

            widget.showValue(v)

            if (sync) widget.trigger('sync')
        }
        widget.showValue = function(v) {
            input.val(v)
        }

        input.change(function() {
            widget.setValue(input.val(), true, true)
        })

        clip = function(value, range) {
            var max = Math.max,
                min = Math.min,
                value = parseFloat(value)
            if (isNaN(value)) value = range[0]

            return max(min(range[0], range[1]), min(parseFloat(value), max(range[0], range[1])))

        }

        // map a value from a scale to another input and output must be range arrays
        mapToScale = function(value, rangeIn, rangeOut, reverse) {

            var max = Math.max,
                min = Math.min,
                round = Math.round,
                value = clip(value, [rangeIn[0], rangeIn[1]])

            value = ((value - rangeIn[0]) / (rangeIn[1] - rangeIn[0])) * (rangeOut[1] - rangeOut[0]) + rangeOut[0]

            if (reverse) value = max(rangeOut[0], rangeOut[1]) + min(rangeOut[0], rangeOut[1]) - value

            value = max(min(rangeOut[0], rangeOut[1]), min(value, max(rangeOut[0], rangeOut[1])))

            value = round(value * 100) / 100

            return value

        }
    
    }
    
    init()
})(jQuery)