(function() {
  (function(root) {
    'use strict';
    var addListeners, cleanChildNodes, cleanDOMEl, cleaner, emptyDOMEl, encapsulateText, getAttribute, getElements, init, isEmpty, setPlaceholder;
    cleaner = {};
    if (typeof exports !== 'undefined') {
      cleaner = exports;
    } else {
      cleaner = root.cleaner = {};
    }
    cleaner.VERSION = '0.1.0';
    addListeners = cleaner.addListeners = function(nodes) {
      var node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        node.addEventListener('blur', cleanDOMEl);
        _results.push(node.addEventListener('focus', emptyDOMEl));
      }
      return _results;
    };
    cleanChildNodes = cleaner.cleanChildNodes = function(childNodes) {
      var child, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = childNodes.length; _i < _len; _i++) {
        child = childNodes[_i];
        _results.push(encapsulateText(child));
      }
      return _results;
    };
    cleanDOMEl = cleaner.cleanDOMEl = function(event) {
      var el, result;
      el = event.currentTarget;
      if (isEmpty(el)) {
        return el.innerHTML = el.getAttribute('data-placeholder');
      }
      result = cleanChildNodes(el.childNodes);
      if (result.length > 0) {
        return el.innerHTML = result.join('');
      }
    };
    emptyDOMEl = cleaner.emptyDOMEl = function(event) {
      var el;
      el = event.currentTarget;
      if (isEmpty(el)) {
        return el.innerHTML = '';
      }
    };
    encapsulateText = cleaner.encapsulateText = function(el) {
      if (el.textContent) {
        return '<p>' + el.textContent + '</p>';
      }
    };
    getAttribute = cleaner.getAttribute = function(el) {
      if (isEmpty) {
        return el.innerHTML = el.getAttribute('data-placeholder');
      }
    };
    getElements = cleaner.getElements = function(selector) {
      return document.querySelectorAll(selector);
    };
    isEmpty = cleaner.isEmpty = function(el) {
      var option, options, _i, _len;
      options = ['<p><br></p>', '', '__', el.getAttribute('data-placeholder')];
      for (_i = 0, _len = options.length; _i < _len; _i++) {
        option = options[_i];
        if (option === el.innerHTML) {
          return true;
        }
      }
      return false;
    };
    setPlaceholder = cleaner.setPlaceholder = function(nodes) {
      var node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _results.push(getAttribute(node));
      }
      return _results;
    };
    init = cleaner.init = function(options) {
      options = options || {};
      if (!options.selector) {
        return console.log('DOM selector must be specify');
      }
      if (options.listeners) {
        addListeners(getElements(options.selector));
      }
      setPlaceholder(getElements(options.selector));
    };
    return cleaner;
  })(this);

}).call(this);
