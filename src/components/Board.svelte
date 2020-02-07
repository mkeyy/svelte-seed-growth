<script>
    import {onMount, afterUpdate} from 'svelte';
    import {points, seeds} from '../stores.js';

    export let xSizeValue;
    export let ySizeValue;

    let canvas, ctx;
    let width, height;
    let rectWidth = 0, rectHeight = 0;
    let pointsArr, seedsArr;

    onMount(() => {
        ctx = canvas.getContext('2d');

        ctx.canvas.width = width - 40;
        ctx.canvas.height = height - 40;

        rectWidth = (width - 40) / xSizeValue;
        rectHeight = (height - 40) / ySizeValue;

        points.subscribe(v => {
            pointsArr = v;

            for (let i = 0; i < xSizeValue; i++) {
                for (let j = 0; j < ySizeValue; j++) {
                    draw(i, j, pointsArr[i][j].getColor());
                }
            }
        });

        seeds.subscribe(v => {
            seedsArr = v;
        });
    });

    function draw(i, j, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(i * rectWidth, j * rectHeight, rectWidth, rectHeight);
        ctx.fill();
    }

    function handleClick(event) {
        const bounding = canvas.getBoundingClientRect();
        const i = Math.floor((event.clientX - bounding.x) / rectWidth);
        const j = Math.floor((event.clientY - bounding.y) / rectHeight);

        if (pointsArr[i][j].state === 0) {
            pointsArr[i][j].setColor("#" + ((1 << 24) * Math.random() | 0).toString(16));
            pointsArr[i][j].setState(1);
            seedsArr.push({i, j});
        } else {
            pointsArr[i][j].setColor("#fff");
            pointsArr[i][j].setState(0);

            let index = seedsArr.indexOf({i, j});
            if (index !== -1) {
                seedsArr.splice(index, 1)
            }
        }

        points.set(pointsArr);
        seeds.set(seedsArr);
    }
</script>

<div class="ssg-board" bind:clientWidth={width} bind:clientHeight={height}>
    <canvas class="ssg-canvas" bind:this={canvas} on:click={handleClick}></canvas>
</div>

<style lang="scss" global>
    @import "../styles/settings.scss";

    .ssg-board {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 40px);
        padding: 20px;

        .ssg-canvas {
            border: 1px solid #000;
        }
    }
</style>