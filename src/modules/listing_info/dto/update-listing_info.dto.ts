import { PartialType } from '@nestjs/mapped-types';

import { CreateListingInfoDto } from './create-listing_info.dto';

export class UpdateListingInfoDto extends PartialType(CreateListingInfoDto) {}
