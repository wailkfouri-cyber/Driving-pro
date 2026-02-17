/**
 * 🛰️ DRIVING AI 2026 | CENTRAL COMMAND UNIT
 * -----------------------------------------
 * المصدر الرئيسي لتعريفات المشروع، الإعدادات، والمسارات.
 * تم تصميمه ليكون حلقة الوصل بين واجهة المستخدم (UI) وقاعدة البيانات (JSON).
 */

const DRIVING_PROJECT_CORE = {
    // 1. هوية المشروع والنسخة
    identity: {
        app_name: "Driving AI 2026",
        build_id: "D-AI-MAR-2026",
        version: "2.1.0-PRO",
        developer: "Elite Dev Team",
        region: "Morocco / NARSA Compliant",
        status: "Production Ready"
    },

    // 2. محرك الاختبار (Exam Engine)
    engine_settings: {
        scoring_system: {
            total_questions: 40,
            passing_score: 32,
            point_per_answer: 1
        },
        timer_config: {
            enabled: true,
            duration_per_question: 30, // ثانية
            warning_at: 5 // تنبيه عند بقاء 5 ثوانٍ
        },
        dynamic_loading: true, // تحميل الأسئلة بشكل عشوائي
        strict_mode: true      // منع الرجوع للسؤال السابق
    },

    // 3. خريطة المسارات الذكية (Smart Path Mapping)
    system_paths: {
        base_dir: "./",
        media: {
            signs_images: "assets/signs/",
            ui_icons: "assets/ui/",
            feedback_audio: "assets/audio/"
        },
        database: {
            questions_json: "data/questions.json",
            user_stats: "localStorage/history"
        }
    },

    // 4. الثيم البصري (Core UI Theme)
    visual_system: {
        colors: {
            primary: "#1e4d3e",   // أخضر داكن احترافي
            secondary: "#7ebfae", // أخضر فاتح للتفاعل
            danger: "#e74c3c",    // للأخطاء
            success: "#2ecc71"    // للإجابات الصحيحة
        },
        glassmorphism: {
            blur_intensity: "12px",
            opacity: 0.15
        },
        animations: "cubic-bezier(0.4, 0, 0.2, 1)"
    },

    // 5. وظائف الحماية والتحقق
    integrity: {
        encryption: "AES-Ready",
        prevent_inspection: true,
        auto_save_progress: true
    }
};

/** * تجميد الإعدادات لمنع أي تغيير غير مقصود أثناء تشغيل التطبيق (Security Best Practice)
 */
Object.freeze(DRIVING_PROJECT_CORE);

// تصدير النواة لاستخدامها في ملف game.js
export default DRIVING_PROJECT_CORE;
