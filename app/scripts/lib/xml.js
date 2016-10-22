'use strict';

var XML = {

  // Instance of external XML file
  instance: undefined,

  // Parameters:
  // xmlUrl (String) - XML file URL
  get: function(xmlUrl) {
    if (xmlUrl) {
      var xmlLoaded = false;

      try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", xmlUrl, false);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState === 4) {
            if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
              Common.showMessage(MESSAGE_XML_SUCCESSFULLY_LOADED);
            }
            else {
              Common.showMessage(MESSAGE_XML_NOT_LOADED);
            }
          } else {
            Common.showMessage(MESSAGE_XML_NOT_LOADED);
          }
        };
      }
      catch (Exception) {
        var ie = (typeof window.ActiveXObject != 'undefined');

        if (ie) {
          this.instance = new ActiveXObject("Microsoft.XMLDOM");
          this.instance.async = false;
          //while (xmlDoc.readyState != 4) {
          //};
          this.instance.load(xmlUrl);
          this.read();
          xmlLoaded = true;
        } else {
          this.instance = document.implementation.createDocument("", "", null);
          this.instance.onload = this.read;
          this.instance.load(xmlUrl);
          xmlLoaded = true;
        }
      }

      if (!xmlLoaded) {
        xmlHttp.setRequestHeader('Content-Type', 'text/xml');
        xmlHttp.send("");
        this.instance = xmlHttp.responseXML;
        this.read();
      }
    } else {
      Common.showMessage(MESSAGE_XML_URL_IS_EMPTY);
    }
  },

  read: function() {
    Common.render('Кол-во внутренних ссылок: ' + this.getNumberOfInternalLinks());
    Common.render('Кол-во букв: ' + this.getNumberOfLetters());
    Common.render('Кол-во битых внутренних ссылок: ' + this.getNumberOfDeadLinks());
  },

  getNumberOfInternalLinks: function() {
    return this.instance ? this.instance.querySelectorAll('[href^="#"]').length : 0;
  },

  getNumberOfLetters: function() {
    return this.instance ? this.instance.firstChild.textContent.replace(/[^a-zа-я]/gi, '').length : 0;
  },

  getNumberOfDeadLinks: function() {
    if (!this.instance) {
      return 0;
    }
    var instance = this.instance,
      count = 0;
    // Iterate
    [].forEach.call(
      instance.querySelectorAll('[href^="#"]'),
      function(el){
        count += instance.getElementById(el.getAttribute('href').replace(/^\W/g, '')) ? 0 : 1;
      }
    );
    return count;
  }

};