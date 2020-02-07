<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<header class="ssg-header">
    <button type="submit" on:click|preventDefault={() => dispatch('back')}>Back</button>
    <button type="submit" on:click|preventDefault={() => dispatch('start')}>Start</button>
</header>