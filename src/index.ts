import app from "./app"

const PORT = process.env.PORT || 5300
app.listen(PORT, () => console.log(`This server is running on port : http://localhost:${PORT}`))