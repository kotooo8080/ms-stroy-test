type Id = number | string;

interface TreeSource {
    id: Id;
    parent: Id;
}

interface TreeStoreElem {
    source: TreeSource;
    children: Id[];
}

export default class TreeStore<T extends TreeSource> {
    private store = new Map<Id, TreeStoreElem>();

    constructor(array: T[]) {
        for (let i = 0; i < array.length; ++i) {
            this.store.set(array[i].id, { source: array[i], children: [] });
        }
        for (let i = 0; i < array.length; ++i) {
            this.store.get(array[i].parent)?.children.push(array[i].id);
        }
    }

    getAll(): TreeSource[] {
        const result: TreeSource[] = [];
        for (const [key, value] of this.store) {
            result.push(value.source);
        }
        return result;
    }

    getItem(id: Id): TreeSource | undefined {
        return this.store.get(id)?.source;
    }

    getChildren(id: Id): TreeSource[] {
        return this.store.get(id)?.children
            .map((childId) => this.store.get(childId)?.source) || [];
    }

    getAllChildren(id: Id): TreeSource[] {
        return this.store.get(id)?.children
            .flatMap(this.traverse.bind(this)) || [];
    }

    private traverse(id: Id): TreeSource[] {
        const current = this.store.get(id);
        if (!current) {
            return [];
        }
        const result: TreeSource[] = current.children
            .flatMap(this.traverse.bind(this));
        result.push(current.source);
        return result;
    }

    getAllParents(id: Id): TreeSource[] {
        const result: TreeSource[] = [];
        const parentId = this.store.get(id).source.parent;
        let current = this.store.get(parentId);

        while (current){
            result.push(current.source);
            current = this.store.get(current.source.parent);
        } 
        return result;
    }
}