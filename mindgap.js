if(Meteor.isClient) {

  var items = new Ground.Collection(null);

  Template.body.helpers({
    items: function () {
      return items.find({}, {sort: {time: 1}});
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
      return makePeriod();
    },
    fromNow: function() {
      return this.time.relative();
    },
    status: function() {
      return makeStatus(this.time);
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
      saveForm();
    }
  });

  function makeDueDate(number, reocur) {
    var config = {};
    config[reocur] = number;
    return Date.create().advance(config);
  }

  function makeStatus(time) {
    if(Date.create(time).rewind({hour: 24}).isFuture()) {
      return 'green';
    }
    else if(time.isFuture()) {
      return 'yellow';
    }

    return 'red';
  }

  function makePeriod() {
    var number = Session.get('formNumber');
    var reocur = Session.get('formReocur');

    if(number > 1) {
      return number + ' ' + reocur + 's';
    }

    return reocur;
  }

  function resetSession(isEdit) {
    Session.set('formId', -1);
    Session.set('formItem', '');
    Session.set('formNumber', 1);
    Session.set('formReocur', 'hour');
    Session.set('formEditing', isEdit);
  }

  function saveForm() {
    // There is a bug with Meteor's reactivity regarding input elements
    // For now, we have to hack...
    // https://github.com/meteor/meteor/issues/1965
    Session.set('formItem', $('input[type="text"]').val());

    var item   = Session.get('formItem');
    var reocur = Session.get('formReocur');
    var number = +Session.get('formNumber');

    if(item.length > 1) {
      items.insert({
        title: item,
        number: number,
        recurring: reocur,
        time: makeDueDate(number, reocur)
      });

      resetSession(false);

      // ...with a cherry on top :D
      $('input[type="text"]').val('');
    }
    else {
      shakeForm();
    }
  }

  function shakeForm() {
    var animationEvent = [
      'webkitAnimationEnd',
      'mozAnimationEnd',
      'MSAnimationEnd',
      'oanimationend',
      'animationend'
    ].toString().replace(',', ' ');
 
    $('input[type="text"], .save-button').addClass('shake animated');

    $('.save-button').on(animationEvent, removeShake);
    $('input[type="text"]').on(animationEvent, removeShake);
  }

  function removeShake(el) {
    $(el.target).removeClass('shake animated');
  }
}
