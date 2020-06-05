import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {HowToStartComponent} from "./pages/how-to-start/how-to-start.component";
import {PricingComponent} from "./pages/pricing/pricing.component";


const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full'
    },
    {
        path: 'team',
        component: AboutUsComponent
    },
    {
        path: 'start',
        component: HowToStartComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
