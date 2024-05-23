import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { CategoryDto, ImageForCreationDto, ProductForCreationDto } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  errorMessage: string = '';
  dataForm: FormGroup | any;
  private dialogConfig: any;
  public showError?: boolean;
  result: any;
  response: string = ''; // Adjusted response type to string
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!);
  public categories!: CategoryDto[];
  product: ProductForCreationDto = {
    name: '',
    description: '',
    price: 0,
    condition: '',
    sellerName: '',
    sellerSurName: '',
    sellerPhone: '',
    categoryId: 0,
    userId: '',
    quantity: 0,
    images: []
  } ; // Initialize product as an empty object

  constructor(
    private repoService: RepositoryService,
    private dialog: MatDialog,
    private dataService: DataService,
    private Ref: MatDialogRef<AddProductPage>
  ) {}

  ngOnInit() {
    this.dataForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      condition: new FormControl(''),
      categoryId: new FormControl(''),
      sellerPhone: new FormControl(''),
      quantity: new FormControl('')
    });

    this.dialogConfig = {
      height: '200px',
      width: '250px',
      disableClose: true,
      data: {},
    };
    this.getAllCategories();
  }

  uploadFinished = (event: any) => {
    this.response = event;
    console.log("Response from uploadFinished:", this.response);

    // Parse the response string into an array of image paths
    try {
      const imagePaths: string[] = JSON.parse(this.response);
      console.log("Parsed image paths:", imagePaths);

      // Initialize an empty array to store image objects
      const imagesArray: any[] = [];

      // Iterate over each image path and construct an image object
      imagePaths.forEach((path: string) => {
        // Construct the URL for the image
        const imageUrl = `${environment.urlAddress}/${path.replace(/\\/g, '/')}`; // Assuming apiUrl is the base URL for the images

        // Push the image object into the images array
        imagesArray.push({ filePath: imageUrl });
      });

      // Set the images array to the product's images property
      this.product.images = imagesArray;
    } catch (error) {
      console.error("Error parsing response:", error);
      console.error("Invalid response format. Expected a JSON array of image paths.");
    }
  }

  public getAllCategories = () => {
    this.repoService.getData('api/categories').subscribe(res => {
      this.categories = res as CategoryDto[];
      console.log(this.categories);
    }),
    (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }

  public validateControl = (controlName: string) => {
    return this.dataForm?.get(controlName)?.invalid && this.dataForm?.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm?.get(controlName)?.hasError(errorName)
  }

  public createData = (dataFormValue: any) => {
    if (this.dataForm.valid) {
      this.executeDataCreation(dataFormValue);
    }
  };

  private executeDataCreation = (dataFormValue: any) => {
    // Construct the product object
    let product: ProductForCreationDto = {
      name: dataFormValue.name,
      description: dataFormValue.description,
      price: dataFormValue.price,
      condition: dataFormValue.condition,
      sellerName: this.loggedInUser.firstName,
      sellerSurName: this.loggedInUser.lastName,
      sellerPhone: dataFormValue.sellerPhone,
      categoryId: dataFormValue.categoryId,
      quantity: dataFormValue.quantity,
      userId: this.loggedInUser.id,
      images: this.product.images // Pass the images array directly
    };

    console.log(product);
    const apiUri: string = `api/products`;
    this.repoService.create(apiUri, product).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
        // Subscribe to the mat-dialog-close attribute to trigger actions after dialog close
        dialogRef.afterClosed().subscribe((result) => {
          this.dataService.triggerRefreshTab1();
          this.Ref.close([]);
        });
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    );
  };

  closeModal() {
    this.Ref.close([]);
  }
}