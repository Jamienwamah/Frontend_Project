import {environment } from '../../../../environments/environment.development';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EntraService } from '../../../core/services/entra.service';

export interface DeviceTroubleshootingPayload {
  company: 'OGCM';
  currentDate: Date;

  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };

  device: {
    assetTag?: string;
    deviceType: string;
    brandModel: string;
    serialNumber: string;
    operatingSystem: string;
  };

  issue: {
    dateReported: string;
    reportedBy: string;
    description: string;
    startDate: string;
    troubleshootingAttempted: boolean;
    attemptedDetails?: string;
  };

  officialUse?: {
    receivedBy?: string;
    dateReceived?: string;
    assessment?: {
      hardware?: boolean;
      software?: boolean;
      network?: boolean;
      os?: boolean;
      malware?: boolean;
      userConfig?: boolean;
    };
    assessmentOther?: string;
    troubleshooting?: {
      hwDiag?: boolean;
      osRepair?: boolean;
      driverUpdates?: boolean;
      swReinstall?: boolean;
      malwareRemoval?: boolean;
      winUpdates?: boolean;
      dataBackup?: boolean;
      pwdReset?: boolean;
      hwReplacement?: boolean;
    };
    partsReplaced?: string;
    outcome?: string;
    dateReturned?: string;
    returnedBy?: string;
    userConfirmation?: string;
    confirmationDate?: string;
    additionalComments?: string;
  };
}

@Component({
  selector: 'app-device-troubleshooting',
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
            Form Ref: IT-TS-2026
          </span>
        </header>

        <!-- FORM CARD -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

          <!-- FORM BANNER -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3">
                  Hardware & OS Support
                </div>

                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  OGCM Device Troubleshooting Form
                </h1>

                <p class="text-blue-100 text-sm mt-2 leading-relaxed">
                  Submit technical details for hardware, operating system, network, or device issues.
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
          <form [formGroup]="troubleshootingForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-10 text-slate-900">

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
                    Employee details are retrieved automatically from the signed-in account.
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
                    placeholder="EMP-10492"
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
                    Job Title is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SECTION 2: DEVICE INFORMATION -->
            <section formGroupName="device" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Device Information
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Provide information about the affected device.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Device Type *
                  </label>

                  <select
                    formControlName="deviceType"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'deviceType')"
                  >
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop / Workstation</option>
                    <option value="Mobile">Mobile / Tablet</option>
                    <option value="Peripheral">Peripheral / Other</option>
                  </select>

                  <span *ngIf="isFieldInvalid('device', 'deviceType')" class="text-xs text-red-500 mt-1 block">
                    Select a device type.
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
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'brandModel')"
                  />

                  <span *ngIf="isFieldInvalid('device', 'brandModel')" class="text-xs text-red-500 mt-1 block">
                    Brand/Model required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Serial Number *
                  </label>

                  <input
                    type="text"
                    formControlName="serialNumber"
                    placeholder="SN-982312A"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'serialNumber')"
                  />

                  <span *ngIf="isFieldInvalid('device', 'serialNumber')" class="text-xs text-red-500 mt-1 block">
                    Serial Number required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Asset Tag
                    <span class="text-slate-400 normal-case">(Optional)</span>
                  </label>

                  <input
                    type="text"
                    formControlName="assetTag"
                    placeholder="LAP-2026-0042"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Operating System *
                  </label>

                  <input
                    type="text"
                    formControlName="operatingSystem"
                    placeholder="Windows 11 Pro / macOS / Linux"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'operatingSystem')"
                  />

                  <span *ngIf="isFieldInvalid('device', 'operatingSystem')" class="text-xs text-red-500 mt-1 block">
                    Operating System is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SECTION 3: ISSUE DETAILS -->
            <section formGroupName="issue" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Issue Description
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Describe the technical behavior or failure encountered.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Date Reported *
                  </label>

                  <input
                    type="date"
                    formControlName="dateReported"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'dateReported')"
                  />

                  <span *ngIf="isFieldInvalid('issue', 'dateReported')" class="text-xs text-red-500 mt-1 block">
                    Date reported is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Reported By *
                  </label>

                  <input
                    type="text"
                    formControlName="reportedBy"
                    placeholder="Self / Supervisor Name"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'reportedBy')"
                  />

                  <span *ngIf="isFieldInvalid('issue', 'reportedBy')" class="text-xs text-red-500 mt-1 block">
                    Reported by is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Date Issue Started *
                  </label>

                  <input
                    type="date"
                    formControlName="startDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'startDate')"
                  />

                  <span *ngIf="isFieldInvalid('issue', 'startDate')" class="text-xs text-red-500 mt-1 block">
                    Start date is required.
                  </span>
                </div>

                <div class="flex items-center gap-3 sm:mt-7">
                  <input
                    type="checkbox"
                    id="troubleshootingAttempted"
                    formControlName="troubleshootingAttempted"
                    class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />

                  <label for="troubleshootingAttempted" class="text-sm font-medium text-slate-800">
                    Prior troubleshooting attempted?
                  </label>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Detailed Issue Description *
                  </label>

                  <textarea
                    formControlName="description"
                    rows="4"
                    placeholder="Describe symptoms, error codes, blue screen crashes, network disconnects..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'description')"
                  ></textarea>

                  <span *ngIf="isFieldInvalid('issue', 'description')" class="text-xs text-red-500 mt-1 block">
                    Description is required.
                  </span>
                </div>

                <div
                  class="sm:col-span-2"
                  *ngIf="troubleshootingForm.get('issue.troubleshootingAttempted')?.value"
                >
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Attempted Steps Details
                  </label>

                  <input
                    type="text"
                    formControlName="attemptedDetails"
                    placeholder="Rebooted, driver updates, restarted network adapter..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all"
              >
                Submit Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OGCMTroubleshoot implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private entraService = inject(EntraService);

  troubleshootingForm!: FormGroup;
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.troubleshootingForm = this.fb.group({

      employee: this.fb.group({
        name: [{ value: '', disabled: true }, Validators.required],
        department: [{ value: '', disabled: true }, Validators.required],
        jobTitle: [{ value: '', disabled: true }, Validators.required],
        employeeId: ['', Validators.required]
      }),

      device: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        operatingSystem: ['', Validators.required]
      }),

      issue: this.fb.group({
        dateReported: ['', Validators.required],
        reportedBy: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        troubleshootingAttempted: [false],
        attemptedDetails: ['']
      })

    });

    this.loadEmployeeInformation();
  }

  /*
   * RETRIEVE SIGNED-IN EMPLOYEE INFORMATION
   * Using the existing Microsoft Entra service.
   */
  private loadEmployeeInformation(): void {
    this.entraService.getMyProfile().subscribe({
      next: (response: any) => {
        const profile = response.profile ?? response;

        this.troubleshootingForm.get('employee')?.patchValue({
          name: profile.name || '',
          department: profile.department || '',
          jobTitle: profile.jobTitle || ''
        });
      },

      error: (error) => {
        console.error(
          'Unable to load employee information:',
          error
        );

        alert('Unable to retrieve your Microsoft employee information.');
      }
    });
  }

  /*
   * SUBMIT TROUBLESHOOTING FORM
   */
  public onSubmit(): void {
    if (this.troubleshootingForm.valid) {

      const payload: DeviceTroubleshootingPayload = {
        company: 'OGCM',
        currentDate: this.currentDate,
        ...this.troubleshootingForm.getRawValue()
      };

      console.log('Form Submission Payload:', payload);

      this.http.post(
        `${environment.apiBaseUrl}/api/v1/troubleshoot/`,
        payload,
        {
          withCredentials: true
        }
      ).subscribe({
        next: (response: any) => {
          alert(
            response.message ||
            'Device Troubleshooting form submitted successfully!'
          );

          this.router.navigate(['/']);
        },

        error: (error) => {
          console.error(
            'Device troubleshooting submission failed:',
            error
          );

          alert(
            error?.error?.message ||
            'Unable to submit the troubleshooting request.'
          );
        }
      });

    } else {
      this.troubleshootingForm.markAllAsTouched();

      alert('Please fill out all required fields.');
    }
  }

  /*
   * FIELD VALIDATION
   */
  public isFieldInvalid(groupName: string, fieldName: string) {
    const field = this.troubleshootingForm.get(`${groupName}.${fieldName}`);

    return field
      ? field.invalid && (field.dirty || field.touched)
      : false;
  }

}
