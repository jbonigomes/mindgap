if(Meteor.isClient) {

  var items = new Ground.Collection(null);

  Template.body.helpers({
    items: function () {
      return items.find({});
    }
  });

  Template.body.events({
    'click .save-button': function(e) {
      e.preventDefault();

      // Get value from form element
      var text   = $('input[type="text"]').val();
      var number = $('input[type="range"]').val();
      var reocur = $('.icons .active').data('value');

      // Clear the elements
      $('input[type="text"]').val('');
      $('input[type="range"]').val('');
      $('.icons i').each(function(i) {
        if(i === 0) {
          $(this).addClass('active');
        }
        else {
          $(this).removeClass('active');
        }
      });

      // Insert on DB
      items.insert({
        title: text,
        number: +number,
        recurring: reocur,
        time: new Date().getTime()
      });

      // Hide the form
      $('body').removeClass('editing');
    },
    'click .new-button': function(e) {
      e.preventDefault();

      $('body').addClass('editing');
    }
  });
}
