/**
 * Created by Farris on 2018-08-20.
 */

 export default class Slide {
    constructor(element, range) {
        this.element = element;    //目标DOM元素
        this.range = range || 20;  //滑动距离，大于或者等于这个值时才算有效的滑动
        this.moving = false;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
    }

    slideUp(callback) {
        this.slide("up", callback);
    }

    slideDown(callback) {
        this.slide("down", callback);
    }

    slideLeft(callback) {
        this.slide("left", callback);
    }

    slideRight(callback) {
        this.slide("right", callback);
    }

    slide(direction, callback) {
        this.element.addEventListener('touchstart', e => this.touchstart(e), false);
        this.element.addEventListener('touchmove', e => this.touchmove(e), false);
        this.element.addEventListener('touchend', e => this.touchend(direction, callback, e), false);
    }

    touchstart(e) {
        let touches = e.touches[0];
        let {clientX, clientY} = touches;
        [this.startX, this.startY] = [clientX, clientY];
        this.moving = false;
    }

    touchmove(e) {
        this.moving = true;
    }

    touchend(direction, callback, e) {
        if (!this.moving) {
            return;
        }
        let cb = (...args) => typeof callback === "function" && callback(...args);
        let touches = e.changedTouches[0];
        let {clientX, clientY} = touches;
        [this.endX, this.endY] = [clientX, clientY];
        let distanceX = this.startX - this.endX;
        let distanceY = this.startY - this.endY;
        let action = Math.abs(distanceX) >= Math.abs(distanceY) ? "left-right" : "up-down";
        if (action === "left-right") {
            if (distanceX < -this.range) {
                direction === "right" && cb();
            } else if (distanceX > this.range) {
                direction === "left" && cb();
            }
        } else if (action === "up-down") {
            if (distanceY < -this.range) {
                direction === "down" && cb();
            } else if (distanceY > this.range) {
                direction === "up" && cb();
            }
        }
    }
}
