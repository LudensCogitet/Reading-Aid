function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function Flashcard(sentences){
  var card = $('<div class="quiz-heading" />');
  var workingSentences = JSON.parse(JSON.stringify(sentences));

  shuffle(workingSentences);
  reset();

  function reset(){
    card.remove();
    card.show();
    card.empty();

    workingSentences.forEach((el,index)=>{card.append($("<div data-index="+index+">"+el+"</div>"));});
  }

  this.flash = (parentDiv, duration, callback)=>{
    shuffle(workingSentences);
    reset();

    $(parentDiv).append(card);
    card.fadeOut(duration,callback);
  }

  this.quiz = (parentDiv, correctCallback, wrongCallback)=>{
    reset();

    var answer = Math.floor(Math.random() * 3);

    card.prepend("<div class='quiz-heading'>"+workingSentences[answer]+"</div>");

    card.children('[data-index=0]').html("<button type='button' class='btn btn-default'>Top</button>");
    card.children('[data-index=1]').html("<button type='button' class='btn btn-default'>Middle</button>");
    card.children('[data-index=2]').html("<button type='button' class='btn btn-default'>Bottom</button>");

    workingSentences.forEach((el,index)=>{
      let thisElement = card.children('[data-index='+index+']').children('button');
      if(index === answer){
        thisElement.on('click',function(){
          let $this = $(this);
          $this.text('Correct!');
          $this.addClass('button-correct');
          $this.off('click');
        });
      }
      else{
        thisElement.on('click',function(){
          let $this = $(this);
          $this.text('Wrong!');
          $this.addClass('button-wrong');
          $this.off('click');
        });
      }
    });
    $(parentDiv).append(card);
  }
}

class App{
  constructor(rootDiv){
    this.menus = {'current': null,
                  'main': new MainMenu('main',rootDiv,this),
                  'newCards': new NewCardsMenu('newCards',rootDiv,this),
                  'setSelect': new SetSelectMenu('setSelect',rootDiv,this),
                  'play': new Play('play',rootDiv,this),
                  changeCurrent: (name)=>{this.menus['current'] = this.menus.hasOwnProperty(name) ? this.menus[name] : this.menus['current'];}
                 };

    this.cardSetManager = new CardSetManager();
  }

  load(menuName,params = []){
    if(this.menus.current)
      this.menus.current.unload().then(()=>{this.menus[menuName].load(...params).then(message=>{if(message === 'loaded') this.menus.changeCurrent(menuName);});});
    else {
      this.menus[menuName].load(...params).then(message=>{if(message === 'loaded') this.menus.changeCurrent(menuName);});
    }
  }
}

var app = new App(document.getElementById('root'));
app.load('main');
