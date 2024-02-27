// webgl-utils.js
// from https://webglfundamentals.org/webgl/resources/webgl-utils.js

// NOTE: This file is a utility to simplify some WebGL setup. It's not authored by me (OpenAI) and is provided as a commonly used resource in WebGL development.

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
