import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { Mongoose } from 'mongoose';
import MemberSchema from '../../schemas/Member.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { Property } from '../../libs/dto/property/property';
import { PropertyService } from '../property/property.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]), AuthModule, ViewModule,
  ],
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
})
export class MemberModule { }
