import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { agencyFeatureRiderRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(agencyFeatureRiderRoutes)],
})
export class AgencyFeatureRidersModule {}
