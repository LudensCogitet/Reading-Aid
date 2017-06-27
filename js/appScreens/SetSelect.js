class SetSelectMenu extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    var title = this.newTitle('Choose a Card Set', '<span id="selectSetSubheading"></span>');

    this.container.append(title);

    this.container.append(this.menu);


    this.parentDiv.append(this.container);
  }

  updateCardSetMenu(){
    this.menu.empty();

    var cardSetList = this.app.cardSetManager.getSavedCardSetList();

    cardSetList.forEach(el=>{
      var newMenuItem = this.menuItem.clone();
      newMenuItem.addClass('cardSetMenuItem');
      newMenuItem.text(el);
      this.menu.append(newMenuItem);
    });
  }

  loadCards(toLoad,event){
    var setName = $(event.target).text();
    this.unload().then((message)=>{
      if(message === 'unloaded'){
        this.app.load(toLoad,[setName,this.app.cardSetManager.getCardSet(setName)]);
      }
    });
  }

  load(selectType){
    return new Promise((resolve,reject)=>{
      if(!selectType){
        console.error('No selectType provided to SetSelect load');
        reject('failed');
      }

      this.updateCardSetMenu();
      if(selectType === 'edit'){
        this.container.find('#selectSetSubheading').text('you wish to edit');
        this.menu.find('.cardSetMenuItem').click((event)=>{this.loadCards('newCards',event);});
      }
      else if(selectType === 'play'){
        this.container.find('#selectSetSubheading').text('you wish to play');
        this.menu.find('.cardSetMenuItem').click((event)=>{this.loadCards('play',event);});
      }
      super.load().then((message)=>{if(message === 'loaded') resolve('loaded');});
    });
  }
}
