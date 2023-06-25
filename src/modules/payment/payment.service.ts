import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import * as crypto from "crypto";
import * as querystring from "qs";
import {Buffer} from "buffer";

@Injectable()
export class PaymentService {
    sortObject(obj) {
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

    navigateToVnPay = (amount, orderId) => {
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr = "http://localhost:5173"
      
        let tmnCode = "YOCSCPV3"
        let secretKey = "WNPTYSDBTRNYMKEZZHXXSJPPCTLOBTGP"
        let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
        let returnUrl = "http://localhost:5173/cart/payment-success"
      
        let bankCode = ''
      
        let locale = "vn"
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
          vnp_Params['vnp_BankCode'] = bankCode;
        }
      
        vnp_Params = this.sortObject(vnp_Params);
      
        let signData = querystring?.stringify(vnp_Params, { encode: false });
        let hmac = crypto?.createHmac("sha512", secretKey);
        let signed = hmac?.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring?.stringify(vnp_Params, { encode: false });
      
        return vnpUrl
    }
}
