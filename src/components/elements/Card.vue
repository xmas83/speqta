<template>
    <div class="flip-card flip-card-3d main-features mb-4 card">
        <div class="icon-box flip-front">
            <figure class="card-media">
                <a href="#">
                    <img
                            :src="card.image"
                            alt="large-picture"
                            class="w-100"
                            :width="card.width"
                            :height="card.height"
                    />
                </a>
            </figure>
        </div>
        <div class="icon-box flip-back bg-gradient">
            <div class="flip-content text-center w-100">
                <h5 class="text-white card-title">{{card.title}}</h5>
                <h2 class="text-white card-year">{{card.year}}</h2>
                <h6 class="text-white card-actor">Actor: {{card.actor}}</h6>
                <h6 class="text-white card-director">Director: {{card.director}}</h6>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      card: Object
    }
  };
</script>
