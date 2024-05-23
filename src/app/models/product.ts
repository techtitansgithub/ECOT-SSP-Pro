

export interface ProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    condition: string;
    sellerName: string;
    sellerSurName: string;
    sellerPhone: string;
    categoryId: number;
    categoryName:string;
    sold:boolean;
    userId: string;
    images:ImageDto[];
    rating:number;
    ratings?:RatingDto;
    quantity:number;
  }

  export interface ProductForCreationDto{
    name: string;
    description: string;
    price: number;
    condition: string;
    sellerName: string;
    sellerSurName: string;
    sellerPhone: string;
    categoryId: number;
    userId: string;
    quantity:number;
    images: ImageForCreationDto[];
  }

  export interface CategoryDto {
    id: number;
    name: string;
}

export class ShopParams {

  minPrice! : number;
  maxPrice! : number;
  category!: number;


}

export interface ProductForUpdateDto {
  name: string;
  description: string;
  price: number;
  condition: string;

}
export interface ImageForCreationDto {
  filePath: string;
}
export interface ImageDto {
  filePath: string;
}

export interface RatingDto {
  firstName: string;
  lastName: string;
  reviewBody: string;
  createdDate: Date;
  starsCount: number;
}

export interface RatingForCreationDto {
userId?: string;
reviewBody: string;
starsCount: number;
productId: string; 
}

export interface UserForChangePasswordDto {
  password: string;
  confirmPassword: string;
}

export interface OrderDto {
  id: number;
  productName: string;
  productId: number;
  productDescription: string;
  productPrice: number;
  filePath: string;
  sellerName: string;
  sellerSurName: string;
  buyerName: string;
  buyerSurName: string;
  orderReceived: boolean;
  buyerAddress:string;
  quantity:number;
  orderApprove: boolean;
}

export interface BookingDto {
  id: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  sellerName: string;
  sellerSurName: string;
  buyerName: string;
  buyerSurName: string;
  bookDate?: Date;
  isBooked: boolean;
  sellerAddress:string;
}

export interface BookingForCreationDto {
  id: number;
  bookDate?: Date;
}

