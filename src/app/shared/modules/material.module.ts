import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponents = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
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
