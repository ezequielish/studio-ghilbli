export default {
    srcDir: "src/",
    css: ["~/assets/main"],
    head: {
        title: "Studio Ghibli",
        meta: [
            { charset: "utf-8" },
            { lang: "es" },
            { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" },
            { hid: "description", name: "description", content: "Studio Ghibli - Movies" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/fav.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dosis&display=swap"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            },
        ],
        script: [
            {
                src: "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
            }
        ]
    },
    router: {
        middleware: ["redirectRoute"]
    },
    env: {
        baseUrl: "http://localhost:8000/api",
        baseLocal: "http://192.168.50.24:3100/",
    },
    target: "server",
    ssr: true,
    server: {
        host: "0",
        port: 3100 // default: 3000
    },
    modules: [
        // Simple usage
        "cookie-universal-nuxt",

        // With options
        ["cookie-universal-nuxt", { alias: "cookiz" }],
    ],
    generate: {
        fallback: true
    }
}

