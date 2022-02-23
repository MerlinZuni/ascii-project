// Video camera to ASCII
// Built from The Coding Train / Daniel Shiffman video tutorial


//  const density = "Ñ@#W$9876543210?!abc;:+=-,._                    "; // version 1.0 pos
const density = "                       _.,-=+:;cba!?0123456789$W#@Ñ"; // version 1.1 neg
// const density = '       .:-i|=+%O#@'; // version 2
// const density = '        .:░▒▓█'; // version 3

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(94, 58); // size of video capature (small works best)
  asciiDiv = createDiv(); // container that holds text rendered into browser 

}

function draw() {
  video.loadPixels(); // alerts p5 to read from pixels array.
  let asciiImage = ""; 
  // analyse pixel colors of RGBA
  for (let j = 0; j < video.height; j++) { // the row
    for (let i = 0; i < video.width; i++) { // the column
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3; // rgb conversion to greyscale
      const len = density.length; 
      const charIndex = floor(map(avg, 0, 255, 0, len)); // mapping to pixels to charachters

      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>'; // wrap line in the HTML DOM
  }
  asciiDiv.html(asciiImage);
}
