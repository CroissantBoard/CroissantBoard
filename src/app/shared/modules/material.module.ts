import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponents = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule
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
