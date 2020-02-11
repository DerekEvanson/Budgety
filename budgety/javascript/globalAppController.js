// JavaScript written by Derek Evanson with the guided process of Jonas Schmedtmann as part of "Complete JavaScript Course 2020"

//--------------------------------------------------------------------------------------------------------------
// GLOBAL APP CONTROLLER
//--------------------------------------------------------------------------------------------------------------

// To help with data security and code re-usability modules are being used. The global ctrl only calls and exchanges data for the other modules

var controller = (function(budgetCtrl, UICtrl) {
     
     var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings(); // Gives the global ctrl acess to the HTML class names
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) { // Some browsers use keyCode or which
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);  // CSS add feedback to data entry for pos or negative values      
     };
    
     var updateBudget = function() {
         
         // 1. Calculate the budget
         budgetCtrl.calculateBudget();
         
         // 2. Return the budget
         var budget = budgetCtrl.getBudget();
         
         // 3. Display the budget on the UI
         UICtrl.displayBudget(budget);   
     };
    
    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
     
     var ctrlAddItem = function() {
         var input, newItem;
         
         // 1. Get the filed input data
         var input = UICtrl.getInput();
         
         // Check for input
         if(input.description !== "" && !isNaN(input.value) && input.value > 0){
             
         // 2. Add the item to the budget controller
         newItem = budgetCtrl.addItem(input.type, input.description, input.value);
         
         // 3. Add the item to the UI
         UICtrl.addListItem(newItem, input.type);
         
         // 4. Clear the fields
         UICtrl.clearFields();
         
         // 5. Update budget
         updateBudget(); 
             
        // 6. Calculate and update percentages
         updatePercentages();
         } 
     };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        // Buuble up from the event click btn to the parent container 
        itemID = event.target.parentNode.parentElement.parentElement.parentElement.id; 
        
        if (itemID) {
            
            // Returns array with left string and right string of the char '-'
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the on the UI
            updateBudget(); 
            
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
     
     return {
         // Initialisation standard to start / set up application
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                  budget: 0,
                  totalInc: 0,
                  totalExp: 0,
                  percentage: -1
            });
            setupEventListeners();
            }
        };

 })(budgetController, UIController);

controller.init();
