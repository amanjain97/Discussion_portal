// AnswerData = new Mongo.Collection('ans');
var a= {
 "msTranslator": {
    "id": "TA-123",
    "secret": "5gTnLbeY7oQi2IaAvyWTNolghSLGJfy2A9u2PzW3uLo"
  }
}
// console.log("awesome! this translator package is working", Microsoft.translate("awesome! this translator package is working","nl"))



if (Meteor.isClient) {

  AutoForm.hooks({
  insert_Form: {
    before: {
      insert: function(doc) {
        // answerSchema.clean(doc);

        // console.log("this in insert hook for ans form" , Meteor.userId());
       // var question = this.questionsSelected.fetch()[0];
        doc = _.extend(doc, {quesId: Template.parentData().id , userId: Meteor.userId()});
        // console.log("doc  ", doc)
        this.result(doc);
      }
    },
    // formToDoc: function(doc) {
    //     doc = _.extend(doc, {value: (doc.value)*10});
    //     console.log("doc ", doc);
    //     this.result(doc);
    // // alter doc
    // // return doc;
    // }
    onSubmit: function(doc) {
        console.log("hmmmmm think that it is done ")
        this.done(null, "foo");
    }
  //   onSubmit: function(insertDoc, updateDoc, currentDoc) {
  //   console.log("hmmmmm1")
  //   this.done();
  //   console.log("hmmmmm2")
  //   //this.done(); // submitted successfully, call onSuccess
  //   //this.done(new Error('foo')); // failed to submit, call onError with the provided error
  //   //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
  // },
  // onSuccess: function(formType, result) {
  //   console.log("this in this hook gives    ", this)
  //   // insertDoc = _.find(doc, {quesId: Template.parentData().id});
  //   // console.log("this in this hook gives    ", )
  //   this.insertDoc = _.extend(thisinsertDoc, {value: Template.parentData().id});
  //   console.log("this in this hook gives ======  ", this.insertDoc)
  //   this.result(insertDoc);

  // }
}
});

AutoForm.hooks({
  insertForm: {
    before: {
      insert: function(doc) {
        // answerSchema.clean(doc);

        console.log("this is a question insert hook" , Meteor.userId());
       // var question = this.questionsSelected.fetch()[0];
        doc = _.extend(doc, {userId: Meteor.userId()});
        // console.log("doc  ", doc)
        this.result(doc);
      }
    }
  }
});


  // Session.setDefault('counter' , 0);
  //FormData.update({} , {$set: {clicks: 0}});

  // set value of clicks field in entry as 0
  // done in schema using autovalue
  Template.formTemplate.events({
    // 'click .goBack' : function() {
    //   console.log("ok working")
    // },
    
    'click .goBack':function(){
     // evt.preventDefault(); // add this to prevent the button from submitting
      // Router.go('signup', {name: '/signup'});
      Router.go('/' , {name: 'mainPageListing'} );
      toastr.success('Term submitted !!');
      toastr.options.closeButton = true;
    }
  });
    Template.answerForm.events({
    // 'click .goBack' : function() {
    //   console.log("ok working")
    // },
    
    'click .goBack':function(){
     // evt.preventDefault(); // add this to prevent the button from submitting
      // Router.go('signup', {name: '/signup'});
      console.log("this in go back from ans form is ", this)
      Router.go('test' , {
        // name: 'test',
        _id: this.id
      });

     }
  });



  Template.mainPageListing.helpers({
    'termsPrint' : function() {
      return FormData.find({});
    }
    // 'counter' : function() {
    //   return Session.get('counter');
    // }
  });



  Template.mainPageListing.events({
    'click .views-clicks' : function() {
      var termId = this._id;
      console.log("Id is  " , termId)
      FormData.update(termId , {$inc: {clicks:1}});

    }
  });
 
  Template.test.helpers({
   test1 :function(){
     console.log("Data blah blah blah we return is:",this);
     // console.log("hi, examples are" ,  this.Example)
     return this
   },
   // 'example' : function() {
   //  console.log("hi why are you here?")
   //    return this.example;
   //  },
    'ansPrint' : function() {
      console.log("this here dude gives me ",this)
    console.log("this is working out of expectations",this._id)
    return AnswerData.find({quesId : this._id} , {sort: {value:-1}});
   },
   'number_of_answers' : function() {
      return AnswerData.find({quesId : this._id}).count()
    },
    'number_of_Examples' : function() {
      console.log("hi aman how are you @@@@@")
      console.log("answerdata count is        ", this.Example.length)
      if(this.Example.length > 0)
        {return true}
    },
    'userId' : function() {
      var userid = Meteor.userId()
      console.log("current user is    ", Meteor.users.find(userid).fetch()[0])
      var s  = Meteor.users.find(userid).fetch()[0];
      return s
      // console
    },
   'checkUser' : function() {
    console.log("trh in ", this)
    var true_userid = Meteor.userId()
    console.log("true_userid is      ",true_userid);
    var saved_userid = this.userId;
    console.log("saved_userid is     ", saved_userid);
    console.log("this in thois delete gives         ",this.userId) 
    if(true_userid == saved_userid) return true;
   },
   'checkUserAns' : function() {
    console.log("trh", this)
    var true_userid = Meteor.userId()
    console.log("true_userid is      ",true_userid);
    var saved_userid = this.userId;
    console.log("saved_userid is     ", saved_userid);
    if(true_userid == saved_userid) return true;
   }

  });

  Template.test.events({
    'click .upvote-button' : function() {
      var termId = this._id;
      console.log("term Id from vote button is    " , termId)
      FormData.update(termId , {$inc: {votes:1}});
    },
    'click .downvote-button' : function() {
      var termId = this._id;
      FormData.update(termId , {$inc: {votes:-1}});
    },
    'click .ans-upvote-button' : function() {
    var termId = this._id;
    console.log("term Id from vote button is    " , termId)
    AnswerData.update(termId , {$inc: {votes:1}});
   },
   'click .ans-downvote-button' : function() {
    var termId = this._id;
    AnswerData.update(termId , {$inc: {votes:-1}});
   },
   'click .deleteQues' : function() {
    // setInterval(function(){console.log("yaeh !") },1000);
    // var currentQuesId = this._id;
    // FormData.remove(currentQuesId); }, 3000);
    var currentQuesId = this._id;
    FormData.remove(currentQuesId);
   },
   'click .edit' : function() {
    var quesId = this._id
    console.log(quesId);
    // FormData.update({_id: quesId} , {$set: {term:}});
   },
   'click .deleteAns' : function() {
    var currentAnsId = this._id;
    AnswerData.remove(currentAnsId);
   },
  });

  // Template.test.helpers({
  //  'ansPrint' : function() {
  //   console.log("this is working out of expectations",Template.parentData().id)
  //   return AnswerData.find({quesId : Template.parentData().id});
  //  }
  // });

 //  Template.test.events({
 //   'click .ans-upvote-button' : function() {
 //    var termId = this._id;
 //    console.log("term Id from vote button is    " , termId)
 //    AnswerData.update(termId , {$inc: {votes:1}});
 //   },
 //   'click .ans-downvote-button' : function() {
 //    var termId = this._id;
 //    AnswerData.update(termId , {$inc: {votes:-1}});
 //   }
 // });
 // // var t;
 // //  function send (t) {
 // //      console.log("value of t is   ",t)
 // //      return 
 // //    }
  Template.answerForm.helpers({
    questionId: function() {
      console.log("questionId is  ",this.id);
      Session.set("questionId" , this.id);
      console.log("Session " , Session.get("questionId"))
     //// t=Session.get("questionId")
      ////send(t);
      return this.id;
    }
  });
   




Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.Contact.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(29.153383,75.717794),
          zoom: 16
        };
      }
    }
  });

  Template.Contact.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });


Template.updateQuesForm.helpers({
  updateQuesForm :function(){
     console.log("is:",this);
     // console.log("hi, examples are" ,  this.Example)
     return this
   },
   qId: function() {
      // console.log("qId is  ",this._id);
      // Session.set("qId" , this._id);
      // console.log("Session " , Session.get("qId"))
     //// t=Session.get("questionId")
      ////send(t);
      return this._id;
    }
});

Template.updateAnsForm.helpers({
  updateAnsForm :function(){
     console.log("is:",this);
     // console.log("hi, examples are" ,  this.Example)
     return this
   },
   qsId: function() {
      console.log(" this from qsId function is    ",this);
      Session.set("qsId" , this._id);
      console.log("Session " , Session.get("qsId"))
     //// t=Session.get("questionId")
      ////send(t);
      return this.quesId;
    }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}