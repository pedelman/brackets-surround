/*
 * Copyright (c) 2012 Patrick Edelman. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache */

define(function (require, exports, module) {
    'use strict';

    var CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        Dialogs         = brackets.getModule("widgets/Dialogs"),
        surroundHtml    = require("text!templates/surround-input-modal.html"),
        editMenu        = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
        COMMAND_ID = "pedelman.surround",
        COMMAND_NAME = "Surround",
        cases = {
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

    ExtensionUtils.loadStyleSheet(module, "surround-input-modal.css");

    /*
     * _getSelectedText()
     * @private
     * Returns the text that has been selected in the editor window in focus     
     */
    function _getSelectedText() {
        return EditorManager.getActiveEditor().getSelectedText();
    }

    /*
     * _replaceActiveString(str)
     * @private     
     * Replaces the currently selected text with the passed string param 
     * @param {String} str
     */
    function _replaceActiveSelection(str) {
        EditorManager.getActiveEditor()._codeMirror.replaceSelection(str);
        EditorManager.getActiveEditor();
        EditorManager.focusEditor();
    }

    /*
     * _isHTML(str)
     * @private
     * Parses text to see if is opening HTML tag. Returns true if found.
     * @param {String} str
     */
    function _isHTML(str) {
        var _html_re = new RegExp("<([a-z]+)([^<]+)*(?:>)", "g");
        if (str.match(_html_re)) {
            return true;
        }
        return false;
    }

    /*
     * _closeHTML(str)
     * @private
     * Generates and returns a closing tag from passed in open tag.
     * @param {String} str
     */
    function _closeHTML(str) {
        var _tag_type = new RegExp("[a-zA-Z0-9]+", ""),
            _tag = str.match(_tag_type);
        console.log(_tag);
        if (_tag[0] === "img") {
            console.log(_tag);
            return false;
        }
        return ("</" + _tag + ">");
    }

    /*
     * surround()
     * Description
     * Adds surround text and replace the current selection
     */
    function surround() {
        var _t = _getSelectedText(),
            _output = "";
        Dialogs.showModalDialogUsingTemplate(surroundHtml);
        $('#surround_input').focus();
        $('#surround_input').keyup(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                var _c = $('#surround_input').val();
    
                if (_c === null) {
                    return;
                }
                if (cases[_c] !== undefined) {
                    _output = _c + _t + cases[_c];
                } else {
                    if (_isHTML(_c)) {
                        if (_closeHTML(_c) === false) {
                            Dialogs.cancelModalDialogIfOpen('surround_input');
                            return;
                        }
                        _output = _c + _t + _closeHTML(_c);
                    } else {
                        _output = _c + _t + _c;
                    }
                }
                $('.surround_input').fadeOut(300);
                Dialogs.cancelModalDialogIfOpen('surround_input');
                _replaceActiveSelection(_output);
            }
        });
    }
                                      
    CommandManager.register(COMMAND_NAME, COMMAND_ID, surround);
    editMenu.addMenuItem(COMMAND_ID, "Ctrl-Shift-J");
});
