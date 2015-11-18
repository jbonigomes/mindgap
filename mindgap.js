if(Meteor.isClient) {

  var animationEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd ' +
    'oanimationend animationend';

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

      if(text.length > 1) {
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
      }
      else {
        $('.save-button').addClass('shake animated');
        $('.save-button').on(animationEvent, function() {
          $('.save-button').removeClass('shake animated');
        });

        $('input[type="text"]').addClass('shake animated');
        $('input[type="text"]').on(animationEvent, function() {
          $('input[type="text"]').removeClass('shake animated');
        });
      }
    },
    'click .new-button': function(e) {
      e.preventDefault();

      $('body').addClass('editing');
    }
  });
}
