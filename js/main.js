'use strict';

window.onload=function(){
  function Card(suit,num){
    this.suit=suit;
    this.num=num;
     this.front;
    this.setFront=function(){
      this.front=`${this.suit}${('0'+this.num).slice(-2)}.gif`;
    };
  }
  const cards=[];
  const suits=['s','d','h','c'];
  for(let i=0;i<suits.length;i++){
    for(let j=1;j<=13;j++){
      let card=new Card(suits[i],j);
      card.setFront();
      cards.push(card);
    }
  }

  function shuffle(){
    let i=cards.length;
    while(i){
      let index=Math.floor(Math.random()*i--);
      var temp=cards[index];
      cards[index]=cards[i];
      cards[i]=temp;
    }
  }
  shuffle();
  const table=document.getElementById('table');
  for(let i=0;i<suits.length;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<13;j++){
      let td=document.createElement('td');
      let tempCard=cards[i*13+j];
      td.classList.add('card','back');
      td.onclick=flip;
      //以下を追加
      td.num=tempCard.num;
      td.style.backgroundImage=`url(images/${tempCard.front})`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  
  //以下の変数を追加
  let firstCard=null;
  let flipTimerId=NaN;
  var score=0;//Player1の得点
  var score1=0;//Player2の得点
  var player=1;//0のときPlayer1,1のときPlayer2
  var str1 = "Player1の手番です";
  var str2 = "Player2の手番です";
  var winner1 ="Player2の勝利";
  var winner2 = "Player1の勝利";
  var winner3 = "Drow";
  var str = "続けて引いてください";
  var seikai = new Audio("seikai.mp3");
  var matigai = new Audio("Wrong.mp3");
   document.getElementById('p2').textContent = str1;
   document.getElementById('s1').textContent = score;
   document.getElementById('s2').textContent = score1;
  function flip(e){
    let td=e.target;
    //下の一行をコメントアウト
    //td.classList.toggle('back');
    //以下を追記
    
    if(!td.classList.contains('back') || flipTimerId){
      return;//表のカードをクリックしても何もしない。
    }
    td.classList.remove('back');//カードを表にする。
     document.getElementById('p1').textContent ="";
    
    if(firstCard===null){
      firstCard=td;//1枚目だったら今めくったカードをfirstCardに設定
    }else{
      //2枚目だったら1枚目と比較して結果を判定する。
      if(firstCard.num===td.num){
        //2枚が同じだった時の処理
         firstCard=null;
        if(player===0){
    score++;
    document.getElementById('s1').textContent = score;
    }
    else{
        score1++;
        document.getElementById('s2').textContent = score1;
    }
        seikai.play();
         if(score<score1){
             document.getElementById('win').textContent = winner2;
         }
         else if(score==score1){
             document.getElementById('win').textContent = winner3;
         }
         else{
            document.getElementById('win').textContent = winner1;
         }
      document.getElementById('p1').textContent = str ;
      
      }else{
        flipTimerId=setTimeout(function(){
          matigai.play();
          firstCard.classList.add('back');
          td.classList.add('back');
          flipTimerId=NaN;
          firstCard=null;
    if(player===0){
        player=1;
        document.getElementById('p2').textContent = str1;
    }
    else{
        player=0;
         document.getElementById('p2').textContent = str2;
    }
    },1200);
        document.getElementById('p1').textContent ="";
      }
    }
  }
}

