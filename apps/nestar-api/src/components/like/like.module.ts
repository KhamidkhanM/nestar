import { Module } from '@nestjs/common';
import { LikeService } from './like.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Comment',
                schema: CommentSchema,
            },
        ]),,
    providers: [LikeService]
})
export class LikeModule { }
