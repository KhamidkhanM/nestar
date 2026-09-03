import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../libs/dto/comment/comment';
import { Model } from 'mongoose';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        private memberService: MemberService,
        private viewService: ViewService,
    ) { }
}

