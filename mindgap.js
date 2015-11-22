if(Meteor.isClient) {

  var items = new Ground.Collection(null);

  Template.body.rendered = function() {
    resetSession();
  };

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
    listPeriod: function() {
      return makeListPeriod(this);
    },
    fromNow: function() {
      return this.time.relative();
    },
    status: function() {
      return makeStatus(this.time);
    },
    hammerGestures: {
      'pan .slider': function (e) {
        var element = $(e.target);

        if(!$(e.target).hasClass('slider')) {
          element = $(e.target).closest('.slider');
        }

        if(e.isFinal) {
          if(e.deltaX > 100) {
            element.animate({
              'opacity': '800'
            }, {
              step: function (now) {
                var amount = +now + e.deltaX;
                $(this).css({
                  transform: 'translate3d(' + amount + 'px, 0px, 0px)'
                });
              },
              duration: 100,
              easing: 'linear',
              queue: false,
              complete: function () {
                $(this).closest('li').animate({
                  'opacity': '0'
                }, 100, function() {
                  $(this).animate({height: 0}, 100, function() {
                    $(this).remove();
                    console.log('do db stuff [give it the new date]');
                  });
                });
              }
            }, 'linear');
          }
          else if(e.deltaX < -100) {
            element.animate({
              'opacity': '800'
            }, {
              step: function (now) {
                var amount = e.deltaX - now; // changed
                $(this).css({
                  transform: 'translate3d(' + amount + 'px, 0px, 0px)'
                });
              },
              duration: 100,
              easing: 'linear',
              queue: false,
              complete: function () {
                $(this).closest('li').animate({
                  'opacity': '0'
                }, 100, function() {
                  $(this).animate({height: 0}, 100, function() {
                    $(this).remove();
                    console.log('do db stuff [delete it]'); // changed
                  });
                });
              }
            }, 'linear');
          }
          else {
            element.css({transform: 'none'});
            $(element).closest('li').removeClass();
          }
        }
        else {
          element.css({transform: 'translate3d(' + e.deltaX + 'px, 0, 0)'});

          if(e.deltaX > 100) {
            $(element).closest('li').addClass('green');
          }
          else {
            $(element).closest('li').removeClass('green');
          }

          if(e.deltaX < -100) {
            $(element).closest('li').addClass('red');
          }
          else {
            $(element).closest('li').removeClass('red');
          }
        }
      }
    }
  });

  Template.body.events({
    'click .icons a': function(e) {
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

  function makeListPeriod(obj) {
    var number = obj.number;
    var reocur = obj.recurring;

    if(number > 1) {
      return number + ' ' + reocur + 's';
    }

    return reocur;
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
    setUpSlider();

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
    var number = parseInt(Session.get('formNumber'));

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

  function setUpSlider() {
    // There is a bug with the destroy method for noUiSlider
    // Once again, we have to hack
    $('#slider').html('<div></div>').children().first().noUiSlider({
      step: 1,
      start: 1,
      tooltips: true,
      connect: 'lower',
      range: {
        'min': 1,
        'max': 12
      },
      format: {
        to: function(value) {
          return parseInt(value);
        },
        from: function(value) {
          return parseInt(value);
        }
      }
    }).on('slide', function(e, val) {
      e.preventDefault();
      Session.set('formNumber', parseInt(val));
    });
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
