import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing').then((m) => m.LandingComponent),
    title: 'IT Service & Device Portal',
  },

  {
    path: 'forms',
    loadChildren: () =>
      import('./routes/forms.route').then((m) => m.FORM_ROUTES),
  },
  {
  path: 'admin/approvals',
  loadComponent: () =>
    import('./access-control/approvals.dashboard').then(m => m.ApprovalDashboardComponent),
  title: 'Approval Dashboard',
},

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
