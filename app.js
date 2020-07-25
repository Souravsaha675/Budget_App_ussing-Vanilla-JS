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
    }

})();






var UIController = (function(){

    var DomString = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        inputButton: ".add__btn"
    }

    return {
        getInput:function(){
            return{
                type:document.querySelector(DomString.inputType).value,
                description:document.querySelector(DomString.inputDescription).value,
                value:document.querySelector(DomString.inputValue).value
            }
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

        console.log(input);

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