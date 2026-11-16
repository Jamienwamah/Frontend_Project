
import { environment } from '../../../../environments/environment.development';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EntraService } from '../../../core/services/entra.service';


export interface LaptopAcquisitionConsentPayload {
  currentDate: string;

  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };

  officialUse: {
    laptopDetails: string;
    brandModel: string;
    serialNumber: string;
    accessoriesProvided: string;
    dateIssued: string;
  };
}

@Component({
  selector: 'app-ogcm-laptop-acquisition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <!-- PAGE CONTAINER -->
    <div class="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-6xl mx-auto">

        <!-- NAVIGATION HEADER -->
        <header class="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
          <a routerLink="/" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portal Landing
          </a>

          <span class="text-xs text-slate-400 font-mono">
            Form Ref: OGCM-LAPTOP-ACQ-2026
          </span>
        </header>

        <!-- FORM CARD -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

          <!-- FORM BANNER -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              <div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3">
                  OGCM Hardware Acquisition
                </div>

                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Laptop Acquisition Form
                </h1>

                <p class="text-blue-100 text-sm mt-2 leading-relaxed">
                  Complete the employee and laptop information for the acquisition and issuance of a company laptop.
                </p>
              </div>

              <div class="text-left sm:text-right text-xs text-blue-200">
                <p>
                  Date:
                  <span class="font-semibold text-white">
                    {{ currentDate | date:'mediumDate' }}
                  </span>
                </p>
              </div>

            </div>
          </div>

          <!-- FORM BODY -->
          <form [formGroup]="consentForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-10 text-slate-900">

            <!-- SECTION 1: EMPLOYEE INFORMATION -->
            <section formGroupName="employee" class="space-y-5">

              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Employee Information
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Full Name, Department and Job Title are retrieved automatically from the signed-in account. Employee ID must be entered manually.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    formControlName="name"
                    placeholder="Employee full name"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')"
                  />

                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block">
                    Name is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Employee ID *
                  </label>

                  <input
                    type="text"
                    formControlName="employeeId"
                    placeholder="Enter your Employee ID"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')"
                  />

                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">
                    Employee ID is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Department *
                  </label>

                  <input
                    type="text"
                    formControlName="department"
                    placeholder="Employee department"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')"
                  />

                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block">
                    Department is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    formControlName="jobTitle"
                    placeholder="Employee job title"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')"
                  />

                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block">
                    Job title is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SECTION 2: OFFICIAL USE -->
            <section formGroupName="officialUse" class="space-y-5">

              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Laptop Information
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Record the laptop specifications and accessories issued to the employee.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Laptop Details *
                  </label>

                  <textarea
                    formControlName="laptopDetails"
                    rows="3"
                    placeholder="Enter detailed description of the laptop issued..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'laptopDetails')"
                  ></textarea>

                  <span *ngIf="isFieldInvalid('officialUse', 'laptopDetails')" class="text-xs text-red-500 mt-1 block">
                    Laptop details are required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Brand & Model *
                  </label>

                  <input
                    type="text"
                    formControlName="brandModel"
                    placeholder="Dell Latitude 5440"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'brandModel')"
                  />

                  <span *ngIf="isFieldInvalid('officialUse', 'brandModel')" class="text-xs text-red-500 mt-1 block">
                    Brand and model are required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Serial Number *
                  </label>

                  <input
                    type="text"
                    formControlName="serialNumber"
                    placeholder="Enter serial number"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'serialNumber')"
                  />

                  <span *ngIf="isFieldInvalid('officialUse', 'serialNumber')" class="text-xs text-red-500 mt-1 block">
                    Serial number is required.
                  </span>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Accessories Provided *
                  </label>

                  <textarea
                    formControlName="accessoriesProvided"
                    rows="3"
                    placeholder="Laptop bag, charger, mouse, docking station, etc."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'accessoriesProvided')"
                  ></textarea>

                  <span *ngIf="isFieldInvalid('officialUse', 'accessoriesProvided')" class="text-xs text-red-500 mt-1 block">
                    Accessories provided are required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Date Issued *
                  </label>

                  <input
                    type="date"
                    formControlName="dateIssued"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'dateIssued')"
                  />

                  <span *ngIf="isFieldInvalid('officialUse', 'dateIssued')" class="text-xs text-red-500 mt-1 block">
                    Date issued is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">

              <button
                type="submit"
                [disabled]="isSubmitting"
                class="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-md transition-all"
              >
                {{ isSubmitting ? 'Submitting...' : 'Submit Laptop Acquisition Form' }}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class LaptopAcquisitionConsentComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private entraService = inject(EntraService);
  private http = inject(HttpClient);

  consentForm!: FormGroup;
  currentDate: Date = new Date();
  isSubmitting = false;

  private readonly apiUrl =
    `${environment.apiBaseUrl}/api/v1/issue/`;

  ngOnInit(): void {
    this.consentForm = this.fb.group({
      employee: this.fb.group({
        name: [{ value: '', disabled: true }, Validators.required],
        department: [{ value: '', disabled: true }, Validators.required],
        jobTitle: [{ value: '', disabled: true }, Validators.required],
        employeeId: ['', Validators.required]
      }),

      officialUse: this.fb.group({
        laptopDetails: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        accessoriesProvided: ['', Validators.required],
        dateIssued: [
          new Date().toISOString().substring(0, 10),
          Validators.required
        ]
      })
    });

    this.loadEmployeeInformation();
  }

  private loadEmployeeInformation(): void {
    this.entraService.getMyProfile().subscribe({
      next: (response: any) => {
        const profile = response.profile ?? response;

        this.consentForm.get('employee')?.patchValue({
          name: profile.name || '',
          department: profile.department || '',
          jobTitle: profile.jobTitle || ''
        });
      },

      error: (error) => {
        console.error(
          'Unable to retrieve signed-in employee information:',
          error
        );
      }
    });
  }

  public onSubmit(): void {

    if (this.isSubmitting) {
      return;
    }

    if (this.consentForm.invalid) {
      this.consentForm.markAllAsTouched();
      alert('Please fill out all required fields.');
      return;
    }

    const formValues = this.consentForm.getRawValue();

    // Format the current date as YYYY-MM-DD for Django
    const today = new Date();

    const formattedCurrentDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-');

    const payload: LaptopAcquisitionConsentPayload = {
      currentDate: formattedCurrentDate,

      employee: {
        name: formValues.employee.name,
        department: formValues.employee.department,
        jobTitle: formValues.employee.jobTitle,
        employeeId: formValues.employee.employeeId
      },

      officialUse: {
        laptopDetails: formValues.officialUse.laptopDetails,
        brandModel: formValues.officialUse.brandModel,
        serialNumber: formValues.officialUse.serialNumber,
        accessoriesProvided: formValues.officialUse.accessoriesProvided,
        dateIssued: formValues.officialUse.dateIssued
      }
    };

    this.isSubmitting = true;

    this.http.post<any>(this.apiUrl, payload).subscribe({

      next: (response) => {

        console.log('Laptop Acquisition Submission:', response);

        this.isSubmitting = false;

        const message = response.email_accepted
          ? 'Laptop Acquisition form submitted successfully. The approval request has been sent to IT Support.'
          : 'Laptop Acquisition form submitted successfully, but the approval email could not be sent. IT Support will need to review the submission.';

        alert(message);

        this.router.navigate(['/']);
      },

      error: (error) => {

        this.isSubmitting = false;

        console.error(
          'Laptop Acquisition submission failed:',
          error
        );

        const errorMessage =
          error.error?.detail ||
          error.error?.message ||
          'Unable to submit the Laptop Acquisition form. Please try again.';

        alert(errorMessage);
      }

    });
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {

    const field = this.consentForm.get(`${groupName}.${fieldName}`);

    return field
      ? field.invalid && (field.dirty || field.touched)
      : false;
  }
}
