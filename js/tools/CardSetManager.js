class CardSetManager{
  makeCardSet(name,text,checkOverwrite = true){
      var proceed = true;

      if(name == '' || text == ''){
        alert("Please fill out both fields.");
        return false;
      }

      var cards = text.split(/[\n]{2,}/);

      cards.forEach((el,index)=>{
        cards[index] = el.split(/[\n]/);
      });

      cards.forEach((el)=>{
        if(el.length !=3){
          proceed = false;
        }
      });

      if(proceed == false){
        alert('Please make sure each set contains exactly 3 sentences seperated by new lines, and that each set is seperated by an empty line.');
        return false;
      }

      if(checkOverwrite === true){
        if(localStorage.getItem('_flashSight_'+name)){
          proceed = confirm('Card Set "'+name+'" already exists. Overwrite?');
        }
      }

      if(proceed){
        this.updateSavedCardSetList(name);
        localStorage.setItem('_flashSight_'+name,JSON.stringify(cards));
        if(localStorage.getItem('_flashSight_'+name))
          return true;
      }
      else{
        alert('New Flashcard set canceled');
        return false;
      }
    }

  getSavedCardSetList(){
    if(localStorage.getItem('_flashSight_!setList!'))
      return localStorage.getItem('_flashSight_!setList!').split(",");
    else
      return [];
  }

  updateSavedCardSetList(name, action = 'add'){
    var currentList = this.getSavedCardSetList();
    if(action === 'add'){
      if(currentList.indexOf(name) === -1){
        currentList.push(name);
        localStorage.setItem('_flashSight_!setList!',currentList.join(","));
      }
    }
    else if(action === 'remove'){
      if(currentList.indexOf(name) !== -1){
        currentList.splice(currentList.indexOf(name),1);
        localStorage.setItem('_flashSight_!setList!',currentList.join(","));
      }
    }
  }

  getCardSet(name){
    return JSON.parse(localStorage.getItem('_flashSight_'+name));
  }

  deleteCardSet(name, shouldConfirm = true){
    var doDelete = true;
    if(shouldConfirm === true){
      doDelete = confirm('Are use sure you wish to delete "'+name+'"?');
    }

    if(doDelete){
      this.updateSavedCardSetList(name,'remove');
      localStorage.removeItem('_flashSight_'+name);
      if(!localStorage.getItem('_flashSight_'+name))
        return true;
    }
    return false;
  }
}
