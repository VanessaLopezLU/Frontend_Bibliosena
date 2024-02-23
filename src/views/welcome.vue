<template>
  <v-container>
    <!-- Added carousel and text at the top -->
    <v-row>
      <v-col cols="12">
        <v-carousel class="carusel" :show-arrows="false" cycle="">
        <v-carousel-item
          v-for="(item, i) in slider"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
      </v-col>
    </v-row>

    <!-- Added text at the top -->
    <v-row>
      <v-col cols="12">
        <h1 class="t">Sistema de Prestamos de Medios Audiovisuales</h1>
        <p>Los medios audiovisuales son reconocidos como aquellos medios de comunicación social que se relacionan estrechamente con la imagen, fotografía, video y audio.</p>
      </v-col>
    </v-row>

    <!-- Cards section -->
    
     
   
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Added carousel items data
      slider: [
      {
        src: require("../assets/carusel/biblioteca2.png"),
      },
      {
        src: require("../assets/carusel/biblioteca.png"),
      },
      {
        src: require("../assets/carusel/imag.png"),
      },
    ],
      // Your existing data can be added here
    
    };
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */

/* Added style for carousel image */
.carusel {
  height: 100%; /* Adjust as needed */
  width: 100%; /* Adjust as needed */
}
</style>
