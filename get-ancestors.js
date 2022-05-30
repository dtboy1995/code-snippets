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
// 要查询的节点 返回和父节点在同一作用域 递归concat，从末尾->父节点->父节点->...-> ROOT
