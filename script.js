const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const raqueteAltura = 100;
const raqueteLargura = 10;
const bolaRaio = 10;
let bolaVelocidadeX = 5;
let bolaVelocidadeY = 5;
let raqueteVelocidade = 10;
let fase = 1;
let pontos1 = 0;
let pontos2 = 0;

let raquete1  = { x: 30, y: canvas.height / 2 - raqueteAltura / 2, largura: raqueteLargura, altura: raqueteAltura };
let raquete2 = { x: canvas.width - 30 - raqueteLargura, y: canvas.height / 2 - raqueteAltura / 2, largura: raqueteLargura, altura: raqueteAltura };
let bola = { x: canvas.width / 2, y: canvas.height / 2, raio: bolaRaio, velocidadeX: bolaVelocidadeX, velocidadeY: bolaVelocidadeY };

const teclasPressionadas = {};

function desenharBola() {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function desenharRaquete(raquete) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(raquete.x, raquete.y, raquete.largura, raquete.altura);
}

function desenharPlacar() {
    document.getElementById('score1').textContent = pontos1;
    document.getElementById('score2').textContent = pontos2;
}


function moverBola() {
    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;

    if (bola.y - bola.raio <= 0 || bola.y + bola.raio >= canvas.height) {
        bola.velocidadeY = -bola.velocidadeY;
    }

    if (bola.x - bola.raio <= raquete1.x + raquete1.largura && bola.y >= raquete1.y && bola.y <= raquete1.y + raquete1.altura) {
        bola.velocidadeX = -bola.velocidadeX;
    }

    if (bola.x + bola.raio >= raquete2.x && bola.y >= raquete2.y && bola.y <= raquete2.y + raquete2.altura) {
        bola.velocidadeX = -bola.velocidadeX;
    }

    if (bola.x - bola.raio <= 0) {
        pontos2++;
        resetarBola();
    }
    if (bola.x + bola.raio >= canvas.width) {
        pontos1++;
        resetarBola();
    }
}

function resetarBola() {
    bola.x = canvas.width / 2;
    bola.y = canvas.height / 2;
    bola.velocidadeX = bolaVelocidadeX;
    bola.velocidadeY = bolaVelocidadeY;
}

function moverRaquete() {

    if (teclasPressionadas['w'] && raquete1.y > 0) {
        raquete1.y -= raqueteVelocidade;
    }
    if (teclasPressionadas['s'] && raquete1.y + raquete1.altura < canvas.height) {
        raquete1.y += raqueteVelocidade;
    }
    if (teclasPressionadas['ArrowUp'] && raquete2.y > 0) {
        raquete2.y -= raqueteVelocidade;
    }
    if (teclasPressionadas['ArrowDown'] && raquete2.y + raquete2.altura < canvas.height) {
        raquete2.y += raqueteVelocidade;
    }
}

function controlarTeclado(event) {
    teclasPressionadas[event.key] = event.type === 'keydown';
}

function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharBola();
    desenharRaquete(raquete1);
    desenharRaquete(raquete2);
    desenharPlacar();

    moverBola();
    moverRaquete();

    if (fase === 1 && (pontos1 + pontos2 >= 10)) {
        fase = 2;
        bola.velocidadeX *= 1.2;
        bola.velocidadeY *= 1.2;
    }

    if (fase === 2 && (pontos1 + pontos2 >= 20)) {
        fase = 3;
        raqueteVelocidade = 8;
    }

    if (fase === 3 && (pontos1 + pontos2 >= 30)) {
        fase = 4;
        bola.velocidadeX *= 1.2;
        bola.velocidadeY *= 1.2;
    }

    if (fase === 4 && (pontos1 + pontos2 >= 40)) {
        fase = 5;
        raqueteVelocidade = 6;
    }

    requestAnimationFrame(atualizarJogo);
}
function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharBola();
    desenharRaquete(raquete1);
    desenharRaquete(raquete2);
    desenharPlacar();

    moverBola();
    moverRaquete();

    if (fase === 1 && (pontos1 + pontos2 >= 10)) {
        fase = 2;
        bola.velocidadeX *= 1.2; 
        bola.velocidadeY *= 1.2;
    }

    if (fase === 2 && (pontos1 + pontos2 >= 20)) {
        fase = 3; 
        raqueteVelocidade = 8; 
    }

    if (fase === 3 && (pontos1 + pontos2 >= 30)) {
        fase = 4; 
        bola.velocidadeX *= 1.2; 
        bola.velocidadeY *= 1.2; 
    }

    if (fase === 4 && (pontos1 + pontos2 >= 40)) {
        fase = 5; 
        raqueteVelocidade = 6; 
    }

    requestAnimationFrame(atualizarJogo);
}


document.addEventListener('keydown', controlarTeclado);
document.addEventListener('keyup', controlarTeclado);

atualizarJogo();
