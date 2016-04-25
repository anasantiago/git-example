// This code executes on the client and on the server

// Declare a collection in the Mongo database
var Hands = new Mongo.Collection("hands");

// Associate URLs with templates
Router.route('/', {template: 'home'});
Router.route('/numberline', {template: 'numberline'});
Router.route('/grid', {template: 'grid'});

// This code executes only on the client

if (Meteor.isClient) {
  
  Template.numberline.helpers({
    // The signups helper returns a list of the signups.
    // Find all the signups in the database and return them.
    hands: function() {
        return Hands.find({}, {sort: {age: 1}});  
    },
    
    ages: function() {
        var ages = [];
        for (var i = 0; i <= 100; i += 5) {
          ages.push(i);
        }
        return ages;
    },

    is_age: function(age) {
      var low_range = parseInt(this.age.split('-')[0]);
      var high_range = parseInt(this.age.split('-')[1]);
      if ((low_range >= age) && (high_range <= age + 5)) {
        return true;
      }
      else {
        return false;
      }
    },
    
    is_male: function() {
      return this.gender == 'male';
    },
    is_female: function() {
      return this.gender == 'female';
    }
    
         
  }); 


  Template.hand.events({
    
    // This function is called whenever there is a click
    // event on a delete link in the "signup" template
    "click .delete": function(event) {
      
      // Tell the browser not to do its default behavior 
      // (which would reload the page)
      event.preventDefault();

      // Using the Mongo id of this template's object, tell Mongo
      // to remove the object from the database
      Hands.remove(this._id);
      
    }
    
  });
  
  Template.new.helpers({

    // Returns true if the form should be shown
    show_form: function() {
      return Session.get('show_form');
    }
    
  })

  Template.new.events({
    
    // Show/hide the form
    "click .toggle_form": function(event) {
      if (Session.get('show_form')) {
        Session.set('show_form', false);
      }
      else {
        Session.set('show_form', true);
      }
    },
    
    // This function is called whenever there is a submit
    // event in the "gender" template
    "submit": function(event) {
      
      // Tell the browser not to do its default behavior 
      // (which would reload the page)
      event.preventDefault();
    
      // Get the <form> HTML element (which by definition is
      // the target of the submit event)
      var form = event.target;
      
      // Insert a signup into the database collection
      Hands.insert({
        gender: form.gender.value,
        size: form.size.value,
        age: form.age.value,
        shape: form.shape.value,
        eccentricity: form.eccentricity.value
      });
      
      Session.set('show_form', false);
      
    }
    
  });
}
    
