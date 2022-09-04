import express from 'express';
import path from 'path';

const port = process.env.PORT || 3001;
const buildDir = path.join(process.cwd() + "/build");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

app.get("/*", function (req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

app.listen(port);
