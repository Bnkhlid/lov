let currentPhotoSrc = null;
let deleteMode = false;
const BACKEND_URL = "https://lov-git-main-bnkhlids-projects.vercel.app"; // غيره بالرابط بتاعك

// ====== Photos ======
async function loadPhotos() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  const res = await fetch(`${BACKEND_URL}/api/photos`);
  const photos = await res.json();
  photos.forEach((src, idx) => {
    const container = document.createElement("div");
    container.className = "photo-container";
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => !deleteMode && openPopup(src);
    container.appendChild(img);

    if (deleteMode) {
      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "🗑️";
      delBtn.onclick = async (e) => {
        e.stopPropagation();
        await fetch(`${BACKEND_URL}/api/photos/${idx}`, { method: "DELETE" });
        loadPhotos();
      };
      container.appendChild(delBtn);
    }

    gallery.appendChild(container);
  });
}

document
  .getElementById("addPhotoForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = document.getElementById("photoInput");
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const base64 = await fileToBase64(file);
      await fetch(`${BACKEND_URL}/api/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      input.value = "";
      loadPhotos();
    }
  });

// ====== Notes ======
async function loadNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  const res = await fetch(`${BACKEND_URL}/api/notes`);
  const notes = await res.json();
  if (notes.length === 0) {
    notesList.innerHTML = `<div class="note-card" style="text-align:center;">Add your first love note here! 💌</div>`;
  } else {
    notes.forEach((note, idx) => {
      const card = document.createElement("div");
      card.className = "note-card";
      card.textContent = note;
      const del = document.createElement("button");
      del.className = "delete-note";
      del.innerHTML = "×";
      del.onclick = async (e) => {
        e.stopPropagation();
        await fetch(`${BACKEND_URL}/api/notes/${idx}`, { method: "DELETE" });
        loadNotes();
      };
      card.appendChild(del);
      notesList.appendChild(card);
    });
  }
}

document
  .getElementById("noteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = document.getElementById("noteInput");
    const note = input.value.trim();
    if (note) {
      await fetch(`${BACKEND_URL}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      input.value = "";
      loadNotes();
    }
  });

// ====== Utils ======
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

function openPopup(src) {
  document.getElementById("popupImg").src = src;
  document.getElementById("popup").style.display = "flex";
  currentPhotoSrc = src;
}

function closePopup(event) {
  if (!event || event.target.id === "popup") {
    document.getElementById("popup").style.display = "none";
    currentPhotoSrc = null;
  }
}

document
  .getElementById("toggleDeleteMode")
  .addEventListener("click", function () {
    deleteMode = !deleteMode;
    this.textContent = deleteMode ? "Cancel Delete" : "Delete Photo";
    loadPhotos();
  });

// ====== On Load ======
document.addEventListener("DOMContentLoaded", () => {
  loadPhotos();
  loadNotes();
});
