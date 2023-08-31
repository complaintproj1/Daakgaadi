import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "main-page/subscription",
    pathMatch: "full",
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./components/signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "sign-in",
    loadChildren: () =>
      import("./components/signin/signin.module").then((m) => m.SigninModule),
  },
  {
    path: "main-page",
    loadChildren: () =>
      import("./components/main-page/main-page.module").then(
        (m) => m.MainPageModule
      ),
    component: MainPageComponent,
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./components/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: "user-dashboard",
    loadChildren: () =>
      import("./components/user-dashboard/user-dashboard.module").then(
        (m) => m.UserDashboardModule
      ),
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
