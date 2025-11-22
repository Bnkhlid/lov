const BACKEND_URL = "https://lov-git-main-bnkhlids-projects.vercel.app"; // غيّره لما ترفع

async function loadMusic() {
  const musicList = document.getElementById("musicList");
  musicList.innerHTML = "";
  const res = await fetch(`${BACKEND_URL}/api/music`);
  const music = await res.json();
  music.forEach((song, idx) => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = song.name || `Song ${idx + 1}`;
    li.onclick = () => playMusic(song.src);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginRight = "10px";
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      // Flask: نستخدم POST مع /delete
      await fetch(`${BACKEND_URL}/api/music/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: idx }),
      });
      loadMusic();
    };
    li.appendChild(delBtn);
    musicList.appendChild(li);
  });
}

function playMusic(src) {
  const audio = document.getElementById("audioPlayer");
  audio.src = src;
  audio.play();
}

document
  .getElementById("addMusicForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById("musicUrlInput");
    const url = urlInput.value.trim();
    if (!url.endsWith(".mp3")) {
      alert("Please enter a direct mp3 link only!");
      urlInput.value = "";
      return;
    }
    const name = decodeURIComponent(url.split("/").pop()) || "New Song";
    await fetch(`${BACKEND_URL}/api/music`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, src: url }),
    });
    urlInput.value = "";
    loadMusic();
  });

document.addEventListener("DOMContentLoaded", loadMusic);
