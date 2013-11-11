(function() {
  'use strict';

  var root = this;

  var cleanerEditable = {};

  if (typeof exports !== 'undefined') {
    cleanerEditable = exports;
  } else {
    cleanerEditable = root.cleanerEditable = {};
  }

  cleanerEditable.VERSION = '0.0.1';

  var cleanContent = cleanerEditable.cleanContent = function(event) {
    var result = [];
    var element = event.currentTarget;

    element.innerHTML = element.innerHTML.replace(/__/g, '');

    if (element.innerHTML === '') {
      var placeholder = element.getAttribute('data-placeholder');
      element.innerHTML = placeholder !== null ? placeholder : 'Edit me';
    }

    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];

      if (child.innerHTML) {
        if ( child.getAttribute('class') ) {
          child.removeAttribute('class');
        }

        if ( child.getAttribute('style') ) {
          child.removeAttribute('style');
        }

        child.innerHTML = child.innerHTML.replace(/<.*?>/g, '');
        child.innerHTML = '<p>' + child.innerHTML + '</p>';

        result.push(child.innerHTML);
      }
    }

    if (result.length > 0) {
      element.innerHTML = result.join('');
    }
  };

  var emptyEditable = cleanerEditable.emptyEditable = function(argument) {
    var element = event.currentTarget;
    var placeholder = element.getAttribute('data-placeholder');

    if (element.innerHTML === placeholder || element.innerHTML === 'Edit me') {
      element.innerHTML = '__';
    }
  };

  var init = cleanerEditable.init = function(options) {
    var containers;

    if (options) {
      containers = options.containers ? options.containers : null;
    } else {
      containers = document.querySelectorAll('[contenteditable="true"]');
    }

    for (var i = 0; i < containers.length; i++) {
      var element = containers[i];
      var placeholder = element.getAttribute('data-placeholder');

      if (element.innerHTML === '') {
        element.innerHTML = placeholder !== null ? placeholder : 'Edit me';
      }

      element.addEventListener('blur', cleanContent);
      element.addEventListener('focus', emptyEditable);
    }
  };

  return cleanerEditable;
}).call(this);