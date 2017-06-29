class Play extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    this.duration = 5000;

    this.flashcardTarget = $('<div id="flashcardTarget"><h3>Click the play button to begin<h3></div>');
    this.flashcardTarget.hide();

    this.cardSetName = null;
    this.cardSetData = null;

    this.currentCard = -1;
    this.currentCardSet = null;

    this.menu.append('<div><h3>Select Flashcard Duration</h3></div>')

    var newMenuItem = this.menuItem.clone();
    newMenuItem.text('3');
    newMenuItem.click(()=>{
      this.startPlay(3);
    });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.text('5');
    newMenuItem.click(()=>{
      this.startPlay(5);
    });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.text('7');
    newMenuItem.click(()=>{
      this.startPlay(7);
    });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.text('10');
    newMenuItem.click(()=>{
      this.startPlay(10);
    });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.text('15');
    newMenuItem.click(()=>{
      this.startPlay(15);
    });

    this.menu.append(newMenuItem);

    this.buttonContainer = $('<div>');
    this.buttonContainer.hide();

    var prevButton = $('<button id="prev" type="button" class="btn btn-default">'+
                            '<span class="glyphicon glyphicon-backward" aria-hidden="true"></span>'+
                            '</button>');

    prevButton.click(()=>{
      if(this.currentCard - 1 >= 0){
        this.stopCurrentCard();
        this.loadCard(this.currentCard-1)
      }
    });

    this.buttonContainer.append(prevButton);

    var restartButton = $('<button id="restart" type="button" class="btn btn-default">'+
                            '<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>'+
                            '</button>');

    restartButton.click(()=>{
        this.unload().then(this.load);
    });

    this.buttonContainer.append(restartButton);

    this.nextButton = $('<button id="next" type="button" class="btn btn-primary">'+
                        '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>'+
                        '</button>');

    this.nextButton.click(()=>{
      if(this.currentCard + 1 < this.currentCardSet.length){
        this.stopCurrentCard();
        this.loadCard(this.currentCard+1)
      }
    });

    this.buttonContainer.append(this.nextButton);

    this.stopButton = $('<button id="stop" type="button" class="btn btn-primary">'+
                        '<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>'+
                        '</button>');

    this.stopButton.click(()=>{
      this.app.load('main');
    });

    this.stopButton.hide();

    this.buttonContainer.append(this.stopButton);


    this.container.append(this.menu);
    this.container.append(this.flashcardTarget);
    this.container.append(this.buttonContainer);

    this.parentDiv.append(this.container);

    this.load = this.load.bind(this);
    this.loadCard = this.loadCard.bind(this);
    this.stopCurrentCard = this.stopCurrentCard.bind(this);
  }

  startPlay(duration){
    this.duration = duration * 1000;
    this.menu.hide();
    this.flashcardTarget.show();
    this.buttonContainer.show();
  }

  loadCard(cardIndex){
    this.currentCard = cardIndex;
    this.checkIfLastCard();

    var currentCard = this.currentCardSet[this.currentCard];

    this.flashcardTarget.empty();
    currentCard.flash(this.flashcardTarget,this.duration,()=>{currentCard.quiz(this.flashcardTarget);});
  }

  stopCurrentCard(){
    if(this.currentCard !== -1)
      this.currentCardSet[this.currentCard].reset();
  }

  checkIfLastCard(){
    if(this.currentCard === this.currentCardSet.length -1){
      this.nextButton.hide();
      this.stopButton.show();
    }
    else{
      if(this.nextButton.is(':hidden')){
        this.stopButton.hide();
        this.nextButton.show();
      }
    }
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

      this.checkIfLastCard();
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
            this.menu.show();
            this.flashcardTarget.hide();
            this.buttonContainer.hide();
            this.flashcardTarget.html('<h3>Click the play button to begin<h3>');
            resolve('unloaded');
          }
        });
    });
  }
}
