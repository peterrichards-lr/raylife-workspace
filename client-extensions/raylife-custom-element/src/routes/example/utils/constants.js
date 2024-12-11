import { FormAddress } from '../components/containters/Forms/Address';
import { FormPersonal } from '../components/containters/Forms/Personal';
import { FormTerms } from '../components/containters/Forms/Terms';

export const TOTAL_OF_FIELD = {
  PERSONAL: 4,
  ADDRESS: 4,
  TERMS: 2,
};

export const SUBSECTION_KEYS = {
  DOB: 'date-of-birth',
  EMAIL: 'email',
  FORENAME: 'forname',
  SURNAME: 'surname',
  SAULTATION: 'salutation',
  YOUR_ADDRESS: 'your-address',
  YOUR_NAME: 'your-name',
  CITY: 'city',
  ADDRESS: 'address',
  LOCALITY: 'locality',
  COUNTY: 'county',
  POSTCODE: 'postcode',
};

export const AVAILABLE_STEPS = {
  ADDRESS: {
    Component: FormAddress,
    active: false,
    id: 'ADDRESS',
    index: 1,
    section: 'address',
    subsection: '',
    title: 'step-address',
  },
  PERSONAL: {
    Component: FormPersonal,
    active: true,
    id: 'PERSONAL',
    index: 0,
    mobileSubSections: [
      {
        active: true,
        hideInputLabel: false,
        title: SUBSECTION_KEYS.YOUR_NAME,
      },
      {
        active: false,
        hideInputLabel: false,
        title: SUBSECTION_KEYS.EMAIL,
      },
    ],
    section: 'personal',
    subsection: '',
    title: 'step-personal',
  },
  TERMS: {
    Component: FormTerms,
    active: false,
    id: 'TERMS',
    index: 2,
    mobileSubSections: [
      {
        active: true,
        hideInputLabel: false,
        title: SUBSECTION_KEYS.DOB,
      },
      {
        active: false,
        hideInputLabel: true,
        title: SUBSECTION_KEYS.ACCEPTANCE,
      },
    ],
    section: 'terms',
    subsection: '',
    title: 'step-terms',
  },
};

export const STEP_ORDERED = Object.values(AVAILABLE_STEPS).sort(
  (stepA, stepB) => stepA.index - stepB.index
);

export const PICK_LISTS = {
  UK_SALUTATIONS: 'UK_SALUTATIONS',
  UK_COUNTIES: 'UK_COUNTIES',
};

export const OBJECT_MESSAGE = {
	EXAMPLE: {
		DISABLED: 'app-object-disabled',
	},
};
