import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface LaptopAcquisitionConsentPayload {
  currentDate: Date;

  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };

  acknowledgment: {
    employeeSignature: string;
    date: string;
    authorizedRepresentativeSignature: string;
    representativeName: string;
    representativeTitle: string;
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
                  Hardware Acquisition
                </div>

                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Laptop Acquisition Consent Form
                </h1>

                <p class="text-blue-100 text-sm mt-2 leading-relaxed">
                  Employee consent and acknowledgment for the acquisition and use of a company-provided laptop.
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
                    Provide the details of the employee receiving the company laptop.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Full Name *
                  </label>

                  <input type="text" formControlName="name" placeholder="John Doe"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />

                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block">
                    Name is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Employee ID *
                  </label>

                  <input type="text" formControlName="employeeId" placeholder="EMP-10492"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />

                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">
                    Employee ID is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Department *
                  </label>

                  <input type="text" formControlName="department" placeholder="Finance / IT / Operations"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />

                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block">
                    Department is required.
                  </span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Job Title *
                  </label>

                  <input type="text" formControlName="jobTitle" placeholder="IT Specialist"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />

                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block">
                    Job Title is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SECTION 2: CONSENT AND ACKNOWLEDGMENT -->
            <section class="space-y-5">

              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Consent & Acknowledgment
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Confirm receipt, responsibility, and acceptable use of the company laptop.
                  </p>
                </div>
              </div>

              <div class="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">

                <p class="text-sm text-slate-700 leading-relaxed mb-4">
                  I acknowledge that the laptop issued to me is the property of the company
                  and is provided for authorized business purposes. I agree to take reasonable
                  care of the equipment and comply with the company's IT, information security,
                  acceptable use, and asset management policies.
                </p>

                <div class="space-y-3 text-xs text-slate-700 leading-relaxed">

                  <div class="flex items-start gap-3">
                    <span class="font-bold text-blue-600">1.</span>
                    <p>
                      I will use the laptop primarily for authorized company business and will
                      follow all applicable company IT and security policies.
                    </p>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="font-bold text-blue-600">2.</span>
                    <p>
                      I will take reasonable precautions to prevent loss, theft, damage,
                      unauthorized access, or misuse of the laptop.
                    </p>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="font-bold text-blue-600">3.</span>
                    <p>
                      I will promptly report any loss, theft, damage, malfunction, or security
                      incident involving the laptop to the IT Team.
                    </p>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="font-bold text-blue-600">4.</span>
                    <p>
                      I understand that the laptop remains company property and may be recalled,
                      inspected, repaired, replaced, or reassigned when required.
                    </p>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="font-bold text-blue-600">5.</span>
                    <p>
                      I agree to return the laptop and all issued accessories when requested,
                      upon replacement, transfer, or separation from the company.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            <!-- SECTION 3: EMPLOYEE ACKNOWLEDGMENT -->
            <section formGroupName="acknowledgment" class="space-y-5">

              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    Employee Acknowledgment
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Sign to confirm acceptance of the laptop and the stated responsibilities.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <!-- EMPLOYEE SIGNATURE -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Employee Signature *
                  </label>

                  <div class="border border-slate-200 rounded-xl bg-white overflow-hidden"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'employeeSignature')">

                    <canvas
                      #employeeSignatureCanvas
                      width="700"
                      height="180"
                      class="w-full h-40 touch-none cursor-crosshair block"
                      (pointerdown)="startDrawing($event, 'employee')"
                      (pointermove)="draw($event, 'employee')"
                      (pointerup)="stopDrawing('employee')"
                      (pointerleave)="stopDrawing('employee')"
                      (pointercancel)="stopDrawing('employee')"
                    ></canvas>

                    <div class="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-slate-50">
                      <span class="text-xs text-slate-400">
                        Draw your signature above
                      </span>

                      <button
                        type="button"
                        (click)="clearSignature('employee')"
                        class="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear Signature
                      </button>
                    </div>
                  </div>

                  <span
                    *ngIf="isFieldInvalid('acknowledgment', 'employeeSignature')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Employee signature is required.
                  </span>
                </div>

                <!-- SIGNATURE DATE -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Date *
                  </label>

                  <input
                    type="date"
                    formControlName="date"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'date')"
                  />

                  <span
                    *ngIf="isFieldInvalid('acknowledgment', 'date')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Date is required.
                  </span>
                </div>

                <!-- REPRESENTATIVE NAME -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Authorized Representative Name *
                  </label>

                  <input
                    type="text"
                    formControlName="representativeName"
                    placeholder="Representative full name"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'representativeName')"
                  />

                  <span
                    *ngIf="isFieldInvalid('acknowledgment', 'representativeName')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Representative name is required.
                  </span>
                </div>

                <!-- REPRESENTATIVE TITLE -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Representative Title *
                  </label>

                  <input
                    type="text"
                    formControlName="representativeTitle"
                    placeholder="IT Manager / Authorized Representative"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'representativeTitle')"
                  />

                  <span
                    *ngIf="isFieldInvalid('acknowledgment', 'representativeTitle')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Representative title is required.
                  </span>
                </div>

                <!-- AUTHORIZED REPRESENTATIVE SIGNATURE -->
                <div>
                  <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Authorized Representative Signature *
                  </label>

                  <div class="border border-slate-200 rounded-xl bg-white overflow-hidden"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'authorizedRepresentativeSignature')">

                    <canvas
                      #representativeSignatureCanvas
                      width="700"
                      height="180"
                      class="w-full h-40 touch-none cursor-crosshair block"
                      (pointerdown)="startDrawing($event, 'representative')"
                      (pointermove)="draw($event, 'representative')"
                      (pointerup)="stopDrawing('representative')"
                      (pointerleave)="stopDrawing('representative')"
                      (pointercancel)="stopDrawing('representative')"
                    ></canvas>

                    <div class="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-slate-50">
                      <span class="text-xs text-slate-400">
                        Draw your signature above
                      </span>

                      <button
                        type="button"
                        (click)="clearSignature('representative')"
                        class="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear Signature
                      </button>
                    </div>
                  </div>

                  <span
                    *ngIf="isFieldInvalid('acknowledgment', 'authorizedRepresentativeSignature')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Representative signature is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SECTION 4: OFFICIAL USE -->
            <section formGroupName="officialUse" class="space-y-5">

              <div class="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  4
                </div>

                <div>
                  <h2 class="text-lg font-bold text-slate-800">
                    For Official Use Only
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Record the laptop and accessories issued to the employee.
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

                  <span
                    *ngIf="isFieldInvalid('officialUse', 'laptopDetails')"
                    class="text-xs text-red-500 mt-1 block"
                  >
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

                  <span
                    *ngIf="isFieldInvalid('officialUse', 'brandModel')"
                    class="text-xs text-red-500 mt-1 block"
                  >
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
                    placeholder="SN-982312A"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('officialUse', 'serialNumber')"
                  />

                  <span
                    *ngIf="isFieldInvalid('officialUse', 'serialNumber')"
                    class="text-xs text-red-500 mt-1 block"
                  >
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

                  <span
                    *ngIf="isFieldInvalid('officialUse', 'accessoriesProvided')"
                    class="text-xs text-red-500 mt-1 block"
                  >
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

                  <span
                    *ngIf="isFieldInvalid('officialUse', 'dateIssued')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Date issued is required.
                  </span>
                </div>

              </div>
            </section>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6 border-t border-slate-200 flex justify-end">

              <button
                type="submit"
                class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all"
              >
                Submit Laptop Request Form For OST 
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OSTLaptopAcquisitionConsentComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @ViewChild('employeeSignatureCanvas') employeeSignatureCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('representativeSignatureCanvas') representativeSignatureCanvas!: ElementRef<HTMLCanvasElement>;

  consentForm!: FormGroup;
  currentDate: Date = new Date();

  private isDrawingEmployee = false;
  private isDrawingRepresentative = false;

  ngOnInit(): void {
    this.consentForm = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employeeId: ['', Validators.required]
      }),

      acknowledgment: this.fb.group({
        employeeSignature: ['', Validators.required],
        date: [new Date().toISOString().substring(0, 10), Validators.required],
        authorizedRepresentativeSignature: ['', Validators.required],
        representativeName: ['', Validators.required],
        representativeTitle: ['', Validators.required]
      }),

      officialUse: this.fb.group({
        laptopDetails: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        accessoriesProvided: ['', Validators.required],
        dateIssued: [new Date().toISOString().substring(0, 10), Validators.required]
      })
    });
  }

  ngAfterViewInit(): void {
    this.setupCanvas(this.employeeSignatureCanvas.nativeElement);
    this.setupCanvas(this.representativeSignatureCanvas.nativeElement);
  }

  private setupCanvas(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#0f172a';
  }

  public startDrawing(event: PointerEvent, type: 'employee' | 'representative'): void {
    const canvas = type === 'employee'
      ? this.employeeSignatureCanvas.nativeElement
      : this.representativeSignatureCanvas.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    if (type === 'employee') {
      this.isDrawingEmployee = true;
    } else {
      this.isDrawingRepresentative = true;
    }

    canvas.setPointerCapture(event.pointerId);

    const position = this.getCanvasPosition(event, canvas);

    context.beginPath();
    context.moveTo(position.x, position.y);
  }

  public draw(event: PointerEvent, type: 'employee' | 'representative'): void {
    const isDrawing = type === 'employee'
      ? this.isDrawingEmployee
      : this.isDrawingRepresentative;

    if (!isDrawing) {
      return;
    }

    const canvas = type === 'employee'
      ? this.employeeSignatureCanvas.nativeElement
      : this.representativeSignatureCanvas.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const position = this.getCanvasPosition(event, canvas);

    context.lineTo(position.x, position.y);
    context.stroke();

    this.updateSignatureValue(type);
  }

  public stopDrawing(type: 'employee' | 'representative'): void {
    if (type === 'employee') {
      this.isDrawingEmployee = false;
    } else {
      this.isDrawingRepresentative = false;
    }

    this.updateSignatureValue(type);
  }

  private getCanvasPosition(event: PointerEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  private updateSignatureValue(type: 'employee' | 'representative'): void {
    const canvas = type === 'employee'
      ? this.employeeSignatureCanvas.nativeElement
      : this.representativeSignatureCanvas.nativeElement;

    const signature = canvas.toDataURL('image/png');

    if (type === 'employee') {
      this.consentForm.get('acknowledgment.employeeSignature')?.setValue(signature);
      this.consentForm.get('acknowledgment.employeeSignature')?.markAsTouched();
      this.consentForm.get('acknowledgment.employeeSignature')?.updateValueAndValidity();
    } else {
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.setValue(signature);
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.markAsTouched();
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.updateValueAndValidity();
    }
  }

  public clearSignature(type: 'employee' | 'representative'): void {
    const canvas = type === 'employee'
      ? this.employeeSignatureCanvas.nativeElement
      : this.representativeSignatureCanvas.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (type === 'employee') {
      this.consentForm.get('acknowledgment.employeeSignature')?.setValue('');
      this.consentForm.get('acknowledgment.employeeSignature')?.markAsTouched();
      this.consentForm.get('acknowledgment.employeeSignature')?.updateValueAndValidity();
    } else {
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.setValue('');
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.markAsTouched();
      this.consentForm.get('acknowledgment.authorizedRepresentativeSignature')?.updateValueAndValidity();
    }
  }

  public onSubmit(): void {
    if (this.consentForm.valid) {
      const payload: LaptopAcquisitionConsentPayload = {
        currentDate: this.currentDate,
        ...this.consentForm.value
      };

      console.log('Laptop Acquisition Consent Payload:', payload);
      alert('Laptop Acquisition Consent form submitted successfully!');
      this.router.navigate(['/']);
    } else {
      this.consentForm.markAllAsTouched();
      alert('Please fill out all required fields.');
    }
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.consentForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}
