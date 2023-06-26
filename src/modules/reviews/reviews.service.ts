import {
    BadGatewayException,
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto, FilterReviewDto, UpdateReviewDto } from './dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async createReview(
        createReviewDto: CreateReviewDto,
        owerId: number,
    ): Promise<Review> {
        if (!owerId) {
            throw new BadRequestException('no owerid from request');
        }
        const newReview = this.reviewRepository.create(createReviewDto);
        newReview.owner = owerId;
        return await this.reviewRepository.save(newReview);
    }

    async updateReviewById(
        updateReviewDto: UpdateReviewDto,
        id: number,
        owerId: number,
    ): Promise<Review> {
        if (!id || !owerId) {
            throw new BadGatewayException(' not found id or owerId in request');
        }
        const findReview = await this.reviewRepository.findOne({
            where: { id: id, owner: { id: owerId } },
        });
        if (!findReview) {
            throw new NotFoundException('not found review with id ' + id);
        }
        return await this.reviewRepository.save({
            ...findReview,
            ...updateReviewDto,
        });
    }

    async deleteReviewById(id: number): Promise<Review> {
        const findReview = await this.reviewRepository.findOne({
            where: { id: id },
        });
        if (!findReview) {
            throw new NotFoundException('not found review with id ' + id);
        }

        return await this.reviewRepository.softRemove(findReview);
    }

    async findReviewById(id: number): Promise<Review> {
        const findReview = await this.reviewRepository.findOne({
            where: { id: id },
        });
        if (!findReview) {
            throw new NotFoundException('not found review with id ' + id);
        }
        return findReview;
    }

    async findAllReviews(filterReviewDto: FilterReviewDto): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({
            where: { ...filterReviewDto.options },
            skip: filterReviewDto.skip,
            cache: filterReviewDto.limit,
            order: { createdAt: 'DESC' },
        });
        return reviews;
    }
    async countfindAllReviews(
        filterReviewDto: FilterReviewDto,
    ): Promise<number> {
        const number = await this.reviewRepository.count({
            where: { ...filterReviewDto.options },
        });
        return number;
    }
}
