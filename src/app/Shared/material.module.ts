import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table' 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule,} from '@angular/material/datepicker';
import { MatSnackBarModule,} from '@angular/material/snack-bar';
import {MatTooltipModule,} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule,} from '@angular/material/slider';
import { UploadComponent } from './upload/upload.component';


const materialModules = [
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCardModule, 
  MatGridListModule,
  MatInputModule, 
  MatBadgeModule,
  MatSelectModule,
  MatTableModule,
  MatExpansionModule,
  MatRadioModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDatepickerModule, 

  MatSnackBarModule, 
  MatTooltipModule, 
  MatChipsModule, 
  MatSliderModule,

  
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules,

  ],
  exports: [
    materialModules,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule { }

