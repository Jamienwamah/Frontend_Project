import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-request.html',
  styleUrl: './access-request.css'
})
export class AccessRequestComponent implements OnInit {
  formCode = '';
  formName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formCode = this.route.snapshot.queryParamMap.get('form') || '';
    this.formName = this.getFormName(this.formCode);
  }

  goToForm(): void {
    if (!this.formCode) {
      this.router.navigate(['/']);
      return;
    }

    // Keep your existing form routing here.
    // This page should no longer request IT access.
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private getFormName(formCode: string): string {
    const names: Record<string, string> = {
      'OGCM-REPLACEMENT': 'OGCM Device Replacement',
      'OGCM-TROUBLESHOOTING': 'OGCM Device Troubleshooting',
      'OGCM-INFRASTRUCTURE': 'OGCM Infrastructure',
      'OGFS-REPLACEMENT': 'OGFS Device Replacement',
      'OGFS-TROUBLESHOOTING': 'OGFS Device Troubleshooting',
      'OGFS-INFRASTRUCTURE': 'OGFS Infrastructure',
      'OST-WEALTHFORGE-ACCESS': 'WealthForge Access',
      'OST-ENCLUSIA-ACCESS': 'Enclusia Access',
      'OST-ISSUE': 'IT Issue',
      'OST-TROUBLESHOOTING': 'OST Device Troubleshooting'
    };

    return names[formCode] || formCode;
  }
}