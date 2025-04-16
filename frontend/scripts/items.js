const baseURL = "http://localhost:8000";

async function loadItems(searchTerm = "") {
  try {
    const res = await fetch(`${baseURL}/items`);
    const data = await res.json();
    const list = document.getElementById("itemList");
    list.innerHTML = "";

    const filteredItems = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    document.getElementById("itemCount").textContent = `Total items: ${filteredItems.length}`;

    filteredItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.description}`;
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.onclick = () => deleteItem(item._id);
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading items:", error);
  }
}

async function deleteItem(id) {
  try {
    await fetch(`${baseURL}/items/${id}`, { method: "DELETE" });
    loadItems(document.getElementById("search").value);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  loadItems(e.target.value);
});

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!name || !description) return;
  
  try {
    await fetch(`${baseURL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    e.target.reset();
    loadItems(document.getElementById("search").value);
  } catch (error) {
    console.error("Error adding item:", error);
  }
});

loadItems();
