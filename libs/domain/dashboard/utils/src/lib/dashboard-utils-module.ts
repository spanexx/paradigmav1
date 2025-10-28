/**
 * Dashboard Utils Module
 * 
 * This module provides utility functions for the dashboard domain.
 * Currently it's a simple module that imports CommonModule,
 * but it's designed to aggregate dashboard-specific utility functions.
 * 
 * This module can be imported when you need access to dashboard
 * utility functions like CSS class generators.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  // Import CommonModule to provide common Angular directives
  imports: [CommonModule],
})
export class DashboardUtilsModule {}
