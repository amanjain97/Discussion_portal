FormData = new Mongo.Collection('forms');
// SimpleSchema.messages({

// });

var Schemas = {};

//FormData.attachSchema = new SimpleSchema({
Schemas.formData = new SimpleSchema({
  term: {
    type: String,
    custom: function() {
      console.log(this);
    }
  },

  sourceLanguage: {
    type: String,
    allowedValues: ["English", "Chinese", "Japanese", "Arabic", "Russian", "Hindi", "Korean", "French", "Italian", "Spanish"],
    autoform: {
      afFieldInput: {
        firstOption: "Select a Language"
      }
    },
    custom: function() {
      console.log(this.field('term').isSet);
    }
  },

  targetLanguage: {
    type: String,
    allowedValues: ["English", "Chinese", "Japanese", "Arabic", "Russian", "Hindi", "Korean", "French", "Italian", "Spanish"],
    autoform: {
      afFieldInput: {
        firstOption: "Select a Language"
      }
    }
  },

  fieldOfExpertise: {
    type: String,
    allowedValues: ["Medicine", "Sports", "Fashion", "Culinary", "IT", "Zoology"],
    autoform: {
      afFieldInput: {
        firstOption: "Select a field"
      }
    }
  },

  Example: {
    type: Array,
     optional: true,
     label: "Example"
  },
  'Example.$': {
    type: String
  },

  // Reference: {
  //   type: Array,
  //    optional: true
  // },
  // 'Reference.$': {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Url
  //   // type: String
  // },
  Reference: {
    type: [String],
    optional: true,
    // custom: function() {
    //   if (this.value !==) {
    //     return 'error'
    //   }
    // },
    regEx: SimpleSchema.RegEx.Url
  },
  Comment: {
    type: String,
     optional: true
  },
  clicks: {
    type: Number,
    autoValue: function() {
      if(this.isInsert){
        return 0
      }
    }
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
  userId: {
    type:String,
    optional:true
  }

});
  
FormData.attachSchema(Schemas.formData);
