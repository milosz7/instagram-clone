import express from 'express';
import path from 'path';
import { connectToDb } from '../utils/helpers-server';
import postRoutes from './routes/posts.routes'

const port = process.env.PORT || 3001;
const buildDir = path.join(process.cwd() + '/build');

const app = express();

connectToDb();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));
app.use('/api/posts', postRoutes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port);
