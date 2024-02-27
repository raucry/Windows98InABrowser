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

    var program = webglUtils.createProgramFromSources(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var positionLocation = gl.getAttribLocation(program, 'a_Position');
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        1, -1,
        -1,  1,
        -1,  1,
        1, -1,
        1,  1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var resolutionLocation = gl.getUniformLocation(program, 'resolution');
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    var timeLocation = gl.getUniformLocation(program, 'time');

    function render(now) {
        now *= 0.001;
        gl.uniform1f(timeLocation, now);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
