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

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function createProgramFromSources(gl, shaderSources) {
    var shaders = shaderSources.map(function(source) {
        var type = source.type;
        var shader = createShader(gl, type, source.source);
        return shader;
    });
    return createProgram(gl, shaders[0], shaders[1]);
}

function resizeCanvasToDisplaySize(canvas) {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

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

    // Your main function code here...
}

main(); // Call the main function
