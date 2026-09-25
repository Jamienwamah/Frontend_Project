import {
  Component,
  ElementRef,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface EntityOption {
  label: string;
  code: 'OST-Systems' | 'OGCM' | 'OGFS';
}


interface FormCard {
  id: 'issue' | 'replacement' | 'troubleshooting' | 'infrastructure';
  title: string;
  description: string;
  category: string;
  iconBg: string;
  iconPath: string;
}


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
})
export class LandingComponent {

  activeDropdownId: string | null = null;

  // Login state
  isLoggedIn = false;
  isCheckingAuth = true;
  userName = '';
  showUserMenu = false;


  // ============================================================
  // COMPANIES
  // ============================================================

  companyOptions: EntityOption[] = [

    {
      label: 'OST-Systems',
      code: 'OST-Systems',
    },

    {
      label: 'Optimum Global Capital Management',
      code: 'OGCM',
    },

    {
      label: 'Optimum Financial Services Ltd',
      code: 'OGFS',
    },

  ];


  // ============================================================
  // FORMS
  // ============================================================

  availableForms: FormCard[] = [
    {
      id: 'issue',

      title: 'Assign A New Device',

      description:
        'This takes records of all new devices that has has been issued, including Laptops, Desktops, Monitors',

      category: 'Device Assignment',

      iconBg: 'bg-blue-50',

      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },

    {
      id: 'troubleshooting',

      title: 'Device Troubleshooting',

      description:
        'Report hardware crashes, OS errors, network connectivity issues, or malware alerts.',

      category: 'Hardware & OS Support',

      iconBg: 'bg-blue-50',

      iconPath:
        'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },


    {
      id: 'replacement',

      title: 'Device Replacement',

      description:
        'Request a swap for damaged hardware, end-of-life laptops, or upgraded mobile devices.',

      category: 'Asset Management',

      iconBg: 'bg-blue-50',

      iconPath:
        'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },

    {
      id: 'infrastructure',

      title: 'IT Infrastructure Receipt',

      description:
        'Record and register new server equipment, network switches, firewalls, and hardware assets.',

      category: 'Infrastructure',

      iconBg: 'bg-blue-50',

      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },

  ];


  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {

    this.checkLoginStatus();

  }


  // ============================================================
  // AUTHENTICATION
  // ============================================================

  checkLoginStatus(): void {

    const cachedUserName =
      sessionStorage.getItem('userName');

    if (cachedUserName) {

      this.userName = cachedUserName;
      this.isLoggedIn = true;

    }

    fetch('http://localhost:8000/auth/user/', {
      method: 'GET',
      credentials: 'include',
    })

      .then(response => {

        if (!response.ok) {

          this.clearLocalSession();

          this.redirectToLogin();

          return null;
        }

        return response.json();

      })

      .then(data => {

        if (!data) {
          return;
        }

        if (
          data.authenticated === true &&
          data.user
        ) {

          this.userName = data.user.name;
          this.isLoggedIn = true;
          this.isCheckingAuth = false;

          sessionStorage.setItem(
            'userName',
            data.user.name
          );

        } else {

          this.clearLocalSession();

          this.redirectToLogin();

        }

      })

      .catch(error => {

        console.error(
          'Login status check failed:',
          error
        );

        this.clearLocalSession();

        this.redirectToLogin();

      });

  }


  // ============================================================
  // TAB / WINDOW SESSION CONTROL
  // ============================================================

  @HostListener('document:visibilitychange')
  handleVisibilityChange(): void {

    if (document.visibilityState === 'hidden') {

      this.closeApplicationSession();

    }

  }


  @HostListener('window:pagehide')
  handlePageHide(): void {

    this.closeApplicationSession();

  }


  private closeApplicationSession(): void {

    if (!this.isLoggedIn) {

      this.clearLocalSession();

      return;

    }

    this.isLoggedIn = false;
    this.userName = '';
    this.showUserMenu = false;
    this.isCheckingAuth = false;

    sessionStorage.removeItem('userName');

    fetch('http://localhost:8000/auth/logout/', {
      method: 'GET',
      credentials: 'include',
      keepalive: true
    }).catch(error => {

      console.error(
        'Automatic session logout failed:',
        error
      );

    });

  }


  private clearLocalSession(): void {

    sessionStorage.removeItem('userName');

    this.isLoggedIn = false;
    this.userName = '';
    this.showUserMenu = false;
    this.isCheckingAuth = false;

  }


  private redirectToLogin(): void {

    window.location.href =
      'http://localhost:8000/auth/login/';

  }


  navigateToLogin(): void {

    window.location.href =
      'http://localhost:8000/auth/login/';

  }


  toggleUserMenu(event: MouseEvent): void {

    event.stopPropagation();

    this.showUserMenu =
      !this.showUserMenu;

  }


  @HostListener('document:click')
  closeUserMenu(): void {

    this.showUserMenu = false;

  }


  logout(): void {

    fetch('http://localhost:8000/auth/logout/', {

      method: 'GET',

      credentials: 'include',

    })

      .finally(() => {

        this.clearLocalSession();

        window.location.href =
          'http://localhost:8000/auth/login/';

      });

  }


  handleAuthentication(): void {

    if (this.isLoggedIn) {

      this.logout();

    } else {

      this.navigateToLogin();

    }

  }


  // ============================================================
  // DROPDOWN
  // ============================================================

  toggleDropdown(
    formId: string,
    event: MouseEvent
  ): void {

    event.stopPropagation();

    this.activeDropdownId =
      this.activeDropdownId === formId
        ? null
        : formId;

  }


  // ============================================================
  // NAVIGATION
  // ============================================================

  selectCompanyAndNavigate(
    form: FormCard,
    companyCode: string
  ): void {

    this.activeDropdownId = null;

    const validCodes: Record<string, string> = {

      'OST-SYSTEMS': 'OST-Systems',

      OGCM: 'OGCM',

      OGFS: 'OGFS',

    };

    const code =
      validCodes[companyCode.toUpperCase()];

    if (code) {

      const route =
        `/forms/${code}/${form.id}`;

      console.log(
        'Navigating to:',
        route
      );

      this.router.navigateByUrl(route);

      return;

    }

    console.error(
      'No route found for:',
      form.id,
      companyCode
    );

  }

}