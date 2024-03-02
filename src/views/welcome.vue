<template>
  <v-container>
    
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

    
    <v-row>
      <v-col cols="12">
        <h1 class="t">Sistema de Prestamos de Medios Audiovisuales</h1>
        <p>Los medios audiovisuales son reconocidos como aquellos medios de comunicación social que se relacionan estrechamente con la imagen, fotografía, video y audio.</p>
      </v-col>
    </v-row>

   
    
     
   
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    
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
      
    
    };
  },
};
</script>

<style scoped>

.t{
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 40px;
}
.carusel {
  height: 100%;
  width: 100%; 
}
</style>
