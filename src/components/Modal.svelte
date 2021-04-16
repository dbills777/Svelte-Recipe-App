<script>
    let shown = false

    export function show() {
        shown = true
    }
    export function hide() {
        shown = false
    }
</script>



{#if shown}
<div class="model-wrapper">
    <div class="recipe-modal">
        <span class="close-btn" on:click={() => hide()}>&times;</span>
        <slot />
    </div>
</div>
{/if}
     
<style>
    .model-wrapper {
        background-color: rgba(0,0,0,.6);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .recipe-modal {
        background-color: white;
        max-width: 90vw;
        padding: 1rem;
        margin: 3% auto;
    }
    .close-btn {
        float: right;
        cursor: pointer;
        font-size: 1.5rem;
    }
    .close-btn:hover {
        font-weight: bold;
    }
</style>