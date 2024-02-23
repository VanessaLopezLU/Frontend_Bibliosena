<template>
  <v-card class="car" max-width="1000" style="background-color: #d6eaf8">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          src="https://acf.geeknetic.es/imagenes/auto/2023/1/3/tfl-asus-renueva-su-gama-de-portatiles-rog-strix-con-pantallas-de-hasta-1100-nits.jpg"
          height="400px"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-title class="ti"> Crear Portatil </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="paquete.codigo"
              :counter="10"
              :rules="campoRules"
              label="Codigo"
              required
            ></v-text-field>

            <v-text-field
              v-model="paquete.referencia"
              :rules="campoRules"
              label="Referencia"
              required
            ></v-text-field>

            <v-text-field
              v-model="paquete.serial"
              :rules="campoRules"
              label="Serial"
              required
            ></v-text-field>

            <v-select
              v-model="paquete.estado"
              :items="items"
              :rules="campoRules"
              label="Estado"
              required
            ></v-select>

            <v-btn
              color="success"
              class="mr-8 lighten-2"
              @click="guardar"
              small
            >
              Guardar
            </v-btn>

            <v-btn color="info" class="mr-12 lighten-2" @click="cancelar" small>
              Cancelar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,

    campoRules: [(v) => !!v || "Campo Requerido"],

    paquete: {
      codigo: null,
      serial: null,
      referencia: null,
      estado: null,
      tipo: "Portatil",
    },

    items: ["Bueno", "Malo", "Prestado", "Reparacion"],
  }),
  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()) {
        axios
          .post(" http://localhost:3000/dispositivos", this.paquete)
          .then(function (response) {
            // handle success
            console.log(response);
            alert("guardado");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            vm.$refs.form.reset();
          });
      }
      
    },
    cancelar() {
      var vm = this;
      if (this.$refs.form.validate()) {
        axios
          .post(" http://localhost:3000/dispositivos", this.paquete)
          .finally(function () {
            vm.$refs.form.reset();
          });
      }
    },
  },
};
</script>
<style>
.ti {
  color: rgb(8, 4, 4);
  font-size: 26px;
  font-family: "times new roman", cursive;
  text-align: center;
}
.car {
  background-color: #abebc6;
  margin-top: 8%;
  margin-left: -6%;
}
</style>