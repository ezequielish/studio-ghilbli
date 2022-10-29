export default {
    srcDir: "src/",
    css: ["~/assets/main"],
    head: {
        title: "Studio Ghibli",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1.0" },
            { hid: "description", name: "description", content: "Studio Ghibli" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/fav.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dosis&display=swap"
            }
        ]
    },
    env: {
        baseUrl: "http://localhost:8000/api"
    },
    target: "static",
    generate: {
        fallback: true
    }
}

