// ألوان قلوب عشوائية جميلة
const heartColors = [
    "#e06666", "#f483c1", "#e91e63", "#1e88e5", "#ffd700", "#4caf50", "#ff9800", "#9c27b0"
];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'flying-heart';
    // لون عشوائي
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    // موضع أفقى عشوائي
    heart.style.left = Math.random() * 95 + "vw";
    // حجم عشوائي
    const size = Math.random() * 18 + 22;
    heart.style.fontSize = size + "px";
    // شكل القلب
    heart.innerHTML = "&#10084;"; // رمز القلب
    document.body.appendChild(heart);

    // حركة القلب للأعلى مع اختفاء تدريجي
    setTimeout(() => {
        heart.style.transform = `translateY(-110vh) scale(${Math.random() * 0.8 + 0.7})`;
        heart.style.opacity = 0;
    }, 100);

    // حذف القلب بعد انتهاء الحركة
    setTimeout(() => {
        heart.remove();
    }, 3500);
}

// إنشاء قلب كل 600-1200 مللي ثانية
setInterval(createHeart, Math.random() * 600 + 600);
