var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// carregando imagens
var bird = new Image();
bird.src = "images/bird.png";
var bg = new Image();
bg.src = "images/bg.png";
var chao = new Image();
chao.src = "images/chao.png";
var canoCima = new Image();
canoCima.src = "images/canocima.png";
var canoBaixo = new Image();
canoBaixo.src = "images/canobaixo.png";

//variaveis
var spacecanos = 100;
var constant;
var birdX = 33;
var birdY = 200;
var gravity = 1.4;
var score = 0;
var cano = [];

cano[0] = {
	x : canvas.width,
	y : 0
};

//carregando sons
var fly = new Audio();
fly.src = "sounds/fly.mp3";
var scor = new Audio();
scor.src = "sounds/score.mp3";

//captura de teclas
document.addEventListener("keydown",voa);

//voando
function voa(){
	birdY = birdY - 26;
	fly.play();
};

function jogo(){
	// fundo do jogo
	ctx.drawImage(bg, 0, 0);

	//criando os canos
	for(let i = 0; i < cano.length; i++){
		//posição cano de baixo
		constant = canoCima.height + spacecanos;

		//configurando posição do cano de cima
		ctx.drawImage(canoCima, cano[i].x, cano[i].y);

		//configurando posição cano de baixo
		ctx.drawImage(canoBaixo, cano[i].x, cano[i].y + constant);

		//movimentando o cano
		cano[i].x = cano[i].x - 1;

		if(cano[i].x == 125){
			console.log("chegou");
			cano.push({
				x : canvas.width,
				y : Math.floor(Math.random() * canoCima.height) - canoCima.height
			});
		} 
		//pássaro entre as bordas do cano
		if(birdX + bird.width >= cano[i].x && birdX <= cano[i].x + canoCima.width
			//passaro colidiu no cano de cima ou no cano de baixo
			&& (birdY <= cano[i].y + canoCima.height || birdY + bird.height >= cano[i].y + constant)
			//pássaro colidiu com o chão
			|| birdY + bird.height >= canvas.height - chao.height){
			location.reload();
		}

		//Marcando pontos
		if(cano[i].x == 5){
			score = score + 1;
			scor.play();
		}		
	}

	//desenhando o chão
	ctx.drawImage(chao, 0, canvas.height - chao.height);

	//desenhando o pássaro
	ctx.drawImage(bird, birdX, birdY);
	birdY += gravity;
 
	//placar
	ctx.fillStyle = "000000";
	ctx.font = "20px Verdana";
	ctx.fillText("Placar.: " + score, 10, canvas.height - 20);
	
	requestAnimationFrame(jogo);
};

jogo();

