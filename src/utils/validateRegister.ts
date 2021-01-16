import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 6) {
    return [
      {
        field: "username",
        message: "username must be longer than 6 characters",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "username cannot contain @",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.password.length <= 6) {
    return [
      {
        field: "password",
        message: "password must be longer than 6 characters",
      },
    ];
  }
  return null;
};
