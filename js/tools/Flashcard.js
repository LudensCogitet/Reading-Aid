function Flashcard(sentences){
  this.reset = ()=>{
    card.remove();
    card.stop();
    card.show();
    card.empty();

    workingSentences.forEach((el,index)=>{card.append($("<div data-index="+index+">"+el+"<div style='border: 2px solid black'></div></div>"));});
  }

  this.flash = (parentDiv, duration, callback)=>{
    shuffle(workingSentences);
    this.reset();

    $(parentDiv).append(card);
    card.fadeOut(duration,callback);
  }

  this.quiz = (parentDiv, correctCallback, wrongCallback)=>{
    this.reset();

    var answer = Math.floor(Math.random() * 3);

    card.prepend("<div class='quiz-heading'>"+workingSentences[answer]+"</div>");

    card.children('[data-index=0]').replaceWith("<button data-index=0 type='button' class='btn btn-default'>Top</button>");
    card.children('[data-index=1]').replaceWith("<button data-index=1 type='button' class='btn btn-default'>Middle</button>");
    card.children('[data-index=2]').replaceWith("<button data-index=2 type='button' class='btn btn-default'>Bottom</button>");

    workingSentences.forEach((el,index)=>{
      let thisElement = card.children('[data-index='+index+']');
      if(index === answer){
        thisElement.on('click',function(){
          let $this = $(this);
          $this.text('Correct!');
          $this.removeClass('btn-default')
          $this.addClass('btn-success');
          $this.off('click');
        });
      }
      else{
        thisElement.on('click',function(){
          let $this = $(this);
          $this.text('Wrong!');
          $this.removeClass('btn-default');
          $this.addClass('btn-danger');
          $this.off('click');
        });
      }
    });
    $(parentDiv).append(card);
  }

  var card = $('<div class="cardText btn-group-vertical" role="group">');
  var workingSentences = JSON.parse(JSON.stringify(sentences));

  shuffle(workingSentences);
  this.reset();
}
