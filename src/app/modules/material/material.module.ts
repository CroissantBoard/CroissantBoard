import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';



const MaterialComponents = [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule
];

@NgModule({
    declarations: [],
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }
