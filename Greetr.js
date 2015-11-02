(function(global, $) { 
	//'new' an object
	var Greetr = function(firstName, lastName, langauge){ 
		return new Greetr.init(firstName, lastName, langauge)
	}

	//hidden within the scope of the IIFE and never directly accesible
	var supportedLangs = ['en', 'es'];

	// greetings
	var greetings = { 
		en: 'Hello', 
		es: 'Hola'
	}; 

	var formalGreetings = { 
		en: 'Greetings', 
		es: 'Saludos'
	};

	var logMessages = { 
		en: 'Logged in', 
		es: 'Inicio sesion'
	};


	Greetr.prototype = { 

		fullName: function() { 
			return this.firstName + ' ' + this.lastName;
		}, 

		validate: function() { 
			if (supportedLangs.indexOf(this.langauge) === -1) { 
				throw "Invalid langauge";
			}
		}, 

		greeting:function() { 
			return greetings[this.langauge] + ' ' + this.firstName + '!';
		}, 

		formalGreeting: function() { 
			return formalGreetings[this.language]+ ', ' + this.fullName();
		}, 

		greet: function(formal) { 
			var msg; 

			if (formal) { 
				msg = this.formalGreeting();
			}
			else { 
				msg = this.greeting()
			} 
			if (console) { 
				console.log(msg);
			}

			return this;
		}

		log: function() { 
			if (console) { 
				console.log(logMessages[this.language] + ': ' + 
				this.fullName());
			} 

			return this;
		}, 

		setLang: function(lang) { 
			this.language = lang; 

			this.validate(); 

			return this;
		},

		HTMLGreeting: function(selector, formal) { 
			if (!$) { 
				throw 'jQuery not loaded';
			}

			if (!selector) { 
				throw 'Missing jQuery selector';
			} 

			var msg; 
			if (formal) { 
				msg = this.formalGreeting();
			} 
			else { 
				msg = this.greeting();
			}

			$(selector).html(msg); 

			return this;
		}

	};

	Greetr.init = function(firstName, lastName, langauge) { 

		var self = this; 
		self.firstName = firstName || ''; 
		self.lastName = lastName || ''; 
		self.langauge = langauge || 'en'; 
	
	}

	Greetr.init.prototype = Greetr.prototype;

	global.Greetr = global.G$ = Greetr;

}(window, jQuery));