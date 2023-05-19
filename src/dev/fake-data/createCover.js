import { colorFromString } from './utils';

const cont = document.createElement('div');
cont.style.cssText = 'display:none';
document.body.appendChild(cont);

const w = 500, h = 500;
cont.innerHTML = `<canvas width="${w}" height="${h}" />`;
const canvas = cont.children[0];
const ctx = canvas.getContext('2d');

export default (title, width=w, height=h) => {
    if(width !== w) {
        canvas.width = width;
    }
    if(height !== h) {
        canvas.height = height;
    }
    
    ctx.clearRect(0, 0, width, height);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = colorFromString(title);
    ctx.fill();

    const size = height/6;
    ctx.font = `bold ${size}px helvetica`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    //ctx.fillText(title, width/2, height/2);

    let words = title.split(' ');
    let y = 0;
    for(let word of words) {
        ctx.fillText(word, width/2, y+=size);
    }
    return canvas.toDataURL();
}