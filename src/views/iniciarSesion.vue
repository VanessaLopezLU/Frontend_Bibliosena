<template>
  <v-app>
    <v-app-bar app dark img src="../assets/fondo2.jpg" height="180">
      <v-row>
        <v-col cols="1">
          <img src="../assets/logos/fondo1.png" style="max-height: 270px; max-width: 400px" />
        </v-col>
        <v-col cols="10">
          <h1 class="let">Sistema De Prestamos BD</h1>
        </v-col>
        <v-col cols="1">
          <v-avatar style="width: 80px; margin-top: 80px">
            <img @click="dialog = true"
              src="https://img.freepik.com/vector-premium/retrato-avatar-hombre-joven-caucasico-marco-redondo-ilustracion-plana-dibujos-animados-vector_551425-19.jpg" />
          </v-avatar>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-carousel class="carusel" :show-arrows="false" cycle="">
        <v-carousel-item v-for="(item, i) in slider" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>

      <v-dialog v-model="dialog" max-width="350" height="400" persistent>
        <div class="container h-60">
          <div class="d-flex justify-content-center h-50">
            <div class="user_card">
              <div class="justify-content-center">
                <div class="brand_logo_container">
                  <img src="../assets/logos/fondo1.png" style="max-height: 300px; max-width: 400px" />
                </div>
              </div>
              <div class="d-flex justify-content-center form_container">
                <form v-on:submit.prevent>
                  <div class="input-group mb-3">
                    <div class="input-group-append">
                      <v-icon color="#A9DFBF" style="margin: 0 7px; font-size: 30px">fas fa-user</v-icon>
                    </div>
                    <input v-model="paquete.cedula" name="" class="form-control input_user" placeholder="Username" />
                  </div>
                  <div class="input-group mb-2">
                    <div class="input-group-append">
                      <v-icon color="#A9DFBF" style="margin: 0 7px; font-size: 30px">fas fa-key</v-icon>
                    </div>
                    <input v-model="paquete.contrasena" type="password" name="" class="form-control input_pass"
                      placeholder="Password" />
                  </div>
                  <div class="d-flex justify-content-center mt-3 login_container" v-if="prueba == 0">
                    <vs-button color="#A9DFBF" @click="login">Iniciar Sesión</vs-button>


                  </div>


                </form>
              </div>

              <div class="mt-4">
                <div class="d-flex justify-content-center links">
                  <a href="#" style="color: black">¿olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-dialog>
    </v-main>
    <v-container>
      <br />
      <center>
        <H1 class="recomended">RECOMENDADOS</H1>
      </center>
      <center>
        <p>
          <b>una seleccion especial para que no dejes de leer, escuchar, ver y
            jugar.</b>
        </p>
      </center>

      <v-sheet class="mx-auto" elevation="8" max-width="1026">
        <v-slide-group v-model="model" class="pa-4" active-class="success" show-arrows>
          <v-slide-item v-for="n in items2" :key="n">
            <v-card class="ma-6" height="300" width="190">
              <v-row class="fill-height" justify="center">
                <v-img height="320" :src="n"></v-img>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-row style="margin-top: 40px"></v-row>
      <v-row class="tar">
        <v-card class="mx-auto carta" max-width="500" margin-top="80px;">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.bibliotecas.ugto.mx/pages/images/pdomicilio.png">
            <v-card-title>Prestamo de libros</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se pide prestado un libro en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              La primera es de forma presencial en tu biblioteca más cercana,
              donde tendrás que presentar tu DNI y se te dará el carné de forma
              inmediata. Otra vía consiste en rellenar el formulario online
              correspondiente a tu red de bibliotecas.
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="black" text> Share </v-btn>

            <v-btn color="black" text> Explore </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto carta1" max-width="500">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.uaa.mx/portal/wp-content/uploads/2021/01/BOLETIN-10--1024x683.jpg">
            <v-card-title>Prestamo de computadores</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se utilizan las computadoras en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              Las computadoras públicas de la biblioteca permiten a los usuarios
              buscar una gran variedad de recursos electrónicos. Las
              computadoras con recursos de la biblioteca son exclusivamente para
              buscar las existencias de la biblioteca y las bases de datos
              electrónicas seleccionadas.
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="black" text> Share </v-btn>

            <v-btn color="black" text> Explore </v-btn>
          </v-card-actions>
        </v-card>

      </v-row>
    </v-container>
    <v-row style="margin-top: 40px"></v-row>
    <footer>
      <section>
        <div>
          <br>
          <br>
          <v-row justify="center">
            <v-icon color="#21618C" style="margin: 0 10px; font-size: 30px">fab fa-facebook-f</v-icon>
            <v-icon color="#85C1E9" style="margin: 0 10px; font-size: 30px">fab fa-twitter</v-icon>
            <v-icon color="#27AE60" style="margin: 0 10px; font-size: 30px">fab fa-whatsapp</v-icon>
            <v-icon color="#7B1FA2" style="margin: 0 10px; font-size: 30px">fab fa-instagram</v-icon>
          </v-row>
        </div>
      </section>
      <v-row justify="center" class="diagonal-row">
        <v-col cols="12" md="4" class="offset diagonal-column">
          <div class="text-center">
            <v-img src="../assets/logos/fondo1.png" max-height="160" max-width="270" />
            <p style="color:black; font-family: Times, 'Times New Roman', serif; font-size: 20px;">
              El SBSENA Está conformado por el Equipo de
              Gestión, quienes tienen a su cargo la formulación y gestión de
              proyectos, la implementación y sostenibilidad del Proyecto
              Biblioteca Digital
            </p>
          </div>
        </v-col>



        <v-col cols="12" md="6" class="diagonal-column">
          <div class="text-center text-md-start">
            <br><br><br><br><br><br><br>
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i class="fas fa-home me-3"></i> Calle 24 con, Cra. 14, Montería, Córdoba</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              info@example.com
            </p>
            <p><i class="fas fa-phone me-3"></i> (94) 7838050</p>
          </div>
        </v-col>
        
       

      </v-row>


      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0)">
        © 2021 Copyright
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>

  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  data: () => ({
    valid: true,


    active: "home",
    dialog: false,
    noti: null,

    error: false,
    msg: "",
    isBusy: false,
    prueba: 0,
    array: [],
    rolMenu: [],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
    paquete: {
      cedula: null,
      contrasena: null
    },


    slider: [
      {
        src: require("../assets/carusel/biblioteca2.png"),
      },
      {
        src: require("../assets/carusel/biblioteca.png"),
      },
      {
        src: require("../assets/carusel/imag.png"),
      },
    ],
    items2: [
      {
        src: "https://stylelovely.com/wp-content/uploads/libros-el_desorden_que_dejas.jpg",
      },
      {
        src: "https://www.vanguardia.com/binrepository/1080x1080/0c0/0d0/none/12204/SFOQ/fdxvhv2xsayc2si_6472705_20211214130412.jpg",
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SfCBKYBiMAxi0tp89A0CbzdPsle4m5XoIw&usqp=CAU",
      },
      {
        src: "https://cdn.culturagenial.com/es/imagenes/a-fuego-lento-portada.jpg",
      },
    ],
  }),

  methods: {

    async login() {
      var vm = this;

      axios
        .post("http://localhost:3000/auth/login", vm.paquete)
        .then(function (response) {
          console.log(response);
          if (response.data != "") {
            vm.$store.commit('setUser', response.data);
            vm.$router.push("dashboard/welcome");
          } else {
            alert("usuario no resgistrado");
          }


        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        })
        .finally(function () {
          vm.$refs.form.reset();
        });
    }

  },

};
</script>

<style scoped>
.titulo {
  color: rgb(8, 4, 4);
  font-size: 16px;
  font-weight: bold;
  margin-top: 55px;
  font-family: "times new roman", 'cursive';
}

.let {
  font-family: Times, 'Times New Roman', serif;
  margin-top: 80px;
  font-size: 60px;
  text-align: center;
  color: rgb(0, 128, 0)
}

.tar {
  font-family: "times new roman", 'cursive';
}

footer {
  color: black;
  background-color: #32CD32;
}

.logo {
  margin-top: 25px;
}

.fondo2 {
  background-image: url("../assets/fondoTimeLine.png");
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
}

.fondoGeneral {
  background-image: url(../assets/fondo.png);
  background-size: 100% 100%;
  background-attachment: fixed;
  margin: 0;
}

.letras {
  color: white;
  margin: auto;
  text-align: center;
  font: bold 80px/1 arial;
  text-transform: uppercase;
  color: rgb(244, 244, 244);
  text-shadow: 0 2px 0 black, 0 4px 0 black, 0 6px 0 black, 0 8px 0 black,
    0 10px 0 black, 0 12px 0 black;
}

.letras2 {
  font-size: 25px;
  color: black;
  margin: auto;
  text-align: justify;
  font-family: "Mystery Quest", cursive;
}

@import url("https://fonts.googleapis.com/css?family=Mystery+Quest");

.user_card {
  height: 500px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #ffffffb9;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  margin-top: 70px;
}

.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
  margin-top: 16px;
}

.form_container {
  margin-top: 100px;
}

.login_btn {
  width: 100%;
  background: #0079c4 !important;
  color: #ffffff !important;
  font-weight: 700;
}

.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.login_container {
  padding: 0 2rem;
}

.input-group-text {
  background: #0079c4 !important;
  color: #ffffff !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}

.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
  background-color: #c0392b !important;
}

.diagonal-row {
  transform: skewY(-3deg);
}

.diagonal-column {
  transform: skewY(3deg);
}
</style>