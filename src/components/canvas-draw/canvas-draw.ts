import {Component, ViewChild, Renderer, Output, Input, EventEmitter, ElementRef} from '@angular/core';
import {Platform} from 'ionic-angular';

const POUCH = [
    {
        START: "mousedown",
        MOVE: "mousemove",
        STOP: "mouseup"
    },
    {
        START: "touchstart",
        MOVE: "touchmove",
        STOP: "touchend"
    }
];

@Component({
    selector: 'canvas-draw',
    template: `
<ion-toolbar id="top-toolbar">
<ion-buttons>
    <button ion-button (click)="success = !success">Change Color</button>
    <button  ion-button (click)="setColor('#fff')" >Erase</button> 
 </ion-buttons>   
    <div [hidden]="!success">
        <canvas #palette style="background:white;" class='center'  (colorChanged)="setColor($event)" ></canvas>
        <canvas #chooser style="background:white; margin-top: 20px; margin-bottom: 20px; " class='center'></canvas>
    </div>
</ion-toolbar>
<canvas #myCanvas (touchstart)="handleStart($event)" (touchmove)="handleMove($event)"></canvas>
<ion-toolbar id="bottom-toolbar">
    <ion-buttons>
        <button  ion-button (click)="changeSize(5)" >Small</button> 
        <button  ion-button (click)="changeSize(10)" >Medium</button> 
        <button  ion-button (click)="changeSize(15)" >Large</button> 
        <button  ion-button (click)="changeSize(20)" >Extra Large</button> 
    </ion-buttons>
</ion-toolbar>
  `
})
export class CanvasDraw {
    @ViewChild('myCanvas') canvas: any;
    @ViewChild('changeColor') changeColor: ElementRef;
    canvasElement: any;
    lastX: number;
    lastY: number;
    brushsize: number = 10;
    success: boolean = false;

    @Input() hexColor: string;

    @Output() colorChanged = new EventEmitter<String>();

    // this is the main palette
    @ViewChild("palette") palette: any;

    // this is the color chooser
    @ViewChild("chooser") chooser: any;

    ctxPalette: CanvasRenderingContext2D;

    requestAnimationFrameID: number;

    color: string;

    colorFromChooser: string;

    paletteX: number;

    paletteY: number;

    chooserX: number;


    constructor(public platform: Platform, public renderer: Renderer) {
        //console.log('Hello CanvasDraw Component');
    }

    ngAfterViewInit() {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    }

    setColor(ev: any) {
        this.color = ev;
    }

    changeSize(size) {
        this.brushsize = size;
    }

    handleStart(ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }

    handleMove(ev) {
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;

        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.brushsize;
        ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;
    }


    public ngOnInit() {
        if (this.hexColor) {
            this.colorFromChooser = this.hexColor;
        } else {
            this.colorFromChooser = "#0000FF";
        }
        this.init();
    }

    init() {
        this.initChooser();
        this.initPalette();
    }

    drawSelector(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.drawPalette(this.colorFromChooser);
        ctx.beginPath();
        ctx.arc(x, y, 10 * this.getPixelRatio(ctx), 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }

    drawChooserSelector(ctx: CanvasRenderingContext2D, x: number) {
        this.drawPalette(this.colorFromChooser);
        ctx.beginPath();
        ctx.arc(x, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.colorFromChooser;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }

    initPalette() {
        let canvasPalette = this.palette.nativeElement;
        this.ctxPalette = canvasPalette.getContext("2d");

        var currentWidth = window.innerWidth;

        var pixelRatio = this.getPixelRatio(this.ctxPalette);

        //console.log(pixelRatio);

        var width = currentWidth * 90 / 100;
        var height = width * 0.5;

        this.ctxPalette.canvas.width = width * pixelRatio;
        this.ctxPalette.canvas.height = height * pixelRatio;

        this.ctxPalette.canvas.style.width = width + "px";
        this.ctxPalette.canvas.style.height = height + "px";

        this.drawPalette(this.colorFromChooser);

        var eventChangeColor = (event) => {
            this.updateColor(event, canvasPalette, this.ctxPalette);
        };

        POUCH.forEach(pouch => {
            canvasPalette.addEventListener(pouch.START, (event) => {
                this.drawPalette(this.colorFromChooser);
                canvasPalette.addEventListener(pouch.MOVE, eventChangeColor);
                this.updateColor(event, canvasPalette, this.ctxPalette);
            });

            canvasPalette.addEventListener(pouch.STOP, (event) => {
                canvasPalette.removeEventListener(pouch.MOVE, eventChangeColor);
                this.updateColor(event, canvasPalette, this.ctxPalette);
                this.drawSelector(this.ctxPalette, this.paletteX, this.paletteY);
            });
        })
    }

    drawPalette(endColor: string) {

        this.ctxPalette.clearRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);

        var gradient = this.ctxPalette.createLinearGradient(0, 0, this.ctxPalette.canvas.width, 0);

        // Create color gradient
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(1, endColor);

        // Apply gradient to canvas
        this.ctxPalette.fillStyle = gradient;
        this.ctxPalette.fillRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);

        // Create semi transparent gradient (white -> trans. -> black)
        gradient = this.ctxPalette.createLinearGradient(0, 0, 0, this.ctxPalette.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

        // Apply gradient to canvas
        this.ctxPalette.fillStyle = gradient;
        this.ctxPalette.fillRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);
    }

    initChooser() {
        let canvasChooser = this.chooser.nativeElement;
        var ctx = canvasChooser.getContext("2d");

        var currentWidth = window.innerWidth;

        var pixelRatio = this.getPixelRatio(ctx);

        var width = currentWidth * 90 / 100;
        var height = width * 0.05;

        ctx.canvas.width = width * pixelRatio;
        ctx.canvas.height = height * pixelRatio;

        ctx.canvas.style.width = width + "px";
        ctx.canvas.style.height = height + "px";

        this.drawChooser(ctx);

        var eventChangeColorChooser = (event) => {
            this.updateColorChooser(event, canvasChooser, ctx);
            this.drawSelector(this.ctxPalette, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height / 2);
        };

        POUCH.forEach(pouch => {
            canvasChooser.addEventListener(pouch.START, (event) => {
                this.drawChooser(ctx);
                canvasChooser.addEventListener(pouch.MOVE, eventChangeColorChooser);
                this.updateColorChooser(event, canvasChooser, ctx);
                this.drawSelector(this.ctxPalette, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height / 2);
            });

            canvasChooser.addEventListener(pouch.STOP, (event) => {
                canvasChooser.removeEventListener(pouch.MOVE, eventChangeColorChooser);
                this.updateColorChooser(event, canvasChooser, ctx);
                this.drawChooser(ctx);
                this.drawChooserSelector(ctx, this.chooserX);
                this.drawSelector(this.ctxPalette, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height / 2);
            });
        });
    }

    drawChooser(ctx: CanvasRenderingContext2D) {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

        // Create color gradient
        gradient.addColorStop(0, "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");

        // Apply gradient to canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    getPixelRatio(ctx) {
        var dpr = window.devicePixelRatio || 1;

        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    }

    updateColorChooser(event, canvas, context) {
        this.color = this.colorFromChooser = this.getColor(event, canvas, context, true);
        this.colorChanged.emit(this.color);
        this.drawPalette(this.color);
    }

    updateColor(event, canvas, context) {
        this.color = this.getColor(event, canvas, context, false);
        this.colorChanged.emit(this.color);
        this.success = false;
    }

    getColor(event, canvas, context, fromChooser: boolean): string {

        var bounding = canvas.getBoundingClientRect(),
            touchX = event.pageX || event.changedTouches[0].pageX || event.changedTouches[0].screenX,
            touchY = event.pageY || event.changedTouches[0].pageY || event.changedTouches[0].screenX;

        var x = (touchX - bounding.left) * this.getPixelRatio(context);
        var y = (touchY - bounding.top) * this.getPixelRatio(context);

        if (fromChooser) {
            this.chooserX = x;
        } else {
            this.paletteX = x;
            this.paletteY = y;
        }

        var imageData = context.getImageData(x, y, 1, 1);
        var red = imageData.data[0];
        var green = imageData.data[1];
        var blue = imageData.data[2];
        return "#" + this.toHex(red) + this.toHex(green) + this.toHex(blue);
    }

    toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }

}   
