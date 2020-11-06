export class TableSubmenu {

    constructor(row, config) {
        this.config = config
        this.id = row.getAttribute('id')
        if (!this.id) {
            error.log('Table rows must have an id to create submenus')
        }
        this.submenuElement = null
        this.init()
    }

    hideAll() {
        const submenus = document.querySelectorAll('div.submenu-row:not(.hide)')
        submenus.forEach((submenu) => {
            submenu.classList.add('hide')
        })
    }

    init() {
        this.draw()
        this.submenuElement = document.getElementById(this.config.parent.idPrefix + '-' + this.id)
        document.body.addEventListener('click', (e) => {
            if(e.target.localName !== 'td') {
                this.hideAll()
            }
        })
    }

    createlink(link) {
        let a = document.createElement('a')
        a.setAttribute('href', link.routePrefix + this.id + link.routeSufix)
        a.innerText = link.text
        return a
    }

    createSubmenu() {
        let div = document.createElement('div')
        this.config.parent.classes.forEach((className) => {
            div.classList.add(className)
        })
        div.setAttribute('id', this.config.parent.idPrefix + '-' + this.id)
        for (const key in this.config.children) {
            div.appendChild(this.createlink(this.config.children[key]))
        }
        return div
    }

    show(e) {
        this.position(e)
        this.submenuElement.classList.remove('hide')
    }


    draw() {
        document.body.appendChild(this.createSubmenu())
    }

    position(e) {
        const X = e.clientX
        const Y = e.clientY  + window.scrollY
        const css = {
            position: 'absolute',
            top: Y + 'px',
            left: X + 'px',
        }
        Object.assign(this.submenuElement.style, css)
    }
}
