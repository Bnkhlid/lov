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
// إضافة قلوب عند الضغط أو اللمس
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.position = 'fixed';
    heart.style.left = (x - 16) + 'px';
    heart.style.top = (y - 16) + 'px';
    heart.style.fontSize = '2.2rem';
    heart.style.color = '#e06666';
    heart.style.pointerEvents = 'none';
    heart.style.userSelect = 'none';
    heart.style.zIndex = 9999;
    heart.style.opacity = 1;
    heart.style.transition = 'transform 0.8s cubic-bezier(.36,2,.45,.6), opacity 1s';
    document.body.appendChild(heart);

    // حركة القلب (يطلع لفوق شويه ويصغر)
    setTimeout(() => {
        heart.style.transform = 'translateY(-60px) scale(0.6)';
        heart.style.opacity = 0;
    }, 10);

    // حذف القلب بعد ثانية
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// دعم الماوس واللمس معاً
document.addEventListener('click', function(e) {
    createHeart(e.clientX, e.clientY);
});
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 0) {
        createHeart(e.touches[0].clientX, e.touches[0].clientY);
    }
});