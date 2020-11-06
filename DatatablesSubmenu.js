class TableSubmenu {

    constructor(row, config) {
        this.config = config
        this.id = row.getAttribute('id')
        if (!this.id) {
            error.log('Table rows must have an id to create submenus')
            return
        }
        this.submenuElement = null
        this.check()
        this.init()
    }

    check() {
        if (!this.config.children || !this.config.parent) {
            error.log('TableSubmenu : error : config is not properly defined')
            return
        }
    }

    hideAll() {
        const submenus = document.querySelectorAll('div.' + this.config.parent.mainClass + ':not(.hide)')
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
        if (!link.routePrefix) {
            error.log('TableSubmenu : error : Yout must specify route prefix in config for child element')
            return
        }
        const routeSufix = (link.routeSufix) ? link.routeSufix : ''
        a.setAttribute('href', link.routePrefix + this.id + routeSufix)
        a.innerText = link.text
        return a
    }

    createSubmenu() {
        let div = document.createElement('div')
        div.classList.add(this.config.parent.mainClass)
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
