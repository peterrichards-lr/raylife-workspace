import moment from 'moment';

const adaptToFormExampleRequest = (form) => ({
   address: form?.address?.address,
   city: form?.address?.city,
   county: {
      key: form?.address?.county
   },
   dateOfBirth: form?.terms?.dob ? moment(form?.terms?.dob, 'DD/MM/YYYY').toISOString().split('T')[0] : undefined,
   email: form?.personal?.email,
   forename: form?.personal?.forename,
   locality: form?.address?.locality,
   postcode: form?.address?.postcode,
   salutation: {
      key: form?.personal?.salutation
   },
   surname: form?.personal?.surname
});

export const LiferayAdapt = {
   adaptToFormExampleRequest
};