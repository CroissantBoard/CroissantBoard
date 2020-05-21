import { NgModule } from '@angular/core';

import {MaterialModule} from "../material/material.module";
import { LandingComponent } from './pages/landing/landing.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroComponent } from './components/intro/intro.component';
import { ServicesComponent } from './components/services/services.component';
import { ReviewComponent } from './components/review/review.component';
import {FooterComponent} from "./components/footer/footer.component";
import {HomeRoutingModule} from "./home-routing.module";
import { HowToStartComponent } from './pages/how-to-start/how-to-start.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import {CommonModule} from "@angular/common";






@NgModule({
  declarations: [
      LandingComponent,
      AboutUsComponent,
      HeaderComponent,
      FooterComponent,
      IntroComponent,
      ServicesComponent,
      ReviewComponent,
      HowToStartComponent,
      PricingComponent
  ],
    imports: [
        MaterialModule,
        HomeRoutingModule,
        CommonModule,

    ]
})
export class HomeModule { }
