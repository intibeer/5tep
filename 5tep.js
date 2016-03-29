Router.route('/', {
    name: 'videos',
    template: 'videos'
});

Router.route('/video/:_id', {
    template: 'main',
  
    data: function(){
        var currentList = this.params._id;
        return Lists.findOne({ _id: currentList });
    }
});

Router.route('/register', {
    name: 'register',
    template: 'register'
});

Router.route('/demo', {
    name: 'demo',
    template: 'demo'
});


Router.route('/login');

Router.route('/wikipedia');

Lists = new Meteor.Collection('lists');
Moments = new Mongo.Collection('moments');

Times = new Mongo.Collection('times');

Titles = new Mongo.Collection('titles');

Urls = new Mongo.Collection('urls');
Vtitles = new Mongo.Collection('vtitles');


if (Meteor.isClient) {
    // code here will only be run on the client
  
  
  Template.main.helpers ({ 
    times: function() {
      return Times.find();
     }
    
  });
  
  Template.main.events({ 
    'submit.new-moment': function(event) {
      var time1 =event.target.time1.value;
      
    Times.insert({ time1: time1,
            createAt: new Date()
      });
    
  event.target.time1.value = "";
  return false;
  }
  
  });
   
  
  
  Template.main.helpers ({ 
    titles: function() {
      return Titles.find();
     }
    
  });
  
  Template.main.events({ 
    'submit.new-moment': function(event) {
      var title1 =event.target.title1.value;
      
    Titles.insert({ title1: title1,
            createAt: new Date()
      });
    
  event.target.title1.value = "";
  return false;
  }
  
  });
  
  
  
  

  
  Template.main.helpers ({ 
    urls: function() {
      var currentList = this._id;
      return Urls.find({ listId: currentList }, {sort: {createdAt: -1}});
      return lastPart;
     }
    
  });
  
  Template.main.events({ 
    'submit.new-moment': function(event) {
      var url1 =event.target.url1.value;
      var listName = $('[url1=listName]').val();
      var currentList = this._id;
      var lastPart = currentList.split("/").pop();
      
    Urls.insert({ url1: url1,
            createAt: new Date(),
            listId: currentList
      });
      
    
    

   
  }
});   

  

Template.addList.events({
    'submit form': function(event){
        event.preventDefault();
        var listName = $('[name=listName]').val();
        Lists.insert({
          name: listName
        }, function(results){
            Router.go('listPage', { _id: results });
        });
        $('[name=listName]').val('');
    }
});

Template.addList.events({ 
    'submit form': function(event) {
    event.preventDefault();
      var vtitle1 =event.target.vtitle1.value;
      
    Vtitles.insert({ vtitle1: vtitle1,
            createAt: new Date()
      });
    
  event.target.vtitle1.value = "";
  return false;
  }
  
  });


Template.lists.helpers({
    'list': function(){
        return Lists.find({}, {sort: {name: 1}});
    }
});
  

Template.vtitles.vtitle = 
    function() {
      
      return Vtitles.find();
     };
    
  
  


  
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
    
        Router.go('/');
    }
  
});




  
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
  
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
    }
}); 

Meteor.loginWithPassword(email, password, function(error){
    if(error){
        console.log(error.reason);
    } else {
        Router.go("/");
    }
});


Meteor.startup(
   

function titlerepl() {
var wikiUrl = document.getElementById("wiki1").innerHTML;
var lastPart = wikiUrl.split("/").pop();
document.getElementById("wiki1").innerHTML = lastPart;
}
);

 

  
}







