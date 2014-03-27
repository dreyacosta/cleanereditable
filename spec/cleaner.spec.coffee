'use strict'

document.write '<div data-placeholder="My test div" contenteditable="true"></div>'
editable = document.querySelector '[contenteditable="true"]'

describe 'cleaner', ->
  beforeEach ->
    editable.innerHTML = '<div>Hello World</div><pre>Spain</pre><blockquote>Madrid</blockquote>'

  it 'should clean child nodes into p tags', ->
    result = cleaner.cleanChildNodes(editable.childNodes)
    expect(result.join '').toEqual '<p>Hello World</p><p>Spain</p><p>Madrid</p>'

  it 'should return true if its empty', ->
    expect(cleaner.isEmpty(editable)).toEqual false
    editable.innerHTML = '<p><br></p>'
    expect(cleaner.isEmpty(editable)).toEqual true
    editable.innerHTML = ''
    expect(cleaner.isEmpty(editable)).toEqual true

  it 'should set data-placeholder', ->
    cleaner.setPlaceholder([editable])
    expect(editable.innerHTML).toEqual 'My test div'

  it 'should add listeners', ->
    cleaner.addListeners([editable])
    editable.focus()
    editable.blur()
    expect(editable.innerHTML).toEqual '<p>Hello World</p><p>Spain</p><p>Madrid</p>'

  it 'should empty on focus if content is equal to placeholder', ->
    cleaner.addListeners([editable])
    cleaner.setPlaceholder([editable])
    editable.focus()
    expect(editable.innerHTML).toEqual ''
    editable.blur()
    expect(editable.innerHTML).toEqual 'My test div'