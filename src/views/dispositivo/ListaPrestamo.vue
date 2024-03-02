<template>
    <v-row justify="center" class="crearProducto">
      <v-container justify="center" max-width="100%">
  
        <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
          
          <br>
          <template>
            
            <center>
              <v-simple-table class="tabla">
                <template v-slot:default>
                 
                  
                  <tbody>
                    <tr v-for="(item, index) in paquete.detalleprestamo" :key="index">
                      <td class="text-center">
                        {{ getDescripcionTipo(item.id_tipo) }}
                      </td>
                      <td class="text-center">
                        {{ item.cantidad }}
                      </td>
                      <td class="text-right">
                        <v-icon small @click="borrar(index)"> mdi-delete </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </center>
          </template>
          <br>
          <br>
          <div>
            <v-toolbar height="90px" dark prominent style="background-color: #6cd255" elevation="16">
              <v-row style="margin-top: 10px; font-size: 39px;" class="d-flex justify-center">
                <v-toolbar-title class=" text-center color-text">Lista de prestamo</v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-data-table :headers="headers"   :items="datos" :items-per-page="5" class="elevation-1">
              <template v-slot:item.actions="{ item }">
                
                <v-icon
                    small
                    class="mr-2"
                    @click="guardarID(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    fas fa-eye
                  </v-icon>
                  <v-icon small @click="deleteItem(item.id)">
                    mdi-delete
                  </v-icon>
              </template>
            </v-data-table>
          </div>
        </v-card>
  
        <!--Modal de confirmacion  para  editar -->
        <v-dialog v-model="dialog" max-width="700px">
          <template>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left"> Id</th>
                    <th class="text-left">Tipo</th>
                    <th class="text-left">Serial del equipo</th>
                    <th class="text-left">Fecha de prestamo</th>
                    <th class="text-left">Fecha de devolucion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(items, index) in datos2.detalleprestamo" :headers2="headers2" :key="items.id">
                    <td>{{ datos2.id}}</td>
                    <td>{{ datos2.detalleprestamo[index].equipo.id_tipo.tipo }} </td>
                    <td>{{ datos2.detalleprestamo[index].equipo.serial}}</td>
                    <td>{{ formatearFecha(datos2.fecha_prestamo) }}</td>
                    <td>{{ formatearFecha(datos2.fecha_devolucion) }}</td>
                  </tr>
                 
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-dialog>
  
  
        <!-- Modal de confirmación para eliminar -->
      <v-dialog v-model="dialog2" max-width="290">
        <v-card>
          <v-card-title class="text-h8">
            Estas seguro de eliminar el equipo
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue lighten-2"
              text
              @click="eliminar(), (dialog2 = false)"
            >
              Confirmar
            </v-btn>
            <v-btn color="indigo" text @click="dialog2 = false">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-container>
    </v-row>
  </template>
  
  <script>
  import axios from "axios";
  
  
  export default {
    data: () => ({
      API : process.env.VUE_APP_API,
      rules: [
        (value) => !!value || "Requerido.",
        (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
      ],
      tipo_equipo: null,
      
      valid: true,
      sheet: false,
      dates: ["", ""],
      objConfimacion: { numero: null, id: null },
      horaInicio: "",
      horaFinal: "",
      confirmacion: false,
      showDatePickerDialog: false,
      showHoraInicioDialog: false,
      showHoraFinalDialog: false,
      detalleprestamo: { id_tipo: null, cantidad: null },
      dialog: false,
      dialog2: false,
      search:"",
      paqueteEditar: {
        id: null,
        serial: null,
        fecha_prestamo: null,
        fecha_devolucion:null,
       
      },
  
      paquete: {
        fecha_prestamo: null,
        fecha_devolucion: null,
        cedula:null,
        id_estado: 1,
        detalleprestamo: [
  
        ],
  
      },
      nameRules: [(v) => !!v || "Campo requerido"], 
      estadodB: [],
      usuarioDB: [],
  
    
      headers: [
        { text: "Id", value: "id" },
        { text: "Cedula", value:"cedula.cedula" },
        { text: "Fecha Prestamo", value: "fecha_prestamo" },
        { text: "Fecha Devolucion", value: "fecha_devolucion" },
        { text: "Estado Prestamo", value: "id_estado.estado" },
  
        { text: 'Actions', value: 'actions', sortable: false },
  
  
      ],
    
      datos: [],
     
      
    }),
  
    watch: {
      horaInicio: {
        handler() {
          this.paquete.fecha_prestamo = this.dates[0] + " " + this.horaInicio;
        },
        deep: true,
      },
      horaFinal: {
        handler() {
          this.paquete.fecha_devolucion = this.dates[1] + " " + this.horaFinal;
        },
        deep: true,
      },
      dates: {
        handler() {
          this.paquete.fecha_prestamo = this.dates[0] + " " + this.horaInicio;
          this.paquete.fecha_devolucion = this.dates[1] + " " + this.horaFinal;
        },
        deep: true,
      },
    },
    computed: {
      dateRangeText() {
        return this.dates.join(" ");
      },
    },
  
    methods: {
      guardarID(item) {
        this.datos2=item;
        this.dialog= true;
      },
      async detalle(item) {
        var vm = this;
        await axios
          .get("http://localhost:3000/detalle-prestamo/" + item)
          .then(function (response) {
            // handle success
            vm.datos2 = response.data;
            console.log(vm.datos2);
            
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      },
      getDescripcionTipo(id){
        const tipo = this.tipo_equipo.find ((te) =>  te.id===id);
        return tipo ? tipo.tipo: "N/A";
  
      },
      async listartipoequipo() {
        var vm = this;
        await axios.get('http://localhost:3000/tipo-equipo')
        .then(function (response) {
            // handle success
            vm.tipo_equipo = response.data;
            console.log(vm.tipo_equipo);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            vm.$refs.form.reset();
          });
      },
      guardar() {
        if (
          this.$refs.form.validate() &
          (this.detalleprestamo.id_tipo != null) &
          (this.detalleprestamo.cantidad != null)
        ) {
          this.paquete.detalleprestamo.push({ ...this.detalleprestamo });
          this.detalleprestamo.id_tipo = null;
          this.detalleprestamo.cantidad = null;
        } else {
          alert("Por favor llene todos los campos");
        }
      },
      borrar(index) {
        this.paquete.detalleprestamo.splice(index, 1);
  
        alert("Borrado exitoso");
      },
      Prestar() {
        var vm = this;
        if (this.$refs.form.validate()){
          axios
            .post("http://localhost:3000/prestamo/crear", this.paquete)
            .then( (response) => {
              
              vm.cargar()
              console.log(response);
              if (response.data == "vacio") {
                  alert("No hay equipos disponibles");
                } else {
                  if (response.data.numero > 0) {
                    /* Swal.fire(
                      " la cantidad de equipos disponible es:" +
                        response.data.numero +
                        "¿quieres prestarlos?"
                    ); */
                    vm.objConfimacion.numero = response.data.numero;
                    vm.confirmacion = true;
                  } else {
                    alert("Prestamo exitoso");
                  }
                }
            })
            .catch(function (error) {
              // handle error
              alert(error);
              console.log(error);
            })
            .finally(function () {
             /* vm.$refs.form.reset();*/
            });
            
        }else{
          alert("Registre primero el prestamo");
        }
  
      },
      eliminarDetalle() {
        var vm = this;
        axios
          .delete("http://localhost:3000/detalle-prestamo/", vm.objConfimacion.id)
          .then(function (response) {
            console.log(response);
            alert("cancelacion exitosa");
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {});
      },
  
  
      async listarEquipo() {
        await axios.get('localhost:3000/equipo/Estado').then(resp => {
          this.equipoDB = resp.data;
        })
      },
  
    
      async listarusuario() {
        await axios.get('http://localhost:3000/user').then(resp => {
          this.usuarioDB = resp.data;
        })
      },
      async listarestado() {
        await axios.get(`${this.API}/estado-prestamo`).then(resp => {
          this.estadodB = resp.data;
        })
      },
  
      editItem(item) {
        console.log(item);
        this.dialog = true;
  
        this.paqueteEditar = {
        
          fecha_devolucion:item.fecha_devolucion,
          fecha_prestamo: item.fecha_prestamo,
          serial: item.serial,
          id: item.id
        }
      },
  
      async cargar() {
        var vm = this
        this.listarusuario();
        const cedula = this.$store.getters.getCedula;
        await axios
          .get(`${this.API}/prestamo/${cedula}` )
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
        await axios.delete('http://localhost:3000/prestamo/' + id).then(response => {
          console.log(response.data);
          this.cargar();
  
        })
      },reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },
      saveDateRange() {
        this.showDatePickerDialog = false;
      },
      saveHoraInicio() {
        this.showHoraInicioDialog = false;
      },
      cancelHoraInicio() {
        this.showHoraInicioDialog = false;
      },
      saveHoraFinal() {
        this.showHoraFinalDialog = false;
      },
      cancelHoraFinal() {
        this.showHoraFinalDialog = false;
      },
      formatearFecha(fecha) {
        const fechaObj = new Date(fecha);
        const opcionesFecha = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const opcionesHora = {
          hour: "2-digit",
          minute: "2-digit",
        };
  
        const fechaFormateada = fechaObj
          .toLocaleDateString("en-US", opcionesFecha)
          .replace(/\//g, "-"); // Reemplazar barras con guiones
  
        const horaFormateada = fechaObj.toLocaleTimeString("en-US", opcionesHora);
  
        return `${fechaFormateada} - ${horaFormateada}`;
      },
    },
    mounted() {
      this.cargar();
      this.listartipoequipo();
      this.listarusuario();
      this.listarestado();
      this.listartipoequipo();
      const rol = this.$store.getters.getRol;
      console.log(this.$store.getters.getUsuario);
     if(rol=='Instructor'){
       this.paquete.cedula=this.$store.getters.getUsuario.cedula;
      }
      var vm = this;
      axios
        .get("http://localhost:3000/prestamo")
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
    font-size: 36px;
    font-family: "times new roman", cursive;
    text-align: center;
    float: center;
  
  }
  
  .button {
    display: flex;
    justify-content: center;
  }
  
  .container {
    max-width: 85% !important;
  }
  
  .crearProducto {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
      url("../../assets/fondo2.png");
    width: 110%;
    height: 300%;
  
  }
  </style>