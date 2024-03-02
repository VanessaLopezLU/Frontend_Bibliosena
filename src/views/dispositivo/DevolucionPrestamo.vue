<template>
    <v-card justify="center" class="crearProducto" >
        <v-row max-width="50%" class=" justify-center">
            <v-card-title style="font-size: 40px; font-family:'Times New Roman', Times, cursive">
                Devolucion De Dispositivos
            </v-card-title>
        </v-row>
        <br>
        <hr>
       <center> <div class="input">
            <h5>Cedula
             <input  v-model.number="paquete.cedula" class="mi-input" placeholder=""> 
            </h5>
            <v-btn height="35px" color=" aliceblue" style="color: #508d42 ;font-size: 18px; display: flex;"
                      class="button" @click="Buscar" small>
                      Buscar
                    </v-btn>
        
            <hr>
        </div></center>
        <br>
        <center><h5 style="font-size: 36px; font-family:'Times New Roman', Times, serif">Prestamo</h5></center> 
        <v-container>
                <v-data-table :headers="headers"   :items="datos" :items-per-page="5" class="elevation-1">
                  <template v-slot:item.actions="{ item }">
                    
                    <v-icon
                        small
                        class="mr-2"
                        @click="detalle(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        fas fa-check
                      </v-icon>
                      
                  </template>
                </v-data-table>
           
        </v-container>
        <br>
        <hr>
       <center> <h5 style="font-size: 35px; font-family:'Times New Roman', Times, serif">Detalle</h5></center> 
        <v-container >
            <template>
                <div class="borde">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Tipo de equipo</th>
                          <th class="text-left">Serial del equipo</th>
                          <th class="text-left">Estado del equipo</th>
                          <th class="text-left">Observacion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in datos2" :key="item.index">
                          <td>{{ item.equipo.id_tipo.tipo }}</td>
                          <td>{{ item.equipo.serial }}</td>
                          <td>
                            <v-select v-model="NovedadN[index].estado" :items="estadoN" item-text="estado" item-value="id"
                                 :rules="campoRules" label="Estado " required>
                            </v-select>
                          </td>
          
                          <td>
                            <v-textarea
                              v-model="NovedadN[index].novedad"
                              type="text"
                              label="Obsevacion"
                            ></v-textarea>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                   
                   </v-simple-table>
                </div>
                </template>
        </v-container>
        <br>
       
        <v-btn height="30px" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
        class="button2" @click="procesar()" small>
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
    dialogoEditar:false,
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            cedula: null,
        },
        paqueteE:{
            id_estado: null,
        },
       
        headers: [
            { text: "Id", value: "id" },
            { text: "Cedula", value: "cedula.cedula" },
            { text: "Fecha Prestamo", value: "fecha_prestamo" },
            { text: "Fecha Devolucion", value: "fecha_devolucion" },
            { text: "Estado Prestamo", value: "id_estado.estado" },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
  
        datos: [],
        datos2:[],
        estados: [],
        estadoN:[],
        NovedadN: [],
        idNovedades:[]

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

        },
        async listarEstados() {
            await axios.get('http://localhost:3000/estado-equipo/').then(resp => {
                this.estadoN = resp.data;
            })
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
       async detalle(item) {
           this.datos2 = item.detalleprestamo;
         this.NovedadN = [];
         item.detalleprestamo.forEach(detalle => {
            this.NovedadN.push({
                prestamo: item.id,
                novedad: "",
                equipo: detalle.equipo.id,
                estado: detalle.equipo.id_estado.id,
                estado_prestamo: 3,

            })
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
        async procesar() {
            try {
                await axios.post("http://localhost:3000/novedad/crear", this.NovedadN).then(() => {
                    alert("Se creo");
                })
            }
            catch(error) {
                console.log(error);
            }
        }





    },
    mounted() {
        this.listarEstados();
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

.button{
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