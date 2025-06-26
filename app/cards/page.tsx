"use client";

import React, { useEffect } from "react";

export default function CardsPage() {
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    console.log(data);
  };

  return <div>page</div>;
}
