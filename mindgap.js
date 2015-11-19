if(Meteor.isClient) {

  var items = new Ground.Collection(null);

  resetSession(false);

  Template.body.helpers({
    items: function () {
      return items.find({});
    },
    formItem: function() {
      return Session.get('formItem');
    },
    formNumber: function() {
      return Session.get('formNumber');
    },
    formReocur: function() {
      return Session.get('formReocur');
    },
    isHour: function() {
      return Session.get('formReocur') === 'hour';
    },
    isDay: function() {
      return Session.get('formReocur') === 'day';
    },
    isWeek: function() {
      return Session.get('formReocur') === 'week';
    },
    isMonth: function() {
      return Session.get('formReocur') === 'month';
    },
    isEditing: function() {
      return Session.get('formEditing');
    },
    period: function() {
      if(Session.get('formNumber') > 1) {
        return Session.get('formNumber') + ' ' + Session.get('formReocur') + 's';
      }
      return Session.get('formReocur');
    },
    hammerInit: {
      drag_min_distance: 1,
      swipe_velocity: 2.1,
      prevent_default: true
    },
    hammerGestures: {
      'swipeleft ul li': function(e, templateInstance) {
        console.log(e.deltaX);
      }
    }
  });

  Template.body.events({
    'click .icons i': function(e) {
      e.preventDefault();
      Session.set('formReocur', $(e.target).data('value'));
    },
    'click .back': function(e) {
      e.preventDefault();
      resetSession(false);
    },
    'click .new-button': function(e) {
      e.preventDefault();
      resetSession(true);
    },
    'click .save-button': function(e) {
      e.preventDefault();

      // There is a bug with Meteor's reactivity regarding input elements
      // For now, we have to hack...
      // https://github.com/meteor/meteor/issues/1965
      Session.set('formItem', $('input[type="text"]').val());

      if(Session.get('formItem').length > 1) {
        items.insert({
          title: Session.get('formItem'),
          number: +Session.get('formNumber'),
          recurring: Session.get('formReocur'),
          time: new Date().getTime()
        });

        resetSession(false);

        // ...with a cherry on top :D
        $('input[type="text"]').val('');
      }
      else {
        shakeForm();
      }
    }
  });

  function resetSession(isEdit) {
    Session.set('formId', -1);
    Session.set('formItem', '');
    Session.set('formNumber', 1);
    Session.set('formReocur', 'hour');
    Session.set('formEditing', isEdit);
  }

  function shakeForm() {
    var animationEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd ' +
      'oanimationend animationend';

    $('.save-button').addClass('shake animated');
    $('.save-button').on(animationEvent, function() {
      $('.save-button').removeClass('shake animated');
    });

    $('input[type="text"]').addClass('shake animated');
    $('input[type="text"]').on(animationEvent, function() {
      $('input[type="text"]').removeClass('shake animated');
    });
  }
}
