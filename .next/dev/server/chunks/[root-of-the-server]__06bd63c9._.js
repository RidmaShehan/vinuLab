module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabase",
    ()=>getSupabase,
    "hasSupabase",
    ()=>hasSupabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
function getSupabase() {
    if (!supabaseUrl || !supabaseServiceKey) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey);
}
function hasSupabase() {
    return Boolean(supabaseUrl && supabaseServiceKey);
}
}),
"[project]/src/lib/content.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContent",
    ()=>getContent,
    "saveContent",
    ()=>saveContent
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
;
;
;
const CONTENT_ID = "main";
const defaultHero = {
    badge: "Web Studio",
    headline: "We craft",
    headlineHighlight: "digital experiences",
    subheading: "We engineer the success of your vision through technology and innovation.",
    stats: [
        {
            value: "15+",
            label: "Industries"
        },
        {
            value: "5+",
            label: "Years"
        }
    ],
    scrollLabel: "Scroll"
};
const defaultResultsSection = {
    heading: "Concrete results,",
    headingHighlight: "not just promises",
    subheading: "Transforming complexity into measurable impact.",
    results: [
        {
            value: "300%",
            label: "Average Growth"
        },
        {
            value: "4 Weeks",
            label: "Average Delivery Time"
        },
        {
            value: "98%",
            label: "Satisfied Clients"
        }
    ],
    testimonials: [
        {
            quote: "We automated 90% of repetitive tasks. A total game-changer for our customer care operations.",
            stat: "90%",
            statLabel: "Automation",
            author: "Marco R.",
            role: "CEO • Studio Legale Associato"
        },
        {
            quote: "The manual workload has been drastically reduced. Now the team can focus on strategic growth.",
            stat: "60%",
            statLabel: "Efficiency",
            author: "Sara B.",
            role: "Operations Manager • Agenzia Digitale"
        },
        {
            quote: "The investment paid off in weeks. The ROI was immediate, clear, and measurable.",
            stat: "3x",
            statLabel: "ROI",
            author: "Luca V.",
            role: "Founder • E-commerce Fashion"
        }
    ]
};
/** Ensures hero and resultsSection exist (for older DB rows or partial content). */ function mergeContentDefaults(raw) {
    const c = raw;
    return {
        ...c,
        hero: c.hero && Array.isArray(c.hero.stats) ? c.hero : {
            ...defaultHero,
            ...c.hero
        },
        resultsSection: c.resultsSection && Array.isArray(c.resultsSection.results) && Array.isArray(c.resultsSection.testimonials) ? c.resultsSection : {
            ...defaultResultsSection,
            ...c.resultsSection
        }
    };
}
const getContentPath = ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "src", "data", "content.json");
function readContentFromFile() {
    const filePath = getContentPath();
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf-8");
    return mergeContentDefaults(JSON.parse(raw));
}
async function getContent() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
    if (supabase) {
        try {
            const { data, error } = await supabase.from("site_content").select("content").eq("id", CONTENT_ID).single();
            if (!error && data?.content && typeof data.content === "object") {
                const parsed = data.content;
                if (Object.keys(parsed).length > 0) {
                    return mergeContentDefaults(data.content);
                }
                // DB row exists but empty: seed from file and persist to DB
                const fileContent = readContentFromFile();
                await supabase.from("site_content").upsert({
                    id: CONTENT_ID,
                    content: fileContent,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: "id"
                }).then(()=>{});
                return fileContent;
            }
        } catch (e) {
            console.warn("Supabase content fetch failed, using file:", e);
        }
    }
    return readContentFromFile();
}
async function saveContent(content) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
    if (supabase) {
        const { error } = await supabase.from("site_content").upsert({
            id: CONTENT_ID,
            content: content,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "id"
        });
        if (error) {
            throw new Error(error.message);
        }
        return;
    }
    const filePath = getContentPath();
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildClearCookieHeader",
    ()=>buildClearCookieHeader,
    "buildSetCookieHeader",
    ()=>buildSetCookieHeader,
    "createSessionToken",
    ()=>createSessionToken,
    "getCookieName",
    ()=>getCookieName,
    "getSessionCookie",
    ()=>getSessionCookie,
    "isAdminRequest",
    ()=>isAdminRequest,
    "verifyPassword",
    ()=>verifyPassword,
    "verifySessionToken",
    ()=>verifySessionToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const COOKIE_NAME = "vinulab_admin_session";
const SESSION_MAX_AGE_SEC = 24 * 60 * 60; // 24 hours
const TOKEN_SEPARATOR = ".";
function getSessionSecret() {
    const secret = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET;
    if (secret && secret.length >= 32) return secret;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return "dev-session-secret-min-32-chars-long-do-not-use-in-production";
}
function getExpectedPassword() {
    return process.env.ADMIN_PASSWORD || "vinulab-admin";
}
function verifyPassword(input) {
    const expected = getExpectedPassword();
    if (input.length !== expected.length) {
        // Still hash both to consume similar time
        __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(input).digest();
        __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(expected).digest();
        return false;
    }
    const a = Buffer.from(input, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(a, b);
}
function base64UrlEncode(buf) {
    return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64UrlDecode(str) {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = 4 - base64.length % 4;
    return Buffer.from(base64 + (pad === 4 ? "" : "=".repeat(pad)), "base64");
}
function createSessionToken() {
    const secret = getSessionSecret();
    const sid = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(24).toString("base64url");
    const expiresAt = Date.now() + SESSION_MAX_AGE_SEC * 1000;
    const payload = JSON.stringify({
        sid,
        exp: expiresAt
    });
    const payloadB64 = base64UrlEncode(Buffer.from(payload, "utf8"));
    const sig = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", secret).update(payloadB64).digest();
    const sigB64 = base64UrlEncode(sig);
    const token = `${payloadB64}${TOKEN_SEPARATOR}${sigB64}`;
    return {
        token,
        expiresAt
    };
}
function verifySessionToken(token) {
    try {
        const secret = getSessionSecret();
        const idx = token.indexOf(TOKEN_SEPARATOR);
        if (idx <= 0) return false;
        const payloadB64 = token.slice(0, idx);
        const sigB64 = token.slice(idx + 1);
        const sig = base64UrlDecode(sigB64);
        const expectedSig = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", secret).update(payloadB64).digest();
        if (sig.length !== expectedSig.length || !__TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(sig, expectedSig)) return false;
        const payloadJson = base64UrlDecode(payloadB64).toString("utf8");
        const payload = JSON.parse(payloadJson);
        if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;
        return true;
    } catch  {
        return false;
    }
}
function getSessionCookie(request) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
    const value = match?.[1];
    if (!value) return null;
    try {
        return decodeURIComponent(value);
    } catch  {
        return null;
    }
}
function isAdminRequest(request) {
    const token = getSessionCookie(request);
    if (!token) return false;
    return verifySessionToken(token);
}
function getCookieName() {
    return COOKIE_NAME;
}
function buildSetCookieHeader(value, maxAge) {
    const secure = ("TURBOPACK compile-time value", "development") === "production";
    const parts = [
        `${COOKIE_NAME}=${encodeURIComponent(value)}`,
        "Path=/",
        "HttpOnly",
        `Max-Age=${maxAge}`,
        "SameSite=Lax"
    ];
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return parts.join("; ");
}
function buildClearCookieHeader() {
    return [
        `${COOKIE_NAME}=`,
        "Path=/",
        "HttpOnly",
        "Max-Age=0",
        "SameSite=Lax"
    ].join("; ");
}
}),
"[project]/src/app/api/content/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getContent"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(content);
    } catch (error) {
        console.error("Failed to load content:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load content"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminRequest"])(request)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const body = await request.json();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveContent"])(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("Failed to save content:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to save content"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06bd63c9._.js.map