import chalk from 'chalk';
import { Flags } from '@oclif/core';

import Command from '../base.js';
import AccountAdd from './account/add.js';

export default class Login extends Command {
  static description = 'login to your account';

  static flags = {
    ...Command.flags,
    email: Flags.string({ char: 'e', description: 'your email' }),
    password: Flags.string({ char: 'p', description: 'your password' }),
  };

  async run() {
    const { flags } = await this.parse(Login);
    const sendFlag = [
      '--api-token',
      flags['api-token'] || '',
      '--email',
      flags.email || '',
      '--password',
      flags.password || '',
      '--from-login',
    ];
    if (flags.region) {
      sendFlag.push('--region', flags.region);
      this.log(`You're logging into "${flags.region}" region:`);
    }

    await AccountAdd.run(sendFlag);
    this.log(chalk.green('You have logged in successfully.'));
  }
}
