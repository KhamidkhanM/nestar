import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<Member>, private authService: AuthService) { }

    public async signup(input: MemberInput): Promise<Member> {
        // TODO: HASH Password
        input.memberPassword = await this.authService.hashPassword(input.memberPassword);
        try {
            const result = await this.memberModel.create(input);
            // TODO: Auth via TOKEN
            return result;
        } catch (err: any) {
            console.log('Error, Service.model', err instanceof Error ? err.message : err);
            if (err?.code === 11000) {
                throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
            }
            throw new InternalServerErrorException(err);
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        const { memberNick, memberPassword } = input;
        const response: Member | null = await this.memberModel
            .findOne({ memberNick: memberNick })
            .select('+memberPassword')
            .exec();

        if (!response || response.memberStatus === MemberStatus.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
        } else if (response.memberStatus === MemberStatus.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER);
        }

        const isMatch = await this.authService.comparePasswords(memberPassword, response.memberPassword as string);
        if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);

        return response;
    }

    public async updateMember(): Promise<string> {
        return 'Member updated successfully';
    }

    public async getMember(): Promise<string> {
        return 'Member details retrieved successfully';
    }
}
