export class ContactByTypeQuery {
  constructor(
    readonly userId: string,
    readonly contactType: string
  ) {}
}
