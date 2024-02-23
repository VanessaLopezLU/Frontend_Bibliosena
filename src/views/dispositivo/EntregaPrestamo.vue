<template>
    <v-card justify="center" class="crearProducto">
        <v-row max-width="50%" class=" justify-center">
            <v-card-title style="font-size: 40px; font-family:'Times New Roman', Times, cursive">
                Entrega De Dispositivos
            </v-card-title>
        </v-row>
        <br>
        <hr>
        <center>
            <div class="input">
                <h5>Cedula
                    <input v-model.number="paquete.cedula" class="mi-input" placeholder="">
                    <v-btn height="35px" color=" aliceblue" style="color: #508d42 ;font-size: 18px" class="button"
                        @click="Buscar" small>
                        Buscar
                    </v-btn>

                </h5>

                <hr>
            </div>
        </center>
        <br>
        <center>
            <h5 style="font-size: 36px; font-family:'Times New Roman', Times, serif">Prestamos</h5>
        </center>
        <v-container>
            <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
                <template v-slot:item.actions="{ item }">

                    <v-icon small class="mr-2" @click="detalle(item)" v-bind="attrs" v-on="on">
                        fas fa-check
                    </v-icon>

                </template>
            </v-data-table>

        </v-container>
        <br>
        <hr>
        <center>
            <h5 style="font-size: 35px; font-family:'Times New Roman', Times, serif">Detalle Prestamos</h5>
        </center>
        <v-container>
            <v-data-table :headers="headers2" :items="datos2" :items-per-page="5" class="elevation-1">
                <template v-slot:items.actions="{ item }">

                    <v-icon small class="mr-2" @click="detalle(item)" v-bind="attrs" v-on="on">
                        fas fa-check
                    </v-icon>

                </template>
            </v-data-table>
        </v-container>
        <br>
      
        <v-btn height="30px" color=" aliceblue" style="color: #508d42 ;font-size: 18px" class="button2" @click="procesar"
            small>
            Procesar
        </v-btn>
        <br>
        <br>
    </v-card>
</template>
  
<script>
import axios from 'axios';
export default {
    data: () => ({
        dialogoEditar: false,
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            cedula: null,
        },
        estado: {
            idPrestamo: null,
            id: 2,
        },

        headers: [
            { text: "Id", value: "id" },
            { text: "Cedula", value: "cedula.cedula" },
            { text: "Fecha Prestamo", value: "fecha_prestamo" },
            { text: "Fecha Devolucion", value: "fecha_devolucion" },
            { text: "Estado Prestamo", value: "id_estado.estado" },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        headers2: [
            { text: "Serial", value: "equipo.serial" },
            { text: 'Tipo', value: "equipo.id_tipo.tipo" },
            { text: "Fecha Prestamo", value: "fecha_prestamo" },
            { text: "Fecha Devolución", value: "fecha_devolucion" },
        ],
        datos: [],
        datos2: [],
    }),
    methods: {
        Buscar() {
            var vm = this;

            axios
                .get("http://localhost:3000/prestamo/obtenerPorCedula/" + this.paquete.cedula)
                .then(function (response) {
                    console.log(response)
                    vm.datos = response.data;


                })
                .catch(function (error) {
                    // handle error
                    alert(error);
                    console.log(error);
                })
                .finally(function () {
                    vm.$refs.form.reset();
                });

        },
        /* async cargar() {
             var vm = this
             await axios
                 .get("http://localhost:3000/prestamo/")
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
 
 
         },*/

        procesar() {
            var vm = this;

            // Actualizar el estado del préstamo
            axios.put("http://localhost:3000/prestamo/actualizar/" + vm.estado.idPrestamo, this.estado)
                .then(function (response) {
                    console.log('Estado del préstamo actualizado:', response.data);
                    alert('Estado del préstamo actualizado');
                    
                
                    vm.datos;
                })
                .catch(function (error) {
                    console.error('Error al actualizar el estado:', error);
                    console.log(vm.estado.id);
                    alert('Error al actualizar el estado del préstamo. Por favor, inténtelo de nuevo.');
                });
        },

        async detalle(item) {
            var vm = this;
            axios
                .get("http://localhost:3000/detalle-prestamo/" + item.id)
                .then(function (response) {
                    // handle success
                    vm.datos2 = response.data;
                    vm.estado.idPrestamo = item.id;

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },


        realizarAccion(item) {
            console.log('Realizando acción para el código:', item.serial);
        },
        eliminarItem(item) {
            const index = this.data.indexOf(item);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
        },







    },

};
</script>
  
<style scoped>
.mi-input {
    padding: 6px;
    font-size: 16px;
    border: 1px solid #508d42;
    border-radius: 5px;
    margin-right: 10px;
}

.tbl {
    background-color: rgba(234, 234, 234, 0.5);
}


.crearProducto {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
        url("../../assets/fondo2.png");
    height: 300%;
}

.button {
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 75px;

}

.button2 {

    color: #ffffff;
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 500px;
    font-size: 20px;

}

h5 {
    padding: 0px 20px;
}
</style>