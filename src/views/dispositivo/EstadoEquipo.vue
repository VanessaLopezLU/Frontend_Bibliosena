<template>
    <v-row justify="center" class="crearProducto">
    <v-card justify="center"  class="card"  style="background-color: rgba(255, 255, 255, 0.5);">
                <v-card-title class=" ti" > Crear Estado Equipo </v-card-title>
                <br>
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://pcpcsolutions.com/images/pcmantenimiento.png"></v-img>
                </v-row>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.estado" :counter="10" :rules="campoRules" label="Estado"
                            required></v-text-field>
                            <br>
                            <v-row class="d-flex justify-center">
                                <v-btn height="35px" width="120px"  color="#2ECC71" style="color: #fff ;font-size: 18px"   class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            </v-row>
                            <br>
                    </v-form>
                </v-card-text>

        <div>
        <v-toolbar  height="90px" dark prominent style="background-color: #a2ec92" elevation="7">
            <v-toolbar-title class=" text-center color-text">Listado de Estado Equipo</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" style="background-color: transparent;" class="elevation-1">
            
            
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item.id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog  height="500px" width="700px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.estadousuario" :counter="10" :rules="campoRules" label="Estado"
                        required></v-text-field>

                    <v-btn color="success" class="mr-8 lighten-2" @click="editarEstado()" small>
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
            estadousuario: null,

        },
        paqueteEditar: {
            id:null,
            estado: null,

        },
        headers: [
            { text: "Id", value: "id" },

            { text: "Estado", value: "estado" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],


    }),

    methods: {
        guardar() {
            var vm = this;
            if (this.$refs.form.validate()) {
                axios
                    .post(" http://localhost:3000/estado-equipo/crear", this.paquete)
                    .then(function (response) {

                        alert("guardado");
                        console.log(response)
                        vm.cargar()
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
        async cargar() {
            var vm = this
            await axios
                .get("http://localhost:3000/estado-equipo/")
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
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;
            this.paqueteEditar = {
                estado: item.estado,
                id : item.id
            }

            

            },
                        
         async deleteItem(id) {
            alert(id);
            await axios.delete('http://localhost:3000/estado-equipo/' + id).then(response => {
                console.log(response.data);
                this.cargar();
            
            })
        },
        async editarEstado() {
            try {
                await axios.put('http://localhost:3000/estado-equipo/actualizar',this.paqueteEditar).then(() => {
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
        this.cargar()




    },
};
</script>
  
<style>

.crearProducto{
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
      url("../../assets/fondo2.png");
      height: 300%;
  }
.ti {
    color: rgb(8, 4, 4);
    font-size: 36px;
    font-family: "times new roman", cursive;
    text-align: center !important;
  }

.image {
    max-width: 230px;
    height: 200px;
}

.color-text {
    color: #fff;
  }
.card{
    width:50%;
    height: 35%;
    
}

</style>
  