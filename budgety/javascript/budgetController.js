// JavaScript written by Derek Evanson with the guided process of Jonas Schmedtmann as part of "Complete JavaScript Course 2020"

//--------------------------------------------------------------------------------------------------------------
// BUDGET CONTROLLER
//--------------------------------------------------------------------------------------------------------------

// Using IIFE immediately invoked function. Calls itself, used to create private and public objects. Note only returned objects are public. 
var budgetController = (function() {

     var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    // All objects have a prototype. By adding methods to the proto we prevent all objects from having duplicate copies and instead all point to the prototype method in memory 
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
     
     var Income = function(id, description, value){
         this.id = id;
         this.description = description;
         this.value = value;
     };
     
     var calculateTotal = function(type) {
         var sum = 0;
         // ForEach is another way to loop through arrays
         data.allItems[type].forEach(function(cur) {
             sum += cur.value;
         });
         data.totals[type] = sum;
     };
     
     // Note: Objects will have type property so to retrieve data will use data.allItems[type]
      var data = {
          allItems: {
              exp: [],
              inc: []
          },
          totals: {
              exp: 0,
              inc: 0
          },
          budget: 0,
          percentage: -1
      }
      
      return {
          addItem: function(type, des, val) {
              var newItem, ID;
              
              // Create new ID
              if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
              } else {
                  ID = 0;
              }
              
              // Create new item based on 'inc' or 'exp' type
              if (type === 'exp') {
                  newItem = new Expense(ID, des, val);
              } else if (type === 'inc') {
                  newItem = new Income(ID, des, val);
              }
              
              // Push it into our data structure
              data.allItems[type].push(newItem);
              
             // Return the new element
              return newItem;
          },
          
          deleteItem: function(type, id) {
              var ids, index;
              
              // .map is looping through data array and creating a new array with the ids so the ids.IndexOf(id) can be used for deletion
              // Could just loop through allItems[type].id and compare desired id then return i = index
              ids = data.allItems[type].map(function(current) {
                  return current.id;
              });
              
              index = ids.indexOf(id);
              //console.log(index);
                
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
          },
          
          calculateBudget: function(){
              
              // calculate total income and expenses
              calculateTotal('exp');
              calculateTotal('inc');
              
              // calculate the budget: income - expenses
              data.budget = data.totals.inc - data.totals.exp;
              
              // calculate the percentage of income that we spent
              if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);  
              } else {
                  data.percentage = -1;
              }
          },
          
        calculatePercentages: function() {      
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
          
          getBudget() {
              return {
                  budget: data.budget,
                  totalInc: data.totals.inc,
                  totalExp: data.totals.exp,
                  percentage: data.percentage
              };
          },
          
          testing: function() {
              console.log(data);
          }
      };
 })();