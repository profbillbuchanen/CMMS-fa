// JavaScript اصلی برای سیستم CMMS

document.addEventListener('DOMContentLoaded', function() {
    // اضافه کردن کلاس fade-in به تمام المان‌ها هنگام لود
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // مدیریت فرم‌ها
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⏳ در حال پردازش...';
            }
        });
    });

    // تایپ انیمیشن برای اعداد
    animateNumbers();
});

// انیمیشن اعداد
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-card-value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            stat.textContent = '0';
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString('fa-IR');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString('fa-IR');
                }
            }, 30);
        }
    });
}

// تبدیل اعداد انگلیسی به فارسی
function toPersianNum(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => persianDigits[x]);
}

// نمایش پیام‌های Toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// اضافه کردن استایل انیمیشن
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تایید حذف
function confirmDelete(message = 'آیا از حذف این مورد اطمینان دارید؟') {
    return confirm(message);
}

// جستجوی زنده
function setupLiveSearch(inputSelector, targetSelector) {
    const input = document.querySelector(inputSelector);
    const targets = document.querySelectorAll(targetSelector);
    
    if (input && targets.length > 0) {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            targets.forEach(target => {
                const text = target.textContent.toLowerCase();
                target.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}
