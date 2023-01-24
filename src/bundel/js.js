function factory(tag, attributes, ...children) {
    children = [].concat(...children)

    if (typeof tag == "function") return tag({...attributes, children: children})

    const element = document.createElement(tag)

    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

    for (const child of children) {
        if (typeof child === "string") {
            element.innerText += child
        } else {
            element.appendChild(child)
        }
    }

    return element
}

function appendClientElement(target, element) {
    if (!target) return
    target.appendChild(element)
}



// Make sure import is correct
window["_jxc"] = {
    appendClientElement
}

window["_compiler"] = {
    factory
}