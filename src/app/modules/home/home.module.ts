import { NgModule } from '@angular/core';

import { MaterialModule } from '../../shared/modules/material.module';

import { LandingComponent } from './pages/landing/landing.component';
import { IntroComponent } from './pages/landing/components/intro/intro.component';
import { ReviewComponent } from './pages/landing/components/review/review.component';
import { ServicesComponent } from './pages/landing/components/services/services.component';

import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TeamComponent } from './pages/about-us/components/team/team.component';

import { HowToStartComponent } from './pages/how-to-start/how-to-start.component';
import { StepperComponent } from './pages/how-to-start/components/stepper/stepper.component';

import { PricingComponent } from './pages/pricing/pricing.component';

import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";

import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  declarations: [
      LandingComponent,
      AboutUsComponent,
      IntroComponent,
      ServicesComponent,
      ReviewComponent,
      HowToStartComponent,
      PricingComponent,
      StepperComponent,
      TeamComponent,
  ],
    imports: [
        MaterialModule,
        HomeRoutingModule,
        CommonModule,
        SharedModule,

    ]
})
export class HomeModule { }
