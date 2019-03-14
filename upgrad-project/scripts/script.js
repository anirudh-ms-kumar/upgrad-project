window.onload = function()
{
	//div tags
    var main_container = document.querySelector('main_container');
    var shown_first = document.getElementById('shown_first');
    var shown_later = document.getElementById('shown_later');

    //buttons
    var addbtn1 = document.getElementById('addbtn1');
    var addbtn2 = document.getElementById('addbtn2');
    var backbtn = document.getElementById('backbtn');

    //form fields
    var name = document.getElementById('name');
    var number = document.getElementById('number');


    //display div
    var display_number = document.getElementById('display_number');

    //Name and number updaters
    var name_updater = document.getElementById('name_updater');
    var number_updater= document.getElementById('number_updater');

    //Event listeners to display div tags on button press
    addbtn1.addEventListener("click",function () {
    	shown_later.style.display="block";
    	shown_first.style.display="none";
    });

    //Updater funtion
    function update()
    {
    	name_updater.innerHTML=name.value;
    	number_updater.innerHTML=number.value;
    }



     var page_change = {
    	back_to_main_page:function () {
    	shown_first.style.display="block";    	;
    	shown_later.style.display="none";
    	}
    }




    backbtn.addEventListener("click",page_change.back_to_main_page);

    //array for localStorage
    var directory = [];

    //Constructor function for storing values in a JSON object
    function store_in_json(name,number)
    {
    	this.name=name;
    	this.number=number;
    }

    //Event Listeners to actually add and remove contents
    addbtn2.addEventListener("click",addToDir);
    display_number.addEventListener("click",removeFromDir);


    //functions


   

    
    function addToDir()
    {
    	
    	var null_check = name.value!='' && number.value!=''
    	
    	if(null_check)
    	{

    		//Add contents to the array and local storages


    		var obj = new store_in_json(name.value,number.value);
    		directory.push(obj);
    		localStorage['localdir'] = JSON.stringify(directory);
    		
    		

    		//Hiding the form again

    		page_change.back_to_main_page();

    		
    		//Clearing the form for future entries

    		cls.clear();

    		displayer();

    	}
    }
    var cls = {
    	clear : function() {
	    	var form_elements = document.querySelectorAll('.entries');
	    	var i;
	    	for(i in form_elements)
	    	{
	    		form_elements[i].value='';
	    	}
    	} ,

    	initial_table_clear : function(){
    		display_number.innerHTML = '' ;
    	}
    }

    function displayer()
    {
    	//Check if there are already any entries in the localStorage with the name localdir

    	if (localStorage['localdir'] === undefined) {

    		console.log("Entered if condition");
    		localStorage['localdir'] = "[]";
    	}
    	else
    	{
    		var j;
    		directory = JSON.parse(localStorage['localdir']);
    		display_number.innerHTML = '' ;
    		for(j in directory)
    		{
    			var dis = '<div class="one_set"><div class="disp_name"><p>'+directory[j].name+'</p></div>'
    			
                dis+='<div class="disp_num"><p>'+directory[j].number+'</p></div></div>'
                dis+='<button class="delbtn" data-roll="'+j+'">Delete</button>';
                display_number.innerHTML += dis;
    		}
    		
    	}
    }
    function removeFromDir(args)
    {
    	if(args.target.classList.contains('delbtn'))
    	{
    		var ele = args.target.getAttribute('data-roll');
    		directory.splice(ele,1);
    		localStorage['localdir'] = JSON.stringify(directory);
    		displayer();
    	}
    }
    cls.initial_table_clear();
    displayer();
    
   
}