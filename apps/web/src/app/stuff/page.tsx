"use client";

import React, { useEffect } from "react";

import type { AppType } from "../../../../api/src";
import { hc } from "hono/client";
import Link from "next/link";

const client = hc<AppType>("http://localhost:4000");

type Item = {
  id: number;
  name: string;
};

export default function X() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [newItemName, setNewItemName] = React.useState<string>("");
  const [updateItemId, setUpdateItemId] = React.useState<number | null>(null);
  const [updateItemName, setUpdateItemName] = React.useState<string>("");

  useEffect(() => {
    async function fetchItems() {
      const response = await client.stuff.$get();
      const fetchedItems = await response.json();
      const typedItems: Item[] = fetchedItems
        .filter((item: { id?: number; name: string }) => item.id !== undefined)
        .map((item) => ({
          id: item.id!,
          name: item.name,
        }));
      setItems(typedItems);
    }
    fetchItems();
  }, []);

  const handleCreateItem = async () => {
    const response = await client.stuff.$post({
      json: { name: newItemName },
    });
    const newItem = await response.json();

    if (newItem.data.id !== undefined) {
      setItems([...items, { id: newItem.data.id, name: newItem.data.name }]);
    } else {
      console.error("New item ID is undefined");
    }

    setNewItemName("");
  };

  const handleUpdateItem = async () => {
    if (updateItemId) {
      const response = await client.stuff[":id"].$put({
        param: { id: updateItemId.toString() },
        json: { name: updateItemName },
      });
      const updatedItem = await response.json();

      setUpdateItemId(null);
      setUpdateItemName("");
      setItems(
        items.map((v) =>
          updateItemId === v.id ? { ...v, name: updatedItem.data.name } : v
        )
      );
    }
  };

  const handleDeleteItem = async (id: number) => {
    console.log("id", id, items);
    const response = await client.stuff[":id"].$delete({
      param: { id: id.toString() },
    });
    if (response.ok) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
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
