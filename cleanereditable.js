(function(window) {
  var cleanerEditable = function(options) {
    var containers;
    var result = [];

    if (options) {
      containers = options.containers ? options.containers : null;
    } else {
      containers = document.querySelectorAll('[contenteditable="true"]');
    }

    this.cleanContent = function(event) {
      var element = event.currentTarget;

      element.innerHTML = element.innerHTML.replace(/__/g, '');

      if (element.innerHTML === '') {
        var placeholder = element.getAttribute('data-placeholder');
        element.innerHTML = placeholder !== null ? placeholder : 'Edit me';
      }

      result = [];

      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];

        if (child.innerHTML) {
          child.getAttribute('class') ? child.removeAttribute('class') : null;
          child.getAttribute('style') ? child.removeAttribute('style') : null;

          child.innerHTML = child.innerHTML.replace(/<.*?>/g, '');
          child.innerHTML = '<p>' + child.innerHTML + '</p>';

          result.push(child.innerHTML);
        }
      };

      if (result.length > 0) {
        element.innerHTML = result.join('');
      }
    };

    this.emptyEditable = function(event) {
      var element = event.currentTarget;
      var placeholder = element.getAttribute('data-placeholder');

      if (element.innerHTML === placeholder || element.innerHTML === 'Edit me') {
        element.innerHTML = '__';
      }
    };

    for (var i = 0; i < containers.length; i++) {
      var element = containers[i];
      var placeholder = element.getAttribute('data-placeholder');

      if (element.innerHTML === '') {
        element.innerHTML = placeholder !== null ? placeholder : 'Edit me';
      }

      element.addEventListener('blur', cleanContent);
      element.addEventListener('focus', emptyEditable);
    };

    return {
      cleanContent: this.cleanContent
    };
  };

  window.cleanerEditable = cleanerEditable;
})(window);