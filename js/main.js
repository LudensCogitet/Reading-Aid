class App{
  constructor(rootDiv){
    this.menus = {'current': null,
                  'main': new MainMenu('main',rootDiv,this),
                  'help': new Help('help',rootDiv, this),
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
