import { User } from '@prisma/client'

import { createUser, getUsers, deleteUser, updateUser, getUserById } from './repository'

import { Get, Post, Put, Delete, Path, Route, Body, SuccessResponse } from 'tsoa'
import { UserModel } from '../../models/user'

@Route('user')
export default class UserController {
  @Get('/')
  public async getUsers (): Promise<User[] | null> {
    return await getUsers()
  }

  @Get('/{id}')
  public async getUserId (@Path() id: string): Promise<User | null> {
    return await getUserById(id)
  }

  @SuccessResponse('201', 'Created')
  @Post('/')
  public async createUser (@Body() requestBody: UserModel): Promise<User> {
    return await createUser(requestBody)
  }

  @Put('/{id}')
  public async updateUser (@Path() id: string, @Body() requestBody: UserModel): Promise<User> {
    return await updateUser(id, requestBody)
  }

  @Delete('/{id}')
  public async deleteUser (@Path() id: string): Promise<User> {
    return await deleteUser(id)
  }
}
