import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface ReplacementFormPayload {
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
    operatingSystem: string;
    condition: string;
  };

  replacementDetails: {
    requestReason: string;
    justification: string;
    dateRequested: string;
    urgencyLevel: string;
  };

  consent: {
    agreed: boolean;
  };

  signatures: {
    employee: string;
    employeeDate: string;
    managerName?: string;
    managerSignature?: string;
    managerDate?: string;
    itApprovalName?: string;
    itApprovalSignature?: string;
    itApprovalDate?: string;
  };
}

@Component({
  selector: 'app-ogfs-replacement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <!-- PAGE CONTAINER -->
    <div class="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-6xl mx-auto">

        <!-- NAVIGATION HEADER -->
        <header class="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
          <a
            routerLink="/"
            class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portal Landing
          </a>
          <span class="text-xs text-slate-400 font-mono">Form Ref: OGFS-REP-2026</span>
        </header>

        <!-- FORM CARD -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

          <!-- FORM BANNER -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3">
                  Hardware Life Cycle
                </div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Device Replacement Request Form
                </h1>
                <p class="text-blue-100 text-sm mt-2 leading-relaxed">
                  Submit hardware replacement requests for obsolete, damaged, or end-of-life enterprise assets.
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
          <form [formGroup]="replacementForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-10 text-slate-900">

            <!-- SECTION 1: EMPLOYEE DETAILS -->
            <section formGroupName="employee" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Employee Information</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Provide details of the employee requesting the device replacement.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input type="text" formControlName="name" placeholder="John Doe"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block">Name is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="EMP-10492"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">Employee ID is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Department *</label>
                  <input type="text" formControlName="department" placeholder="Finance / Systems Engineering"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block">Department is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Job Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="IT Specialist"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block">Job Title is required.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 2: CURRENT DEVICE INFORMATION -->
            <section formGroupName="currentDevice" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Current Device Information</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Details of the current hardware item slated for replacement.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Device Type *</label>
                  <select formControlName="deviceType"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop / Workstation</option>
                    <option value="Mobile">Mobile / Tablet</option>
                    <option value="Peripheral">Peripheral / Other</option>
                  </select>
                  <span *ngIf="isFieldInvalid('currentDevice', 'deviceType')" class="text-xs text-red-500 mt-1 block">Select a device type.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5440"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'brandModel')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'brandModel')" class="text-xs text-red-500 mt-1 block">Brand/Model required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-982312A"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'serialNumber')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'serialNumber')" class="text-xs text-red-500 mt-1 block">Serial Number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Asset Tag <span class="text-slate-400 normal-case">(Optional)</span></label>
                  <input type="text" formControlName="assetTag" placeholder="LAP-2026-0042"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Operating System *</label>
                  <input type="text" formControlName="operatingSystem" placeholder="Windows 11 Pro / macOS / Linux"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'operatingSystem')" />
                  <span *ngIf="isFieldInvalid('currentDevice', 'operatingSystem')" class="text-xs text-red-500 mt-1 block">Operating System is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Physical Condition *</label>
                  <select formControlName="condition"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('currentDevice', 'condition')">
                    <option value="">Select Condition</option>
                    <option value="Damaged">Physically Damaged</option>
                    <option value="Obsolete">Obsolete / End-of-Life</option>
                    <option value="Malfunctioning">Unrepairable Hardware Fault</option>
                    <option value="LostStolen">Lost / Stolen</option>
                  </select>
                  <span *ngIf="isFieldInvalid('currentDevice', 'condition')" class="text-xs text-red-500 mt-1 block">Select condition status.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 3: REPLACEMENT REASON & DETAILS -->
            <section formGroupName="replacementDetails" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Replacement Justification</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Provide operational justification and urgency level for replacement.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Date Requested *</label>
                  <input type="date" formControlName="dateRequested"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'dateRequested')" />
                  <span *ngIf="isFieldInvalid('replacementDetails', 'dateRequested')" class="text-xs text-red-500 mt-1 block">Date requested is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Urgency Level *</label>
                  <select formControlName="urgencyLevel"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'urgencyLevel')">
                    <option value="">Select Urgency</option>
                    <option value="Standard">Standard (5-7 business days)</option>
                    <option value="High">High (2-3 business days)</option>
                    <option value="Critical">Critical (Work-stopping emergency)</option>
                  </select>
                  <span *ngIf="isFieldInvalid('replacementDetails', 'urgencyLevel')" class="text-xs text-red-500 mt-1 block">Select urgency level.</span>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Reason for Replacement *</label>
                  <input type="text" formControlName="requestReason" placeholder="Hardware failure, standard refresh cycle, physical damage..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'requestReason')" />
                  <span *ngIf="isFieldInvalid('replacementDetails', 'requestReason')" class="text-xs text-red-500 mt-1 block">Reason is required.</span>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Detailed Business Justification *</label>
                  <textarea formControlName="justification" rows="4" placeholder="Explain how the current hardware limits productivity or why repair is unviable..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDetails', 'justification')"></textarea>
                  <span *ngIf="isFieldInvalid('replacementDetails', 'justification')" class="text-xs text-red-500 mt-1 block">Justification is required.</span>
                </div>
              </div>
            </section>

            <!-- SECTION 4: CONSENT & SIGNATURES -->
            <section class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Consent & Authorization</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Acknowledge IT hardware policy and sign off on asset return requirements.</p>
                </div>
              </div>

              <div formGroupName="consent" class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div class="flex items-start gap-3">
                  <input type="checkbox" id="consentAgreed" formControlName="agreed"
                    class="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <label for="consentAgreed" class="text-xs text-slate-700 leading-relaxed">
                    I confirm that the current hardware will be surrendered to IT Support upon receipt of the replacement asset.
                  </label>
                </div>
              </div>

              <div formGroupName="signatures" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Digital Signature *</label>
                  <input type="text" formControlName="employee" placeholder="Type full name to sign"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Signature Date *</label>
                  <input type="date" formControlName="employeeDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">
              <button type="submit" class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all">
                Submit Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OGFSReplacement implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  replacementForm!: FormGroup;
  currentDate: Date = new Date();

  ngOnInit(): void {
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
        operatingSystem: ['', Validators.required],
        condition: ['', Validators.required]
      }),
      replacementDetails: this.fb.group({
        requestReason: ['', Validators.required],
        justification: ['', Validators.required],
        dateRequested: [new Date().toISOString().substring(0, 10), Validators.required],
        urgencyLevel: ['', Validators.required]
      }),
      consent: this.fb.group({
        agreed: [false, Validators.requiredTrue]
      }),
      signatures: this.fb.group({
        employee: ['', Validators.required],
        employeeDate: [new Date().toISOString().substring(0, 10), Validators.required]
      })
    });
  }

  public onSubmit(): void {
    if (this.replacementForm.valid) {
      const payload: ReplacementFormPayload = {
        currentDate: this.currentDate,
        ...this.replacementForm.value
      };
      console.log('Form Submission Payload:', payload);
      alert('Device Replacement form submitted successfully!');
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