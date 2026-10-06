import { Routes } from '@angular/router';

import { LandingComponent } from '../landing/landing';

export const appRoutes: Routes = [

  {
    path: '',
    component: LandingComponent
  },

  {
    path: 'access-request',
    loadComponent: () =>
      import(
        '../access-control/access-request'
      ).then(
        m => m.AccessRequestComponent
      ),
    title: 'Access Request | IT Service Portal'
  },

  {
    path: 'it/access-requests',
    loadComponent: () =>
      import(
        '../access-control/it-approvals'
      ).then(
        m => m.ITApprovalsComponent
      ),
    title: 'Form Access Requests | IT Portal'
  },
  {
    path: 'admin/approvals',
    loadComponent: () =>
      import('../access-control/approvals.dashboard').then(m => m.ApprovalDashboardComponent),
    title: 'Approval Dashboard'
  },

  {
    path: 'forms',
    loadChildren: () =>
      import('./forms.route').then(
        m => m.FORM_ROUTES
      )
  },

  {
    path: '**',
    redirectTo: ''
  }

];