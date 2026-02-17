import PROJECT_CORE from './Driving_project.js';

/**
 * @class DrivingEmpire
 * المحرك السيادي لتطبيق السياقة - نسخة 2026
 */
class DrivingEmpire {
    constructor() {
        // إدارة الحالة (State Management)
        this.state = {
            questions: [],
            currentIndex: 0,
            score: 0,
            timer: null,
            isProcessing: false, // لمنع الضغط المتكرر
            timeLeft: PROJECT_CORE.engine_settings.timer_config.duration_per_question
        };

        // الربط بالواجهة مع نظام الكاش (Caching Elements)
        this.ui = {
            text: document.getElementById('question-text'),
            image: document.getElementById('question-image'),
            options: document.getElementById('options-container'),
            timer: document.getElementById('timer-display'),
            wrapper: document.querySelector('.app-wrapper')
        };

        this.boot();
    }

    // إقلاع النظام
    async boot() {
        try {
            const response = await fetch('./data/questions.json');
            if (!response.ok) throw new Error("Database Offline");
            const data = await response.json();
            
            // دمج وتصفية البيانات بذكاء
            this.state.questions = Object.values(data.content)
                .flatMap(cat => cat.questions)
                .sort(() => Math.random() - 0.5); // عشوائية مطلقة

            this.next();
        } catch (err) {
            this.ui.text.innerText = "⚠️ خطأ في تحميل النظام السيادي";
        }
    }

    // إدارة العرض (Dynamic Rendering)
    next() {
        if (this.state.currentIndex >= this.state.questions.length) {
            return this.finish();
        }

        const q = this.state.questions[this.state.currentIndex];
        this.syncUI(q);
        this.runTimer();
    }

    syncUI(q) {
        // تأثير التلاشي (Fade Effect)
        this.ui.wrapper.style.opacity = '0';
        
        setTimeout(() => {
            this.ui.text.innerText = q.text;
            this.ui.image.src = q.image;
            this.ui.options.innerHTML = '';

            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<b>${idx + 1}</b> <span>${opt}</span>`;
                btn.onclick = () => this.evaluate(idx, q.correct_index, q.explanation);
                this.ui.options.appendChild(btn);
            });

            this.ui.wrapper.style.opacity = '1';
            this.state.isProcessing = false;
        }, 300);
    }

    runTimer() {
        clearInterval(this.state.timer);
        this.state.timeLeft = PROJECT_CORE.engine_settings.timer_config.duration_per_question;
        
        this.state.timer = setInterval(() => {
            this.state.timeLeft--;
            this.ui.timer.innerText = this.state.timeLeft;
            
            if (this.state.timeLeft <= 5) this.ui.timer.style.color = "#ff4d4d";
            else this.ui.timer.style.color = "#7ebfae";

            if (this.state.timeLeft <= 0) this.evaluate(-1, -1, "انتهى الوقت!");
        }, 1000);
    }

    evaluate(selected, correct, info) {
        if (this.state.isProcessing) return;
        this.state.isProcessing = true;
        clearInterval(this.state.timer);

        const isCorrect = selected === correct;
        if (isCorrect) this.state.score++;

        // إظهار التغذية الراجعة فوراً (Feedback System)
        this.currentIndex++; 
        this.state.currentIndex++;
        
        // تأثير الانتقال
        setTimeout(() => this.next(), 600);
    }

    finish() {
        const total = this.state.questions.length;
        const ratio = (this.state.score / total);
        const deg = ratio * 360;
        const pass = this.state.score >= PROJECT_CORE.engine_settings.scoring_system.passing_score;

        this.ui.wrapper.innerHTML = `
            <div class="result-box" style="animation: slideUpFade 0.8s forwards">
                <h2 style="color: #7ebfae">التقرير النهائي</h2>
                <div class="score-circle" style="--progress: ${deg}deg">
                    <span>${Math.round(ratio * 100)}%</span>
                </div>
                <h3 style="color: white">${pass ? 'ناجح بامتياز 🏆' : 'راسب - حاول مجدداً 📉'}</h3>
                <p style="color: rgba(255,255,255,0.6)">النقاط: ${this.state.score} من ${total}</p>
                <button class="option-btn" onclick="location.reload()" style="background:#7ebfaeCopyright (c) 2026 DRIVING AI MOROCCO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.color:#121212; font-weight:bold; justify-content:center">
                    إعادة تشغيل المحرك 🔄
                </button>
            </div>
        `;
    }
}

// تشغيل الإمبراطورية
window.onload = () => new DrivingEmpire();
