var budgetController = (function(){
    
    var Expence = function(id,description,value){
        this.id=id,  
        this.description=description,    
        this.value=value
    };
    
    var Income = function (id, description, value) {
        this.id = id,
        this.description = description,
        this.value = value
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },

        totals:{
            exp:0,
            inc:0
        }
    };

    return {
        allItem: function(type,description,value){
            var newItem,ID;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if(type === "exp"){
                newItem = new Expence(ID,description,value);
            } else if(type==="inc"){
                newItem = new Income(ID,description,value);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing : function(){
            console.log(data);
        }
    }

})();






var UIController = (function(){

    var DomString = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton: ".add__btn",
        income:".income__list",
        expenses:".expenses__list"
    }

    return {
        getInput:function(){
            return{
                type:document.querySelector(DomString.inputType).value,
                description:document.querySelector(DomString.inputDescription).value,
                value:document.querySelector(DomString.inputValue).value
            }
        },

        addListItem: function(obj,type){
            var html,newHtml,element;

            if(type ==="inc"){
                element= DomString.income;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type=== "exp"){
                element= DomString.expenses;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%description%',obj.description);
            newHtml=newHtml.replace('%value%',obj.value)
            
            document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);
        },
        
        getDomString:function(){
            return DomString;
        }
    }    

})();






var Controller = (function(budgetControl,UIControl){

    var setupEventListeners = function(){

        var Dom = UIControl.getDomString();

        document.querySelector(Dom.inputButton).addEventListener("click", control);

        document.addEventListener("keypress", event => {
            if (event.keyCode === 13 || event.which === 13) {
                control();
            }
        })

    }

    var control = function () {

        var input = UIControl.getInput();

        var newitem = budgetControl.allItem(input.type,input.description,input.value);
        
        UIControl.addListItem(newitem,input.type);
        
        //console.log(newitem);

        //console.log("It's works");
    }


    return {
        init : function(){
            
            console.log("Application has started.");
            
            setupEventListeners();
        }
    }
    
    
})(budgetController,UIController)


Controller.init();