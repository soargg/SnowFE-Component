/*
 *   {\__/}
 *   ( •-•)
 *   /つ 移动端滑动手势：上下左右
 */
function Signal() {
    this.swipeLen = 50;
    this.slope = 0;// 斜率
    this.pageStart = {x: 0, y: 0};
    this.pageEnd = {x: 0, y: 0};
    this.deltaX = 0;
    this.deltaY = 0;
    this.isMoved = false;
    window.addEventListener('touchstart',(e)=>{
        // 触碰开始时初始化处理
        this.pageStart = {x: 0, y: 0};
        this.pageEnd = {x: 0, y: 0};
        this.deltaX = 0;
        this.deltaY = 0;
        this.isMoved = false;

        var point = getPoint(e);
        this.pageStart.x = point.pageX;
        this.pageStart.y = point.pageY;
    }, false);
    window.addEventListener('touchmove', (e)=>{
        // 阻止默认行为
        e.defaultPrevented = true;
        // 是否滑动动过
        this.isMoved = true;
        var point = getPoint(e);
        this.pageEnd.x = point.pageX ;
        this.pageEnd.y = point.pageY;
    }, false);

    window.addEventListener('touchend', (e)=>{
        if (this.isMoved) {
            this.deltaX = this.pageEnd.x - this.pageStart.x;
            this.deltaY = this.pageEnd.y - this.pageStart.y;
        }
        // 当滑动距离小于50;不做处理
        if ((Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2)) < Math.pow(this.swipeLen, 2) ) return;
        // 求斜率
        this.slope = (this.deltaY) / (this.deltaX);
        var tbLimit = Math.tan( Math.PI / 3);
        // 判断上下滑动
        if (this.slope >= tbLimit || this.slope <= -tbLimit) {
            if (this.deltaY > 0) {
                (typeof this.tobottom === 'function') && this.tobottom();
            }else {
                (typeof this.totop === 'function') && this.totop();
            }
        }
        // 判断左右滑动
        if ((this.slope >= - tbLimit / 3) && (this.slope <=  tbLimit / 3)) {
            if (this.deltaX < 0) {
                (typeof this.toleft === 'function') && this.toleft();
            }else {
                (typeof this.toright === 'function') && this.toright();
            }
        }
    },false);
    function getPoint(e) {
        return e.touches ? e.touches[0] : e;
    }
}

Signal.prototype.on = function(type, callback) {
    if (['top', 'bottom', 'left', 'right'].indexOf(type) === -1 || typeof callback !== 'function') return;
    this['to' + type] = callback;
};