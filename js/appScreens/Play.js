class Play extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    this.container.append('<div id="flashcardTarget">');

    this.currentCard = 0;

    var prevButton = $('<button type="button" class="btn btn-default">'+
                            '<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>'+
                            '</button>');

    var nextButton = $('<button type="button" class="btn btn-primary">'+
                            '<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>'+
                            '</button>');

    this.parentDiv.append(this.container);
  }

  load(cardSetName,cardSetData){
    return new Promise((resolve, reject)=>{
      var flashcards = cardSetData.map((el)=>{return new Flashcard(el)});


      super.load().then((message)=>{if(message === 'loaded') resolve('loaded');});
    });
  }
}
