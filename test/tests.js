var cases = {
   '('    :   ')',
   '{'    :   '}',
   '{{'   :  '}}',
   '<'    :   '>',
   '['    :   ']',
   '/*'   :  '*/',
   '<!--' : '-->',
   '<%'   :  '%>',
   '<%='  :  '%>'
};

function _isHTML(str) {
   var _html_re = new RegExp("<([a-z]+)([^<]+)*(?:>)", "g");
   if (str.match(_html_re)) {
      return true;
   }
   return false;
}

function _closeHTML(str) {
   var _tag_type = new RegExp("[a-zA-Z0-9]+", ""),
       _tag = str.match(_tag_type);
   return ("</" + _tag + ">");
}


/* 
 * Test coverage for _isHTML(str)
 * Take a string parameter and returns a boolean indiciating if the string
 * is valid HTML
 *
 */

test( "is valid html tag test", function() {
   ok( _isHTML('<b>'), "b is valid html" );
   ok( _isHTML('<ol>'), "ol is valid html" );
   ok( _isHTML('<div>'), "div is valid html" );
   ok( _isHTML('<img src="image.jpg"/>'), "img is valid html");
   ok( _isHTML('<a href="" class="" id="">'), "a is valid html");
   ok( _isHTML('<input type="html" class="" id="" placeholder="">'), "input is valid html" );
});


/* 
 * Test coverage for _closeHTML(str)
 * Take a string parameter and returns the corrct closing tag
 *
 */

test( "closes tags properly", function() {
   ok( _closeHTML("<div>") == "</div>", "closes div tag properly" );
   ok( _closeHTML('<span class="this">') === "</span>", "closes span tag properly" );
   ok( _closeHTML('<a href="http://google.com">') === "</a>", "closes anchor tag proerly properly" );
});


/*
 * test the cases map for predefined cases
 */

test( "matches through the single cases hash", function() {
   ok( cases['{'] === '}', "closes curly brace" );
   ok( cases['<%='] === '%>', "closes erb evaluate" );
});
