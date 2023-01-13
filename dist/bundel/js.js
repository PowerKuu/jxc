function elementId(id) {
    return document.getElementById(id)
}

function getClientScopedById(value, id) {
    function drillUntilScope(element) {
        const attrScope = element.getAttribute("data-scope")
        if (attrScope) return attrScope
        else drillUntilScope(element.parentElement)
    }

    const scope = drillUntilScope(document.getElementById(id))

    return window[[scope, value].join(":")]
}



// Make sure import is correct
window["_jxc"] = {
    elementId,
    getClientScopedById
}