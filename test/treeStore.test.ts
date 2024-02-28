import * as assert from 'assert';
import { suite, it } from 'mocha';
import TreeStore from '../src/treeeStore';

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1 },
    { id: 3, parent: 1 },
    { id: 4, parent: 2 }
];
 
const emptyArr = [];

suite('Suite::TreeStore', () => {
    it('Test::GetAll::Correct number of items', () => {
        const store = new TreeStore(items);
        const result = store.getAll();
        assert.equal(result.length, items.length);
    })

    it('Test::GetItem::Correct item', () => {
        const store = new TreeStore(items);
        const result = store.getItem(2);
        assert.equal(result, items[1]);
    })

    it('Test::GetItem::Undefined for incorrect id', () => {
        const store = new TreeStore(items);
        const result = store.getItem(10);
        assert.equal(result, undefined);
    })

    it('Test::GetChildren::Empty array for incorrect id', () => {
        const store = new TreeStore(items);
        const result = store.getChildren(10);
        assert.equal(result.length, 0);
    })

    it('Test::GetChildren::Only direct children', () => {
        const store = new TreeStore(items);
        const result = store.getChildren(1);
        assert.deepEqual(result, [items[1], items[2]]);
    })

    it('Test::GetAllChildren::Empty array for incorrect id', () => {
        const store = new TreeStore(items);
        const result = store.getAllChildren(10);
        assert.equal(result.length, 0);
    })

    it('Test::GetAllChildren::Only direct children', () => {
        const store = new TreeStore(items);
        const result = store.getAllChildren(2);
        assert.deepEqual(result, [items[3]]);
    })

    it('Test::GetAllChildren::All children', () => {
        const store = new TreeStore(items);
        const result = store.getAllChildren(1);
        assert.deepEqual(result, [items[3], items[1], items[2]]);
    })

    it('Test::GetAllParents::Empty array for root', () => {
        const store = new TreeStore(items);
        const result = store.getAllParents(1);
        assert.equal(result.length, 0);
    })

    it('Test::GetAllParents::Correct order', () => {
        const store = new TreeStore(items);
        const result = store.getAllParents(4);
        assert.deepEqual(result, [items[1], items[0]]);
    })
});