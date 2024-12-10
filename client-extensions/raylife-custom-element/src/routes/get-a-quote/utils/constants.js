/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {FormBasicBusinessInformation} from '../components/containers/Forms/Basics/BusinessInformation';
import {FormBasicBusinessType} from '../components/containers/Forms/Basics/BusinessType';
import {FormBasicProductQuote} from '../components/containers/Forms/Basics/ProductQuote';
import {FormBusiness} from '../components/containers/Forms/Business';
import {FormEmployees} from '../components/containers/Forms/Employees';
import {FormProperty} from '../components/containers/Forms/Property';

export const TOTAL_OF_FIELD = {
	BASICS: 10,
	EMPLOYEES: 7,
	PROPERTY: 6,
};

export const SUBSECTION_KEYS = {
	BUSINESS_ANNUAL_GROSS_REVENUE:
		'business-annual-gross-revenue',
	BUSINESS_EMAIL: 'business-email',
	BUSINESS_FEDERAL_EMPLOYER_IDENTIFICATION_NUMBER:
		'business-federal-employer-identification-number',
	BUSINESS_WEBSITE: 'business-website',
	BUSINESS_YEAR_OPERATION: 'business-year-operation',
	CITY: 'city',
	DIVING_BOARDS: 'diving-boards',
	DO_YOU_HAVE_RAYLIFE_POLICY: 'do-you-have-raylife-policy',
	DO_YOU_OWN_THE_BUILDING_AT: 'do-you-own-the-building-at',
	DO_YOU_SELL_PRODUCTS_UNDER_OWN_BRAND:
		'do-you-sell-products-under-own-brand',
	DO_YOU_STORE_PERSONALITY_IDENTIFIABLE:
		'do-you-store-personality-identifiable',
	EMPLOYEES_AMOUNT: 'employees-amount',
	EMPLOYEES_ANNUAL_PAYROLL:
		'employees-annual-payroll',
	FEDERAL_EMPLOYER_IDENTIFICATION_NUMBER:
		'federal-employer-identification-number',
	FIRST_NAME: 'first-name',
	HOW_MANY_SQUARE_FEET_OF_THE_BUILDING:
		'how-many-square-feet-of-the-building',
	HOW_MANY_STORIES_IS_THIS_BUILDING: 'how-many-stories-is-this-building',
	HOW_MANY_TOTAL_SQUARE_FEET_IS_THE_BUILDING:
		'how-many-total-square-feet-is-the-building',
	LAST_NAME: 'last-name',
	LEGAL_ENTITY: 'legal-entity',
	OWNERS_ANNUAL_PAYROLL:
		'owners-annual-payroll',
	PERCENT_OF_SALES_FROM_MERCHANDISE:
		'percent-of-sales-from-merchandise',
	PHONE: 'phone',
	PHYSICAL_ADDRESS: 'physical-address',
	PHYSICAL_BUSINESS_ADDRESS: 'physical-business-address',
	PREMISES: 'premises',
	PRIMARY_LOCATION:
		'primary-location',
	STATE: 'state',
	SWIMMING_POOL: 'swimming-pool',
	WHAT_PERCENTAGE_OF_OVERALL_INVOLVE_DELIVERY:
		'what-percentage-of-overall-involve-delivery',
	WHAT_YEAR_WAS_THE_BUILDING_CONSTRUCTED:
		'what-year-was-the-building-constructed',
	YEAR_BUSINESS_STARTED: 'year-business-started',
	YEAR_OF_INDUSTRY_EXPERIENCE: 'year-of-industry-experience',
	YOUR_NAME: 'your-name',
	ZIP: 'zip',
};

export const AVAILABLE_STEPS = {
	BASICS_BUSINESS_INFORMATION: {
		Component: FormBasicBusinessInformation,
		active: false,
		id: 'BASICS_BUSINESS_INFORMATION',
		index: 2,
		mobileSubSections: [
			{
				active: true,
				hideInputLabel: false,
				title: SUBSECTION_KEYS.YOUR_NAME,
			},
			{
				active: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.BUSINESS_EMAIL,
			},
			{
				active: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.PHONE,
			},
			{
				active: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.BUSINESS_WEBSITE,
			},
			{
				active: false,
				hideInputLabel: false,
				title: SUBSECTION_KEYS.PHYSICAL_ADDRESS,
			},
		],
		section: 'basics',
		subsection: 'businessInformation',
		title: 'step-basics-business-information',
	},
	BASICS_BUSINESS_TYPE: {
		Component: FormBasicBusinessType,
		active: false,
		id: 'BASICS_BUSINESS_TYPE',
		index: 1,
		section: 'basics',
		subsection: 'business-type',
		title: 'step-basics-business-type',
	},
	BASICS_PRODUCT_QUOTE: {
		Component: FormBasicProductQuote,
		active: true,
		id: 'BASICS_PRODUCT_QUOTE',
		index: 0,
		section: 'basics',
		subsection: 'product-quote',
		title: 'step-basics-product-quote',
	},
	BUSINESS: {
		Component: FormBusiness,
		active: true,
		id: 'BUSINESS',
		index: 3,
		mobileSubSections: [
			{
				active: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.YEAR_OF_INDUSTRY_EXPERIENCE,
			},
			{
				active: false,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.DO_YOU_STORE_PERSONALITY_IDENTIFIABLE,
			},
			{
				active: false,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.DO_YOU_HAVE_RAYLIFE_POLICY,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.LEGAL_ENTITY,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.PERCENT_OF_SALES_FROM_MERCHANDISE,
			},
			{
				active: false,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.DO_YOU_SELL_PRODUCTS_UNDER_OWN_BRAND,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.WHAT_PERCENTAGE_OF_OVERALL_INVOLVE_DELIVERY,
			},
		],
		section: 'business',
		subsection: '',
		title: "step-business",
	},
	EMPLOYEES: {
		Component: FormEmployees,
		active: false,
		id: 'EMPLOYEES',
		index: 4,
		mobileSubSections: [
			{
				active: true,
				hideContinueButton: true,
				hideInputLabel: false,
				title: SUBSECTION_KEYS.BUSINESS_FEDERAL_EMPLOYER_IDENTIFICATION_NUMBER,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.YEAR_BUSINESS_STARTED,
			},
			{
				active: false,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.BUSINESS_YEAR_OPERATION,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.EMPLOYEES_AMOUNT,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.BUSINESS_ANNUAL_GROSS_REVENUE,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.OWNERS_ANNUAL_PAYROLL,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.EMPLOYEES_ANNUAL_PAYROLL,
			},
		],
		section: 'employees',
		subsection: '',
		title: 'step-employees',
	},
	PROPERTY: {
		Component: FormProperty,
		active: false,
		id: 'PROPERTY',
		index: 5,
		mobileSubSections: [
			{
				active: true,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.DO_YOU_OWN_THE_BUILDING_AT,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.HOW_MANY_STORIES_IS_THIS_BUILDING,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.HOW_MANY_SQUARE_FEET_OF_THE_BUILDING,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.HOW_MANY_TOTAL_SQUARE_FEET_IS_THE_BUILDING,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.WHAT_YEAR_WAS_THE_BUILDING_CONSTRUCTED,
			},
			{
				active: false,
				hideContinueButton: true,
				hideInputLabel: true,
				title: SUBSECTION_KEYS.PRIMARY_LOCATION,
			},
			{
				active: false,
				hideContinueButton: false,
				hideInputLabel: false,
				title: SUBSECTION_KEYS.PREMISES,
			},
		],
		section: 'property',
		subsection: '',
		title: 'step-property',
	},
};

export const STEP_ORDERED = Object.values(AVAILABLE_STEPS).sort(
	(stepA, stepB) => stepA.index - stepB.index
);

export const APPLICATION_STATUS = {
	BOUND: {
		key: 'bound',
		name: 'Bound',
	},
	INCOMPLETE: {
		key: 'incomplete',
		name: 'Incomplete',
	},
	OPEN: {
		key: 'open',
		name: 'Open',
	},
	QUOTED: {
		key: 'quoted',
		name: 'Quoted',
	},
};

export const OBJECT_MESSAGE = {
	APPLICATION: {
		DISABLED: 'app-object-disabled',
	},
};

export const CONTACT_INFORMATION_STEP = 2;
