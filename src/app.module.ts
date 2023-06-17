import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig } from './config';
import { UsersModule } from './modules/users/users.module';
import { TransationsModule } from './modules/transactions/transactions.module';
import { SlidersModule } from './modules/sliders/sliders.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductDetailsModule } from './modules/product-details/product-details.module';
import { OrdersModule } from './modules/orders/orders.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MediasModule } from './modules/medias/medias.module';
import { CategorysModule } from './modules/categorys/categorys.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { AdminModule } from './modules/admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entity/users.entity';
import { Address } from './modules/users/entity/address.entity';
import { Admin } from './modules/admin/admin.entity';
import { CartItem } from './modules/cart-items/cart-item.entity';
import { Category } from './modules/categorys/category.entity';
import { Media } from './modules/medias/media.entity';
import { Notification } from './modules/notifications/notification.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { Order } from './modules/orders/entities/order.entity';
import { AttributeProduct } from './modules/product-details/entities/attribute-product.entity';
import { AttributeProductValue } from './modules/product-details/entities/attribute-product-value.entity';
import { ProductDetail } from './modules/product-details/entities/product-detail.entity';
import { Product } from './modules/products/product.entity';
import { Review } from './modules/reviews/review.entity';
import { Slider } from './modules/sliders/slider.entity';
import { Transaction } from './modules/transactions/transaction.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ProductAttributeDefault } from './modules/product-details/entities/product-attribute-default.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
            load: [appConfig, databaseConfig],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_NAME || 'test',
            entities: [
                User,
                Address,
                Admin,
                CartItem,
                Category,
                Media,
                Notification,
                OrderItem,
                Order,
                AttributeProduct,
                AttributeProductValue,
                ProductDetail,
                ProductAttributeDefault,
                Product,
                Review,
                Slider,
                Transaction,
            ],
            synchronize: true,
        }),
        UsersModule,
        TransationsModule,
        SlidersModule,
        ReviewsModule,
        ProductsModule,
        ProductDetailsModule,
        OrdersModule,
        NotificationsModule,
        MediasModule,
        CategorysModule,
        CartItemsModule,
        AdminModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
