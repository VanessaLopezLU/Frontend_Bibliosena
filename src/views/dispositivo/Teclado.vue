<template>
<v-card class="ca" max-width="1000" style="background-color: #FCF3CF ">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          src="https://cdn.shopify.com/s/files/1/0354/1827/5972/collections/0675616d3e363e24b48eeebbd93acb69.jpg?v=1596721089"
          height="400px"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-title class="ti"> Crear teclado </v-card-title>
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
      tipo: "Teclado",
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
.ca {
  background-color: #E8DAEF ;
  margin-top: 8%;
  margin-left: -6%;
}
</style>