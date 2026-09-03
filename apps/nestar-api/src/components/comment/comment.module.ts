import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema from '../../schemas/Comment.model';
import { Property } from '../../libs/dto/property/property';
import { PropertyModule } from '../property/property.module';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { BoardArticleModule } from '../board-article/board-article.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Comment',
        schema: CommentSchema,
      },
    ]),
    AuthModule,
    MemberModule,
    ViewModule,
    PropertyModule,
    BoardArticleModule
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule { }
