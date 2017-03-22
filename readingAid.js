function Word(text,parent){
    var state = "span";
    
    var change = function(){
      
      if(state == "span"){
        let width = $(this).width() + 7;
        let newEl = $("<input class='word' type='text' value='"+text+"'>");
        $(this).replaceWith(newEl);
        newEl.width(width);
        newEl.click(change);
        newEl.keydown(function(event){if(event.keyCode == 13)$.proxy(change,this)();});
        newEl.focus();
        newEl.select();
        state = "input";
      }
      else if(state == "input"){
        text = $(this).val();
        let newEl = $("<span class='word'>"+text+"</span>");
        $(this).replaceWith(newEl);
        newEl.click(change);
      
        state = "span";
      }
    }
  
    this.getText = function(){
      return text;
    }
    
    this.getElement = function(){
      var returnEl = $("<span class='word'>"+text+"</span>");
      returnEl.click(change);
      return returnEl;
    }
  }

function Sentence(text){
  var words = text.split(" ");
  for(let i = 0; i < words.length; i++){
    words[i] = new Word(words[i]);
  }
  
  this.getElement = function(){
    var element = $("<div class='sentence'>");
    element.append("<span>");
  
    for(let i = 0; i < words.length; i++){
      element.append(words[i].getElement());
      element.append("<span class='space'> </span>");
    }
    
    return element;
  }
  
  this.getText = function(){
    var textArr = [];
    for(let i = 0; i < words.length; i++){
      textArr.push(words[i].getText());
    }
    
    return textArr.join(" ");
  }
}

function SentenceSet(texts){  
  function quiz(targetEl,randOrder){
    var index = Math.floor(Math.random() * randOrder.length);
    var displayDiv = $("<div>"+texts[randOrder[index]]+"</div>");
    displayDiv.hide();
    targetEl.append(displayDiv);
    displayDiv.fadeIn();
    let wrapper = $("<div style='display: inline-block;'>");
    
    for(let i = 0; i < randOrder.length; i++){
      let buttonText = "";
      switch(i){
        case 0:
          buttonText = "Up";
        break;
        case 1:
          buttonText = "Middle";
        break;
        case 2:
          buttonText = "Down";
        break;
        default:
          buttonText = (i+1)+"th";
      }
      var newButton = $("<div class='quizButton'>"+buttonText+"</div>");
      if(i == index)
        newButton.click(function(){$(this).html("Correct!");});
      else
        newButton.click(function(){$(this).html("Incorrect!");});
      
      wrapper.append(newButton); 
   }
    targetEl.append(wrapper);
  }
  
  this.play = function(targetEl,displayTime){
    var group = $("<div>");
    
    var indices = [];
    for(let i = 0; i < texts.length; i++){
      indices.push(i);
    }
    console.log(indices,indices.length);
    
    var randIndices = []
    while(indices.length > 0){
      console.log(indices.length);
      randIndices.push(indices.splice(Math.floor(Math.random()*indices.length),1));
    }
    console.log(randIndices);
    
    for(let i = 0; i < randIndices.length; i++){
      let newDiv = $("<div>"+texts[randIndices[i]]+"</div>");
      group.append(newDiv);
    }
    
    group.hide();
    targetEl.append(group);
    
    group.fadeIn(400,function(){
      group.fadeOut(displayTime*1000,function(){
        group.remove();
        quiz(targetEl,randIndices);
      });
    });
    return group;
  }
}

function SetGenerator(homeEl,setEditor,setsDisplay){
  var currentSet = null;
  var sets = [];
  var loadedSets = null;
	
  var textField = $("<input type='text'>");
  var newButton = $("<button>New</button>");
  var addButton = $("<button>Add</button>");
	var saveCheckbox = null;
  
  var leftButton = $("<button class='leftButton' style='width: 25px;'>&#8592;</button>");
  leftButton.click(function(){
        let myBox = $(this).parent();
        let index = myBox.prevAll(".setBoxDisplay").length;
        if(index > 0){
          let oldLeft = myBox.prev(".setBoxDisplay");
          myBox.detach();
          oldLeft.before(myBox);
          
          temp = sets[index-1];
          sets[index-1] = sets[index];
          sets[index] = temp;
					
					changeCheckbox();
						
				}
      });
  
  var rightButton = $("<button class='rightButton' style='width: 25px;'>&#8594;</button>");
  rightButton.click(function(){
        let myBox = $(this).parent();
        let index = myBox.prevAll(".setBoxDisplay").length;
        let numNextBoxs = myBox.nextAll(".setBoxDisplay").length;
        if(numNextBoxs > 0){
          let oldRight = myBox.next(".setBoxDisplay");
          myBox.detach();
          oldRight.after(myBox);
          
          temp = sets[index];
          sets[index] = sets[index+1];
          sets[index+1] = temp;
					
					changeCheckbox();
        }
      });
  
  var deleteButton = $("<button class='deleteButton' style='width: 60px;'>Delete</button>");
  deleteButton.click(function(){
        let index = $(this).parent().prevAll(".setBoxDisplay").length;
        
				sets.splice(index,1);
				
				changeCheckbox();
        
				$(this).parent().remove();
      });
  
  if(!hasLocalStorage()){
    alert("Saving is unavailable. Please allow 3rd party cookies in your browser settings and refresh this page to allow saving.");
  }
  else{
		saveCheckbox = $("<div id='saveCheckbox'></input>");
		let saveGroup = $("<div id='saveSets' class='hideOnPlay'>cards saved</div>");
		saveCheckbox.click(function(e){
				
				if($(this).hasClass("checkboxChecked") == false){
					$(this).addClass("checkboxChecked");
			
				if(sets.length > 0)
					localStorage.setItem("savedSets",stringifySets());
				else{
					if(localStorage.getItem("savedSets") !== null)
						localStorage.removeItem("savedSets");
				}
			}
		});
		
		let previousSets = localStorage.getItem("savedSets");
    
    if(previousSets !== null){
      loadStringifiedSets(previousSets);
			saveCheckbox.addClass("checkboxChecked");
		}
		
		saveGroup.append(saveCheckbox);
    $("html").prepend(saveGroup);
		
		window.onbeforeunload = function(){
    if(localStorage.getItem("savedSets") === null && sets.length !== 0 || loadedSets != stringifySets() && saveCheckbox.hasClass("checkboxChecked") == false)
			return "Are you sure? The current set of flash cards has changed since the last save.";
		}
  }
	
	newButton.click(function(){
    if(textField.val().length > 0){
      currentSet = [new Sentence(textField.val()),
                    new Sentence(textField.val()),
                    new Sentence(textField.val())];
    
     setEditor.empty();
    
     currentSet.forEach(function(el){
        setEditor.append(el.getElement());
     });
    }
  });
  
  addButton.click(function(){
    if(currentSet != null){
      addToDisplay(currentSet);
      
      setEditor.empty();
      sets.push(currentSet);
			
			changeCheckbox();
			
      currentSet = null;
    }
  });
  
	function changeCheckbox(){
		if(saveCheckbox == null)
			return false;
		else{
			let stringySets = stringifySets();
			let saved = localStorage.getItem("savedSets");
			console.log("changeCheck",saved,stringySets);
			if(saved !== null){
				console.log(saved == stringySets);
				if(saved == stringySets)
					saveCheckbox.addClass("checkboxChecked");
				else
					saveCheckbox.removeClass("checkboxChecked");
			}
			else if(loadedSets !== null){
				if(loadedSets == stringySets)
					saveCheckbox.addClass("checkboxChecked");
				else
					saveCheckbox.removeClass("checkboxChecked");
			}
			else
				saveCheckbox.removeClass("checkboxChecked");
		}
	}
	
  function addToDisplay(setToDisplay){
    let setBoxDisplay = $("<div class='setBoxDisplay'>");

      for(let i = 0; i < setToDisplay.length; i++){
        setBoxDisplay.append($("<div class='setBoxItem'>"+setToDisplay[i].getText()+"</div>"));
      }
      
      setBoxDisplay.append(leftButton.clone(true));
      setBoxDisplay.append(deleteButton.clone(true));
      setBoxDisplay.append(rightButton.clone(true));
      
      setsDisplay.append(setBoxDisplay);
  }
  
  homeEl.append(textField);
  homeEl.append(newButton);
  homeEl.append(addButton);
  
  this.getSets = function(){
    var arr = [];
    
    for(let i = 0; i < sets.length; i++){
      let textArr = [];
      for(let d = 0; d < sets[i].length; d++){
        textArr.push(sets[i][d].getText());
      }
      arr.push(new SentenceSet(textArr));
    }
    
    if(arr.length == 0)
      return null;
    else
      return arr;
  }

  this.clearSets = function(){
    sets = [];
  }
  
  function stringifySets(){
    
		if(sets.length == 0)
			return null;
		
		var stringify = [];
    
    for(let i = 0; i < sets.length; i++){
      var stringSet = [];
      for(let d = 0; d < sets[i].length; d++){
        stringSet.push(sets[i][d].getText());
      }
      stringify.push(stringSet);
    }
    return JSON.stringify(stringify);
  }
  
  function loadStringifiedSets(textArray){
    loadedSets = textArray.slice(0);
		textArray = JSON.parse(textArray);
		console.log(textArray);
    sets = [];
    for(let i = 0; i < textArray.length; i++){
      var newSet = [];
      for(let d = 0; d < textArray[i].length; d++){
        newSet.push(new Sentence(textArray[i][d]));
      }
			console.log(newSet);
      sets.push(newSet);
      addToDisplay(newSet);
    }
  }
}

function hasLocalStorage(){
  var test = "test";
  try{
    console.log(localStorage.getItem("savedSets"));
    localStorage.setItem(test,test);
    if(localStorage.getItem(test) == "test"){
			console.log(localStorage.getItem(test));
      localStorage.removeItem(test);
    }
    return true;
  }
  catch(e){
    console.log(e);
    return false;
  }
}

$(document).ready(function(){
  $("#again").hide();
  var stateOfPlay = 0;
  var generator = new SetGenerator($("#generatorHome"),$("#container"),$("#setsDisplay"));
  
  var currentCard = 0;
  var cards = null;
  var displayTime = 0;
  var playReturn = null;
  
  $("#start").click(function(){
    if(stateOfPlay == 0){
      cards = generator.getSets();
      console.log(cards);
      if(cards != null){
				$(".hideOnPlay").hide();
        $("#container").empty();
        $("#start").text("Start");
        stateOfPlay = 1;
      }
    }
    else if(stateOfPlay == 1){
      currentCard = 0;
      displayTime = $("#displayFor").val();
      playReturn = cards[currentCard].play($("#container"),displayTime);
      $("#next").show();
      $("#start").text("Reset");
      stateOfPlay = 2;
    }
    else if(stateOfPlay == 2){
      $("#container").empty();
      $("#start").text("Play");
      $("#next").hide();
      $("#next").text("Next");
			$(".hideOnPlay").show();
      
      if(playReturn != null){
        playReturn.stop();
        playReturn == null;
      }
      
      $("#setsDisplayContainer").show();
      stateOfPlay = 0;
    }
  });
  
  $("#next").click(function(){
		if(currentCard < cards.length){
      currentCard++;
      
      if(currentCard == cards.length -1){
        $(this).text("Restart");
      }
      
      if(currentCard == cards.length){
        currentCard = 0;
        $(this).text("Next");
      } 
      $("#container").empty();
      playReturn.stop();
      playReturn = cards[currentCard].play($("#container"),displayTime);
    }
  });
});