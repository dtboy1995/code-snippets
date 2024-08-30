```js
let data = [
            { "id": "1", "name": "1", "parent_id": "" },
            { "id": "2", "name": "1-2", "parent_id": "1" },
            { "id": "3", "name": "1-3", "parent_id": "1" },
            { "id": "4", "name": "1-2-4", "parent_id": "2" },
            { "id": "5", "name": "1-2-5", "parent_id": "2" },
            { "id": "6", "name": "1-3-6", "parent_id": "3" },
            { "id": "7", "name": "1-3-7", "parent_id": "3" },
            { "id": "8", "name": "1-2-4-8", "parent_id": "4" },
            { "id": "9", "name": "1-2-5-9", "parent_id": "5" },
            { "id": "10", "name": "1-2-5-10", "parent_id": "5" },
            { "id": "11", "name": "1-3-6-11", "parent_id": "6" },
            { "id": "12", "name": "1-3-7-12", "parent_id": "7" },
            { "id": "13", "name": "1-2-4-8-13", "parent_id": "8" },
            { "id": "14", "name": "1-2-5-9-14", "parent_id": "9" },
            { "id": "15", "name": "1-2-5-10-15", "parent_id": "10" },
            { "id": "16", "name": "1-2-5-10-16", "parent_id": "10" },
            { "id": "17", "name": "1-3-6-11-17", "parent_id": "11" },
            { "id": "18", "name": "1-3-7-12-18", "parent_id": "12" },
            { "id": "19", "name": "1-2-4-8-13-19", "parent_id": "13" },
            { "id": "20", "name": "1-2-5-9-14-20", "parent_id": "14" }
]
// function buildTree(list, parent_id = "") {
//     return list
//         .filter(item => item.parent_id === parent_id)
//         .map(item => {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 parent_id: item.parent_id,
//                 children: buildTree(list, item.id)
//             }
//         })
// }

function buildTree(list) {
const map = {};
const roots = [];

list.forEach(item => {
    map[item.id] = { ...item, children: [] };
});

list.forEach(item => {
    if (item.parent_id) {
        // 如果存在父节点，将当前节点加入父节点的children数组
        if (map[item.parent_id]) {
            map[item.parent_id].children.push(map[item.id]);
        }
    } else {
        // 如果没有父节点，说明是根节点
        roots.push(map[item.id]);
    }
});

return roots;
}
function getNodeAndAncestors(list, id) {
const node = list.find(item => item.id === id)
if (!node) return null

const ancestors = []
let currentNode = node

while (currentNode.parent_id) {
    const parent = list.find(item => item.id === currentNode.parent_id)
    if (parent) {
        ancestors.unshift(parent)
        currentNode = parent
    } else {
        break
    }
}

return [node, ...ancestors]
}
function getNodeAndDescendants(list, id) {
const node = list.find(item => item.id === id)
if (!node) return null

const descendants = []

function findChildren(parentId) {
    const children = list.filter(item => item.parent_id === parentId)
    descendants.push(...children);
    children.forEach(child => findChildren(child.id))
}

findChildren(node.id)

return [node, ...descendants]
}
const tree = buildTree(data)
console.log(tree)

const nodeAndAncestors = getNodeAndAncestors(data, "10")
console.log(nodeAndAncestors)

const nodeAndDescendants = getNodeAndDescendants(data, "2")
console.log(nodeAndDescendants)
// 获取后代/祖先节点的list数组后，如果想继续buildTree 需要 list[0].parent_id = 0 (修改第一个item的parent_id为0)
```
