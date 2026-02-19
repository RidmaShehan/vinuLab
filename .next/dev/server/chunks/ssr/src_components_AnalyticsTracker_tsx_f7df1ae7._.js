module.exports = [
"[project]/src/components/AnalyticsTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function AnalyticsTracker() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("/api/analytics/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "/",
                referrer: typeof document !== "undefined" ? document.referrer || null : null,
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
                screenWidth: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
                screenHeight: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null
            })
        }).catch(()=>{});
    }, []);
    return null;
}
}),
];

//# sourceMappingURL=src_components_AnalyticsTracker_tsx_f7df1ae7._.js.map