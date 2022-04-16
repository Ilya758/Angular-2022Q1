import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './pages/auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [LoginPageComponent, AdminPageComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
