import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto';
import {CreateVnpayDto} from "./dto/create-vnpay.dto";

@Injectable()
export class TransationsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transationsRepository: Repository<Transaction>,
    ) {}

    async createTransactions(
        createTransationDto: CreateTransactionDto,
    ): Promise<Transaction> {
        const findTransactions = await this.transationsRepository.findOne({
            where: { transactionNo: createTransationDto.transactionNo },
        });
        if (findTransactions) {
            throw new BadRequestException('transactions no is exist in system');
        }
        const createTransactions =
            this.transationsRepository.create(createTransationDto);
        return await this.transationsRepository.save(createTransactions);
    }

    async getTransactionById(id: number): Promise<Transaction> {
        const findTransactions = await this.transationsRepository.findOne({
            where: { id: id },
        });
        if (findTransactions) {
            throw new NotFoundException('not found expection with id' + id);
        }
        return findTransactions;
    }

    async getTransactionByOrder(orderId: number): Promise<Transaction[]> {
        return await this.transationsRepository.find({
            where: { orderId: { id: orderId } },
        });
    }

    async getAllTransactions(): Promise<Transaction[]> {
        return await this.transationsRepository.find({
            relations: { orderId: true },
        });
    }

    async generateVnpayUrl(
        req,
        createVnpayDto: CreateVnpayDto,
    ): Promise<String> {
        const moment = require('moment');
        function sortObject(obj) {
            let sorted = {};
            let str = [];
            let key;
            for (key in obj){
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr = req.headers['x-forwarded-for'] || req.ip
        let tmnCode = process.env.TMN_CODE;
        let secretKey = process.env.VNPAY_SECRET_KEY;
        let vnpUrl = process.env.VNPAY_URL;
        let returnUrl = process.env.RETURN_URL;
        let bankCode = ''
        let locale = "vn"
        let currCode = 'VND';
        let vnp_Params = {};

        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = Math.floor(Math.random() * 1000000000);
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + createVnpayDto.orderId;
        vnp_Params['vnp_OrderType'] = 'billpayment';
        vnp_Params['vnp_Amount'] = createVnpayDto.amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = sortObject(vnp_Params);
        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        return vnpUrl;
    }
}
