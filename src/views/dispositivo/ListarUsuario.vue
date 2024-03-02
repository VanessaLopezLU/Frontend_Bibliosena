<template>
  <v-row justify="center"  style="min-height: 200vh;"  class="crearProducto">
  <v-container justify="center">
    <v-card justify="center" max-width="2000" style="background-color: rgba(255, 255, 255, 0.5);">
        <v-toolbar  height="100px" dark prominent style="background-color: #a2ec92" elevation="7">
          <v-toolbar-title  class="text-center color-text">Listar Usuario</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" style="background-color: rgba(255, 255, 255, 0.5);" class="elevation-1">

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.cedula)">
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>
        <v-dialog height="500px" width="700px" v-model="dialogoEditar">
          <v-card>
            <v-card-title justify-center class="success lighten-2">
              Editar Usuario
            </v-card-title>
            <v-card-text>
              <v-form ref="formEditar" lazy-validation>
                <v-text-field v-model="paqueteEditar.cedula" :counter="10" :rules="campoRules"
                 label="Cedula" required>
                </v-text-field>
                <v-text-field v-model="paqueteEditar.nombre" :counter="10" :rules="campoRules" 
                label="Nombre" required>
              </v-text-field>
                <v-text-field v-model="paqueteEditar.apellido" :counter="10" :rules="campoRules" 
                label="Apellido" required>
              </v-text-field>
                <v-text-field v-model="paqueteEditar.correo" :counter="10" :rules="campoRules" 
                label="Correo" required>
              </v-text-field>
                <v-text-field v-model="paqueteEditar.telefono" :counter="10" :rules="campoRules" 
                label="Telefono" required>
              </v-text-field>
              <v-text-field v-model="paqueteEditar.usuario" :counter="10" :rules="campoRules" 
                label="Usuario" required>
              </v-text-field>
              <v-select v-model="paqueteEditar.id_rol" :items="rolDb" item-text="descripcion" item-value="id" :rules="campoRules" 
                label="Rol" required>
              </v-select>
              <v-select v-model="paqueteEditar.id_estado" :items="estadosDb" item-text="estado" item-value="id" :rules="campoRules" 
              label="Estado" required></v-select>
        
                <v-btn color="success" class="mr-4" @click="editarUser()" small>
                  Editar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-card>
  </v-container>
  </v-row>


  
</template>
      
      
<script>
import axios from "axios";
export default {
  data: () => ({
    dialogoEditar: false,
    valid: true,

    campoRules: [(v) => !!v || "Campo Requerido"],

    paqueteEditar: {
      cedula: null,
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      usuario: null,
      contrasena: null,
      id_rol: null,
      id_estado: null



    },
    rolDb: [],
    estadosDb: [],

    headers: [
      { text: "Cedula", value: "cedula" },

      { text: "Nombre", value: "nombre" },

      { text: "Apellido", value: "apellido" },

      { text: "Correo", value: "correo" },

      { text: "Telefono", value: "telefono" },

      { text: "Usuario", value: "usuario" },

      { text: "Rol", value: "id_rol.descripcion" },

      { text: "Estado", value: "id_estado.estado" },

      { text: 'Actions', value: 'actions', sortable: false },

    ],
    datos: [],


  }),

  methods: {
    async cargar() {
      var vm = this;
      await axios.get("http://localhost:3000/user").then(function (response) {
        vm.datos = response.data;
        console.log(vm.datos);
      })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    },
    async editItem(item) {
      console.log(item);
      this.dialogoEditar = true;

      this.paqueteEditar = {
        id_estado: item.id_estado.id,
        id_rol: item.id_rol.id,
        contrasena: item.contrasena,
        usuario: item.usuario,
        telefono: item.telefono,
        correo: item.correo,
        apellido: item.apellido,
        nombre: item.nombre,
        cedula: item.cedula
      }
      console.log(this.paqueteEditar);
    },
    async obtenerRol() {
      await axios.get('http://localhost:3000/rol').then(resp => {
        this.rolDb = resp.data;
      })
    },
    async obtenerEstado() {
      await axios.get('http://localhost:3000/estado-usuario').then(resp => {
        this.estadosDb = resp.data;
      })
    },



    async deleteItem(cedula) {
      alert(cedula);
      await axios.delete('http://localhost:3000/user/' + cedula).then(response => {
        console.log(response.data);
      }).finally(async () => {
        await this.cargar()
      })
    },
    async editarUser() {
      try {
        await axios.put('http://localhost:3000/user/actualizar', this.paqueteEditar).then(() => {
          this.dialogoEditar = false;
          this.cargar()
            ;
        });

      }
      catch (error) {
        this.dialogoEditar = false;
        alert(error);
      }

    }
  },
  
  async mounted() {
    this.cargar();
    this.obtenerRol();
    this.obtenerEstado();
    var vm = this;
    axios
      .get("http://localhost:3000/user/")
      .then(function (response) {
        // handle success
        vm.datos = response.data;
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
};
</script>
<style>
.ti {
  color: rgb(8, 4, 4);
  font-size: 26px;
  font-family: "times new roman", cursive;
  text-align: center;
}

.c {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.row {
  margin-top: 10px;
}
.crearProducto{
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
    url("../../assets/fondo2.png");
}
</style>