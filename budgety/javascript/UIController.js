// JavaScript written by Derek Evanson with the guided process of Jonas Schmedtmann as part of "Complete JavaScript Course 2020"

//--------------------------------------------------------------------------------------------------------------
// UI CONTROLLER
//--------------------------------------------------------------------------------------------------------------
var UIController = (function() {

    // Hard code the HTML class name to a object. Save from having to change all instances if HTML is modified  
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    // String / array manipulation 
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        
        num = Math.abs(num);
        num = num.toFixed(2); // Two decimal values

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); 
        }

        dec = numSplit[1];

        // Ternary operator replaceable to if else statement 
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
           callback(list[i], i);
        }
    };
     
     return {
         getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)        
            };
        },
         
         addListItem: function(obj, type){
             var html, newHtml, element;
             
             // Create HTML string with placeholder text
             if (type === 'inc'){
                 element = DOMstrings.incomeContainer;
                 
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }
             
             // Replace the placeholder text with some actual data
             // Will use id's for object removal 
             newHtml = html.replace('%id%', obj.id);
             newHtml = newHtml.replace('%description%', obj.description);
             newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
             
             // Insert the HTML into the DOM
             // Note: BeforEnd is DOM manipulation there are other insertion points
             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
         },
         
         deleteListItem: function(selectorID) {
             
             var el = document.getElementById(selectorID);
             el.parentNode.removeChild(el);  
         },
           
         clearFields: function() {
             var fields, fieldsArr;
             
             fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
             
             // Using the build in array function to pass in list to create an array
             fieldsArr = Array.prototype.slice.call(fields);
             
             fieldsArr.forEach(function(current, index, array) {
                 current.value = "";
             })
             
             // Sets users curser to the description field
             fieldsArr[0].focus();
         },
         
         displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
             
             if(obj.percentage > 0) {
                 document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
             } else {
                 document.querySelector(DOMstrings.percentageLabel).textContent = '---';
             }           
         },
         
         displayPercentages: function(percentages){
             var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
             nodeListForEach(fields, function(current, index){
                 if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    // Note: if the expense is less than 1% it will show as '---'
                    current.textContent = '---';
                }
            });
         },
         
          displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();
            
            // Date return numeric month which will be used for index
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
          
         changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');   
        },  
         
         getDOMstrings: function(){
             return DOMstrings;
         }
     }
 })();