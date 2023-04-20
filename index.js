import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { database } from './database/database.js';
import { Guest } from './entities/guests/guests.model.js';
import { guestsRoutes } from './entities/guests/guests.routes.js';
import { User } from './entities/users/users.model.js';
import { usersRoutes } from './entities/users/users.routes.js';
import { Shift } from './entities/shifts/shifts.model.js';
import { shiftsRoutes } from './entities/shifts/shifts.routes.js';
import { CashboxLog } from './entities/cashboxLogs/cashboxLogs.model.js';
import { cashboxLogsRoutes } from './entities/cashboxLogs/cashboxLogs.routes.js';
import { Tariff } from './entities/tariffs/tariffs.model.js';
import { tariffsRoutes } from './entities/tariffs/tariffs.routes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/guests', guestsRoutes);
app.use('/users', usersRoutes);
app.use('/shifts', shiftsRoutes);
app.use('/cashboxLogs', cashboxLogsRoutes);
app.use('/tariffs', tariffsRoutes);

const start = async () => {
  try {
    await database.authenticate();
    console.log(chalk.blue(`Connection DB successfully...`));

    await Guest.sync({});
    console.log(chalk.blue(`Guest model has been sync successfully...`));

    await User.sync({});
    console.log(chalk.blue(`User model has been sync successfully...`));
    
    await Shift.sync({});
    console.log(chalk.blue(`Shift model has been sync successfully...`));

    await CashboxLog.sync({});
    console.log(chalk.blue(`CashboxLog model has been sync successfully...`));

    await Tariff.sync({});
    console.log(chalk.blue(`Tariff model has been sync successfully...`));
    
    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server started on port ${PORT}...`));
    })
  } catch (error) {
    console.log(chalk.bgRed(`Error start app: ${error}`))
  }
}
start();