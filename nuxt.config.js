export default {
    srcDir: "src/",
    css: ["~/assets/main"],
    head: {
        title: "Studio Ghibli",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        baseUrl: process.env.BASE_URL || "http://localhost:3000"
    },
    target: "static"
}


