import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {
    CreateReviewDto,
    FilterReviewDto,
    ReviewDto,
    UpdateReviewDto,
} from './dto';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createReview(
        @Body() createReviewDto: CreateReviewDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<ReviewDto>> {
        const newReview = await this.reviewsService.createReview(
            createReviewDto,
            req?.user?.userId,
        );
        return dataToRespone(ReviewDto)(newReview);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateReview(
        @Body() updateReviewDto: UpdateReviewDto,
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<ReviewDto>> {
        const updateReview = await this.reviewsService.updateReviewById(
            updateReviewDto,
            id,
            req?.user?.userId,
        );
        return dataToRespone(ReviewDto)(updateReview);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteReviewById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<ReviewDto>> {
        const deleteReview = await this.reviewsService.deleteReviewById(id);
        return dataToRespone(ReviewDto)(deleteReview);
    }

    @Get()
    async getAllReviews(
        @Query() filterReviewDto: FilterReviewDto,
    ): Promise<ISuccessListRespone<ReviewDto>> {
        const reviews = await this.reviewsService.findAllReviews(
            filterReviewDto,
        );
        const total = await this.reviewsService.countfindAllReviews(
            filterReviewDto,
        );
        return arrDataToRespone(ReviewDto)(reviews, total);
    }
}
