<template>
  <v-main class="fondo">
    <v-container>
      <v-select class="color"
        v-model="select"
        :items="items"
        :rules="campoRules"
        label="Dispositivo"
        required
      ></v-select>
      <router-view />
    </v-container>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    items: [],
    select: null,
  })
 
};
</script>
<style>


</style>