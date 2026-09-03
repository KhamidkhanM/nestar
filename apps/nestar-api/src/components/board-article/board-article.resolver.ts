import { Resolver } from '@nestjs/graphql';
import { BoardArticleService } from './board-artice.service';

@Resolver()
export class BoardArticleResolver {
    constructor(private readonly boardArticleService: BoardArticleService) { }
}