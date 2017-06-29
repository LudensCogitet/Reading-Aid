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
    this.nameField = content.find('#newCardSetName');
    this.textField = content.find('#newCardSetText');

    this.nameFieldOnLoad = '';
    this.newSet = true;

    var saveButtonContainer = $('<div class="row"><div style="text-align: center;"></div></div>');
    var saveButton = $('<button class="btn btn-primary">Save Set</button>');

    saveButton.click(()=>{
      if(this.app.cardSetManager.makeCardSet($("#newCardSetName").val(),$("#newCardSetText").val(),this.newSet)){
        if(this.newSet){
          alert('Card set saved');
          this.clearFields();
        }
        else{
          if(this.nameFieldOnLoad !== this.nameField.val()){
            this.app.cardSetManager.deleteCardSet(this.nameFieldOnLoad,false);
            this.nameFieldOnLoad = this.nameField.val();
          }
          alert('Card set updated') ;
        }
      }
    });

    saveButtonContainer.append(saveButton);

    this.container.append(title);
    this.container.append(content);
    this.container.append(saveButtonContainer);

    this.parentDiv.append(this.container);
  }

  clearFields(){
    this.nameField.val('');
    this.textField.val('');
  }

  load(){
    return new Promise((resolve,reject)=>{
      if(arguments.length == 2){
        this.titleWord.html('Edit');
        this.nameField.val(arguments[0]);
        this.newSet = false;
        this.nameFieldOnLoad = arguments[0];

        var text = arguments[1];
        if($.isArray(text)){
          text = text.map(el=>{
            return el.join('\n');
          });
          text = text.join('\n\n');
        }

        this.textField.val(text);
      }
      else {
        this.newSet = true;
      }
      super.load().then(()=>{resolve('loaded');});
    });
  }

  unload(){
    return new Promise((resolve,reject)=>{
      super.unload().then(()=>{
        this.titleWord.html('New');
        this.clearFields();
        resolve('unloaded');
      });
    });
  }
}
