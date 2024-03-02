<template>
    <v-app-bar 
      app
      elevate-on-scroll
      elevation="8"
      relative
      height="120"
      style="background-color:#8BC34A "
     >
     
      <v-app-bar-nav-icon class="btn" dark @click="procesa()"></v-app-bar-nav-icon>

      <v-toolbar-title class="letra">Bienvenido al sistema de préstamos del SENA.</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" style="cursor:point" class="mx-5 mr-10"> 
                 
                    <v-avatar size="40">
                       <img src="https://randomuser.me/api/portraits/women/80.jpg"/>
                   
                    </v-avatar>
         </span>
      </template>
      <v-list dense
      >
       <v-list-item-group
        color="primary"
      >
        <v-list-item 
        
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-menu>
      
    </v-app-bar>
</template>

<script>
   export default {
    data() {
      return {
        items: [
        { text: 'Perfil', icon: 'mdi-clock', link:"/dashboard/salir"   },
        { text: 'Salir', icon: 'mdi-account', link:"/dashboard/salir" },
      ],
      }
    },
    methods: {
      procesa(){
        console.log("generado");
        this.$emit('handrawer');
      }
    },
   }
</script>
<style lang="scss" scoped>
   .letra{
    color: #fff  ;
    font-size: 30px;
    font-family: "time new roman", cursive;
    font-weight: 500;
   }
   
   
</style>
