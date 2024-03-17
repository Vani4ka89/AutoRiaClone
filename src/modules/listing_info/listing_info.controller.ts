import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateListingInfoDto } from './dto/create-listing_info.dto';
import { UpdateListingInfoDto } from './dto/update-listing_info.dto';
import { ListingInfoService } from './listing_info.service';

@ApiTags('Listing-info')
@Controller('listing-info')
export class ListingInfoController {
  constructor(private readonly listingInfoService: ListingInfoService) {}

  @Post()
  create(@Body() createListingInfoDto: CreateListingInfoDto) {
    return this.listingInfoService.create(createListingInfoDto);
  }

  @Get()
  findAll() {
    return this.listingInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListingInfoDto: UpdateListingInfoDto,
  ) {
    return this.listingInfoService.update(+id, updateListingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingInfoService.remove(+id);
  }
}
