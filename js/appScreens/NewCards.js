class NewCardsMenu extends AppScreen{
  constructor(name,parentDiv,app){
    super(name,parentDiv,app);

    var title = this.newTitle('<span id="titleWord">New</span> Flashcards','Enter Sentences to Convert');
    var content = $('<div class="form-group">'+
                  '<div class="row">'+
                    '<div class="col-md-10 col-md-offset-1">'+
                  '<input class="form-control" type="text" placeholder="Set Name" id="newCardSetName"></input>'+
                  '<textarea class="form-control" placeholder="Paste Text Here" id="newCardSetText"></textarea>'+
                '</div></div></div>');

    this.titleWord = title.find('#titleWord');
    console.log(this.titleWord);
    this.nameField = content.find('#newCardSetName');
    this.textField = content.find('#newCardSetText');

    var saveButtonContainer = $('<div class="row"><div style="text-align: center;"></div></div>');
    var saveButton = $('<button class="btn btn-primary">Save Set</button>');

    saveButton.click(()=>{
      this.app.cardSetManager.makeCardSet($("#newCardSetName").val(),$("#newCardSetText").val());
    });

    saveButtonContainer.append(saveButton);

    this.container.append(title);
    this.container.append(content);
    this.container.append(saveButtonContainer);

    this.parentDiv.append(this.container);
  }

  load(){
    return new Promise((resolve,reject)=>{
      if(arguments.length == 2){
        this.titleWord.html('Edit');
        this.nameField.val(arguments[0]);

        var text = arguments[1];
        if($.isArray(text)){
          text = text.map(el=>{
            return el.join('\n');
          });
          text = text.join('\n\n');
        }

        this.textField.val(text);
      }
      super.load().then(()=>{resolve('loaded');});
    });
  }

  unload(){
    return new Promise((resolve,reject)=>{
      super.unload().then(()=>{
        this.titleWord.html('New');
        this.nameField.val('');
        this.textField.val('');
        resolve('unloaded');
      });
    });
  }
}
