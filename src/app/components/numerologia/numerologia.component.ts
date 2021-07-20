import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numerologia',
  templateUrl: './numerologia.component.html',
  styleUrls: ['./numerologia.component.sass']
})
export class NumerologiaComponent implements OnInit {
  myStyle = {};
  parametros = {};
  constructor() { }

  ngOnInit() {
    this.myStyle = {
      width: '100%',
      height: '100vh',
      'z-index': -1,
      // 'background-color': '#6218b6',
      'background-image': 'linear-gradient(to top, #F5AB00, #fed900)'
    };
    this.parametros = {
      "particles": {
        "number": {
          "value": 19,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "https://loteriademanizales.com/assets/img/fortunato.png",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 86.80624057954999,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 694.4499246363999,
          "color": "#ffffff",
          "opacity": 0.05524033491425909,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "top",
          "random": true,
          "straight": false,
          "out_mode": "bounce",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 2998.7610382026364,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 4,
            "duration": 0.3,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
    console.log(this.parametros);
  }

}
