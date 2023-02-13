export class CreateUserCommand {
  constructor(
    readonly userId: string,
    readonly firstName: string,
    readonly lastName: string
  ) {}
}