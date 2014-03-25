((root) ->
  'use strict'

  cleaner = {}

  if typeof exports isnt 'undefined'
    cleaner = exports
  else
    cleaner = root.cleaner = {}

  cleaner.VERSION = '0.1.0'

  addListeners = cleaner.addListeners = (nodes) ->
    for node in nodes
      node.addEventListener('blur', cleanDOMEl)
      node.addEventListener('focus', emptyDOMEl)

  cleanChildNodes = cleaner.cleanChildNodes = (childNodes) ->
    encapsulateText child for child in childNodes

  cleanDOMEl = cleaner.cleanDOMEl = (event) ->
    el = event.currentTarget

    return el.innerHTML = el.getAttribute 'data-placeholder' if isEmpty el

    result = cleanChildNodes el.childNodes
    el.innerHTML = result.join '' if result.length > 0

  emptyDOMEl = cleaner.emptyDOMEl = (event) ->
    el = event.currentTarget
    el.innerHTML = '' if isEmpty el

  encapsulateText = cleaner.encapsulateText = (el) ->
    if el.textContent
      '<p>' + el.textContent + '</p>'

  getAttribute = cleaner.getAttribute = (el) ->
    if isEmpty
      el.innerHTML = el.getAttribute 'data-placeholder'

  getElements = cleaner.getElements = (selector) ->
    document.querySelectorAll(selector)

  isEmpty = cleaner.isEmpty = (el) ->
    options = ['<p><br></p>', '', '__', el.getAttribute 'data-placeholder']
    return true for option in options when option is el.innerHTML
    return false

  setPlaceholder = cleaner.setPlaceholder = (nodes) ->
    for node in nodes
      getAttribute node

  init = cleaner.init = (options) ->
    options = options || {}

    if !options.selector
      return console.log 'DOM selector must be specify'

    if options.listeners
      addListeners(getElements options.selector)

    setPlaceholder(getElements options.selector)

    return

  cleaner
) this