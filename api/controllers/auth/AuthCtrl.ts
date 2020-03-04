import { Controller, MergeParams, Post, Required, BodyParams, UseAuth } from '@tsed/common';
import { Users, IUserModel } from '../../models/user';
import Error from './AuthCtrl.Erro';
import { signJWT } from '../../utils/jwt';
import { AuthCheck } from '../../middlewares/Guards';

@Controller('/auth')
@UseAuth(AuthCheck, { guest: true })
@MergeParams(true)
export class AuthCtrl {
  @Post('/sign-in')
  async signIn(
    @Required() @BodyParams('username') username: string,
    @Required() @BodyParams('password') password: string
  ) {
    return await Users.findUserByCredentials(username, password)
      .then((user: IUserModel | null) =>
        !!user ? signJWT(user._id.toString()) : { error: Error.INVALID_CREDENTIALS }
      )
      .catch(error => ({ error }));
  }
}
