class MainMenu extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    var title = this.newTitle('FlashSight', 'A sight-reading aid');
    var menu = $('<div class="btn-group-vertical" role="group">');
    var menuItem = $('<button type="button" class="btn btn-default">');

    var newMenuItem = menuItem.clone();
    newMenuItem.text('New Flashcards');
    newMenuItem.click(()=>{
      this.unload().then(()=>{this.app.load('newCards')});
    });

    menu.append(newMenuItem);

    newMenuItem = menuItem.clone();
    newMenuItem.text('Edit Flashcards');
    newMenuItem.click(()=>{
      if(currentCardSet.name === null){
        alert("Please load a card set first!");
      }
      else{
        let cardStrings = []

        this.app.currentCardSet.cards.forEach((el)=>{
          cardStrings.push(el.join("\n"));
        });

        let cardsString = cardStrings.join("\n\n");

        this.unload().then(()=>{this.app.load('newCards',[this.app.currentCardSet.name,cardsString]);});
      }
    });

    menu.append(newMenuItem);

    newMenuItem = menuItem.clone();
    newMenuItem.removeClass('btn-default');
    newMenuItem.addClass('btn-primary');
    newMenuItem.text('Play');

    menu.append(newMenuItem);

    this.container.append(title);
    this.container.append(menu);

    this.parentDiv.append(this.container);
  }
}
