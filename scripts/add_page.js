	new Vue({
	  el: '#AddFrogs',
	  data: {
		        "frog_name"         : null,
		        "frog_color"        : null,
		        "gender"            : null,
		        "mating"            : "No",
		        "noise"             : "No",
		        "noise_time"        : null,
		        "complaints"        : "No",
		        "dob"               : null,
		        "dod"               : null,
		        "pond_env"          : null,
		        "apiURL"            :"/api/",
		        "frog_id"           :null,
		    },

		ready : function()
	    {
	    	var url = window.location.href;
	    	split   = url.split('/');
	    	if(split[4]){
	    		this.frog_id = parseInt(split[4]);
	    		this.getFrog();
	    	} 

	    },

	  methods: {

	  	getFrogData: function(){
	  		return  {
		        "frog_name"         : this.frog_name,
		        "frog_color"        : this.frog_color,
		        "gender"            : this.gender,
		        "mating"            : this.mating,
		        "noise"             : this.noise,
		        "noise_time"        : this.noise_time,
		        "complaints"        : this.complaints,
		        "dob"               : this.dob,
		        "dod"               : this.dod,
		        "pond_env"          : this.pond_env,
		    }
	  	},
	  	addFrogs: function(e){
	        e.preventDefault();
	        var frog = this.getFrogData();
		    var self = this; // Saving the Context
		    $.post( self.apiURL + 'add-frog', frog , function( data ) {
		    	window.location = "/";
		    });
	  	},

	  	getFrog: function(e){
		    var self = this; // Saving the Context
		    if(this.frog_id!=null){
			    $.post( self.apiURL + 'get-frog', {"frog_id":this.frog_id} , function( data ) {
			        self.frog_name 	  = data.frog_name;
			        self.frog_color   = data.frog_color;
			        self.gender       = data.gender;
			        self.mating       = data.mating;
			        self.noise        = data.noise;
			        self.noise_time   = data.noise_time;
			        self.complaints   = data.complaints;
			        self.dob          = data.dob;
			        self.dod          = data.dod;
			        self.pond_env     = data.pond_env;
			    });
		    }
	  	},
	  	updateFrog: function(e){
	        var frog = this.getFrogData();
	        frog.id  = parseInt(this.frog_id);
	        var updated_frog = {
	        						'frog_id':this.frog_id, 
	        						'updated_frog':frog
	    						}

		    var self = this; // Saving the Context
		    $.post( self.apiURL + 'update-frog', updated_frog , function( data ) {
		    	window.location = "/";
		    });
	  	}

	  }

	});
