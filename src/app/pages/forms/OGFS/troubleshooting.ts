import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { EntraService } from '../../../core/services/entra.service';


export interface OgfsDeviceTroubleshootingPayload {
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

  consent: {
    agreed: boolean;
  };

  signatures: {
    employee: string;
    employeeDate: string;
  };

  officialUse?: Record<string, any>;
}


@Component({
  selector: 'app-ogfs-device-troubleshooting',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  template: `

    <!-- PAGE CONTAINER -->
    <div
      class="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans"
    >

      <div class="max-w-6xl mx-auto">

        <!-- NAVIGATION HEADER -->
        <header
          class="flex items-center justify-between mb-12 pb-6 border-b border-slate-200"
        >

          <a
            routerLink="/"
            class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >

            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

            Back to Portal Landing

          </a>


          <span class="text-xs text-slate-400 font-mono">
            Form Ref: OGFS-IT-TS-2026
          </span>

        </header>


        <!-- FORM CARD -->
        <div
          class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden"
        >

          <!-- FORM BANNER -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">

            <div
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >

              <div>

                <div
                  class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3"
                >
                  OGFS IT Support
                </div>


                <h1
                  class="text-2xl sm:text-3xl font-extrabold tracking-tight"
                >
                  OGFS Device Troubleshooting Form
                </h1>


                <p
                  class="text-blue-100 text-sm mt-2 leading-relaxed"
                >
                  Submit technical details for hardware, operating system,
                  network, or device issues affecting OGFS operations.
                </p>

              </div>


              <div
                class="text-left sm:text-right text-xs text-blue-200"
              >

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
          <form
            [formGroup]="troubleshootingForm"
            (ngSubmit)="onSubmit()"
            class="p-6 sm:p-8 space-y-10 text-slate-900"
          >


            <!-- SECTION 1: EMPLOYEE INFORMATION -->
            <section
              formGroupName="employee"
              class="space-y-5"
            >

              <div
                class="flex items-center gap-3 border-b border-slate-200 pb-3"
              >

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
                >
                  1
                </div>


                <div>

                  <h2 class="text-lg font-bold text-slate-800">
                    Employee Information
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Employee information is retrieved automatically from
                    Microsoft Entra. Employee ID is entered manually.
                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >

                <!-- FULL NAME -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Full Name *
                  </label>


                  <input
                    type="text"
                    formControlName="name"
                    placeholder="John Doe"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 bg-slate-100 cursor-not-allowed focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('employee', 'name')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('employee', 'name')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Name is required.
                  </span>

                </div>


                <!-- EMPLOYEE ID -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Employee ID *
                  </label>


                  <input
                    type="text"
                    formControlName="employeeId"
                    placeholder="OGFS-1042"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="
                      isFieldInvalid('employee', 'employeeId')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('employee', 'employeeId')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Employee ID is required.
                  </span>

                </div>


                <!-- DEPARTMENT -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Department *
                  </label>


                  <input
                    type="text"
                    formControlName="department"
                    placeholder="Finance / Risk / Operations"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 bg-slate-100 cursor-not-allowed focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('employee', 'department')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('employee', 'department')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Department is required.
                  </span>

                </div>


                <!-- JOB TITLE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Job Title *
                  </label>


                  <input
                    type="text"
                    formControlName="jobTitle"
                    placeholder="IT Specialist"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 bg-slate-100 cursor-not-allowed focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('employee', 'jobTitle')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('employee', 'jobTitle')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Job Title is required.
                  </span>

                </div>

              </div>

            </section>


            <!-- SECTION 2: DEVICE INFORMATION -->
            <section
              formGroupName="device"
              class="space-y-5"
            >

              <div
                class="flex items-center gap-3 border-b border-slate-200 pb-3"
              >

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
                >
                  2
                </div>


                <div>

                  <h2 class="text-lg font-bold text-slate-800">
                    Device Information
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Provide information about the affected OGFS device.
                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >

                <!-- DEVICE TYPE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Device Type *
                  </label>


                  <select
                    formControlName="deviceType"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('device', 'deviceType')
                    "
                  >

                    <option value="">
                      Select Type
                    </option>

                    <option value="Laptop">
                      Corporate Laptop
                    </option>

                    <option value="Desktop">
                      Workstation Desktop
                    </option>

                    <option value="Mobile">
                      Mobile / Tablet
                    </option>

                    <option value="Peripheral">
                      Peripheral / Display
                    </option>

                  </select>


                  <span
                    *ngIf="isFieldInvalid('device', 'deviceType')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Select a device type.
                  </span>

                </div>


                <!-- BRAND & MODEL -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Brand & Model *
                  </label>


                  <input
                    type="text"
                    formControlName="brandModel"
                    placeholder="Dell Latitude 5440"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('device', 'brandModel')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('device', 'brandModel')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Brand/Model is required.
                  </span>

                </div>


                <!-- SERIAL NUMBER -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Serial Number *
                  </label>


                  <input
                    type="text"
                    formControlName="serialNumber"
                    placeholder="SN-982312A"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('device', 'serialNumber')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('device', 'serialNumber')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Serial Number is required.
                  </span>

                </div>


                <!-- ASSET TAG -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Asset Tag

                    <span class="text-slate-400 normal-case">
                      (Optional)
                    </span>

                  </label>


                  <input
                    type="text"
                    formControlName="assetTag"
                    placeholder="OGFS-TAG-082"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />

                </div>


                <!-- OPERATING SYSTEM -->
                <div class="sm:col-span-2">

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Operating System *
                  </label>


                  <input
                    type="text"
                    formControlName="operatingSystem"
                    placeholder="Windows 11 Enterprise"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('device', 'operatingSystem')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('device', 'operatingSystem')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Operating System is required.
                  </span>

                </div>

              </div>

            </section>


            <!-- SECTION 3: ISSUE INFORMATION -->
            <section
              formGroupName="issue"
              class="space-y-5"
            >

              <div
                class="flex items-center gap-3 border-b border-slate-200 pb-3"
              >

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
                >
                  3
                </div>


                <div>

                  <h2 class="text-lg font-bold text-slate-800">
                    Technical Incident Summary
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Describe the technical issue, symptoms, and any
                    troubleshooting already performed.
                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >

                <!-- DATE REPORTED -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Date Reported *
                  </label>


                  <input
                    type="date"
                    formControlName="dateReported"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('issue', 'dateReported')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('issue', 'dateReported')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Date reported is required.
                  </span>

                </div>


                <!-- REPORTED BY -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Reported By *
                  </label>


                  <input
                    type="text"
                    formControlName="reportedBy"
                    placeholder="Self / Line Manager"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('issue', 'reportedBy')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('issue', 'reportedBy')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Reported by is required.
                  </span>

                </div>


                <!-- DATE ISSUE STARTED -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Date Issue Started *
                  </label>


                  <input
                    type="date"
                    formControlName="startDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('issue', 'startDate')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('issue', 'startDate')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Start date is required.
                  </span>

                </div>


                <!-- TROUBLESHOOTING ATTEMPTED -->
                <div
                  class="flex items-center gap-3 sm:mt-7"
                >

                  <input
                    type="checkbox"
                    id="troubleshootingAttempted"
                    formControlName="troubleshootingAttempted"
                    class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />


                  <label
                    for="troubleshootingAttempted"
                    class="text-sm font-medium text-slate-800"
                  >
                    Prior troubleshooting attempted?
                  </label>

                </div>


                <!-- DESCRIPTION -->
                <div class="sm:col-span-2">

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Detailed Incident Description *
                  </label>


                  <textarea
                    formControlName="description"
                    rows="4"
                    placeholder="Describe system crashes, VPN disconnects, application errors, network issues, hardware failures, or other symptoms..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-y"
                    [class.border-red-500]="
                      isFieldInvalid('issue', 'description')
                    "
                  ></textarea>


                  <span
                    *ngIf="isFieldInvalid('issue', 'description')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Description is required.
                  </span>

                </div>


                <!-- ATTEMPTED DETAILS -->
                <div
                  class="sm:col-span-2"
                  *ngIf="
                    troubleshootingForm.get(
                      'issue.troubleshootingAttempted'
                    )?.value
                  "
                >

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Troubleshooting Steps Attempted
                  </label>


                  <input
                    type="text"
                    formControlName="attemptedDetails"
                    placeholder="Rebooted device, updated drivers, restarted network adapter..."
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />

                </div>

              </div>

            </section>


            <!-- SECTION 4: CONSENT & SIGNATURE -->
            <section class="space-y-5">

              <div
                class="flex items-center gap-3 border-b border-slate-200 pb-3"
              >

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
                >
                  4
                </div>


                <div>

                  <h2 class="text-lg font-bold text-slate-800">
                    Consent & Authorization
                  </h2>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Confirm authorization for OGFS IT Support to diagnose and
                    remediate the reported issue.
                  </p>

                </div>

              </div>


              <!-- CONSENT -->
              <div
                formGroupName="consent"
                class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100"
              >

                <div
                  class="flex items-start gap-3"
                >

                  <input
                    type="checkbox"
                    id="ogfsConsent"
                    formControlName="agreed"
                    class="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />


                  <label
                    for="ogfsConsent"
                    class="text-xs text-slate-700 leading-relaxed"
                  >
                    I authorize OGFS IT Support to perform diagnostic and
                    remediation work on this equipment.
                  </label>

                </div>


                <span
                  *ngIf="
                    troubleshootingForm.get('consent.agreed')?.invalid &&
                    troubleshootingForm.get('consent.agreed')?.touched
                  "
                  class="text-xs text-red-500 mt-2 block"
                >
                  Authorization is required before submitting the form.
                </span>

              </div>


              <!-- SIGNATURE -->
              <div
                formGroupName="signatures"
                class="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >

                <!-- DIGITAL SIGNATURE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Digital Signature *
                  </label>


                  <div
                    class="border border-slate-200 rounded-xl bg-white overflow-hidden"
                    [class.border-red-500]="
                      isFieldInvalid('signatures', 'employee')
                    "
                  >

                    <canvas
                      #employeeSignatureCanvas
                      width="700"
                      height="180"
                      class="w-full h-40 touch-none cursor-crosshair block"
                      (pointerdown)="startDrawing($event)"
                      (pointermove)="draw($event)"
                      (pointerup)="stopDrawing()"
                      (pointerleave)="stopDrawing()"
                      (pointercancel)="stopDrawing()"
                    ></canvas>


                    <div
                      class="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-slate-50"
                    >

                      <span class="text-xs text-slate-400">
                        Draw your signature above
                      </span>


                      <button
                        type="button"
                        (click)="clearSignature()"
                        class="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear Signature
                      </button>

                    </div>

                  </div>


                  <span
                    *ngIf="isFieldInvalid('signatures', 'employee')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Digital signature is required.
                  </span>

                </div>


                <!-- SIGNATURE DATE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Signature Date *
                  </label>


                  <input
                    type="date"
                    formControlName="employeeDate"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="
                      isFieldInvalid('signatures', 'employeeDate')
                    "
                  />


                  <span
                    *ngIf="isFieldInvalid('signatures', 'employeeDate')"
                    class="text-xs text-red-500 mt-1 block"
                  >
                    Signature date is required.
                  </span>

                </div>

              </div>

            </section>


            <!-- SUBMIT BUTTON -->
            <div
              class="pt-6 border-t border-slate-200 flex justify-end"
            >

              <button
                type="submit"
                class="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all"
              >
                Submit OGFS Form
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  `
})
export class OGFSTroubleshooting implements OnInit, AfterViewInit {

  private fb = inject(FormBuilder);

  private router = inject(Router);

  private http = inject(HttpClient);

  private entraService = inject(EntraService);


  troubleshootingForm!: FormGroup;

  currentDate: Date = new Date();


  @ViewChild('employeeSignatureCanvas')
  employeeSignatureCanvas!: ElementRef<HTMLCanvasElement>;


  private isDrawingEmployee = false;


  ngOnInit(): void {

    this.troubleshootingForm = this.fb.group({

      /*
       * EMPLOYEE INFORMATION
       *
       * Name, department and job title are retrieved
       * automatically from Microsoft Entra.
       *
       * Employee ID remains manually entered.
       */
      employee: this.fb.group({

        name: [
          {
            value: '',
            disabled: true
          },
          Validators.required
        ],

        department: [
          {
            value: '',
            disabled: true
          },
          Validators.required
        ],

        jobTitle: [
          {
            value: '',
            disabled: true
          },
          Validators.required
        ],

        employeeId: [
          '',
          Validators.required
        ]

      }),


      /*
       * DEVICE INFORMATION
       */
      device: this.fb.group({

        assetTag: [''],

        deviceType: [
          '',
          Validators.required
        ],

        brandModel: [
          '',
          Validators.required
        ],

        serialNumber: [
          '',
          Validators.required
        ],

        operatingSystem: [
          '',
          Validators.required
        ]

      }),


      /*
       * ISSUE INFORMATION
       */
      issue: this.fb.group({

        dateReported: [
          '',
          Validators.required
        ],

        reportedBy: [
          '',
          Validators.required
        ],

        description: [
          '',
          Validators.required
        ],

        startDate: [
          '',
          Validators.required
        ],

        troubleshootingAttempted: [
          false
        ],

        attemptedDetails: [
          ''
        ]

      }),


      /*
       * CONSENT
       */
      consent: this.fb.group({

        agreed: [
          false,
          Validators.requiredTrue
        ]

      }),


      /*
       * SIGNATURE
       */
      signatures: this.fb.group({

        employee: [
          '',
          Validators.required
        ],

        employeeDate: [
          new Date()
            .toISOString()
            .substring(0, 10),

          Validators.required
        ]

      })

    });


    /*
     * Retrieve authenticated user's
     * Microsoft Entra information.
     */
    this.loadEmployeeInformation();

  }


  /*
   * INITIALIZE SIGNATURE CANVAS
   */
  ngAfterViewInit(): void {

    this.setupCanvas(
      this.employeeSignatureCanvas.nativeElement
    );

  }


  /*
   * CONFIGURE SIGNATURE CANVAS
   */
  private setupCanvas(
    canvas: HTMLCanvasElement
  ): void {

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.lineWidth = 2;

    context.lineCap = 'round';

    context.lineJoin = 'round';

    context.strokeStyle = '#0f172a';

  }


  /*
   * START DRAWING SIGNATURE
   */
  public startDrawing(
    event: PointerEvent
  ): void {

    const canvas =
      this.employeeSignatureCanvas.nativeElement;

    const context =
      canvas.getContext('2d');

    if (!context) {
      return;
    }


    this.isDrawingEmployee = true;


    canvas.setPointerCapture(
      event.pointerId
    );


    const position =
      this.getCanvasPosition(
        event,
        canvas
      );


    context.beginPath();

    context.moveTo(
      position.x,
      position.y
    );

  }


  /*
   * DRAW SIGNATURE
   */
  public draw(
    event: PointerEvent
  ): void {

    if (!this.isDrawingEmployee) {
      return;
    }


    const canvas =
      this.employeeSignatureCanvas.nativeElement;

    const context =
      canvas.getContext('2d');

    if (!context) {
      return;
    }


    const position =
      this.getCanvasPosition(
        event,
        canvas
      );


    context.lineTo(
      position.x,
      position.y
    );

    context.stroke();


    this.updateSignatureValue();

  }


  /*
   * STOP DRAWING
   */
  public stopDrawing(): void {

    this.isDrawingEmployee = false;

    this.updateSignatureValue();

  }


  /*
   * GET POINTER POSITION ON CANVAS
   */
  private getCanvasPosition(
    event: PointerEvent,
    canvas: HTMLCanvasElement
  ): {
    x: number;
    y: number;
  } {

    const rect =
      canvas.getBoundingClientRect();


    return {

      x:
        (event.clientX - rect.left) *
        (canvas.width / rect.width),

      y:
        (event.clientY - rect.top) *
        (canvas.height / rect.height)

    };

  }


  /*
   * SAVE SIGNATURE INTO FORM CONTROL
   *
   * The canvas is converted to a PNG
   * data URL and stored in:
   *
   * signatures.employee
   */
  private updateSignatureValue(): void {

    const canvas =
      this.employeeSignatureCanvas.nativeElement;


    const signature =
      canvas.toDataURL('image/png');


    this.troubleshootingForm
      .get('signatures.employee')
      ?.setValue(signature);


    this.troubleshootingForm
      .get('signatures.employee')
      ?.markAsTouched();


    this.troubleshootingForm
      .get('signatures.employee')
      ?.updateValueAndValidity();

  }


  /*
   * CLEAR SIGNATURE
   */
  public clearSignature(): void {

    const canvas =
      this.employeeSignatureCanvas.nativeElement;

    const context =
      canvas.getContext('2d');

    if (!context) {
      return;
    }


    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    this.troubleshootingForm
      .get('signatures.employee')
      ?.setValue('');


    this.troubleshootingForm
      .get('signatures.employee')
      ?.markAsTouched();


    this.troubleshootingForm
      .get('signatures.employee')
      ?.updateValueAndValidity();

  }


  /*
   * GET EMPLOYEE INFORMATION FROM DJANGO
   *
   * Retrieves the authenticated employee's:
   *
   * - Full Name
   * - Department
   * - Job Title
   */
  private loadEmployeeInformation(): void {

    this.entraService.getMyProfile().subscribe({

      next: (response) => {

        this.troubleshootingForm
          .get('employee')
          ?.patchValue({

            name: response.profile.name,

            department: response.profile.department,

            jobTitle: response.profile.jobTitle

          });

      },


      error: (error) => {

        console.error(
          'Unable to load employee information:',
          error
        );

        alert(
          'Unable to retrieve your Microsoft employee information.'
        );

      }

    });

  }


  /*
   * SUBMIT TROUBLESHOOTING FORM
   *
   * POST
   * http://127.0.0.1:8000/api/v1/ogfs/troubleshooting/
   */
  public onSubmit(): void {

    if (this.troubleshootingForm.valid) {

      /*
       * getRawValue() is required because
       * name, department and jobTitle are disabled.
       */
      const payload: OgfsDeviceTroubleshootingPayload = {

        currentDate: this.currentDate,

        ...this.troubleshootingForm.getRawValue()

      };


      console.log(
        'OGFS Troubleshooting Form Submission Payload:',
        payload
      );


      this.http.post(

        'http://localhost:8000/api/v1/ogfs/troubleshoot/',

        payload,

        {
          withCredentials: true
        }

      ).subscribe({

        next: (response: any) => {

          alert(
            response.message ||
            'OGFS Device Troubleshooting form submitted successfully!'
          );


          this.router.navigate(['/']);

        },


        error: (error) => {

          console.error(
            'OGFS device troubleshooting submission failed:',
            error
          );


          alert(

            error?.error?.message ||

            'Unable to submit the OGFS troubleshooting request.'

          );

        }

      });

    } else {

      this.troubleshootingForm.markAllAsTouched();

      alert(
        'Please fill out all required fields.'
      );

    }

  }


  /*
   * CHECK FIELD VALIDATION
   */
  public isFieldInvalid(
    groupName: string,
    fieldName: string
  ): boolean {

    const field =
      this.troubleshootingForm.get(
        `${groupName}.${fieldName}`
      );


    return field

      ? field.invalid &&
        (field.dirty || field.touched)

      : false;

  }

}