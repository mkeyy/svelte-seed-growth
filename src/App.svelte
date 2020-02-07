<script>
    import Header from './components/Header.svelte';
    import Board from './components/Board.svelte';
    import Settings from './components/Settings.svelte';
    import Point from './Point.js';
    import {size, points, seeds} from './stores.js';

    let settings = false;
    let xSizeValue, ySizeValue;
    let pointsArr, seedsArr;

    size.subscribe(v => {
        xSizeValue = v.x;
        ySizeValue = v.y;
    });

    points.subscribe(v => {
        pointsArr = v;
    });

    seeds.subscribe(v => {
        seedsArr = v;
    });

    function handleSettings() {
        for (let i = 0; i < xSizeValue; i++) {
            pointsArr[i] = [];

            for (let j = 0; j < ySizeValue; j++) {
                pointsArr[i][j] = new Point();
            }
        }

        points.set(pointsArr);
        settings = true;
    }

    function handleStart() {
        seedsArr.forEach((seed) => {
            let color = pointsArr[seed.i][seed.j].getColor();

            if (((seed.j - 1) >= 0) && (pointsArr[seed.i][seed.j - 1].state === 0)) {
                pointsArr[seed.i][seed.j - 1].state = 1;
                pointsArr[seed.i][seed.j - 1].setColor(color);
                seedsArr.push({i: seed.i, j: seed.j - 1});
            }
            if (((seed.j + 1) < pointsArr[seed.i].length) && (pointsArr[seed.i][seed.j + 1].state === 0)) {
                pointsArr[seed.i][seed.j + 1].state = 1;
                pointsArr[seed.i][seed.j + 1].setColor(color);
                seedsArr.push({i: seed.i, j: seed.j + 1});
            }
            if (((seed.i - 1) >= 0) && (pointsArr[seed.i - 1][seed.j].state === 0)) {
                pointsArr[seed.i - 1][seed.j].state = 1;
                pointsArr[seed.i - 1][seed.j].setColor(color);
                seedsArr.push({i: seed.i - 1, j: seed.j});
            }
            if ((seed.i + 1) < pointsArr.length && pointsArr[seed.i + 1][seed.j].state === 0) {
                pointsArr[seed.i + 1][seed.j].state = 1;
                pointsArr[seed.i + 1][seed.j].setColor(color);
                seedsArr.push({i: seed.i + 1, j: seed.j});
            }
            if (((seed.j - 1) >= 0) && ((seed.i - 1) >= 0) && (pointsArr[seed.i - 1][seed.j - 1].state === 0)) {
                pointsArr[seed.i - 1][seed.j - 1].state = 1;
                pointsArr[seed.i - 1][seed.j - 1].setColor(color);
                seedsArr.push({i: seed.i - 1, j: seed.j - 1});
            }
            if (((seed.j - 1) >= 0) && ((seed.i + 1) < pointsArr.length) && (pointsArr[seed.i + 1][seed.j - 1].state === 0)) {
                pointsArr[seed.i + 1][seed.j - 1].state = 1;
                pointsArr[seed.i + 1][seed.j - 1].setColor(color);
                seedsArr.push({i: seed.i + 1, j: seed.j - 1});
            }
            if (((seed.j + 1) < pointsArr[seed.i].length) && ((seed.i - 1) >= 0) && (pointsArr[seed.i - 1][seed.j + 1].state === 0)) {
                pointsArr[seed.i - 1][seed.j + 1].state = 1;
                pointsArr[seed.i - 1][seed.j + 1].setColor(color);
                seedsArr.push({i: seed.i - 1, j: seed.j + 1});
            }
            if (((seed.j + 1) < pointsArr[seed.i].length) && ((seed.i + 1) < pointsArr.length) && (pointsArr[seed.i + 1][seed.j + 1].state === 0)) {
                pointsArr[seed.i + 1][seed.j + 1].state = 1;
                pointsArr[seed.i + 1][seed.j + 1].setColor(color);
                seedsArr.push({i: seed.i + 1, j: seed.j + 1});
            }
        });

        points.set(pointsArr);
    }

    function handleBack() {
        settings = false;
        seeds.set([]);
    }
</script>

<main class="ssg-main">
    {#if settings}
        <Header on:start={handleStart} on:back={handleBack}/>
        <Board {xSizeValue} {ySizeValue}/>
    {:else}
        <Settings on:settings={handleSettings}/>
    {/if}
</main>

<style lang="scss" global>
    @import "./styles/global.scss";
</style>