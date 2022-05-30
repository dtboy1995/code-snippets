function getParentId(list, id) {
    for (let it of list) {
        if (it.id == id) {
            return [it]
        }
        if (it.children) {
            let node = getParentId(it.children, id);
            if (node !== undefined) {
                return node.concat(it)
            }
        }
    }
}
