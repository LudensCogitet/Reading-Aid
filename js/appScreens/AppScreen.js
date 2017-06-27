class AppScreen{
  constructor(name, parentDiv, app){
    this.parentDiv = $(parentDiv);

    this.container = $('<div style="text-align: center; width: 100%;">');
    this.container.hide();

    this.menu = $('<div class="btn-group-vertical" role="group">');
    this.menuItem = $('<button type="button" class="btn btn-default">');

    this.name = name;
    this.app = app;

    this.FADESPEED = 500;
  }

  load(){
    return new Promise((resolve, reject)=>{
      this.container.fadeIn(this.FADESPEED,()=>{resolve('loaded');});
    });
  }

  unload(){
    return new Promise((resolve, reject)=>{
      this.container.fadeOut(this.FADESPEED,()=>{this.container.hide();resolve('unloaded');})
    });
  }

  newTitle(heading,subheading){
    return $('<div><h2>'+heading+'</h2>'+
             '<h5>'+subheading+'</h5></div>');
  }
}
