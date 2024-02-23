<template>
    <v-row justify="center" class="crearProducto">
        <v-card justify="center"  class="card"  style="background-color: rgba(255, 255, 255, 0.5);">
        <v-row>
            <v-col>
                <v-card-title class="text-center ti" > Estado Usuario
                 </v-card-title>
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://pcpcsolutions.com/images/pcmantenimiento.png"></v-img>
                </v-row>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.estado" :counter="10" :rules="campoRules" label="Estado"
                            required></v-text-field>

                           
                                <v-btn color="success" class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            

                    </v-form>
                </v-card-text>
            </v-col>

        </v-row>
   <v-toolbar  height="90px" dark prominent color="#A2D9CE" elevation="12">
            <v-toolbar-title class=" text-center color-text">Listado de Estado Usuario</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
            
            
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item.id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-row>
     
      

        <v-dialog  height="500px" width="700px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.estado" :counter="10" :rules="campoRules" label="Estado"
                        required></v-text-field>

                    <v-btn color="success" class="mr-8 lighten-2" @click="editarEstado()" small>
                        Editar
                    </v-btn>

                </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-row>
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
            estado: null,

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
                    .post(" http://localhost:3000/estado-usuario/crear", this.paquete)
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
                .get("http://localhost:3000/estado-usuario/")
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
            await axios.delete('http://localhost:3000/estado-usuario/' + id).then(response => {
                console.log(response.data);
                this.cargar();
            
            })
        },
        async editarEstado() {
            try {
                await axios.put('http://localhost:3000/estado-usuario/actualizar',this.paqueteEditar).then(() => {
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
    font-size: 50px;
    font-weight: 180px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serifS;
    text-align: center;
}

.image {
    max-width: 230px;
    height: 200px;
}

.color-text {
    color: #04080cd5;
  }


</style>
  