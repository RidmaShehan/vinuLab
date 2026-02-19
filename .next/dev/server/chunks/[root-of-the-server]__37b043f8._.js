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
"[project]/src/lib/analytics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendVisit",
    ()=>appendVisit,
    "getAnalytics",
    ()=>getAnalytics
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
;
;
;
const getFilePath = ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "src", "data", "analytics.json");
function readFromFile() {
    try {
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(getFilePath(), "utf-8");
        return JSON.parse(raw);
    } catch  {
        return [];
    }
}
function writeToFile(data) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(getFilePath(), JSON.stringify(data, null, 2), "utf-8");
}
async function getAnalytics() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
    if (supabase) {
        try {
            const { data, error } = await supabase.from("analytics_events").select("id, timestamp, path, ip, country, region, city, ll, user_agent, referrer, screen_width, screen_height").order("timestamp", {
                ascending: false
            });
            if (!error && Array.isArray(data)) {
                return data.map((row)=>({
                        id: row.id,
                        timestamp: row.timestamp,
                        path: row.path ?? "",
                        ip: row.ip ?? "",
                        country: row.country ?? undefined,
                        region: row.region ?? undefined,
                        city: row.city ?? undefined,
                        ll: Array.isArray(row.ll) && row.ll.length >= 2 ? row.ll : undefined,
                        userAgent: row.user_agent ?? undefined,
                        referrer: row.referrer ?? undefined,
                        screenWidth: row.screen_width ?? undefined,
                        screenHeight: row.screen_height ?? undefined
                    }));
            }
        } catch (e) {
            console.warn("Supabase analytics fetch failed, using file:", e);
        }
    }
    return readFromFile();
}
async function appendVisit(record) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabase"])();
    if (supabase) {
        try {
            const { error } = await supabase.from("analytics_events").insert({
                timestamp: record.timestamp,
                path: record.path,
                ip: record.ip,
                country: record.country ?? null,
                region: record.region ?? null,
                city: record.city ?? null,
                ll: record.ll ?? null,
                user_agent: record.userAgent ?? null,
                referrer: record.referrer ?? null,
                screen_width: record.screenWidth ?? null,
                screen_height: record.screenHeight ?? null
            });
            if (!error) return;
            throw new Error(error.message);
        } catch (e) {
            console.warn("Supabase analytics insert failed, using file:", e);
        }
    }
    const data = readFromFile();
    data.push(record);
    writeToFile(data);
}
}),
"[project]/src/app/api/analytics/track/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analytics.ts [app-route] (ecmascript)");
;
;
function getClientIp(req) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const realIp = req.headers.get("x-real-ip");
    if (realIp) return realIp;
    return "127.0.0.1";
}
async function getGeo(ip) {
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
        return {};
    }
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,lat,lon`, {
            signal: AbortSignal.timeout(3000)
        });
        const data = await res.json();
        if (data.lat != null && data.lon != null) {
            return {
                country: data.country,
                region: data.regionName,
                city: data.city,
                ll: [
                    data.lon,
                    data.lat
                ]
            };
        }
    } catch  {
    // ignore
    }
    return {};
}
async function POST(request) {
    try {
        const ip = getClientIp(request);
        const body = await request.json().catch(()=>({}));
        const { path: pagePath = "/", referrer, userAgent, screenWidth, screenHeight } = body;
        const geo = await getGeo(ip);
        const record = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            timestamp: Date.now(),
            path: String(pagePath).slice(0, 256),
            ip,
            country: geo.country,
            region: geo.region,
            city: geo.city,
            ll: geo.ll,
            userAgent: userAgent ? String(userAgent).slice(0, 512) : request.headers.get("user-agent") ?? undefined,
            referrer: referrer ? String(referrer).slice(0, 512) : undefined,
            screenWidth: typeof screenWidth === "number" ? screenWidth : undefined,
            screenHeight: typeof screenHeight === "number" ? screenHeight : undefined
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appendVisit"])(record);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error("Analytics track error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Track failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__37b043f8._.js.map