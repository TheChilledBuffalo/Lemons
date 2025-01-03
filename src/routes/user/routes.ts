import { z, createRoute } from "@hono/zod-openapi";
import { UserSchema } from "../../schemas/user.js";

export const getUser = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Retrieved user successfully",
      content: {
        "application/json": {
          schema: z
            .object({
              user: UserSchema,
            })
            .openapi("UserResponse"),
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});

export const getUserById = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    }),
  },
  responses: {
    200: {
      description: "Retrieved user successfully",
      content: {
        "application/json": {
          schema: z
            .object({
              user: UserSchema,
            })
            .openapi("UserResponse"),
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});

export const getAllUsers = createRoute({
  method: "get",
  path: "/all",
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      description: "Retrieved all users",
      content: {
        "application/json": {
          schema: z.array(UserSchema).openapi("UsersResponse"),
        },
      },
    },
    403: {
      description: "Forbidden",
    },
  },
});

export const deleteUserById = createRoute({
  method: "delete",
  path: "/{id}",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    }),
  },
  responses: {
    200: {
      description: "Deleted user successfully",
    },
    403: {
      description: "Forbidden",
    },
    404: {
      description: "User not found",
    },
  },
});
