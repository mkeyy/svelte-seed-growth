<script>
    import {size} from '../stores.js';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let xSizeValue;
    let ySizeValue;

    size.subscribe(value => {
        xSizeValue = value.x;
        ySizeValue = value.y;
    });

    function handleSubmit() {
        size.set({x: xSizeValue, y: ySizeValue});
        dispatch('settings');
    }
</script>

<div class="ssg-settings">
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" bind:value={xSizeValue}/>
        <input type="text" bind:value={ySizeValue}/>

        <button type="submit">Start</button>
    </form>
</div>

<style lang="scss" global>
    @import "../styles/settings.scss";

    .ssg-settings {
        @include ssg-size(100%, 100vh);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>