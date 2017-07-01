class Help extends AppScreen{
  constructor(name, parentDiv, app){
    super(name, parentDiv, app);

    var title = this.newTitle('What is FlashSight', '');
    var text = $('<div style="text-align:left; font-size: 1.2em; padding-left: 5px; padding-right: 5px;">');
    text.append('FlashSight is a teaching tool designed to help learning readers practice recognizing similarities and differences between phrases at a glance.'+
                '<p><p>'+
                'Three phrases are displayed, one above the other, and then slowly fade away. After they disappear, a single one of those sentences appears along with three buttons. The goal is to click the button that corresponds to the displayed sentence’s former position among the three.'+
                '<h3><b>How to Use This App</b></h3>'+
                '(Note: Click the ‘Menu’ button at the top right to return to the main menu at any time).'+
                '<h4><b>Making cards</b></h4>'+
                'FlashSight does not come with any pre-made sentence groups (flashcards). The teacher will have to enter them by clicking on the <i><b>New Flashcards</b></i> option on the main menu. Enter a name for your set of flashcards, then enter as many groups of three sentences as you wish. Each sentence must be on a new line, and each group must be separated by a blank line.'+
                '<p><p>'+
                'Ensure there are no extra blank lines or whitespace, and then click ‘Save Set’. Your set of flashcards will now be saved locally in your browser, where you can access it whenever you want through the FlashSight app. (Please note that you will lose all saved flashcards if you delete cookies in your browser preferences).'+
                '<h4><b>Editing cards</b></h4>'+
                'Any stored set of flashcards can be edited (including changing its name) by clicking <i><b>Edit Flashcards</b></i> from the main menu and selecting the set you wish to modify. The editing screen behaves in the same way as the <i><b>New Flashcards</b></i> screen.'+
                '<h4><b>Deleting Cards</b></h4>'+
                'Clicking on <i><b>Delete Flashcards</i></b> will prompt you to select a stored set for deletion. Click on the name of the set you wish to delete and then confirm you really do want to delete that set of flashcards. Please note that, once deleted, a flashcard set cannot be recovered.'+
                '<h4><b>Playing a Set of Cards</b></h4>'+
                'Click <i><b>Play</i></b> to work through a set of cards. You will be prompted to select a set from the list of stored card sets.'+
                '<p><p>'+
                '(Note: Each set of flashcards is shuffled before play begins, as are the three sentences of each card, to ensure that the student does not simply memorize the patterns of the cards themselves.)'+
                '<p>'+
                'You will then be asked to choose how long it will take for each card to fade before the player is quizzed. Then, click the blue <i><b>play button</b></i> when you are ready to begin. '+
                'After being quizzed on a card, click the blue <i><b>play button</b></i> again to advance to the next card.'+
                '<p>'+
                'Click the <i><b>back button</b></i> at any time to replay the previous card.'+
                '<p>'+
                'Click the <i><b>reset button</b></i> to reshuffle the current set of cards and start again.'+
                '<p>'+
                'After all cards have been played, the blue <i><b>play button</b></i> will become a <i><b>stop button</b></i>. Click this to return to the main menu.');

    this.container.append(title);
    this.container.append(text);

    this.parentDiv.append(this.container);
  }
}
