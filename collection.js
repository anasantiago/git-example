// This code executes on the client and on the server

// Declare a collection in the Mongo database
var Hands = new Mongo.Collection("hands");


// This code executes only on the client

if (Meteor.isClient) {
  
  Template.body.helpers({
     
    // The signups helper returns a list of the signups.
    // Find all the signups in the database and return them.
    hands: function() {
        return Hands.find({}, {sort: {time: 1}});  
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
        gender: form.owner.value,

      });
      
      // Clear the text fields
      form.gender.value = '';
      form.size.value = '';
      form.age.value = '';
      form.eccentricity.value = '';

      // Focus the name field
      form.gender.focus();
      
    }
    
  });
  
}


