<template >
    <v-row justify="center" class="crearProducto">
        <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
            <br>
            <v-row max-width="50%" class=" justify-center">
                <v-card-title style="font-size: 50px; font-family:'Times New Roman', Times, cursive"> Crear Equipo
                </v-card-title>
            </v-row>
            <br>
            <br>
            <v-row class="d-flex justify-center align-center">
                <v-img class="image"
                    src="https://st2.depositphotos.com/1001877/5328/i/450/depositphotos_53286999-stock-photo-computer-devices-mobile-phone-laptop.jpg"></v-img>

            </v-row>
            <br>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="paquete.serial" :rules="campoRules" label="Serial" required>
                    </v-text-field>

                    <v-text-field v-model="paquete.descripcion" :rules="campoRules" label="Descripción" required>
                    </v-text-field>


                    <v-select v-model="paquete.id_tipo" :items="tipoDB" item-text="tipo" item-value="id" :rules="campoRules"
                        label="Tipo" required>
                    </v-select>

                    <v-select v-model="paquete.id_estado" :items="estadosDb" item-text="estado" item-value="id"
                        :rules="campoRules" label="Estado" required>
                    </v-select>
                    <br>
                    <vue-filepond ref="filepond" allow-multiple="false"
                        :accepted-file-types="['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
                        :max-file-size="2000000" @input-file="onInputFile"></vue-filepond>

                    <!-- Icono Adjuntar -->
                   
                       
                        <v-icon  height="35px" width="120px" justify="center" color="aliceblue"  style="color: #508d42; font-size: 38px" class="mr-12 lighten-2" @click="adjuntarArchivo">mdi-attachment</v-icon> 
                    

                    <br>
                    <v-row class="d-flex justify-center">
                        <v-btn height="35px" width="120px" justify="center" color=" aliceblue"
                            style="color: #508d42 ;font-size: 18px" class="mr-12 lighten-2" @click="guardar" small>
                            guardar
                        </v-btn>

                    </v-row>
                    <br>
                </v-form>

            </v-card-text>
            <div justify="center">
                <v-toolbar dark prominent color="#c8e4c2" elevation="7">
                    <v-toolbar-title class="t">Listado de Dispositivos</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-data-table :headers="headers" :items="datos" :items-per-page="5" style="background-color: transparent;"
                    class="elevation-1">
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.id)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
                <v-dialog height="500px" width="700px" v-model="dialogoEditar">
                    <v-card>
                        <v-card-text>
                            <v-form ref="formEditar" lazy-validation>
                                <v-text-field v-model="paqueteEditar.serial" :counter="10" :rules="campoRules"
                                    label="Serial" required>
                                </v-text-field>
                                <v-text-field v-model="paqueteEditar.descripcion" :counter="10" :rules="campoRules"
                                    label="Descripcion" required>
                                </v-text-field>
                                <v-select v-model="paqueteEditar.id_tipo" :items="tipoDB" item-text="tipo" item-value="id"
                                    :rules="campoRules" label="Tipo" required>
                                </v-select>
                                <v-select v-model="paqueteEditar.id_estado" :items="estadosDb" item-text="estado"
                                    item-value="id" :rules="campoRules" label="Estado" required>
                                </v-select>

                                <v-btn color="success" class="mr-8 lighten-2" @click="editarEquipo()" small>
                                    Editar
                                </v-btn>

                            </v-form>

                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
        </v-card>
    </v-row>
</template>
  
  
<script>
import axios from "axios";
export default {
    data: () => ({
        dialogoEditar: false,
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            id: null,
            serial: null,
            descripcion: null,
            id_estado: null,
            id_tipo: null,
        },


        estadosDb: [],
        tipoDB: [],

        paqueteEditar: {
            id: null,
            serial: null,
            descripcion: null,
            id_estado: null,
            id_tipo: null,
        },
        headers: [
            { text: "Id", value: "id" },
            { text: "Serial", value: "serial" },
            {
                text: "Descripcion",
                align: "start",
                sortable: false,
                value: "descripcion",
            },
            { text: "Tipo", value: "id_tipo.tipo" },
            { text: "Estado", value: "id_estado.estado" },
            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],
    }),

    methods: {
        guardar() {
            var vm = this;
            if (this.$refs.form.validate()) {
                axios
                    .post("http://localhost:3000/equipo/crear", this.paquete)
                    .then(function (response) {

                        alert("guardado");
                        console.log(response)
                        vm.cargar()

                    })
                    .catch(function (error) {
                        // handle error
                        alert(error);
                        console.log(error);
                    })
                    .finally(function () {
                        vm.$refs.form.reset();
                    });
            }

        },
        onInputFile(files) {
      // Verificar si se ha seleccionado un archivo
      if (files.length > 0) {
        const file = files[0];
        // Verificar si el tamaño del archivo es aceptable
        if (file.fileSize <= 2000000) { // 2 MB en bytes
          // Verificar si el archivo es de tipo Excel
          if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Si es un archivo Excel, continuar con la carga
            alert("Archivo cargado exitosamente.");
          } else {
            // Si no es un archivo Excel, mostrar un mensaje de error
            alert("Por favor seleccione un archivo Excel.");
            this.$refs.filepond.removeFiles();
          }
        } else {
          // Si el tamaño del archivo excede el límite, mostrar un mensaje de error
          alert("El archivo excede el tamaño máximo permitido (2 MB).");
          this.$refs.filepond.removeFiles();
        }
      }
    },




        async listarEstados() {
            await axios.get('http://localhost:3000/estado-equipo/').then(resp => {
                this.estadosDb = resp.data;
            })
        },
        async listarTipos() {
            await axios.get('http://localhost:3000/tipo-equipo/').then(resp => {
                this.tipoDB = resp.data;
            })

        },
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;

            this.paqueteEditar = {
                id_estado: item.id_estado.id,
                id_tipo: item.id_tipo.id,
                descripcion: item.descripcion,
                serial: item.serial,
                id: item.id
            }
        },

        async cargar() {
            var vm = this
            await axios
                .get("http://localhost:3000/equipo/")
                .then(function (response) {
                    // handle success
                    vm.datos = response.data;
                    console.log(vm.datos);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });


        },

        async deleteItem(id) {
            alert(id);
            await axios.delete('http://localhost:3000/equipo/' + id).then(response => {
                console.log(response.data);
                this.cargar();

            })
        },
        async editarEquipo() {
            try {
                await axios.put('http://localhost:3000/equipo/actualizar', this.paqueteEditar).then(() => {
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
    mounted() {
        this.cargar();
        this.listarEstados();
        this.listarTipos();
        this.adjuntarArchivo();
        var vm = this;
        axios
            .get("http://localhost:3000/equipo")
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
.crearProducto {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
        url("../../assets/fondo2.png");
}

.image {
    max-width: 400px;
    height: 250px;
}

.card {
    width: 50%;
    height: 35%;

}
</style>