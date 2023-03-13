import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { database } from './database/database.js';
import { Guest } from './entities/guests/guests.model.js';
import { guestsRoutes } from './entities/guests/guests.routes.js';
import { User } from './entities/users/users.model.js';
import { usersRoutes } from './entities/users/users.routes.js';
import { DayResult } from './entities/dayResults/dayResults.model.js';
import { dayResultsRoutes } from './entities/dayResults/dayResults.routes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/guests', guestsRoutes);
app.use('/users', usersRoutes);
app.use('/dayResults', dayResultsRoutes);

const start = async () => {
  try {
    await database.authenticate();
    console.log(chalk.blue(`Connection DB successfully...`));

    await Guest.sync({});
    console.log(chalk.blue(`Guest model has been sync successfully...`));

    await User.sync({});
    console.log(chalk.blue(`User model has been sync successfully...`));
    
    await DayResult.sync({});
    console.log(chalk.blue(`DayResult model has been sync successfully...`));

    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server started on port ${PORT}...`));
    })
  } catch (error) {
    console.log(chalk.bgRed(`Error start app: ${error}`))
  }
}
start();