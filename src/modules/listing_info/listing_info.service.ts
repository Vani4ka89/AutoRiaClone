import { Injectable } from '@nestjs/common';

import { CreateListingInfoDto } from './dto/create-listing_info.dto';
import { UpdateListingInfoDto } from './dto/update-listing_info.dto';

@Injectable()
export class ListingInfoService {
  create(createListingInfoDto: CreateListingInfoDto) {
    return 'This action adds a new listingInfo';
  }

  findAll() {
    return `This action returns all listingInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listingInfo`;
  }

  update(id: number, updateListingInfoDto: UpdateListingInfoDto) {
    return `This action updates a #${id} listingInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} listingInfo`;
  }
}
