'use strict';

// Common functions
var Common = {

  // Parameters:
  // name (String) - query parameter name we're looking for
  getUrlParameter: function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  // Parameters:
  // message (String) - Message to user
  showMessage: function (message) {
    var box = document.querySelector('#message');
    if (!box) {
      box = document.createElement('div');
      box.setAttribute("id", "message");
    }
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
    var content = document.createTextNode(message);
    box.appendChild(content);

    document.body.insertBefore(box, document.body.firstChild);
  },

  // Parameters:
  // content (String) - Content of new element
  render: function (content) {
    var newElem = document.createElement('div');
    var newContent = document.createTextNode(content);
    newElem.appendChild(newContent);

    document.body.appendChild(newElem);
  }


};