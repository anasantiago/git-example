// This code executes on the client and on the server

// Declare a collection in the Mongo database
var Hands = new Mongo.Collection("hands");


// This code executes only on the client

if (Meteor.isClient) {
  
  Template.body.helpers({
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
    "click.delete": function(event) {
      
      // Tell the browser not to do its default behavior 
      // (which would reload the page)
      event.preventDefault();

      // Using the Mongo id of this template's object, tell Mongo
      // to remove the object from the database
      Hands.remove(this._id);
      
    }
    
  });

  Template.new.events({
    
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
    }
      });

}