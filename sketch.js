//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 3;
let velocidadeYBolinha = 3;

// variaveis raquete 
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Pontos do jogo 
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo 
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("./assets/sons/trilha.mp3");
  ponto = loadSound("./assets/sons/ponto.mp3");
  raquetada = loadSound("./assets/sons/raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificarColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluirPlacar();
  marcaPonto();

}

function mostraBolinha() {
   circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha  - raio < 0){
    velocidadeXBolinha *=-1;
  } if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
    rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  
   yRaquete = constrain(yRaquete, 10, 310);
}

// function verificarColisaoRaquete(){
//   if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
//     velocidadeXBolinha *= -1;
//   }
  
// }

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
                              xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
  
   yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
  
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(255,140,0))
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,140,0))
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente, 470,26);
  
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play()
  }
}

