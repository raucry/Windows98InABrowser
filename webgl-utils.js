// script.js
var vertexShader = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
    }
`;

var fragmentShader = `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;

    float iTime = 0.0;
    #define iResolution resolution

    #define ALL_COLORS 1

    // Rest of the shader code goes here...

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        // Rest of the mainImage function from your shader code...
    }

    void main() {
        iTime = time;
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

function main() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    // Inline the contents of webgl-utils.js here

    // Define the createShader, createProgram, createProgramFromSources, and resizeCanvasToDisplaySize functions here
    
    // Call the main function here
    main();
}
