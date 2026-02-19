(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AnalyticsTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function AnalyticsTracker() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsTracker.useEffect": ()=>{
            fetch("/api/analytics/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    path: ("TURBOPACK compile-time truthy", 1) ? window.location.pathname || "/" : "TURBOPACK unreachable",
                    referrer: typeof document !== "undefined" ? document.referrer || null : null,
                    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
                    screenWidth: ("TURBOPACK compile-time truthy", 1) ? window.screen?.width : "TURBOPACK unreachable",
                    screenHeight: ("TURBOPACK compile-time truthy", 1) ? window.screen?.height : "TURBOPACK unreachable"
                })
            }).catch({
                "AnalyticsTracker.useEffect": ()=>{}
            }["AnalyticsTracker.useEffect"]);
        }
    }["AnalyticsTracker.useEffect"], []);
    return null;
}
_s(AnalyticsTracker, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AnalyticsTracker;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_AnalyticsTracker_tsx_cc3a1273._.js.map