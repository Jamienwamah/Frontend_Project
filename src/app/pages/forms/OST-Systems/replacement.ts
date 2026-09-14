import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface OSTDeviceReplacementPayload {
  currentDate: Date;

  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };

  currentDevice: {
    assetTag?: string;
    deviceType: string;
    brandModel: string;
    serialNumber: string;
    reasonForReplacement: string;
  };

  replacementDetails: {
    requestedDeviceType: string;
    urgencyLevel: string;
    justification: string;
    requiredDate: string;
  };

  authorization: {
    agreed: boolean;
  };

  signatures: {
    employee: string;
    employeeDate: string;
    managerName?: string;
    managerDate?: string;
  };
}

@Component({
  selector: 'app-ost-replacement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [DatePipe],
  template: `
    <!-- PAGE CONTAINER -->
    <div class="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-6xl mx-auto">

        <!-- NAVIGATION HEADER -->
        <header class="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
          <a
            routerLink="/"
            class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors font-sans"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portal Landing
          </a>
          <span class="text-xs text-slate-400 font-mono">Form Ref: OST-REP-2026</span>
        </header>

        <!-- FORM CARD -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden font-sans">

          <!-- FORM BANNER (OGCM BLUE) -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3 font-sans">
                  Hardware & Asset Allocation
                </div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
                  OST Device Replacement Form
                </h1>
                <p class="text-blue-100/90 text-sm mt-2 leading-relaxed font-sans">
                  Request a replacement or upgrade for end-of-life, damaged, or decommissioned hardware.
                </p>
              </div>

              <div class="text-left sm:text-right text-xs text-blue-100 font-sans">
                <p>
                  Date:
                  <span class="font-semibold text-white font-sans">
                    {{ currentDate | date:'mediumDate' }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- FORM BODY -->
          <form [formGroup]="replacementForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-10 text-slate-900 font-sans">

            <!-- SECTION 1: EMPLOYEE DETAILS -->
            <section formGroupName="employee" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans">
                  1
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800 font-sans">Employee Information</h2>
                  <p class="text-xs text-slate-500 mt-0.5 font-sans">Provide details of the employee requesting the hardware replacement.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Full Name *</label>
                  <input type="text" formControlName="name" placeholder="John Doe"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block font-sans">Name is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="EMP-10492"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block font-sans">Employee ID is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Department *</label>
                  <input type="text" formControlName="department" placeholder="Finance / Systems Engineering"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block font-sans">Department is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Job Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="IT Specialist"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block font-sans">Job Title is required.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 2: CURRENT DEVICE INFORMATION -->
            <section formGroupName="currentDevice" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans">
                  2
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800 font-sans">Current Device Information</h2>
                  <p class="text-xs text-slate-500 mt-0.5 font-sans">Specify details regarding the asset to be turned in or replaced.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Device Type *</label>
                  <select formControlName="deviceType"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop / Workstation</option>
                    <option value="Mobile">Mobile / Tablet</option>
                    <option value="Peripheral">Peripheral / Other</option>
                  </select>
                  <span *ngIf="isFieldInvalid('currentDevice', 'deviceType')" class="text-xs text-red-500 mt-1 block font-sans">Select a device type.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5440"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'brandModel')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'brandModel')" class="text-xs text-red-500 mt-1 block font-sans">Brand/Model required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-982312A"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'serialNumber')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'serialNumber')" class="text-xs text-red-500 mt-1 block font-sans">Serial Number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Asset Tag <span class="text-slate-400 normal-case">(Optional)</span></label>
                  <input type="text" formControlName="assetTag" placeholder="LAP-2026-0042"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Reason for Replacement *</label>
                  <input type="text" formControlName="reasonForReplacement" placeholder="Hardware failure / End of Life / Upgrading performance"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'reasonForReplacement')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'reasonForReplacement')" class="text-xs text-red-500 mt-1 block font-sans">Reason is required.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 3: REPLACEMENT REQUIREMENTS -->
            <section formGroupName="replacementDetails" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans">
                  3
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800 font-sans">Replacement Requirements</h2>
                  <p class="text-xs text-slate-500 mt-0.5 font-sans">Outline the requested specifications and timeline priority.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Requested Device Type *</label>
                  <select formControlName="requestedDeviceType"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'requestedDeviceType')">
                    <option value="">Select Requested Asset</option>
                    <option value="Standard Laptop">Standard Corporate Laptop</option>
                    <option value="High Performance Laptop">Engineering / High-Performance Laptop</option>
                    <option value="Desktop Workstation">Desktop Workstation</option>
                    <option value="Mobile Device">Mobile Device / Tablet</option>
                  </select>
                  <span *ngIf="isFieldInvalid('replacementDetails', 'requestedDeviceType')" class="text-xs text-red-500 mt-1 block font-sans">Requested device type is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Urgency Level *</label>
                  <select formControlName="urgencyLevel"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'urgencyLevel')">
                    <option value="">Select Priority</option>
                    <option value="Low">Low (Next Refresh Cycle)</option>
                    <option value="Medium">Medium (Within 2 Weeks)</option>
                    <option value="High">High (Immediate Work Blocker)</option>
                  </select>
                  <span *ngIf="isFieldInvalid('replacementDetails', 'urgencyLevel')" class="text-xs text-red-500 mt-1 block font-sans">Urgency level is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Date Required By *</label>
                  <input type="text" formControlName="requiredDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'requiredDate')" />
                  <span *ngIf="isFieldInvalid('replacementDetails', 'requiredDate')" class="text-xs text-red-500 mt-1 block font-sans">Required date is required.</span>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Business Justification *</label>
                  <textarea formControlName="justification" rows="4" placeholder="Explain how this replacement impacts daily business operations or resolves current technical limitations..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'justification')"></textarea>
                  <span *ngIf="isFieldInvalid('replacementDetails', 'justification')" class="text-xs text-red-500 mt-1 block font-sans">Justification is required.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 4: AUTHORIZATION & SIGNATURES -->
            <section class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans">
                  4
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800 font-sans">Authorization & Signatures</h2>
                  <p class="text-xs text-slate-500 mt-0.5 font-sans">Acknowledge corporate equipment policy and sign the request.</p>
                </div>
              </div>

              <div formGroupName="authorization" class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="authorizationAgreed" formControlName="agreed"
                    class="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <label for="authorizationAgreed" class="text-xs font-sans text-slate-700 leading-relaxed">
                    I confirm that the current hardware is being returned in accordance with OST IT Asset Management policies and that all personal data has been backed up.
                  </label>
                </div>
              </div>

              <div formGroupName="signatures" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Employee Digital Signature *</label>
                  <input type="text" formControlName="employee" placeholder="Type full name to sign"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 font-sans">Signature Date *</label>
                  <input type="text" formControlName="employeeDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-sans text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">
              <button type="submit" class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium font-sans rounded-xl shadow-md transition-all">
                Submit OST Replacement Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OstReplacement implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private datePipe = inject(DatePipe);

  replacementForm!: FormGroup;
  currentDate: Date = new Date();

  ngOnInit(): void {
    const formattedDate = this.datePipe.transform(this.currentDate, 'mediumDate') || '';

    this.replacementForm = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employeeId: ['', Validators.required]
      }),
      currentDevice: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        reasonForReplacement: ['', Validators.required]
      }),
      replacementDetails: this.fb.group({
        requestedDeviceType: ['', Validators.required],
        urgencyLevel: ['', Validators.required],
        justification: ['', Validators.required],
        requiredDate: [formattedDate, Validators.required]
      }),
      authorization: this.fb.group({
        agreed: [false, Validators.requiredTrue]
      }),
      signatures: this.fb.group({
        employee: ['', Validators.required],
        employeeDate: [formattedDate, Validators.required]
      })
    });
  }

  public onSubmit(): void {
    if (this.replacementForm.valid) {
      const payload: OSTDeviceReplacementPayload = {
        currentDate: this.currentDate,
        ...this.replacementForm.value
      };
      console.log('Form Submission Payload:', payload);
      alert('OST Replacement Form submitted successfully!');
      this.router.navigate(['/']);
    } else {
      this.replacementForm.markAllAsTouched();
      alert('Please fill out all required fields.');
    }
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.replacementForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}