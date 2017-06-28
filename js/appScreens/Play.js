class Play extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    this.duration = 5000;

    this.flashcardTarget = $('<div id="flashcardTarget"><h3>Click the play button to begin<h3></div>');

    this.cardSetName = null;
    this.cardSetData = null;

    this.currentCard = -1;
    this.currentCardSet = null;

    var prevButton = $('<button id="prev" type="button" class="btn btn-default">'+
                            '<span class="glyphicon glyphicon-backward" aria-hidden="true"></span>'+
                            '</button>');

    prevButton.click(()=>{
      if(this.currentCard - 1 >= 0){
        this.stopCurrentCard();
        this.loadCard(this.currentCard-1)
      }
    });

    var restartButton = $('<button id="restart" type="button" class="btn btn-default">'+
                            '<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>'+
                            '</button>');

    restartButton.click(()=>{
        this.unload().then(this.load);
    });

    var nextButton = $('<button id="next" type="button" class="btn btn-primary">'+
                            '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>'+
                            '</button>');

    nextButton.click(()=>{
      if(this.currentCard + 1 < this.currentCardSet.length){
        this.stopCurrentCard();
        this.loadCard(this.currentCard+1)
      }
    });


    var stopButton = $('<button id="stop" type="button" class="btn btn-primary">'+
                            '<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>'+
                            '</button>');

    stopButton.click(()=>{
      this.stopCurrentCard();
      this.app.load('main');
    });

    stopButton.hide();

    this.container.append(this.flashcardTarget);
    this.container.append(prevButton);
    this.container.append(restartButton);
    this.container.append(nextButton);
    this.container.append(stopButton);

    this.parentDiv.append(this.container);

    this.load = this.load.bind(this);
    this.loadCard = this.loadCard.bind(this);
    this.stopCurrentCard = this.stopCurrentCard.bind(this);
  }

  loadCard(cardIndex){
    this.currentCard = cardIndex;

    var currentCard = this.currentCardSet[this.currentCard];

    this.flashcardTarget.empty();
    currentCard.flash(this.flashcardTarget,this.duration,()=>{currentCard.quiz(this.flashcardTarget);});
  }

  stopCurrentCard(){
    if(this.currentCard !== -1)
      this.currentCardSet[this.currentCard].reset();
  }

  load(cardSetName = null, cardSetData = null){
    return new Promise((resolve, reject)=>{
      if(cardSetName === null || cardSetData === null){
        cardSetName  = this.cardSetName;
        cardSetData = this.cardSetData;
      }
      else{
        this.cardSetName = cardSetName;
        this.cardSetData = cardSetData;
      }

      this.currentCardSet = shuffle(cardSetData.map((el)=>{return new Flashcard(el)}));
      console.log(this.currentCardSet);

      super.load().then((message)=>{if(message === 'loaded') resolve('loaded');});
    });
  }

  unload(){
    return new Promise((resolve, reject)=>{
      super.unload().then((message)=>{
        if(message === 'unloaded'){
            this.stopCurrentCard();
            this.currentCard = -1;
            this.currentCardSet = null;
            this.flashcardTarget.html('<h3>Click the play button to begin<h3>');
            resolve('unloaded');
          }
        });
    });
  }
}
