import {
  Controller,
  Get,
  MergeParams,
  Post,
  Required,
  PathParams,
  BodyParams,
  Delete,
  Patch,
  UseAuth,
  Req
} from '@tsed/common';
import { Users, IUserModel, IUserQuery } from '../../models/user';
import Error from './UsersCtrl.Erro';
import { AuthCheck } from '../../middlewares/Guards';

@Controller('/users')
@UseAuth(AuthCheck)
@MergeParams(true)
export class UsersCtrl {
  /**
   * Get all users
   */
  @Get('/')
  async getUsers() {
    return await Users.getAllUsers()
      .then(users => ({ data: users }))
      .catch(error => ({ error }));
  }
}

@Controller('/user')
@MergeParams(true)
export class UserCtrl {
  /**
   * Find user by user id
   * @param request :request from user
   * @param id :user id
   */
  @Get('/me')
  @UseAuth(AuthCheck)
  async findUserById(@Req() req: any) {
    return await Users.findUserById(req.user._id)
      .then((user: IUserModel | null) => (!!user ? { data: user } : { error: Error.USER_NOT_FOUND }))
      .catch(error => ({ error }));
  }

  /**
   * Create new account
   * @param username
   * @param password
   * @param fullName
   */
  @Post('/new')
  @UseAuth(AuthCheck)
  async createNewUser(
    @Required() @BodyParams('username') username: string,
    @Required() @BodyParams('password') password: string,
    @Required() @BodyParams('fullName') fullName: string
  ) {
    return await Users.findUserByUsername(username)
      .then((user: IUserModel | null): any =>
        !!user ? { error: Error.DUPLICATED_USERNAME } : Users.create(username, password, fullName)
      )
      .catch(error => ({ error }));
  }

  /**
   * Update my password
   * @param password :new password
   */
  @Patch('/me/password')
  @UseAuth(AuthCheck)
  async updateUserPasswordById(@Req() request: any, @Required() @BodyParams('password') password: string) {
    return await Users.updatePasswordById(request.user.id, password)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete my account
   */
  @Delete('/me')
  @UseAuth(AuthCheck)
  async deleteUserById(@Req() request: any) {
    return await Users.deleteById(request.user.id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
