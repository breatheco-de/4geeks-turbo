'use server';

export type Item = {
  id: number;
  name: string;
};

let items: Item[] = [];
let nextId = 1;

export async function createItem(name: string): Promise<Item> {
  const newItem = { id: nextId++, name };
  items.push(newItem);
  return newItem;
}

export async function readItems(): Promise<Item[]> {
  return items;
}

export async function updateItem(id: number, name: string): Promise<Item | null> {
  const item = items.find(item => item.id === id);
  if (item) {
    item.name = name;
    return item;
  }
  return null;
}

export async function deleteItem(id: number): Promise<boolean> {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    return true;
  }
  return false;
}

// export * from './lib/actions';

export async function hello() {
  return 'Hello, world!';
}

export async function goodbye() {
  return 'Goodbye, world!';
}
