import { AccountTypeEntity } from '../../../database/entities/account-type.entity';
import { AccountTypeResponseDto } from '../models/dto/response/account-type.response.dto';

export class AccountTypeMapper {
  public static toResponseDto(
    accountType: AccountTypeEntity,
  ): AccountTypeResponseDto {
    return {
      id: accountType.id,
      value: accountType.value,
      description: accountType.description,
    };
  }
}
