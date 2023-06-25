import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PostPaymentDto } from './dto/post-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    payment(@Body() postPaymentDto: PostPaymentDto) {
        return this.paymentService.navigateToVnPay(postPaymentDto.amount, postPaymentDto.orderId)
    }
}
