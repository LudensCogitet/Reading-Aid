class MainMenu extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    var title = this.newTitle('FlashSight', 'A sight-reading aid');

    var newMenuItem = this.menuItem.clone();
    newMenuItem.text('New Flashcards');
    newMenuItem.click(()=>{
      this.unload().then(()=>{this.app.load('newCards')});
    });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.text('Edit Flashcards');
    newMenuItem.click(()=>{
        this.unload().then(()=>{this.app.load('SetSelect',['edit']);});
      });

    this.menu.append(newMenuItem);

    newMenuItem = this.menuItem.clone();
    newMenuItem.removeClass('btn-default');
    newMenuItem.addClass('btn-primary');
    newMenuItem.text('Play');

    this.menu.append(newMenuItem);

    this.container.append(title);
    this.container.append(this.menu);

    this.parentDiv.append(this.container);
  }
}
