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
import { ProductsService } from './products.service';
import {
    CreateProductDto,
    FilterProductDto,
    ProductDto,
    UpdateProductDto,
} from './dto';
import {
    ISuccessListRespone,
    ISuccessRespone,
} from 'src/common/respone/interface';
import { arrDataToRespone, dataToRespone } from 'src/common/respone/until';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { Roles } from '../admin/decorator/role.decorator';
import { Role } from 'src/common/enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(
        @Query() filterProductDto: FilterProductDto,
    ): Promise<ISuccessListRespone<ProductDto>> {
        const product = await this.productsService.getAllProduct(
            filterProductDto,
        );
        const total = await this.productsService.countProduct(filterProductDto);

        return arrDataToRespone(ProductDto)(product, total);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Get('trash')
    async getDeleteProduct(
        @Query() filterProductDto: FilterProductDto,
    ): Promise<ISuccessListRespone<ProductDto>> {
        const product = await this.productsService.getAllSoftDeleteProduct(
            filterProductDto,
        );
        const total = await this.productsService.countSoftDeleteProduct(
            filterProductDto,
        );

        return arrDataToRespone(ProductDto)(product, total);
    }

    @Get(':id')
    async getProductById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<ProductDto>> {
        const product = await this.productsService.getProductById(id);
        return dataToRespone(ProductDto)(product);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @Req() req: any,
    ): Promise<ISuccessRespone<ProductDto>> {
        const newProduct = await this.productsService.createProduct(
            createProductDto,
            req?.user?.adminId,
        );

        return dataToRespone(ProductDto)(newProduct);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('trash/resotre/:id')
    async reStoreProductById(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<ProductDto>> {
        const reStoreProductById =
            await this.productsService.recoverProductById(
                id,
                req?.user?.adminId,
            );
        return dataToRespone(ProductDto)(reStoreProductById);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('delete/:id')
    async softDeleteProductById(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<ISuccessRespone<ProductDto>> {
        const softDeleteProductById =
            await this.productsService.softDeleteProductById(
                id,
                req?.user?.adminId,
            );
        return dataToRespone(ProductDto)(softDeleteProductById);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete(':id')
    async destroyProductById(
        @Param('id') id: number,
    ): Promise<ISuccessRespone<ProductDto>> {
        const destroyProduct = await this.productsService.destroyProductById(
            id,
        );
        return dataToRespone(ProductDto)(destroyProduct);
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch(':id')
    async updateProductById(
        @Body() updateProductDto: UpdateProductDto,
        @Req() req: any,
        @Param('id') id: number,
    ): Promise<ISuccessRespone<ProductDto>> {
        const updateProduct = await this.productsService.updateProductById(
            id,
            updateProductDto,
            req?.user?.adminId,
        );

        return dataToRespone(ProductDto)(updateProduct);
    }
}
