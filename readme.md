# Table Submenu
this module helps you to add a submenu on a click on a table row.

Very useful when using datatbles for example.

## install the module
`npm install datatablessubmenu`

## Basics

### Read this before
A submenu is a `div` element with as much as you like `a` children
You must create a config object to let TableSubmenu class know how to build your submenus

- Note that all rows must have an id attribute
- You must have a class to hide elements (by default, hide class name  is provided)
- submenu children are `a` elements whose `href` attributes are made like this :
    * routePrefix + id + routeSufix
    routePrefix is what comes before your id in href
    routeSufix is what comes after (can be removed)
    
### create a js file
```javascript
 
import {TableSubmenu} from "DatatablesSubmenu"

document.addEventListener('DOMContentLoaded', () => {
    // select all rows in your table
    const rows = document.querySelectorAll('tr')
    
// loop on your rows
    rows.forEach((row) => {

        // create submenu for each row
        const subMenu = new TableSubmenu(row, {
            // config
            parent: {
                mainClass: "submenu-row",
                classes: [
                    "hide"
                ],
                    idPrefix : "mysubmenu-"
            },
            children: {
                'edit': {
                    routePrefix: "/url/prefix/",
                    routeSufix : "/sufix",
                    text: "First text" // for example "Edit"
                },
                'show': {
                    routePrefix: "/url/prefix2/",
                    routeSufix : "/sufix2",
                    text: "second text" // for example "Show details"
                }
            }
        })
        
        // Add click event listener on each row
        row.addEventLister('click', (e) => {
            // hide all opened submenus
            subMenu.hideAll()
            // show specific row submenu
            subMenu.show(e)
        })
    }
})
```

## Use it inside a symfony project with Datatables Omines Bundle

### install
`npm install datatablessubmenu`

### Create an asset

First create a js file `submenu.js`
Edit this file :

```javascript

import {TableSubmenu} from "DatatablesSubmenu"
function subMenu () {
  return TableSubmenu
}
```
edit your Webpack.config.js file and add theses lines

```javascript
.copyFiles({
        from: './route/to/your/js/file/submenu.js',
        to: 'js/[path][name].[ext]',
    })

```

### Use it in your datatables configuration
in your twig template you should have your initDatatable function.
Yout have to add subMenu in the drawCallback method like above :

```

$('#yourTableId').initDataTables({{ datatable_settings(datatable) }}, {
    drawCallback: function(settings) {
       
        // [... pre-existant code ... ]
    
        const rows = document.querySelectorAll('tr')
        rows.forEach((row) => {
            const submenu = new TableSubmenu(row, {
                parent: {
                    mainClass: "submenu-row",
                    classes: [
                        "hide"
                    ],
                        idPrefix : "idprefixYouLike-"
                },
                children: {
                    'edit': {
                        routePrefix: "/url/action/",
                        routeSufix : "/sufix", // optional
                        text: "your first link text"
                    },
                    'show': {
                        routePrefix: "/url/action2/",
                        routeSufix : "/sufix", // optional
                        text: "Your second link text"
                    }
                }
            })
            row.addEventListener('click', (e) => {
                submenu.hideAll()
                submenu.show(e)
            })
        })

```
