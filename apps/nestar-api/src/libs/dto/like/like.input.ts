import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { LikeGroup } from '../../enums/like.enum';
import { ObjectId } from 'bson';

@InputType()
export class LikeInput {
	@IsNotEmpty()
	@Field(() => String)
	memberId!: ObjectId;

	@IsNotEmpty()
	@Field(() => String)
	likeRefId!: ObjectId;
	@IsNotEmpty()
	@Field(() => LikeGroup)
	likeGroup!: LikeGroup;
}
