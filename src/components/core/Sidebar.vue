<template>
  <v-navigation-drawer v-model="drawer" app class="fon" width="320px">
    <vuescroll :ops="ops">
      <v-img
        src="../../assets/logos/fondo1.png"
        cover
        class="margen"
        max-height="250"
        aspect-ratio="1.7"
        
      >
      </v-img> <div>
        <h1 style="text-align: center; color: #fff; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">{{ nombre }}</h1>
      </div>
       
      <v-divider> </v-divider>

      <sidebar-menu class="tipo" showOneChild :menu="menu" />
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
const menuB = require('../../json/menu');
import { SidebarMenu } from "vue-sidebar-menu";
import vuescroll from "vuescroll";

export default {
  components: {
    SidebarMenu,
    vuescroll,
  },

  props: ["drawer"],
  data: () => ({
    ops: {
      scrollPanel: {
        initialScrollY: false,
        initialScrollX: false,
        scrollingX: false,
        scrollingY: true,
        speed: 300,
        easing: undefined,
        verticalNativeBarPos: "right",
      },
      rail: {
        background: "rgba(0, 0, 0, 0.158)",
        opacity: 1,
        size: "10px",
        specifyBorderRadius: false,
        gutterOfEnds: null,
        gutterOfSide: "2px",
        keepShow: false,
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: "#0378a677",
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: 0,
        size: "9px",
        disable: false,
      },
    },

    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],

    menu: [],
  }),
   created(){
    this.nombre = this.$store.getters.getNombre;
    const rol = this.$store.getters.getRol;
    if(rol == null){
      this.$router.push('/');
    }
    switch (rol) {
      case 'Administrador':
        this.menu = menuB.Admin
        break;
        case 'Instructor':
        this.menu = menuB.Instructor
        break;
    
      default:
        break;
    }
   }, 
};
</script>
<style scoped>
.fon {
  background-image: url("../../assets/fon.png");
  background-size: 100% 100%;
  width: 100%;
  height: auto;
  margin: 0;
}
.letra {
  color: #17202a;
  font-size: 18px;
  font-family: "time new roman ", cursive;
  font-weight: bold;
}
.margen {
  margin-top: 45px;
}
.tipo {
  font-family: "time new roman ", cursive;
}
</style>