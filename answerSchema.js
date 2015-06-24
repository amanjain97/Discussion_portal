AnswerData = new Mongo.Collection('ans');

var Schemas = {};

//FormData.attachSchema = new SimpleSchema({
Schemas.answerData = new SimpleSchema({
  proposedTerm: {
    type: String
  },

  value: {
    type: Number,
    min:0,
    max:10,
    label: "Confidence Value"
  },

  Example: {
    type: Array,
    optional: true
  },
  'Example.$': {
    type: String
  },

  Reference: {
    type: Array,
     optional: true
  },
  'Reference.$': {
    type: String
  },

  Comment: {
    type: String,
    optional: true
  },
  votes: {
    type: Number,
    autoValue: function() {
      if(this.isInsert){
        return 0
      }
    },
    min:0
  },
  quesId: {
    type: String,
    regEx:SimpleSchema.RegEx.Id
     // optional: true
  },
  userId: {
    type:String,
    optional:true
  }
});
  
AnswerData.attachSchema(Schemas.answerData);
//console.log(this);
