	new Vue({
	  el: '#main',
	  data: {
	  	apiURL :'/api/',
	    Frogs:[],
	  },
	    ready : function()
	    {
	        this.fetchFrogs();
	        console.log("Ready...");
	    },

	  methods: {
        fetchFrogs: function()
        {
		    var self = this; // Saving the Context
		    $.get( self.apiURL + 'frogs', function( data ) {
		        self.Frogs = data;
		    });
        }, // End of Fetch

        getAddFrog: function(event){
        	window.location = "/add-frog";
        },
        deleteFrog: function(index){
		    var self = this; // Saving the Context
		    if(confirm("Are You sure?")){
			    $.post( self.apiURL + 'delete-frog', {"frog_id":this.Frogs[index].id} , function( data ) {
			    	self.Frogs = data;
			    });		    	
		    }
        },
        editFrog: function(index){
        	window.location = "add-frog/"+this.Frogs[index].id;
        }
	  }

	});
