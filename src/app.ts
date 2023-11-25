import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose Assignment Project');
});

// Sent Error when Router is Not Found
app.use('*', (req: Request, res: Response) => {
  res.status(400).json({
    status: false,
    massage: 'Route Not Found',
  });
});

export default app;
