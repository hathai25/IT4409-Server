import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { AttributeDefaultsService } from './attribute-default.service';
import { AttributeValuesService } from './attribute-values.service';
import { MediaProductDetailsService } from './media-product-detail.service';
import { AttributeProductsService } from './attribute-products.service';
import { CreateProductDetailDto, ProductDetailDto, UpdateProductDetailDto } from './dto/product-detail';
import { ISuccessRespone } from 'src/common/respone/interface';
import {  dataToRespone } from 'src/common/respone/until';
import { JwtAdminGuard, RolesGuard } from '../admin/guards';
import { Role } from 'src/common/enum';
import { Roles } from '../admin/decorator/role.decorator';
import { CreateAttributeProductDto } from './dto/attribute-product/create-attribute-product.dto';
import { AttributeProductDto } from './dto/attribute-product/attribute-product.dto';
import { UpdateAttributeProductDto } from './dto/attribute-product/update-attribute-product.dto';
import { AttributeProductValueDto, CreateAtrributeValueDto, updateAtrributeValueDto } from './dto/attribute-product-value';
import { AttributeDefaultDto, CreateAttributeDefaultDto, UpdateAttributeDefaultDto } from './dto/product-attribute-default';
import { CreateMediaProductDetailDto, MediaProductDetailDto, UpdateMediaProductDetailDto } from './dto/media-product-detail';

@Controller('product-details')
export class ProductDetailsController {
    constructor(
        private readonly productDetailsService:ProductDetailsService,
        private readonly attributesDefaultsService: AttributeDefaultsService,
        private readonly attributeValuesService: AttributeValuesService,
        private readonly mediaProductDetailsService: MediaProductDetailsService,
        private readonly attributeProductsService: AttributeProductsService
    ) {}
    
    // create
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post()
    async createProductDetail(@Body() createProductDetailDto: CreateProductDetailDto, @Req() req: any): Promise<ISuccessRespone<ProductDetailDto>> {
        const newProductDetail = await this.productDetailsService.createProductDetail(createProductDetailDto, req?.user?.adminId)
         return dataToRespone(ProductDetailDto)(newProductDetail)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post('/attributes')
    async createProducAttribute(@Body() createAttributeProductDto: CreateAttributeProductDto): Promise<ISuccessRespone<AttributeProductDto>> {
        const newAttribute = await this.attributeProductsService.createAttributeProduct(createAttributeProductDto)
        return dataToRespone(AttributeProductDto)(newAttribute)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post('/values')
    async createAtrributeValues(@Body() createAttributeValueDto: CreateAtrributeValueDto): Promise<ISuccessRespone<AttributeProductValueDto>> {
        const newAttributeValue = await this.attributeValuesService.createAttributeValue(createAttributeValueDto)
        return dataToRespone(AttributeProductValueDto)(newAttributeValue)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post('/default-values')
    async createDefaultValues(@Body() createDefaultvalueDto: CreateAttributeDefaultDto): Promise<ISuccessRespone<AttributeDefaultDto>> {
        const newAttributeDefault = await this.attributesDefaultsService.createProductAttributeDefault(createDefaultvalueDto) 
        return dataToRespone(AttributeDefaultDto)(newAttributeDefault)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Post('/medias')
    async createMediaProductDetail(@Body() createMediaProductDetailDto: CreateMediaProductDetailDto): Promise<ISuccessRespone<MediaProductDetailDto>> {
        const newMediaProductDetail = await this.mediaProductDetailsService.createMediaProductDetail(createMediaProductDetailDto)
        return dataToRespone(MediaProductDetailDto)(newMediaProductDetail)
    }

    // end create

    // update 
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('/medias/:id')
    async updateMediaProductDetailById(@Param('id') id: number,@Body() updateMediaProductDetailDto: UpdateMediaProductDetailDto): Promise<ISuccessRespone<MediaProductDetailDto>> {
        const updateMeidaProductDetail = await this.mediaProductDetailsService.updateMediaProductDetail(id, updateMediaProductDetailDto)
        return dataToRespone(MediaProductDetailDto)(updateMeidaProductDetail)
    }


    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('/default-values/:id')
    async updateDefaultValues(@Param('id') id: number, @Body() updateAttributeDefaultDto: UpdateAttributeDefaultDto): Promise<ISuccessRespone<AttributeDefaultDto>> {
        const updateAttributeDefault  = await this.attributesDefaultsService.updateAttributeDefaultById(id, updateAttributeDefaultDto)
        return dataToRespone(AttributeDefaultDto)(updateAttributeDefault)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('attributes/:id') 
    async updateAttributeById(@Body() updateAttributeProductDto: UpdateAttributeProductDto, @Param('id') id: number): Promise<ISuccessRespone<AttributeProductDto>> {
        const  updateAttribute = await this.attributeProductsService.updateAttributeProductById(id, updateAttributeProductDto)
        return dataToRespone(AttributeProductDto)(updateAttribute)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch('values/:id') 
    async updateAttributeValue(@Param('id') id: number, @Body() updateAttributeValueDto: updateAtrributeValueDto): Promise<ISuccessRespone<AttributeProductValueDto>> {
        const updateAttributeValue = await this.attributeValuesService.updateAttributeValueById(id, updateAttributeValueDto)
        return dataToRespone(AttributeProductValueDto)(updateAttributeValue)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Patch(':id') 
    async updateProductDetailById(@Body() updateProductDetailDto: UpdateProductDetailDto, @Param('id') id: number, @Req() req: any): Promise<ISuccessRespone<ProductDetailDto>> {
        const updateProductDetail = await this.productDetailsService.updateProductDetailbyId(id, updateProductDetailDto, req?.user?.adminId)
        return dataToRespone(ProductDetailDto)(updateProductDetail)
    }

    // end update

    // delete 
    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete('/medias/:id')
    async destroyMediaProductDetails(@Param('id') id: number): Promise<ISuccessRespone<MediaProductDetailDto>> {
        const deleteMedia = await this.mediaProductDetailsService.destroyMediaProductDetailById(id)
        return dataToRespone(MediaProductDetailDto)(deleteMedia)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete('/default-values/:id')
    async destroyAttributeDefault(@Param(':id') id: number): Promise<ISuccessRespone<AttributeDefaultDto>> {
        const deleteAttributeDefault = await this.attributesDefaultsService.destroyAttributeDefaultById(id)
        return dataToRespone(AttributeDefaultDto)(deleteAttributeDefault)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete('attributes/:id')
    async destroyAttributeProductById(@Param(':id') id: number): Promise<ISuccessRespone<AttributeProductDto>> {
        const deleteAttribute = await this.attributeProductsService.deleteAttributeById(id)
        return dataToRespone(AttributeProductDto)(deleteAttribute)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete('values/:id')
    async destroyAttributeValuesById(@Param(':id') id: number): Promise<ISuccessRespone<AttributeProductValueDto>> {
        const destroyAttributeValue = await this.attributeValuesService.destroyAttributeValueById(id)
        return dataToRespone(AttributeProductValueDto)(destroyAttributeValue)
    }

    @UseGuards(JwtAdminGuard, RolesGuard)
    @Roles(Role.ManageProduct)
    @Delete(':id')
    async destroyProductDetail(@Param(':id') id: number): Promise<ISuccessRespone<ProductDetailDto>> {
        const deleteProductDetail = await this.productDetailsService.destroyProductDetailById(id)
        return dataToRespone(ProductDetailDto)(deleteProductDetail)
    }

    // end delete

    // get product details 
    @Get()
    async getProductDetailByProductId(@Query('productId') productId: string): Promise<ISuccessRespone<ProductDetailDto>> {
        const productDetail = await this.productDetailsService.getProductDetailByProductId(parseInt(productId))
        return dataToRespone(ProductDetailDto)(productDetail)
    }

    @Get(':id')
    async getProductDetailById(@Param(':id') id: number):Promise<ISuccessRespone<ProductDetailDto>> {
        const productDetail = await this.productDetailsService.getProductDetailById(id)
        return dataToRespone(ProductDetailDto)(productDetail)
    }

    // end get
} 
