<script>
  import Typeform from "svelte-typeform-embed";
  let typeformPopup;

  function openPopup() {
    return typeformPopup.open();
  }

  let value = 100;
</script>


<main>
  <h1>sveil</h1>
  <p>
    The world's finest availability input platform 
  </p>
  

  <div class="wrapper">
    <Typeform url="https://u4sz0aw1y45.typeform.com/to/Gjun4Xv1" />
  </div>

  <div class="hidden">
    <Typeform
      url="https://u4sz0aw1y45.typeform.com/to/Gjun4Xv1"
      bind:typeformPopup
      popup
      autoOpen={false} />
  </div>

  <button on:click={openPopup}>Click to open in popup mode</button>
</main>