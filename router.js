Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
Router.route('/' , {
	name: 'mainPageListing'
});
Router.route('/add' , {
	name: 'formTemplate'
});
Router.route('/contact' , {
  name: 'Contact'
});
Router.route('/list/:_id' , {
	name: 'test',
	data: function () {
    console.log("hellodfhdshgfgh jfjghf        fghgh  hh ")
      return FormData.findOne({_id: this.params._id});
    }
});

// Router.route('/answerForm/:_id' , {
// 	name: 'test',
	
// });
Router.route('/list/:_id/answerForm' , {
	name: 'answerForm',
	data: function () {
      console.log("Id:",this.params._id)		
      return {
      	id:this.params._id
      }
    }
});
Router.route('/list/:_id/edit' , {
  name: 'updateQuesForm',
  data: function () {
    console.log("hello my name is aman")
      return FormData.findOne({_id: this.params._id});
    }
});
Router.route('/list/:_id/edit-answer' , {
  name: 'updateAnsForm',
  data: function () {
    console.log("hello my name is aman")
      return AnswerData.findOne({_id: this.params._id});
    }
});
// Router.route('/list/:_id/edit' , {
//   name: 'updateAnsForm',
//   data: function () {
//     console.log("hello my name is aman")
//       return FormData.findOne({_id: this.params._id});
//     }
// });