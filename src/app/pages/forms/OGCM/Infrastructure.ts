import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface OGCMInfrastructurePayload {
  currentDate: Date;
  documentNo: string;
  dateReceived: string;

  procurement: {
    assetTag?: string;
    poNumber: string;
    invoiceNumber: string;
    vendorSupplier: string;
    deliveryNoteNumber: string;
    procuredBy: string;
    fundingSource?: string;
  };

  infrastructure: {
    category: string;
    brandModel: string;
    serialNumber: string;
    quantity: number;
    specifications?: string;
  };

  inspection: {
    physicalCondition: string;
    accessoriesIncluded: boolean;
    passedInspection: boolean;
    inspectedBy: string;
    inspectionDate: string;
    notes?: string;
  };
}

@Component({
  selector: 'app-ogcm-infrastructure-receipt',
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7" />
            </svg>
            Back to Portal Landing
          </a>
          <span class="text-xs text-slate-400 font-mono">Form Ref: OGCM-INFRA-2026</span>
        </header>

        <!-- FORM CARD -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

          <!-- FORM BANNER -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3">
                  Infrastructure & Systems Asset Intake
                </div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  IT Infrastructure Receipt & Registration
                </h1>
                <p class="text-blue-100 text-sm mt-2 leading-relaxed">
                  Record and register new IT infrastructure, networking equipment, servers, and office hardware.
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
          <form [formGroup]="receiptForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-10 text-slate-900">

            <!-- DOCUMENT METADATA STRIP -->
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Document No. *</label>
                <input type="text" formControlName="documentNo" placeholder="OGCM-REG-2026-001"
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all font-mono"
                  [class.border-red-500]="isFieldInvalid('documentNo')" />
                <span *ngIf="isFieldInvalid('documentNo')" class="text-xs text-red-500 mt-1 block">Document number is required.</span>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Date Received *</label>
                <input type="date" formControlName="dateReceived"
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all font-mono"
                  [class.border-red-500]="isFieldInvalid('dateReceived')" />
                <span *ngIf="isFieldInvalid('dateReceived')" class="text-xs text-red-500 mt-1 block">Date received is required.</span>
              </div>
            </div>

            <!-- SECTION 1: PROCUREMENT INFORMATION -->
            <section formGroupName="procurement" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Procurement Information</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Provide purchase details, vendor data, and reference numbers.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Asset Tag <span class="text-slate-400 normal-case">(Optional)</span></label>
                  <input type="text" formControlName="assetTag" placeholder="OGCM-AST-8849"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all" />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">PO Number *</label>
                  <input type="text" formControlName="poNumber" placeholder="PO-2026-9041"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('procurement', 'poNumber')" />
                  <span *ngIf="isGroupFieldInvalid('procurement', 'poNumber')" class="text-xs text-red-500 mt-1 block">PO Number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Invoice Number *</label>
                  <input type="text" formControlName="invoiceNumber" placeholder="INV-773012"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('procurement', 'invoiceNumber')" />
                  <span *ngIf="isGroupFieldInvalid('procurement', 'invoiceNumber')" class="text-xs text-red-500 mt-1 block">Invoice number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Vendor / Supplier *</label>
                  <input type="text" formControlName="vendorSupplier" placeholder="Dell Direct / Cisco Partner"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('procurement', 'vendorSupplier')" />
                  <span *ngIf="isGroupFieldInvalid('procurement', 'vendorSupplier')" class="text-xs text-red-500 mt-1 block">Vendor required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Delivery Note Number *</label>
                  <input type="text" formControlName="deliveryNoteNumber" placeholder="DN-44019"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('procurement', 'deliveryNoteNumber')" />
                  <span *ngIf="isGroupFieldInvalid('procurement', 'deliveryNoteNumber')" class="text-xs text-red-500 mt-1 block">Delivery Note required.</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Procured By *</label>
                  <input type="text" formControlName="procuredBy" placeholder="IT Procurement Officer"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('procurement', 'procuredBy')" />
                  <span *ngIf="isGroupFieldInvalid('procurement', 'procuredBy')" class="text-xs text-red-500 mt-1 block">Procured By required.</span>
                </div>

                <div class="sm:col-span-2 lg:col-span-3">
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Funding Source <span class="text-slate-400 normal-case">(Optional)</span></label>
                  <input type="text" formControlName="fundingSource" placeholder="OPEX / CAPEX Infrastructure Budget 2026"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all" />
                </div>
              </div>
            </section>

            <!-- SECTION 2: INFRASTRUCTURE & ASSET DETAILS -->
            <section formGroupName="infrastructure" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Infrastructure & Asset Details</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Categorize the hardware and detail model and serial identifiers.</p>
                </div>
              </div>

              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Asset Category *</label>
                  <select formControlName="category"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="isGroupFieldInvalid('infrastructure', 'category')">
                    <option value="">Select Category</option>
                    @for (cat of assetCategories; track cat) {
                      <option [value]="cat">{{ cat }}</option>
                    }
                  </select>
                  <span *ngIf="isGroupFieldInvalid('infrastructure', 'category')" class="text-xs text-red-500 mt-1 block">Please select an asset category.</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Brand & Model *</label>
                    <input type="text" formControlName="brandModel" placeholder="Fortinet FortiGate 60F"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                      [class.border-red-500]="isGroupFieldInvalid('infrastructure', 'brandModel')" />
                    <span *ngIf="isGroupFieldInvalid('infrastructure', 'brandModel')" class="text-xs text-red-500 mt-1 block">Brand/Model required.</span>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Serial Number *</label>
                    <input type="text" formControlName="serialNumber" placeholder="FG-60FTK2100489"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                      [class.border-red-500]="isGroupFieldInvalid('infrastructure', 'serialNumber')" />
                    <span *ngIf="isGroupFieldInvalid('infrastructure', 'serialNumber')" class="text-xs text-red-500 mt-1 block">Serial number required.</span>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Quantity Received *</label>
                    <input type="number" formControlName="quantity" min="1"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Technical Specifications / Notes</label>
                  <textarea formControlName="specifications" rows="3" placeholder="CPU, RAM, Storage, Port Configuration, Firmware Version..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"></textarea>
                </div>
              </div>
            </section>

            <!-- SECTION 3: INSPECTION & QUALITY CHECK -->
            <section formGroupName="inspection" class="space-y-5">
              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-800">Inspection & Quality Check</h2>
                  <p class="text-xs text-slate-500 mt-0.5">Verify physical package integrity and assign receiving technician.</p>
                </div>
              </div>

              <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Physical Condition *</label>
                    <select formControlName="physicalCondition"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                      <option value="New / Intact">New / Intact (Sealed Packaging)</option>
                      <option value="Good Condition">Good Condition (Opened for Testing)</option>
                      <option value="Damaged Box">Damaged Outer Box (Hardware Intact)</option>
                      <option value="Defective">Defective / Damaged on Arrival</option>
                    </select>
                  </div>

                  <div class="flex items-center gap-6 sm:pt-6">
                    <div class="flex items-center gap-2">
                      <input type="checkbox" id="accessoriesIncluded" formControlName="accessoriesIncluded"
                        class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                      <label for="accessoriesIncluded" class="text-sm font-medium text-slate-800">
                        Accessories Included
                      </label>
                    </div>

                    <div class="flex items-center gap-2">
                      <input type="checkbox" id="passedInspection" formControlName="passedInspection"
                        class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                      <label for="passedInspection" class="text-sm font-medium text-slate-800">
                        Passed Quality Check
                      </label>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-blue-100">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Inspected By (Tech) *</label>
                    <input type="text" formControlName="inspectedBy" placeholder="Receiving Tech Name"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                      [class.border-red-500]="isGroupFieldInvalid('inspection', 'inspectedBy')" />
                    <span *ngIf="isGroupFieldInvalid('inspection', 'inspectedBy')" class="text-xs text-red-500 mt-1 block">Inspected By name required.</span>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Inspection Date *</label>
                    <input type="date" formControlName="inspectionDate"
                      class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all font-mono" />
                  </div>
                </div>
              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">
              <button type="submit" class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all">
                Register Infrastructure Asset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OgcmInfrastructureReceiptFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  receiptForm!: FormGroup;
  currentDate: Date = new Date();

  readonly assetCategories: string[] = [
    'Server',
    'Desktop Computer',
    'Laptop',
    'Monitor',
    'Printer',
    'Network Switch',
    'Router',
    'Firewall',
    'Wireless Access Point',
    'UPS',
    'NAS/SAN Storage',
    'CCTV Equipment',
    'Biometric'
  ];

  ngOnInit(): void {
    const todayStr = new Date().toISOString().substring(0, 10);

    this.receiptForm = this.fb.group({
      documentNo: ['', Validators.required],
      dateReceived: [todayStr, Validators.required],

      procurement: this.fb.group({
        assetTag: [''],
        poNumber: ['', Validators.required],
        invoiceNumber: ['', Validators.required],
        vendorSupplier: ['', Validators.required],
        deliveryNoteNumber: ['', Validators.required],
        procuredBy: ['', Validators.required],
        fundingSource: ['']
      }),

      infrastructure: this.fb.group({
        category: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        specifications: ['']
      }),

      inspection: this.fb.group({
        physicalCondition: ['New / Intact', Validators.required],
        accessoriesIncluded: [true],
        passedInspection: [true, Validators.requiredTrue],
        inspectedBy: ['', Validators.required],
        inspectionDate: [todayStr, Validators.required],
        notes: ['']
      })
    });
  }

  public onSubmit(): void {
    if (this.receiptForm.valid) {
      const payload: OGCMInfrastructurePayload = {
        currentDate: this.currentDate,
        ...this.receiptForm.value
      };

      console.log('Infrastructure Receipt Payload:', payload);

      this.http.post(
        'http://127.0.0.1:8000/api/v1/ogcm/infrastructure/',
        payload
      ).subscribe({
        next: (response) => {
          console.log('Infrastructure Receipt Created:', response);

          alert('Infrastructure asset registered and logged successfully!');

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Infrastructure Receipt Error:', error);

          alert(
            error?.error?.detail ||
            error?.error?.message ||
            'Failed to register infrastructure asset. Please try again.'
          );
        }
      });

    } else {
      this.receiptForm.markAllAsTouched();
      alert('Please fill out all required fields.');
    }
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.receiptForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  public isGroupFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.receiptForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}