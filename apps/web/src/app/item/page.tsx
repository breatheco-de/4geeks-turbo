'use client';

import {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  Item,
} from '@4geeks/actions';
import React from 'react';

export default function X() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [newItemName, setNewItemName] = React.useState<string>('');
  const [updateItemId, setUpdateItemId] = React.useState<number | null>(null);
  const [updateItemName, setUpdateItemName] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await readItems();
      setItems(fetchedItems);
    }
    fetchItems();
  }, []);

  const handleCreateItem = async () => {
    const newItem = await createItem(newItemName);
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const handleUpdateItem = async () => {
    if (updateItemId !== null && updateItemName.trim() !== '') {
      const updatedItem = await updateItem(updateItemId, updateItemName);
      if (updatedItem) {
        setItems(
          items.map((item) => (item.id === updateItemId ? updatedItem : item))
        );
        setUpdateItemId(null);
        setUpdateItemName('');
      }
    }
  };

  const handleDeleteItem = async (id: number) => {
    const success = await deleteItem(id);
    if (success) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        <a href="/" className="text-blue-500 hover:underline">
          Back to Home
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">Simple CRUD Item</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="border border-gray-300 p-2 rounded w-full mb-2"
          disabled={updateItemId !== null}
        />
        <button
          onClick={handleCreateItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={updateItemId !== null}
        >
          Create Item
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={updateItemName}
          onChange={(e) => setUpdateItemName(e.target.value)}
          placeholder="Update item name"
          className="border border-gray-300 p-2 rounded w-full mb-2"
          disabled={updateItemId === null}
        />
        <button
          onClick={handleUpdateItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={updateItemId === null}
        >
          Update Item
        </button>
      </div>
      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item.id} className="mb-2 flex justify-between items-center">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setUpdateItemId(item.id);
                  setUpdateItemName(item.name);
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
