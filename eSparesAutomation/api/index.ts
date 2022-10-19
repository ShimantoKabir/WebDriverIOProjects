import app from "./app";

const PORT = process.env.PORT || 8082;

app.listen(PORT, async () => {
    console.log(`Server is running http://localhost:${PORT}`);
});