# Surround for Brackets

Simply select the text you wish to surround and press ```Ctrl - Shift - J``` or ``` Cmd - Shift - J``` for Macs.

#### Installation

Installation can now be handled through the extension registry.

##### Step 1: Click file -> "Extension Manager"

You can now search for "Brackets Surround" and then click install.

---

#### For Older Versions
##### Step 1: Click file -> "Install Extension"

Paste in the following URL

```
https://github.com/pedelman/brackets-surround
```

##### Step 2: Restart brackets
Restart Brackets to see the new plugin. To verify the extension was loaded, click "Edit" and you should see a option called "Surround".

---

#### Easy to add new functionality

```js
cases = {
   '('    :   ')',
   '{'    :   '}',
   '<'    :   '>',
   '['    :   ']',
   '/*'   :  '*/',
   '<!--' : '-->',
   '<%'   :  '%>',
   '<%='  :  '%>'
};
```

Simply add a new key/value to the cases and it will instantly close the key.
