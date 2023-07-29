// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {authenticate} from '@loopback/authentication';
import {User} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property} from '@loopback/repository';
import {get, post, requestBody, SchemaObject} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {KeycloakApi} from '../services';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
      // format: 'email',
    },
    password: {
      type: 'string',
      // minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject('services.KeycloakApi')
    public keycloakService: KeycloakApi,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody)
    credentials: {
      username: string;
      password: string;
    },
  ): Promise<{token: string}> {
    const result = await this.keycloakService.login(
      credentials.username,
      credentials.password,
    );
    console.log('userProfile', result);
    // create a JSON Web Token based on the user profile
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const token = await this.jwtService.generateToken(userProfile);
    return {token: result.access_token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  // @post('/signup', {
  //   responses: {
  //     '200': {
  //       description: 'User',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             'x-ts-type': User,
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async signUp(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(NewUserRequest, {
  //           title: 'NewUser',
  //         }),
  //       },
  //     },
  //   })
  //   newUserRequest: NewUserRequest,
  // ): Promise<User> {
  //   const password = await hash(newUserRequest.password, await genSalt());
  //   const savedUser = await this.userRepository.create(
  //     _.omit(newUserRequest, 'password'),
  //   );

  //   await this.userRepository.userCredentials(savedUser.id).create({password});

  //   return savedUser;
  // }
}
