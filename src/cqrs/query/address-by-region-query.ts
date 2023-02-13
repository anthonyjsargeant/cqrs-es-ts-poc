export class AddressByRegionQuery {
  constructor(
    readonly userId: string,
    readonly county: string
  ) {}
}
