import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatLineModule, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  imports: [CdkTableModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatLineModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule],
  exports: [CdkTableModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatLineModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule]
})

export class AppMaterialModule {
}
