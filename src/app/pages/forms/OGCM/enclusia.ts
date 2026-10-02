import { Component, OnInit, inject } from '@angular/core';
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

import {
  HttpClient
} from '@angular/common/http';

import {
  EntraService
} from '../../../core/services/entra.service';


/**
 * Person the Enclusia access request
 * is being created for.
 */
export interface AccessForUser {

  name: string;

  email: string;

}


/**
 * Enclusia Cloud Platform access request payload.
 *
 * This structure must match the Django
 * serializer/backend.
 */
export interface EnclusiaAccessPayload {

  currentDate: Date;

  /**
   * Person creating the request.
   */
  requester: {

    name: string;

  };

  /**
   * Person the access is being created for.
   */
  accessFor: {

    name: string;

    email: string;

  };

  /**
   * Employee information of the
   * person creating the request.
   */
  employee: {

    name: string;

    department: string;

    jobTitle: string;

    employeeId: string;

  };

  /**
   * Enclusia access being requested.
   */
  enclusiaAccess: {

    role: string;

    rolecode: string;

    roleDescription: string;

    reason: string;

  };

}


@Component({

  selector: 'app-user-access-form',

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
                d="M10 19l-7-7m0 0l7-7"
              />

            </svg>

            Back to Portal Landing

          </a>


          <span
            class="text-xs text-slate-400 font-mono"
          >

            Form Ref: ENCLUSIA-ACCESS-2026

          </span>

        </header>


        <!-- FORM CARD -->
        <div
          class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden"
        >

          <!-- FORM BANNER -->
          <div
            class="bg-blue-900 text-white p-6 sm:p-8"
          >

            <div
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >

              <div>

                <div
                  class="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold mb-3"
                >

                  Enclusia Cloud Platform

                </div>


                <h1
                  class="text-2xl sm:text-3xl font-extrabold tracking-tight"
                >

                  Platform Access Request

                </h1>


                <p
                  class="text-blue-100 text-sm mt-2 leading-relaxed"
                >

                  Request access to the Enclusia Cloud Platform based on your assigned responsibilities.

                </p>

              </div>


              <div
                class="text-left sm:text-right text-xs text-blue-200"
              >

                <p>

                  Date:

                  <span
                    class="font-semibold text-white"
                  >

                    {{ currentDate | date:'mediumDate' }}

                  </span>

                </p>

              </div>

            </div>

          </div>


          <!-- FORM BODY -->
          <form
            [formGroup]="accessForm"
            (ngSubmit)="onSubmit()"
            class="p-6 sm:p-8 space-y-10 text-slate-900"
          >

            <!-- SECTION 1 -->
            <section class="space-y-5">

              <div
                class="flex items-center gap-3 border-b border-slate-200 pb-3"
              >

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
                >

                  1

                </div>


                <div>

                  <h2
                    class="text-lg font-bold text-slate-800"
                  >

                    Access Request Information

                  </h2>


                  <p
                    class="text-xs text-slate-500 mt-0.5"
                  >

                    Enter the details of the user for whom this Enclusia access request is being created.

                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >

                <!-- USER FULL NAME -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Who are you creating the user access for? *

                  </label>


                  <input
                    type="text"
                    formControlName="accessForName"
                    placeholder="Enter user's full name"
                    autocomplete="name"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('accessForName')"
                  />


                  <span
                    *ngIf="isFieldInvalid('accessForName')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    Please enter the user's full name.

                  </span>

                </div>


                <!-- OFFICIAL MICROSOFT ACCOUNT -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Official Microsoft Account *

                  </label>


                  <input
                    type="email"
                    formControlName="accessForEmail"
                    placeholder="user@optimum-g.com"
                    autocomplete="email"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isFieldInvalid('accessForEmail')"
                  />


                  <span
                    *ngIf="isFieldInvalid('accessForEmail')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    <ng-container
                      *ngIf="accessForm.get('accessForEmail')?.hasError('required')"
                    >

                      Official Microsoft account is required.

                    </ng-container>


                    <ng-container
                      *ngIf="accessForm.get('accessForEmail')?.hasError('email')"
                    >

                      Please enter a valid email address.

                    </ng-container>


                    <ng-container
                      *ngIf="accessForm.get('accessForEmail')?.hasError('optimumEmail')"
                    >

                      Only official @optimum-g.com accounts are allowed.

                    </ng-container>

                  </span>

                </div>

              </div>


              <!-- CORPORATE ACCOUNT INFORMATION -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-200"
              >

                <div class="flex items-start gap-3">

                  <div
                    class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0"
                  >

                    i

                  </div>


                  <div>

                    <h3
                      class="text-sm font-bold text-slate-800"
                    >

                      Corporate Account Required

                    </h3>


                    <p
                      class="text-xs text-slate-500 mt-1 leading-relaxed"
                    >

                      Enter the user's official Microsoft account registered with Optimum Global. Only accounts ending in @optimum-g.com are accepted.

                    </p>

                  </div>

                </div>

              </div>

            </section>


            <!-- SECTION 2 -->
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

                  2

                </div>


                <div>

                  <h2
                    class="text-lg font-bold text-slate-800"
                  >

                    Employee Information

                  </h2>


                  <p
                    class="text-xs text-slate-500 mt-0.5"
                  >

                    Your employee information is retrieved from Microsoft Entra.

                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >

                <!-- FULL NAME -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Full Name

                  </label>


                  <input
                    type="text"
                    formControlName="name"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-slate-50 focus:outline-none"
                  />

                </div>


                <!-- DEPARTMENT -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Department

                  </label>


                  <input
                    type="text"
                    formControlName="department"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-slate-50 focus:outline-none"
                  />

                </div>


                <!-- JOB TITLE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Job Title

                  </label>


                  <input
                    type="text"
                    formControlName="jobTitle"
                    readonly
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-slate-50 focus:outline-none"
                  />

                </div>


                <!-- EMPLOYEE ID -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Employee ID

                  </label>


                  <input
                    type="text"
                    formControlName="employeeId"
                    placeholder="Enter Employee ID"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('employee', 'employeeId')"
                  />


                  <span
                    *ngIf="isGroupFieldInvalid('employee', 'employeeId')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    Employee ID is required.

                  </span>

                </div>

              </div>

            </section>


            <!-- SECTION 3 -->
            <section
              formGroupName="enclusiaAccess"
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

                  <h2
                    class="text-lg font-bold text-slate-800"
                  >

                    Enclusia Cloud Platform Access

                  </h2>


                  <p
                    class="text-xs text-slate-500 mt-0.5"
                  >

                    Specify the Enclusia platform access required for the user.

                  </p>

                </div>

              </div>


              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >

                <!-- ROLECODE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Rolecode *

                  </label>


                  <select
                    formControlName="rolecode"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('enclusiaAccess', 'rolecode')"
                  >

                    <option value="">

                      Select Role Code

                    </option>


                    @for (rolecode of rolecodes; track rolecode) {

                      <option [value]="rolecode">

                        {{ rolecode }}

                      </option>

                    }

                  </select>


                  <span
                    *ngIf="isGroupFieldInvalid('enclusiaAccess', 'rolecode')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    Please select a role code.

                  </span>

                </div>


                <!-- ENCLUSIA ROLE -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Enclusia Role *

                  </label>


                  <select
                    formControlName="role"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('enclusiaAccess', 'role')"
                  >

                    <option value="">

                      Select Enclusia Role

                    </option>


                    @for (role of enclusiaRoles; track role) {

                      <option [value]="role">

                        {{ role }}

                      </option>

                    }

                  </select>


                  <span
                    *ngIf="isGroupFieldInvalid('enclusiaAccess', 'role')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    Please select an Enclusia role.

                  </span>

                </div>


                <!-- ROLE DESCRIPTION -->
                <div>

                  <label
                    class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                  >

                    Role Description *

                  </label>


                  <select
                    formControlName="roleDescription"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    [class.border-red-500]="isGroupFieldInvalid('enclusiaAccess', 'roleDescription')"
                  >

                    <option value="">

                      Select Role Description

                    </option>


                    @for (description of roleDescriptions; track description) {

                      <option [value]="description">

                        {{ description }}

                      </option>

                    }

                  </select>


                  <span
                    *ngIf="isGroupFieldInvalid('enclusiaAccess', 'roleDescription')"
                    class="text-xs text-red-500 mt-1 block"
                  >

                    Please select a role description.

                  </span>

                </div>

              </div>


              <!-- REASON FOR ACCESS -->
              <div>

                <label
                  class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                >

                  Business Justification *

                </label>


                <textarea
                  formControlName="reason"
                  rows="4"
                  placeholder="Explain why access to the Enclusia Cloud Platform is required..."
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  [class.border-red-500]="isGroupFieldInvalid('enclusiaAccess', 'reason')"
                ></textarea>


                <span
                  *ngIf="isGroupFieldInvalid('enclusiaAccess', 'reason')"
                  class="text-xs text-red-500 mt-1 block"
                >

                  Business justification is required.

                </span>

              </div>

            </section>


            <!-- ACCESS INFORMATION -->
            <div
              class="p-4 bg-slate-50 rounded-2xl border border-slate-200"
            >

              <div class="flex items-start gap-3">

                <div
                  class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0"
                >

                  i

                </div>


                <div>

                  <h3
                    class="text-sm font-bold text-slate-800"
                  >

                    Enclusia Access Information

                  </h3>


                  <p
                    class="text-xs text-slate-500 mt-1 leading-relaxed"
                  >

                    Access to the Enclusia Cloud Platform should be limited to the permissions required for the employee's assigned responsibilities.

                  </p>

                </div>

              </div>

            </div>


            <!-- SUBMIT BUTTON -->
            <div
              class="pt-6 border-t border-slate-200 flex justify-end"
            >

              <button
                type="submit"
                [disabled]="isSubmitting"
                class="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-md transition-all"
              >

                <span *ngIf="!isSubmitting">

                  Submit Enclusia Access Request

                </span>


                <span *ngIf="isSubmitting">

                  Submitting...

                </span>

              </button>

            </div>


          </form>

        </div>

      </div>

    </div>

  `
})


export class UserAccessFormComponent
  implements OnInit {


  private fb = inject(FormBuilder);

  private router = inject(Router);

  private http = inject(HttpClient);

  private entraService = inject(EntraService);


  /**
   * Reactive form.
   */
  accessForm!: FormGroup;


  /**
   * Current date displayed
   * on the form.
   */
  currentDate: Date = new Date();


  /**
   * Prevents multiple submissions.
   */
  isSubmitting = false;


  /**
   * Enclusia Cloud Platform role codes.
   */
  readonly rolecodes: string[] = [

    'ADM',

    'AO',

    'FIN_DASH',

    'FINCON',

    'GLOBAL_DASH',

    'INT_CTRL',

    'INV_SETUP',

    'IT_SUP',

    'OPS',

    'OPS_DASH',

    'SM',

    'TR_OPS'

  ];


  /**
   * Enclusia Cloud Platform roles.
   */
  readonly enclusiaRoles: string[] = [

    'Administrator',

    'Account Officers',

    'Finance Dashboard',

    'Financial Control',

    'Global Dashboard',

    'Internal Control',

    'INVESTMENT MODULE SETUP',

    'IT Support',

    'Operations',

    'OPERATIONS DASHBOARD',

    'Support Manager',

    'TREASURY OPERATIONS'

  ];


  /**
   * Enclusia role descriptions.
   */
  readonly roleDescriptions: string[] = [

    'Administrator Role',

    'Account Officers',

    'Finance Dashboard',

    'Financial Control',

    'Global Dashboard',

    'Internal Control',

    'INVESTMENT MODULE SETUP',

    'IT Support',

    'Operations',

    'OPERATIONS DASHBOARD',

    'Support Manager',

    'TREASURY OPERATIONS'

  ];


  ngOnInit(): void {

    /**
     * Initialize form.
     */
    this.accessForm = this.fb.group({

      /**
       * Person receiving the access.
       */
      accessForName: [

        '',

        Validators.required

      ],


      /**
       * Official Microsoft account.
       */
      accessForEmail: [

        '',

        [

          Validators.required,

          Validators.email,

          this.optimumEmailValidator

        ]

      ],


      /**
       * Employee information of
       * the authenticated requester.
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


      /**
       * Enclusia access information.
       */
      enclusiaAccess: this.fb.group({

        role: [

          '',

          Validators.required

        ],


        rolecode: [

          '',

          Validators.required

        ],


        roleDescription: [

          '',

          Validators.required

        ],


        reason: [

          '',

          Validators.required

        ]

      })

    });


    /**
     * Load authenticated user's
     * Microsoft Entra information.
     */
    this.loadEmployeeInformation();

  }


  /**
   * Validate that the supplied email
   * belongs to the Optimum corporate domain.
   */
  private optimumEmailValidator = (
    control: any
  ) => {

    const value =
      String(control.value || '')
        .trim()
        .toLowerCase();


    if (!value) {

      return null;

    }


    if (!value.endsWith('@optimum-g.com')) {

      return {
        optimumEmail: true
      };

    }


    return null;

  };


  /**
   * Retrieve current requester's
   * employee information from Entra.
   */
  private loadEmployeeInformation(): void {

    this.entraService.getMyProfile()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Microsoft Entra profile:',
            response
          );


          this.accessForm
            .get('employee')
            ?.patchValue({

              name:
                response.profile?.name || '',

              department:
                response.profile?.department || '',

              jobTitle:
                response.profile?.jobTitle || '',

              employeeId:
                response.profile?.employeeId || ''

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


  /**
   * Submit the Enclusia Cloud Platform
   * access request to Django.
   */
  public onSubmit(): void {

    /**
     * Prevent another request while
     * the current request is processing.
     */
    if (this.isSubmitting) {

      return;

    }


    /**
     * Validate form.
     */
    if (this.accessForm.invalid) {

      this.accessForm.markAllAsTouched();

      alert(
        'Please fill out all required fields.'
      );

      return;

    }


    /**
     * Set submitting state.
     */
    this.isSubmitting = true;


    /**
     * getRawValue() is important because
     * name, department and jobTitle are
     * disabled controls.
     */
    const formValue =
      this.accessForm.getRawValue();


    /**
     * Build the exact payload expected
     * by the Django serializer.
     */
    const payload: EnclusiaAccessPayload = {

      currentDate:
        this.currentDate,


      requester: {

        name:
          formValue.employee.name

      },


      accessFor: {

        name:
          String(
            formValue.accessForName || ''
          ).trim(),

        email:
          String(
            formValue.accessForEmail || ''
          )
            .trim()
            .toLowerCase()

      },


      employee: {

        name:
          formValue.employee.name,

        department:
          formValue.employee.department,

        jobTitle:
          formValue.employee.jobTitle,

        employeeId:
          String(
            formValue.employee.employeeId || ''
          ).trim()

      },


      enclusiaAccess: {

        role:
          formValue.enclusiaAccess.role,

        rolecode:
          formValue.enclusiaAccess.rolecode,

        /**
         * IMPORTANT:
         *
         * This must be roleDescription.
         *
         * The previous code incorrectly used:
         *
         * formValue.enclusiaAccess.accessScope
         */
        roleDescription:
          formValue.enclusiaAccess.roleDescription,

        reason:
          String(
            formValue.enclusiaAccess.reason || ''
          ).trim()

      }

    };


    /**
     * Display payload in browser console
     * for troubleshooting.
     */
    console.log(
      'Submitting Enclusia Access Request:',
      payload
    );


    /**
     * Send request to Django REST API.
     *
     * withCredentials is required because
     * your authentication/session and CSRF
     * setup use cookies.
     */
    this.http.post(

      'http://localhost:8000/api/v1/enclusia/user/',

      payload,

      {
        withCredentials: true
      }

    ).subscribe({

      /**
       * Django successfully created
       * the database record.
       */
      next: (response: any) => {

        console.log(
          'Enclusia Access Request Created:',
          response
        );


        this.isSubmitting = false;


        alert(
          'Enclusia Cloud Platform access request submitted successfully!'
        );


        /**
         * Return to portal landing page
         * after successful submission.
         */
        this.router.navigate([
          '/'
        ]);

      },


      /**
       * Django rejected the request.
       */
      error: (error: any) => {

        console.error(
          'Enclusia Access Request Error:',
          error
        );


        this.isSubmitting = false;


        /**
         * Log the complete backend
         * validation response.
         */
        if (error?.error) {

          console.error(
            'Backend Response:',
            error.error
          );

        }


        /**
         * Handle Django validation errors.
         */
        if (error?.error?.errors) {

          console.error(
            'Validation Errors:',
            error.error.errors
          );

        }


        let message =
          'Failed to submit the Enclusia access request. Please try again.';


        if (error?.error?.detail) {

          message =
            error.error.detail;

        }

        else if (error?.error?.message) {

          message =
            error.error.message;

        }

        else if (error?.error?.errors) {

          message =
            'Please correct the highlighted form information and try again.';

        }


        alert(message);

      }

    });

  }


  /**
   * Check nested form field validation.
   */
  public isGroupFieldInvalid(

    groupName: string,

    fieldName: string

  ): boolean {

    const field =
      this.accessForm.get(
        `${groupName}.${fieldName}`
      );


    return !!(

      field &&

      field.invalid &&

      (
        field.dirty ||
        field.touched
      )

    );

  }


  /**
   * Check top-level form field validation.
   */
  public isFieldInvalid(

    fieldName: string

  ): boolean {

    const field =
      this.accessForm.get(
        fieldName
      );


    return !!(

      field &&

      field.invalid &&

      (
        field.dirty ||
        field.touched
      )

    );

  }

}