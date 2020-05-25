import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

const MaterialComponents = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
];

@NgModule({
    declarations: [],
    imports: [
        ...MaterialComponents,
    ],
    exports: [
        ...MaterialComponents,
    ]
})
export class MaterialModule { }
