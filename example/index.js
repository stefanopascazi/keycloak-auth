import express from "express"
import cookieParser from 'cookie-parser'
import { Keycloak } from 'keycloak-auth'

const app = express()

app.use(express.json())
app.use(cookieParser());
app.set('view engine', 'ejs');

Keycloak.init({
    "realm": "myrealm",
    "auth-server-url": "https://your-keycloak-domain.com/",
    "ssl-required": "external",
    "resource": "myclient",
    "public-client": true,
    "confidential-port": 0
}, "https://your-redirect.com/api/auth")


app.get("/", (req, res) => {

    let token = req.cookies['access_token']
    let loginUrl = Keycloak.auth().createLoginString()

    res.render("index", { token: token, loginUrl: loginUrl })
})

app.get("/api/auth", async(req, res) => {

    let code = req.query.code;

    if (code == null || code == "") {
        res.status(302).redirect("/")
        res.end()
    }

    const data = await Keycloak.auth().getToken(code)

    res.cookie('access_token', data.access_token, { maxAge: parseInt(data.expires_in) * 1000, httpOnly: true })
    res.cookie('refresh_token', data.refresh_token, { maxAge: parseInt(data.refresh_expires_in) * 1000, httpOnly: true })

    res.status(302).redirect("/")
    res.end()
})

app.get("/profile", async(req, res) => {

    let token = req.cookies['access_token']

    const data = await Keycloak.user(token).getInfo()

    res.render("profile", { data: data })
    res.end()
})

app.get("/logout", async(req, res) => {

    await Keycloak.auth().logout(req.cookies['refresh_token'])

    res.clearCookie("access_token")
    res.clearCookie("refresh_token")

    res.status(302).redirect("/")
    res.end()
})


app.listen(3000, () => { console.log("serve on line") })