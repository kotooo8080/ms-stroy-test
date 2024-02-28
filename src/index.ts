import TreeStore from "./treeeStore";

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1 },
    { id: 3, parent: 1 },
    { id: 4, parent: 2 },
    { id: 5, parent: 2 },
    { id: 6, parent: 2 },
    { id: 7, parent: 4 },
    { id: 8, parent: 4 }
];

// Usage
const ts = new TreeStore(items);
console.log(ts.getAllChildren(1));
